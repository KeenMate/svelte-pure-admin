<script lang="ts">
	/**
	 * Pure Admin TabPanel Component (Svelte 5)
	 * Based on @pure-admin/core snippets/tabs.html
	 * Individual content panel for tabs
	 */

	interface Props {
		/** Active state */
		active?: boolean;
		/** Panel ID (for accessibility and JS switching) */
		id?: string;
		/** Additional CSS classes */
		class?: string;
		/** Panel content */
		children?: import('svelte').Snippet;
	}

	let { active = false, id, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-tabs__panel'];
		if (active) base.push('pa-tabs__panel--active');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()} {id}>
	{@render children?.()}
</div>
