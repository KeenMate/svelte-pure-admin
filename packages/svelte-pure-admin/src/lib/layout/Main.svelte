<script lang="ts">
	/**
	 * Pure Admin Content/Main Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html
	 *
	 * Core blesses `<main class="pa-layout__main">` with content directly inside —
	 * there is no inner wrapper class in the framework.
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		class: className = '',
		children
	}: Props = $props();

	// Build class string for main content
	const classes = $derived(() => {
		const base = ['pa-layout__main'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<main class={classes()}>
	{@render children?.()}
</main>
