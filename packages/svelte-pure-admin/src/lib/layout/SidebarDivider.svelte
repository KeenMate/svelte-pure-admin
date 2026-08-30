<script lang="ts">
	/**
	 * Pure Admin Sidebar Divider Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html (core v2.9.0-rc09)
	 *
	 * A thin horizontal rule between sidebar groups, rendered as an
	 * `<li class="pc-sidebar__divider">` sibling to the `<SidebarItem>`s. Draws a
	 * `--pc-border-color` line and carries no text.
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const classes = $derived(() => {
		const base = ['pc-sidebar__divider'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<li class={classes()} aria-hidden="true"></li>
