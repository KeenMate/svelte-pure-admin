<script lang="ts">
	/**
	 * Breaker — declarative per-mode visibility inside a {@link ContainerBreakpoint}.
	 *
	 * Pass the `mode` from ContainerBreakpoint's `children({ mode })` snippet plus the
	 * modes this block should appear in; it stays MOUNTED and is hidden with `.d-none`
	 * when out of mode — so children keep their state (form field values, scroll
	 * position) across resizes. That's the difference from `{#if mode === …}`, which
	 * unmounts and rebuilds.
	 *
	 * Rule of thumb:
	 *   - cheap content you just want to show/hide (and keep its state) → `<Breaker>`
	 *   - an EXPENSIVE branch you don't want built off-screen (a chart, a heavy
	 *     widget) → `{#if mode === …}` so Svelte never constructs it
	 *
	 *   <ContainerBreakpoint steps={{ compact: 0, comfy: 34, wide: 64 }}>
	 *     {#snippet children({ mode })}
	 *       <Field label="Name" />                                    <!-- always -->
	 *       <Breaker {mode} show="comfy wide"><Field label="Phone" /></Breaker>
	 *       <Breaker {mode} show="wide"><Field label="Notes" /></Breaker>
	 *     {/snippet}
	 *   </ContainerBreakpoint>
	 *
	 * Because the initial mode is server-rendered by ContainerBreakpoint, the correct
	 * blocks are hidden/shown on first paint — no flash and no `data-pc-show` in the
	 * markup.
	 */
	import type { Snippet } from 'svelte';

	interface Props {
		/** Current mode, from ContainerBreakpoint's `children({ mode })` snippet. */
		mode: string;
		/** Space-separated modes this block is shown in, e.g. `"comfy wide"`. */
		show: string;
		/** Wrapper element tag (default `div`). */
		tag?: string;
		/** Extra classes on the wrapper element. */
		class?: string;
		/** Content shown only in the listed modes. */
		children?: Snippet;
	}

	let { mode, show, tag = 'div', class: className = '', children }: Props = $props();

	// Shown when the current mode is one of the whitelisted modes. Hidden via the
	// shared `.d-none` utility (kept in the DOM), NOT unmounted — so state survives.
	const shown = $derived(show.trim().split(/\s+/).includes(mode));
</script>

<svelte:element
	this={tag}
	class={[className, shown ? '' : 'd-none'].filter(Boolean).join(' ') || undefined}
>
	{@render children?.()}
</svelte:element>
