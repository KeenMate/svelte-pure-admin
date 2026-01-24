<script lang="ts">
	/**
	 * Pure Admin MetricList Component (Svelte 5)
	 * Container for label/value metric items
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content (MetricListItem components) */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-metric-list'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
