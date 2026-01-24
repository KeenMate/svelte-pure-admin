/**
 * Batch RPC Module
 *
 * Provides a mechanism to collect multiple RPC calls into a single request,
 * reducing round-trips and enabling backend parallelization.
 *
 * @example
 * ```typescript
 * import {
 *   createBatch,
 *   createSignalRTransport,
 *   commonResponseConfig
 * } from '@keenmate/svelte-pure-admin';
 *
 * // Create transport with ASP.NET SignalR
 * const transport = createSignalRTransport(hubConnection, {
 *   ...commonResponseConfig
 * });
 *
 * // Create a batch
 * const batch = createBatch(transport);
 *
 * // Add calls
 * const countries = batch.add<Country[]>('common.getCountries');
 * const users = batch.add<User[]>('users.getActive', { limit: 100 });
 *
 * // Execute as single request
 * await batch.execute();
 *
 * // Access results
 * console.log(await countries);
 * console.log(await users);
 * ```
 *
 * @packageDocumentation
 */

// Core types
export type {
	BatchCall,
	BatchRequest,
	BatchResult,
	BatchResponse,
	RpcError
} from './types';

// Batch service
export { createBatch } from './batch';
export type { Batch } from './batch';

// Transport types and presets
export type {
	RpcTransport,
	RpcTransportConfig
} from './transport/types';
export {
	commonResponseConfig,
	pureDataConfig
} from './transport/types';

// Transport factories
export { createSignalRTransport } from './transport/signalr';
export type { SignalRConnection, SignalRTransportOptions } from './transport/signalr';

export { createPhoenixTransport } from './transport/phoenix';
export type { PhoenixChannel, PhoenixPush, PhoenixTransportOptions } from './transport/phoenix';

export { createHttpTransport } from './transport/http';
export type { HttpTransportOptions } from './transport/http';
