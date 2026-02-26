<script lang="ts">
	/**
	 * Pure Admin StackedBarLegend Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** StackedBarLegendItem children */
		children?: import('svelte').Snippet;
	}

	let {
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-stacked-bar__legend'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
