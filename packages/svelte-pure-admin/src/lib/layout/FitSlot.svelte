<script lang="ts">
	/**
	 * FitSlot — declare a header slot's Navbar Fit behaviour (core v2.9.0-rc12,
	 * `fit.js`). Compose these inside a `<Navbar>`'s zones (brand, page
	 * title, search, custom actions); the engine — which `Navbar` initialises on
	 * `.pc-navbar__inner` — degrades the participating slots one at a time, LOWEST
	 * `priority` first, until the header row fits, then restores as space returns.
	 *
	 * This is the whole responsive-header mechanism: nothing fit-aware is baked into
	 * `Navbar` itself — a slot only degrades if you wrap it in a `FitSlot`.
	 *
	 * Strategies (`strategy`):
	 * - `hide`    — the slot disappears when it must yield (default).
	 * - `steps`   — the slot holds a ladder of ranked `<FitStep>` variants (widest
	 *               first); it climbs down 0 → 1 → 2 … → hidden. Use for
	 *               wordmark → monogram, or a search pill → just its icon.
	 * - `sidebar` — the slot relocates into the sidebar, restored on widen
	 *               (`sidebarTarget` overrides the default `.pc-sidebar__nav > ul`).
	 *
	 * `FitSlot` renders THE measured element itself (not a wrapper around it), so
	 * pass `class` to make it also carry the styled class — e.g.
	 * `<FitSlot class="pc-app-header__version" priority={10}>`.
	 */
	import { setContext } from 'svelte';
	import { FIT_STEPS_KEY, createFitStepsContext } from './fit-steps-context';

	type FitStrategy = 'hide' | 'steps' | 'sidebar';

	interface Props {
		/** How the slot yields when the row can't fit it (default `'hide'`). */
		strategy?: FitStrategy;
		/** Degrade order — lower degrades first (maps to `data-pc-fit-priority`). */
		priority?: number;
		/** Element tag to render (default `span`; use `div` for block content). */
		tag?: string;
		/** Sidebar `<ul>` selector to relocate into (`sidebar` strategy only). */
		sidebarTarget?: string;
		/** Additional CSS classes (applied to the slot element itself). */
		class?: string;
		/** Slot content — `hide`/`sidebar`: the content; `steps`: the `<FitStep>` ladder. */
		children?: import('svelte').Snippet;
	}

	let {
		strategy = 'hide',
		priority = 0,
		tag = 'span',
		sidebarTarget,
		class: className = '',
		children
	}: Props = $props();

	// Seed the per-slot index counter that `<FitStep>` children read. Set on every
	// FitSlot (not just steps mode) so we don't reference the reactive `strategy` at
	// init; it's inert unless a FitStep consumes it, which only happens in steps mode.
	setContext(FIT_STEPS_KEY, createFitStepsContext());
</script>

<svelte:element
	this={tag}
	class={className || undefined}
	data-pc-fit={strategy}
	data-pc-fit-priority={priority}
	data-pc-fit-sidebar-target={strategy === 'sidebar' ? sidebarTarget : undefined}
>
	{@render children?.()}
</svelte:element>
