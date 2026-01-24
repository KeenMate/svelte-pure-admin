/**
 * Batch RPC Types
 *
 * Core types for the batch RPC protocol used to send multiple
 * RPC calls in a single request.
 */

/**
 * A single RPC call within a batch request.
 */
export interface BatchCall {
	/** Unique ID to match request with response */
	id: string;
	/** RPC method name (e.g., "common.getCountries") */
	method: string;
	/** Method parameters (optional) */
	params?: unknown;
}

/**
 * Batch request containing multiple RPC calls.
 */
export interface BatchRequest {
	/** Array of RPC calls to execute */
	batch: BatchCall[];
	/** Optional metadata sent with every request (e.g., sessionId, tenantId) */
	meta?: Record<string, unknown>;
}

/**
 * Error information for a failed RPC call.
 */
export interface RpcError {
	/** Error code */
	code: string;
	/** Human-readable error message */
	message: string;
	/** Additional error details (optional) */
	details?: unknown;
}

/**
 * Result of a single RPC call within a batch response.
 */
export interface BatchResult {
	/** ID matching the original request call */
	id: string;
	/** Success result (present if call succeeded) */
	result?: unknown;
	/** Error information (present if call failed) */
	error?: RpcError;
}

/**
 * Batch response containing results for all RPC calls.
 */
export interface BatchResponse {
	/** Array of results corresponding to the batch calls */
	batch: BatchResult[];
}
