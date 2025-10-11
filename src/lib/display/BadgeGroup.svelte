<script lang="ts">
	/**
	 * Pure Admin BadgeGroup Component (Svelte 5)
	 * Based on @pure-admin/core snippets/badges.html
	 */

	interface Props {
		/** Show all badges (no limit) */
		showAll?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { showAll = false, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-badge-group'];
		if (showAll) base.push('pa-badge-group--show-all');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
