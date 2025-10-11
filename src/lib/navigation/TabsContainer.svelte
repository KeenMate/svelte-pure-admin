<script lang="ts">
	/**
	 * Pure Admin TabsContainer Component (Svelte 5)
	 * Based on @pure-admin/core snippets/tabs.html
	 * Wrapper for horizontal tabs + content with optional border
	 */

	interface Props {
		/** Card-like border around entire tabs system */
		bordered?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Container content (Tabs + TabsContent) */
		children?: import('svelte').Snippet;
	}

	let { bordered = false, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-tabs__container'];
		if (bordered) base.push('pa-tabs__container--bordered');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
