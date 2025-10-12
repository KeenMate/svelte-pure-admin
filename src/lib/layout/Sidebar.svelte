<script lang="ts">
	/**
	 * Pure Admin Sidebar Component (Svelte 5)
	 * Based on @pure-admin/core snippets/layout.html
	 */

	type SidebarMode = 'sticky' | 'icon-collapse';

	interface Props {
		/** Sidebar mode modifier */
		mode?: SidebarMode;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { mode, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-layout__sidebar'];
		if (mode) base.push(`pa-layout__sidebar--${mode}`);
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
