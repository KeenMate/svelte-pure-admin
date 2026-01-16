<script lang="ts">
	/**
	 * Pure Admin NavItem Component (Svelte 5)
	 * Navigation item for navbar with optional dropdown support
	 */

	interface Props {
		/** Link href */
		href?: string;
		/** Has dropdown submenu */
		hasDropdown?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content (link text or submenu) */
		children?: import('svelte').Snippet;
		/** Dropdown submenu content */
		dropdown?: import('svelte').Snippet;
	}

	let { href, hasDropdown = false, class: className = '', children, dropdown }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = [];
		if (hasDropdown) {
			base.push('pa-header__nav-item', 'pa-header__nav-item--has-dropdown');
		}
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

{#if hasDropdown}
	<li class={classes()}>
		<a href={href || '#'} class="pa-header__nav-link">
			{@render children?.()}
		</a>
		{#if dropdown}
			{@render dropdown()}
		{/if}
	</li>
{:else}
	<li class={classes()}>
		<a href={href || '#'}>
			{@render children?.()}
		</a>
	</li>
{/if}
