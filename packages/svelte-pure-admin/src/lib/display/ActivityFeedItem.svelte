<script lang="ts">
	/**
	 * Pure Admin ActivityFeedItem Component (Svelte 5)
	 * Individual activity feed item with icon, text, and timestamp
	 */

	interface Props {
		/** Timestamp text */
		time?: string;
		/** Additional CSS classes */
		class?: string;
		/** Icon content snippet */
		icon?: import('svelte').Snippet;
		/** Children content (main text) */
		children?: import('svelte').Snippet;
	}

	let { time, class: className = '', icon, children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-activity-feed__item'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if icon}
		<div class="pa-activity-feed__icon">
			{@render icon()}
		</div>
	{/if}
	<div class="pa-activity-feed__content">
		{#if children}
			<div class="pa-activity-feed__text">
				{@render children()}
			</div>
		{/if}
		{#if time}
			<div class="pa-activity-feed__time">{time}</div>
		{/if}
	</div>
</div>
