<script lang="ts">
	/**
	 * ContainerBreakpoint — reactive Svelte wrapper over core's Container Breakpoint
	 * engine (@keenmate/pure-admin-core v2.9.0-rc17, `container-breakpoint.js`).
	 *
	 * A CSS `@container` rule can only show/hide; it can never skip work. This maps
	 * the wrapper's own inline size to a NAMED `mode` from author-declared width
	 * thresholds and hands it to you as a reactive value — so you `{#if}` on it and
	 * Svelte MOUNTS only the branch for the current mode. The branches for other
	 * modes are never built (no off-screen Chart.js, no eager fetch, no shadow-DOM
	 * widget created just to be hidden).
	 *
	 * Complements {@link FitSlot}: `FitSlot` wraps the 1-D row-fold engine, which is
	 * content-measured — it renders every variant to size it, so it can't avoid
	 * mounting the losers. This is threshold-declared, so the losers never need to
	 * exist. Use `FitSlot` for cheap header folding; use this for expensive swaps.
	 *
	 *   <ContainerBreakpoint steps={{ compact: 0, comfy: 34, wide: 64 }} onchange={fn}>
	 *     {#snippet children({ mode })}
	 *       {#if mode === 'wide'}
	 *         <RevenueChart {data} />          <!-- built only in `wide` -->
	 *       {:else}
	 *         <RevenueKpi {data} />
	 *       {/if}
	 *     {/snippet}
	 *   </ContainerBreakpoint>
	 *
	 * Children can also carry `data-pc-show="wide comfy"` — the engine toggles the
	 * shared `.d-none` on the ones out of mode (a class you can watch in devtools).
	 * Use that for cheap pieces you don't want to gate with `{#if}`; use `{#if}` for
	 * the ones whose construction cost you want to avoid. For a declarative version
	 * of the show/hide case that keeps children mounted (so form state survives),
	 * wrap them in {@link Breaker}: `<Breaker {mode} show="comfy wide">…</Breaker>`.
	 *
	 * Thresholds are `rem` by default (resolved against the live `:root` font-size,
	 * `10px` in pure-admin → `34` = 340px); pass `unit="px"` for raw pixels. The
	 * engine measures THIS element's content-box (like `@container inline-size`), so
	 * a narrow card in a wide window still degrades.
	 */
	import { onMount } from 'svelte';
	import { loadCoreJs } from '../internal/core-js';

	interface Props {
		/** Mode name → MINIMUM inline size that activates it (rem by default). The
		 *  engine picks the largest mode whose threshold the width has passed. */
		steps: Record<string, number>;
		/** Threshold unit — 'rem' (default, resolved vs `:root` font-size) or 'px'. */
		unit?: 'rem' | 'px';
		/** Dead-band (in `unit`) applied at every threshold so a width parked on a
		 *  boundary doesn't flip modes each frame. Defaults to
		 *  `pureAdmin.config.containerBreakpoint.hysteresis` (1). */
		hysteresis?: number;
		/** Mode rendered before the first measure (SSR / first paint). Defaults to
		 *  the first key of `steps`. */
		initial?: string;
		/** Utility class toggled on `[data-pc-show]` children out of mode. Defaults
		 *  to the engine's `.d-none`. */
		hiddenClass?: string;
		/** Wrapper element tag (default `div`). */
		tag?: string;
		/** Extra classes on the wrapper element. */
		class?: string;
		/** Fired on every settled mode change: `(mode, previousMode)`. Use for side
		 *  effects like lazy-`import()`ing a heavy module on first entry to a mode. */
		onchange?: (mode: string, prev: string | null) => void;
		/** Content — receives the current `{ mode }` so you can `{#if}` on it. */
		children?: import('svelte').Snippet<[{ mode: string }]>;
	}

	let {
		steps,
		unit = 'rem',
		hysteresis,
		initial,
		hiddenClass,
		tag = 'div',
		class: className = '',
		onchange,
		children
	}: Props = $props();

	let el = $state<HTMLElement>();
	// Reactive mode. Seeded with `initial` (or the first declared step) so the
	// correct branch renders on the server and on first paint, before the
	// ResizeObserver settles the real mode in `onMount`.
	let mode = $state<string>(initial ?? Object.keys(steps)[0] ?? '');

	// Captured once — a breakpoint observer is configured at mount, not reconfigured
	// reactively. Svelte owns `data-mode` (bound on the element below), so
	// `attribute: false` avoids a second writer; the engine still toggles `.d-none`
	// on `data-pc-show` children and calls us back on every flip.
	const observeOpts = { steps, unit, hysteresis, initial, hiddenClass, attribute: false as const };

	onMount(() => {
		let disposed = false;
		let handle: { destroy: () => void } | null = null;

		loadCoreJs('container-breakpoint').then(() => {
			if (disposed || !el) return;
			const cb = window.pureAdmin?.components?.containerBreakpoint;
			if (!cb) return;
			handle = cb.observe(el, observeOpts, (m: string, prev: string | null) => {
				mode = m;
				onchange?.(m, prev);
			});
		});

		return () => {
			disposed = true;
			handle?.destroy();
			handle = null;
		};
	});
</script>

<svelte:element this={tag} bind:this={el} class={className || undefined} data-mode={mode}>
	{@render children?.({ mode })}
</svelte:element>
