/**
 * HTTP Transport Factory
 *
 * Creates a transport adapter for REST API endpoints.
 */

import type { BatchRequest, BatchResponse } from '../types';
import type { RpcTransport, RpcTransportConfig } from './types';

/**
 * Options for the HTTP transport.
 */
export interface HttpTransportOptions {
	/**
	 * Static headers to include with each request.
	 */
	headers?: Record<string, string>;

	/**
	 * Dynamic headers callback - called before each request.
	 * Use this for auth tokens that may change.
	 * Merged with static headers (dynamic takes precedence).
	 *
	 * @example
	 * ```typescript
	 * getHeaders: () => ({
	 *   'Authorization': `Bearer ${getAccessToken()}`
	 * })
	 * ```
	 */
	getHeaders?: () => Record<string, string> | Promise<Record<string, string>>;

	/**
	 * Request metadata callback - returns data to include in request body.
	 * Called before each request. Result is added as `meta` field.
	 *
	 * @example
	 * ```typescript
	 * getRequestMetadata: () => ({
	 *   sessionId: appSession.id,
	 *   tenantId: currentTenant.id
	 * })
	 *
	 * // Request body becomes:
	 * // { batch: [...], meta: { sessionId: "...", tenantId: "..." } }
	 * ```
	 */
	getRequestMetadata?: () => Record<string, unknown> | Promise<Record<string, unknown>>;

	/**
	 * Request interceptor - called before each request is sent.
	 * Allows full customization of the request.
	 *
	 * @example
	 * ```typescript
	 * onBeforeRequest: (request, init) => {
	 *   console.log('Sending batch:', request);
	 *   init.credentials = 'include';
	 * }
	 * ```
	 */
	onBeforeRequest?: (request: BatchRequest, init: RequestInit) => void | Promise<void>;

	/**
	 * Response interceptor - called after response is received but before parsing.
	 * Useful for logging, metrics, or handling specific status codes.
	 *
	 * @example
	 * ```typescript
	 * onAfterResponse: (response) => {
	 *   if (response.status === 401) {
	 *     redirectToLogin();
	 *   }
	 * }
	 * ```
	 */
	onAfterResponse?: (response: Response) => void | Promise<void>;

	/**
	 * Fetch options to merge with the default options.
	 */
	fetchOptions?: RequestInit;

	/**
	 * Custom fetch function (useful for testing or custom implementations).
	 * @default globalThis.fetch
	 */
	fetchFn?: typeof fetch;

	/**
	 * Timeout in milliseconds for the request.
	 * @default 30000
	 */
	timeout?: number;
}

/**
 * Creates an HTTP transport adapter.
 *
 * @param baseUrl - The URL endpoint for batch requests
 * @param config - Response parsing configuration
 * @param options - Transport options (optional)
 * @returns RpcTransport instance
 *
 * @example
 * ```typescript
 * // Static headers
 * const transport = createHttpTransport('/api/rpc/batch', pureDataConfig, {
 *   headers: { 'X-API-Key': 'my-key' }
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Dynamic auth token
 * const transport = createHttpTransport('/api/rpc/batch', pureDataConfig, {
 *   getHeaders: () => ({
 *     'Authorization': `Bearer ${authStore.accessToken}`
 *   }),
 *   fetchOptions: {
 *     credentials: 'include'  // Send cookies
 *   }
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Full control with interceptors
 * const transport = createHttpTransport('/api/batch', commonResponseConfig, {
 *   getHeaders: async () => {
 *     await refreshTokenIfNeeded();
 *     return { 'Authorization': `Bearer ${getToken()}` };
 *   },
 *   onBeforeRequest: (request, init) => {
 *     console.log('Sending', request.batch.length, 'calls');
 *   },
 *   onAfterResponse: (response) => {
 *     if (response.status === 401) {
 *       handleUnauthorized();
 *     }
 *   }
 * });
 * ```
 */
export function createHttpTransport(
	baseUrl: string,
	config: RpcTransportConfig,
	options: HttpTransportOptions = {}
): RpcTransport {
	const {
		headers = {},
		getHeaders,
		getRequestMetadata,
		onBeforeRequest,
		onAfterResponse,
		fetchOptions = {},
		fetchFn = globalThis.fetch,
		timeout = 30000
	} = options;

	return {
		async sendBatch(request: BatchRequest): Promise<BatchResponse> {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), timeout);

			try {
				// Build dynamic headers
				const dynamicHeaders = getHeaders ? await getHeaders() : {};

				// Build request with metadata
				const requestWithMeta: BatchRequest = getRequestMetadata
					? { ...request, meta: await getRequestMetadata() }
					: request;

				// Build request init
				const init: RequestInit = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						...headers,
						...dynamicHeaders
					},
					body: JSON.stringify(requestWithMeta),
					signal: controller.signal,
					...fetchOptions
				};

				// Call before request interceptor
				if (onBeforeRequest) {
					await onBeforeRequest(requestWithMeta, init);
				}

				const response = await fetchFn(baseUrl, init);

				clearTimeout(timeoutId);

				// Call after response interceptor
				if (onAfterResponse) {
					await onAfterResponse(response);
				}

				if (!response.ok) {
					throw new Error(`HTTP ${response.status}: ${response.statusText}`);
				}

				const raw = await response.json();
				return config.parseResponse(raw);
			} catch (error) {
				clearTimeout(timeoutId);

				if (error instanceof Error && error.name === 'AbortError') {
					throw new Error(`HTTP batch request timed out after ${timeout}ms`);
				}

				throw error;
			}
		},
		config
	};
}
