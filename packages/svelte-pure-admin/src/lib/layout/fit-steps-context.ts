/**
 * Shared Svelte-context contract between `FitSlot` (steps mode) and its `FitStep`
 * children. `FitSlot` seeds one counter per steps slot; each `FitStep`, at init,
 * pulls the next 0-based index in DOM order (0 = largest/default) so authors never
 * hand-number `data-pc-fit-step`.
 */

/** Context key (module-scoped Symbol — one shared instance across both components). */
export const FIT_STEPS_KEY = Symbol('pa-fit-steps');

export interface FitStepsContext {
	/** Returns the next 0-based step index in DOM order. */
	next: () => number;
}

/** Build the per-slot counter `FitSlot` puts on the context. */
export function createFitStepsContext(): FitStepsContext {
	let counter = 0;
	return { next: () => counter++ };
}
