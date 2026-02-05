<script lang="ts">
	/**
	 * Pure Admin TabsContainer Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tabs.html
	 * Wrapper for horizontal tabs + content with optional border
	 */

	interface Props {
		/** Card-like border around entire tabs system */
		isBordered?: boolean;
		/** Make tabs look like a card with tabs replacing the header */
		isCard?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Container content (Tabs + TabsContent) */
		children?: import('svelte').Snippet;
	}

	let { isBordered = false, isCard = false, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-tabs__container'];
		if (isBordered) base.push('pa-tabs__container--bordered');
		if (isCard) base.push('pa-tabs__container--card');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
