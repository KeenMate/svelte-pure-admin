<script lang="ts">
	/**
	 * Pure Admin Loader Overlay Component (Svelte 5)
	 * Based on @pure-admin/core snippets/loaders.html
	 *
	 * Full-screen overlay loader
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content (loader + optional text) */
		children?: import('svelte').Snippet;
	}

	let {
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-loader-overlay'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
