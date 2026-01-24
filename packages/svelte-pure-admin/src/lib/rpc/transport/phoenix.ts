/**
 * Phoenix Channels Transport Factory
 *
 * Creates a transport adapter for Elixir Phoenix Channels.
 */

import type { BatchRequest, BatchResponse } from '../types';
import type { RpcTransport, RpcTransportConfig } from './types';

/**
 * Phoenix Channel interface.
 * This is a minimal interface matching the phoenix package Channel.
 */
export interface PhoenixChannel {
	push(
		event: string,
		payload: object
	): {
		receive(status: 'ok', callback: (response: unknown) => void): PhoenixPush;
		receive(status: 'error', callback: (response: unknown) => void): PhoenixPush;
		receive(status: 'timeout', callback: () => void): PhoenixPush;
	};
}

/**
 * Phoenix Push response chain interface.
 */
export interface PhoenixPush {
	receive(status: 'ok', callback: (response: unknown) => void): PhoenixPush;
	receive(status: 'error', callback: (response: unknown) => void): PhoenixPush;
	receive(status: 'timeout', callback: () => void): PhoenixPush;
}

/**
 * Options for the Phoenix transport.
 */
export interface PhoenixTransportOptions {
	/**
	 * The Phoenix channel event name for batch requests.
	 * @default "batch_invoke"
	 */
	eventName?: string;

	/**
	 * Timeout in milliseconds for the push operation.
	 * @default 30000
	 */
	timeout?: number;

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
 * Creates a Phoenix Channels transport adapter.
 *
 * @param channel - Phoenix Channel instance
 * @param config - Response parsing configuration
 * @param options - Transport options (optional)
 * @returns RpcTransport instance
 *
 * @example
 * ```typescript
 * import { Socket } from 'phoenix';
 * import { createPhoenixTransport, pureDataConfig } from '@keenmate/svelte-pure-admin';
 *
 * const socket = new Socket('/socket');
 * socket.connect();
 * const channel = socket.channel('rpc:batch');
 *
 * const transport = createPhoenixTransport(channel, {
 *   ...pureDataConfig,
 *   // Override if needed
 * });
 * ```
 */
export function createPhoenixTransport(
	channel: PhoenixChannel,
	config: RpcTransportConfig,
	options: PhoenixTransportOptions = {}
): RpcTransport {
	const { eventName = 'batch_invoke', timeout = 30000, getRequestMetadata } = options;

	return {
		async sendBatch(request: BatchRequest): Promise<BatchResponse> {
			// Build request with metadata
			const requestWithMeta: BatchRequest = getRequestMetadata
				? { ...request, meta: await getRequestMetadata() }
				: request;

			return new Promise((resolve, reject) => {
				const timeoutId = setTimeout(() => {
					reject(new Error(`Phoenix batch request timed out after ${timeout}ms`));
				}, timeout);

				channel
					.push(eventName, requestWithMeta)
					.receive('ok', (raw: unknown) => {
						clearTimeout(timeoutId);
						try {
							resolve(config.parseResponse(raw));
						} catch (error) {
							reject(error);
						}
					})
					.receive('error', (error: unknown) => {
						clearTimeout(timeoutId);
						reject(new Error(typeof error === 'string' ? error : JSON.stringify(error)));
					})
					.receive('timeout', () => {
						clearTimeout(timeoutId);
						reject(new Error('Phoenix channel push timed out'));
					});
			});
		},
		config
	};
}
