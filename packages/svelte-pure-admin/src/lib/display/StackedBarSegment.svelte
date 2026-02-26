<script lang="ts">
	/**
	 * Pure Admin StackedBarSegment Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */

	type SegmentVariant = 'success' | 'warning' | 'danger' | 'info' | 'secondary';

	interface Props {
		/** Segment width as percentage (0-100) */
		value?: number;
		/** Color variant */
		variant?: SegmentVariant;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		value = 0,
		variant,
		class: className = ''
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-stacked-bar__segment'];
		if (variant) base.push(`pa-stacked-bar__segment--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()} style="--value: {value}%"></div>
