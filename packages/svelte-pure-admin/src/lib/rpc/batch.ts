/**
 * Batch RPC Service
 *
 * Provides a mechanism to collect multiple RPC calls and send them
 * as a single batch request, improving performance by reducing
 * round-trips and allowing backend parallelization.
 */

import type { BatchCall, BatchRequest, RpcError } from './types';
import type { RpcTransport } from './transport/types';

/**
 * Counter for generating unique call IDs.
 */
let callIdCounter = 0;

/**
 * Generates a unique ID for a batch call.
 */
function generateCallId(): string {
	callIdCounter = (callIdCounter + 1) % Number.MAX_SAFE_INTEGER;
	return `call_${Date.now()}_${callIdCounter}`;
}

/**
 * Resolver pair for a pending call.
 */
interface CallResolver<T = unknown> {
	resolve: (value: T) => void;
	reject: (error: RpcError | Error) => void;
}

/**
 * Batch RPC instance for collecting and executing multiple calls.
 */
export interface Batch {
	/**
	 * Add an RPC call to the batch.
	 *
	 * @param method - RPC method name (e.g., "common.getCountries")
	 * @param params - Method parameters (optional)
	 * @returns Promise that resolves when the batch is executed
	 *
	 * @example
	 * ```typescript
	 * const batch = createBatch(transport);
	 * const countriesPromise = batch.add<Country[]>('common.getCountries');
	 * const usersPromise = batch.add<User[]>('users.getActive', { limit: 100 });
	 * await batch.execute();
	 * const countries = await countriesPromise;
	 * ```
	 */
	add<T = unknown>(method: string, params?: unknown): Promise<T>;

	/**
	 * Execute all queued calls as a single batch request.
	 *
	 * After execution, all promises returned by add() will resolve or reject
	 * based on their individual results.
	 *
	 * @throws Error if the batch-level request fails (individual call errors
	 * are handled per-promise)
	 */
	execute(): Promise<void>;

	/**
	 * Get the number of calls currently in the batch.
	 */
	readonly size: number;

	/**
	 * Check if the batch has been executed.
	 */
	readonly executed: boolean;
}

/**
 * Creates a new batch for collecting and executing RPC calls.
 *
 * @param transport - Transport adapter for sending the batch request
 * @returns Batch instance
 *
 * @example
 * ```typescript
 * import { createBatch } from '@keenmate/svelte-pure-admin';
 *
 * // Create a batch with your transport
 * const batch = createBatch(signalrTransport);
 *
 * // Add calls - returns promises that resolve when batch executes
 * const countriesPromise = batch.add('common.getCountries');
 * const currenciesPromise = batch.add('common.getCurrencies');
 * const usersPromise = batch.add('users.getActive', { limit: 100 });
 *
 * // Execute batch - sends single request, all promises resolve/reject independently
 * await batch.execute();
 *
 * // Access results
 * const countries = await countriesPromise;
 * const currencies = await currenciesPromise;
 * const users = await usersPromise;
 * ```
 *
 * @example
 * ```typescript
 * // Real-world usage in a detail form
 * async function loadOrderForm(orderId: number) {
 *   const batch = createBatch(transport);
 *
 *   const calls = {
 *     countries: batch.add<Country[]>('common.getCountries'),
 *     currencies: batch.add<Currency[]>('common.getCurrencies'),
 *     paymentTerms: batch.add<PaymentTerm[]>('common.getPaymentTerms'),
 *     order: batch.add<Order>('orders.getDetail', { id: orderId })
 *   };
 *
 *   await batch.execute(); // 1 round-trip instead of 4!
 *
 *   return {
 *     countries: await calls.countries,
 *     currencies: await calls.currencies,
 *     paymentTerms: await calls.paymentTerms,
 *     order: await calls.order
 *   };
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Error handling - each call resolves/rejects independently
 * const batch = createBatch(transport);
 *
 * const usersPromise = batch.add('users.getAll');
 * const ordersPromise = batch.add('orders.getInvalid'); // Will fail
 *
 * await batch.execute();
 *
 * const users = await usersPromise; // Resolves with data
 *
 * try {
 *   const orders = await ordersPromise;
 * } catch (error) {
 *   // error.code = "NOT_FOUND"
 *   // error.message = "Invalid method"
 * }
 * ```
 */
export function createBatch(transport: RpcTransport): Batch {
	const calls: BatchCall[] = [];
	const resolvers = new Map<string, CallResolver>();
	let isExecuted = false;

	return {
		add<T = unknown>(method: string, params?: unknown): Promise<T> {
			if (isExecuted) {
				throw new Error('Cannot add calls to an already executed batch');
			}

			const id = generateCallId();
			calls.push({ id, method, params });

			return new Promise<T>((resolve, reject) => {
				resolvers.set(id, { resolve: resolve as (value: unknown) => void, reject });
			});
		},

		async execute(): Promise<void> {
			if (isExecuted) {
				throw new Error('Batch has already been executed');
			}

			if (calls.length === 0) {
				isExecuted = true;
				return;
			}

			isExecuted = true;

			const request: BatchRequest = { batch: calls };
			const config = transport.config;

			try {
				const response = await transport.sendBatch(request);

				// Process each result
				for (const result of response.batch) {
					const resolver = resolvers.get(result.id);
					if (!resolver) {
						// Result for unknown call ID - skip
						continue;
					}

					// Determine if this is an error
					const isError = config.isError
						? config.isError(result)
						: result.error !== undefined && result.error !== null;

					if (isError) {
						// Extract error using config or fallback to result.error
						const error = config.parseError ? config.parseError(result) : result.error;

						if (error) {
							resolver.reject(error);
						} else {
							resolver.reject({ code: 'UNKNOWN', message: 'Unknown error' });
						}
					} else {
						// Parse the result using config callback if provided
						const data = config.parseCallResult
							? config.parseCallResult(result.result)
							: result.result;

						resolver.resolve(data);
					}
				}

				// Reject any calls that didn't get a response
				for (const [id, resolver] of resolvers) {
					// Check if this call was resolved
					const hasResult = response.batch.some((r) => r.id === id);
					if (!hasResult) {
						resolver.reject({
							code: 'NO_RESPONSE',
							message: 'No response received for this call'
						});
					}
				}
			} catch (error) {
				// Batch-level error - reject all pending calls
				const batchError: RpcError = {
					code: 'BATCH_ERROR',
					message: error instanceof Error ? error.message : 'Batch request failed'
				};

				for (const resolver of resolvers.values()) {
					resolver.reject(batchError);
				}

				throw error;
			}
		},

		get size(): number {
			return calls.length;
		},

		get executed(): boolean {
			return isExecuted;
		}
	};
}
