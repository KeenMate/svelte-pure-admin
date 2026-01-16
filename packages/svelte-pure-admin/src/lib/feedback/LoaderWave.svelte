<script lang="ts">
	/**
	 * Pure Admin Loader Wave Component (Svelte 5)
	 * Based on @pure-admin/core snippets/loaders.html
	 *
	 * Wave animation loader - pure CSS animation
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
		const base = ['pa-loader-wave'];
		if (size) base.push(`pa-loader-wave--${size}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}></div>
