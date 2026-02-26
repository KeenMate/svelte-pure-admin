<script lang="ts">
	/**
	 * Pure Admin HeatmapLegend Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 * Self-contained legend with 5 fixed cells (levels 0-4)
	 */

	interface Props {
		/** Text before legend cells */
		lessText?: string;
		/** Text after legend cells */
		moreText?: string;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		lessText = 'Less',
		moreText = 'More',
		class: className = ''
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-heatmap__legend'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	<span>{lessText}</span>
	<span class="pa-heatmap__legend-cell" data-level="0"></span>
	<span class="pa-heatmap__legend-cell" data-level="1"></span>
	<span class="pa-heatmap__legend-cell" data-level="2"></span>
	<span class="pa-heatmap__legend-cell" data-level="3"></span>
	<span class="pa-heatmap__legend-cell" data-level="4"></span>
	<span>{moreText}</span>
</div>
