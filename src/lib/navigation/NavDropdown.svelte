<script lang="ts">
	/**
	 * Pure Admin NavDropdown Component (Svelte 5)
	 * Dropdown menu for navbar navigation items
	 */

	interface Props {
		/** Second level dropdown */
		level2?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content (NavItem components) */
		children?: import('svelte').Snippet;
	}

	let { level2 = false, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-header__dropdown'];
		if (level2) base.push('pa-header__dropdown--level2');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<ul class={classes()}>
	{@render children?.()}
</ul>
