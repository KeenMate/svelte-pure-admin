<script lang="ts">
	/**
	 * Pure Admin ActivityFeed Component (Svelte 5)
	 * Container for activity feed items
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content (ActivityFeedItem components) */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-activity-feed'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
