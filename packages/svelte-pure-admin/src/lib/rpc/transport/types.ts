/**
 * RPC Transport Types
 *
 * Interfaces for transport adapters and configuration.
 * The transport layer is responsible for sending batch requests
 * and receiving batch responses over the wire.
 */

import type { BatchRequest, BatchResponse, BatchResult, RpcError } from '../types';

/**
 * Configuration for parsing transport responses.
 *
 * Different backends return different response structures:
 * - ASP.NET with CommonResponse: { isOk: true, data: { batch: [...] } }
 * - Phoenix: { batch: [...] }
 * - REST API: { results: [...], errors: [...] }
 *
 * This configuration allows adapting to any backend format.
 */
export interface RpcTransportConfig {
	/**
	 * Parse the raw transport response into BatchResponse format.
	 *
	 * @param raw - Raw response from the transport layer
	 * @returns Normalized BatchResponse
	 * @throws Error if the response indicates a batch-level failure
	 *
	 * @example
	 * // ASP.NET with CommonResponse wrapper
	 * parseResponse: (raw) => {
	 *   const resp = raw as { isOk: boolean; data: BatchResponse };
	 *   if (!resp.isOk) throw new Error('Batch request failed');
	 *   return resp.data;
	 * }
	 *
	 * @example
	 * // Phoenix direct response
	 * parseResponse: (raw) => raw as BatchResponse
	 */
	parseResponse: (raw: unknown) => BatchResponse;

	/**
	 * Parse individual call result from the batch response.
	 * Some backends wrap results in metadata, others return raw data.
	 *
	 * @param raw - Raw result value from BatchResult.result
	 * @returns Unwrapped/parsed result data
	 *
	 * @example
	 * // ASP.NET CommonResponse wrapper per call
	 * parseCallResult: (raw) => {
	 *   const resp = raw as { isOk: boolean; data: unknown };
	 *   return resp.data;
	 * }
	 *
	 * @example
	 * // Direct passthrough
	 * parseCallResult: (raw) => raw
	 */
	parseCallResult?: (raw: unknown) => unknown;

	/**
	 * Determine if an individual call result is an error.
	 *
	 * @param result - The BatchResult to check
	 * @returns true if the result represents an error
	 *
	 * @default Checks for presence of 'error' field
	 *
	 * @example
	 * // Check CommonResponse isOk field
	 * isError: (result) => {
	 *   const wrapped = result.result as { isOk?: boolean };
	 *   return !!result.error || wrapped?.isOk === false;
	 * }
	 */
	isError?: (result: BatchResult) => boolean;

	/**
	 * Extract error details from a failed result.
	 *
	 * @param result - The failed BatchResult
	 * @returns Parsed RpcError
	 *
	 * @default Returns result.error directly
	 *
	 * @example
	 * parseError: (result) => {
	 *   const wrapped = result.result as { error?: string };
	 *   return {
	 *     code: 'ERROR',
	 *     message: wrapped?.error || result.error?.message || 'Unknown error'
	 *   };
	 * }
	 */
	parseError?: (result: BatchResult) => RpcError;
}

/**
 * Transport adapter interface for sending batch RPC requests.
 *
 * Implementations handle the actual communication with the backend
 * (SignalR, Phoenix Channels, HTTP, etc.).
 */
export interface RpcTransport {
	/**
	 * Send a batch request and receive a batch response.
	 *
	 * @param request - The batch request to send
	 * @returns Promise resolving to the parsed batch response
	 */
	sendBatch(request: BatchRequest): Promise<BatchResponse>;

	/**
	 * Transport configuration for parsing responses.
	 * Used by the batch service to process individual call results.
	 */
	config: RpcTransportConfig;
}

/**
 * Preset configuration for ASP.NET CommonResponse wrapper pattern.
 *
 * Backend returns:
 * - Batch level: { isOk: true, data: { batch: [...] } }
 * - Per call: { isOk: true, data: actualData }
 */
export const commonResponseConfig: RpcTransportConfig = {
	parseResponse: (raw: unknown): BatchResponse => {
		const resp = raw as { isOk: boolean; data: BatchResponse; error?: string };
		if (!resp.isOk) {
			throw new Error(resp.error || 'Batch request failed');
		}
		return resp.data;
	},
	parseCallResult: (raw: unknown): unknown => {
		const resp = raw as { isOk: boolean; data: unknown };
		return resp.data;
	},
	isError: (result: BatchResult): boolean => {
		if (result.error) return true;
		const wrapped = result.result as { isOk?: boolean } | undefined;
		return wrapped?.isOk === false;
	},
	parseError: (result: BatchResult): RpcError => {
		if (result.error) return result.error;
		const wrapped = result.result as { error?: string; errorCode?: string } | undefined;
		return {
			code: wrapped?.errorCode || 'ERROR',
			message: wrapped?.error || 'Call failed'
		};
	}
};

/**
 * Preset configuration for pure data responses (Phoenix, clean REST APIs).
 *
 * Backend returns data directly without wrappers:
 * - Batch level: { batch: [...] }
 * - Per call: actualData directly in result field
 */
export const pureDataConfig: RpcTransportConfig = {
	parseResponse: (raw: unknown): BatchResponse => raw as BatchResponse,
	parseCallResult: (raw: unknown): unknown => raw
};
