<script lang="ts">
	/**
	 * Gate children behind the `themeReady` signal — render them only once
	 * the active theme stylesheet has resolved (or definitively failed).
	 *
	 * Use anywhere the cascade must be settled before sampling computed
	 * styles or otherwise depending on `--pa-*` / `--base-*` values being
	 * populated: canvas charts (Chart.js, ECharts) reading
	 * `getComputedStyle(...).color` at draw time, dynamically-generated
	 * SVGs that look up theme tokens at build time, JS-driven CSSOM edits,
	 * etc.
	 *
	 * Example:
	 *
	 *   <ThemeReady>
	 *     <MyChart />
	 *   </ThemeReady>
	 *
	 *   <ThemeReady>
	 *     {#snippet loader()}
	 *       <div class="my-chart-skeleton" />
	 *     {/snippet}
	 *     <MyChart />
	 *   </ThemeReady>
	 *
	 * The default loader is a centred `Spinner` — fine for most chart-sized
	 * holes but consumers should pass a `loader` snippet sized to match the
	 * chart's footprint to avoid layout shift when the gate releases.
	 *
	 * `themeReady` defaults to `true`, so apps that haven't called
	 * `initThemeReadyTracker()` (no PureAdminProvider, no SettingsPanel,
	 * no theme link) render children immediately — the gate is opt-in.
	 */

	import { themeReady, initThemeReadyTracker } from './theme-ready';
	import Spinner from '../feedback/Spinner.svelte';

	// Self-bootstrap so the gate works even without PureAdminProvider, and
	// so init runs from a child component's setup (which executes before
	// the parent provider's onMount). Idempotent — tracker no-ops if
	// already initialised.
	initThemeReadyTracker();

	interface Props {
		/** Gated content. Rendered when `themeReady` is `true`. */
		children?: import('svelte').Snippet;
		/** Optional placeholder rendered while the theme stylesheet is loading. Default: centred `Spinner`. */
		loader?: import('svelte').Snippet;
	}

	let { children, loader }: Props = $props();
</script>

{#if $themeReady}
	{@render children?.()}
{:else if loader}
	{@render loader()}
{:else}
	<div class="pa-theme-ready__default-loader">
		<Spinner size="xs" />
	</div>
{/if}

<style>
	.pa-theme-ready__default-loader {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		min-height: 2rem;
	}
</style>
