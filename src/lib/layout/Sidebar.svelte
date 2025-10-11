<script lang="ts">
	/**
	 * Pure Admin Sidebar Component (Svelte 5)
	 * Based on @pure-admin/core snippets/layout.html
	 */

	interface Props {
		/** Enable scrolling mode (scrolls with content) */
		scrolling?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { scrolling = false, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-layout__sidebar'];
		if (scrolling) base.push('pa-layout__sidebar--scrolling');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<aside class={classes()}>
	<nav class="pa-sidebar__nav">
		<ul>
			{@render children?.()}
		</ul>
	</nav>
</aside>
