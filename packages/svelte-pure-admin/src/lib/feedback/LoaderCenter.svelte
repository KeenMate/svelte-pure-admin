<script lang="ts">
	/**
	 * Pure Admin Loader Center Component (Svelte 5)
	 * Based on @pure-admin/core snippets/loaders.html
	 *
	 * Utility wrapper that centers loader content
	 */

	interface Props {
		/** Inline style */
		style?: string;
		/** Additional CSS classes */
		class?: string;
		/** Children content (loader + optional text) */
		children?: import('svelte').Snippet;
	}

	let {
		style,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-loader-center'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()} {style}>
	{@render children?.()}
</div>
