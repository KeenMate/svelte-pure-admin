<script lang="ts">
	/**
	 * Pure Admin Sidebar Section Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html (core v2.9.0-rc09)
	 *
	 * A flat, non-interactive group heading (e.g. PROJECT, GUIDES) rendered as an
	 * `<li class="pa-sidebar__section">` sibling to the `<SidebarItem>`s in the
	 * same list. Use it when the groups are always visible (docs-style nav); for
	 * collapsible groups use `<SidebarItem hasSubmenu>` instead.
	 */

	interface Props {
		/** Section heading text */
		labelText?: string;
		/** Additional CSS classes */
		class?: string;
		/** Children content (overrides labelText when provided) */
		children?: import('svelte').Snippet;
	}

	let { labelText, class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sidebar__section'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<li class={classes()}>
	{#if children}
		{@render children()}
	{:else}
		{labelText}
	{/if}
</li>
