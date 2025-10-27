<script lang="ts">
	/**
	 * Pure Admin Loader Ring Component (Svelte 5)
	 * Based on @pure-admin/core snippets/loaders.html
	 *
	 * Ring/circle loader - pure CSS animation
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
		const base = ['pa-loader-ring'];
		if (size) base.push(`pa-loader-ring--${size}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}></div>
