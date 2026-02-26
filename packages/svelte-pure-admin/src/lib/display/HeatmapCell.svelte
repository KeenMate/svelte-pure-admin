<script lang="ts">
	/**
	 * Pure Admin HeatmapCell Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */

	interface Props {
		/** Intensity level (0-4, mapped to data-level attribute) */
		level?: 0 | 1 | 2 | 3 | 4;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		level = 0,
		class: className = ''
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-heatmap__cell'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()} data-level={level}></div>
