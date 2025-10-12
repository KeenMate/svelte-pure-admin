<script lang="ts">
	/**
	 * Pure Admin Layout Content Wrapper Component (Svelte 5)
	 * Based on @pure-admin/core snippets/layout.html
	 *
	 * Wrapper for main content area (excludes sidebar)
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-layout__content'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
