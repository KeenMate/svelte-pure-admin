/**
 * SignalR Transport Factory
 *
 * Creates a transport adapter for ASP.NET SignalR hubs.
 */

import type { BatchRequest, BatchResponse } from '../types';
import type { RpcTransport, RpcTransportConfig } from './types';

/**
 * SignalR HubConnection interface.
 * This is a minimal interface matching @microsoft/signalr HubConnection.
 */
export interface SignalRConnection {
	invoke<T = unknown>(methodName: string, ...args: unknown[]): Promise<T>;
}

/**
 * Options for the SignalR transport.
 */
export interface SignalRTransportOptions {
	/**
	 * The SignalR hub method name to invoke for batch requests.
	 * @default "BatchInvoke"
	 */
	methodName?: string;

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
	 * ```
	 */
	getRequestMetadata?: () => Record<string, unknown> | Promise<Record<string, unknown>>;
}

/**
 * Creates a SignalR transport adapter.
 *
 * @param connection - SignalR HubConnection instance
 * @param config - Response parsing configuration
 * @param options - Transport options (optional)
 * @returns RpcTransport instance
 *
 * @example
 * ```typescript
 * import { HubConnectionBuilder } from '@microsoft/signalr';
 * import { createSignalRTransport, commonResponseConfig } from '@keenmate/svelte-pure-admin';
 *
 * const connection = new HubConnectionBuilder()
 *   .withUrl('/api/hub')
 *   .build();
 *
 * const transport = createSignalRTransport(connection, {
 *   ...commonResponseConfig,
 *   // Override if needed
 * });
 * ```
 */
export function createSignalRTransport(
	connection: SignalRConnection,
	config: RpcTransportConfig,
	options: SignalRTransportOptions = {}
): RpcTransport {
	const { methodName = 'BatchInvoke', getRequestMetadata } = options;

	return {
		async sendBatch(request: BatchRequest): Promise<BatchResponse> {
			// Build request with metadata
			const requestWithMeta: BatchRequest = getRequestMetadata
				? { ...request, meta: await getRequestMetadata() }
				: request;

			const raw = await connection.invoke(methodName, requestWithMeta);
			return config.parseResponse(raw);
		},
		config
	};
}
