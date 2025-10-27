<script lang="ts">
	/**
	 * Pure Admin Loader Pulse Component (Svelte 5)
	 * Based on @pure-admin/core snippets/loaders.html
	 *
	 * Pulsing loader - pure CSS animation
	 */

	type LoaderSize = 'lg';

	interface Props {
		/** Loader size */
		size?: LoaderSize;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		size,
		class: className = ''
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-loader-pulse'];
		if (size) base.push(`pa-loader-pulse--${size}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}></div>
