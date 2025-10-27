<script lang="ts">
	/**
	 * Pure Admin Loader Dots Component (Svelte 5)
	 * Based on @pure-admin/core snippets/loaders.html
	 *
	 * Animated dots loader - pure CSS animation
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
		const base = ['pa-loader-dots'];
		if (size) base.push(`pa-loader-dots--${size}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}></div>
