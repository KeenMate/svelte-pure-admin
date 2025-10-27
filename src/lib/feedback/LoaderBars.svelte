<script lang="ts">
	/**
	 * Pure Admin Loader Bars Component (Svelte 5)
	 * Based on @pure-admin/core snippets/loaders.html
	 *
	 * Animated bars loader - pure CSS animation
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
		const base = ['pa-loader-bars'];
		if (size) base.push(`pa-loader-bars--${size}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}></div>
