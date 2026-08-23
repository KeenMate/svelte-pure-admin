<script lang="ts">
	/**
	 * Pure Admin Loader Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/loaders.html
	 *
	 * Advanced loader animations: dots, bars, pulse, ring, wave
	 * For spinner-style loaders, use the Spinner component instead.
	 */

	export type LoaderType = 'dots' | 'bars' | 'pulse' | 'ring' | 'wave';
	export type LoaderSize = 'default' | 'lg';
	// No `text-secondary` utility exists in core (only text-primary/success/danger/
	// warning/info); loaders theme via currentColor, so a phantom class would just
	// no-op. Drop 'secondary' from the union.
	export type LoaderColor = 'primary' | 'success' | 'danger' | 'warning' | 'info';

	interface Props {
		/** Loader type */
		type?: LoaderType;
		/** Loader size */
		size?: LoaderSize;
		/** Loader color (uses text-* utility classes) */
		color?: LoaderColor;
		/** Additional CSS classes */
		class?: string;
	}

	let { type = 'dots', size, color, class: className = '' }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = [`pa-loader-${type}`];
		if (size === 'lg') base.push(`pa-loader-${type}--lg`);
		if (color) base.push(`text-${color}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

{#if type === 'dots'}
	<div class={classes()}>
		<span></span>
		<span></span>
		<span></span>
	</div>
{:else if type === 'bars' || type === 'wave'}
	<div class={classes()}>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
{:else}
	<!-- pulse and ring are CSS-only, no children needed -->
	<div class={classes()}></div>
{/if}
