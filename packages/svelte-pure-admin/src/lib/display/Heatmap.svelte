<script lang="ts">
	/**
	 * Pure Admin Heatmap Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */

	type HeatmapVariant = 'success' | 'danger';

	interface Props {
		/** Color variant (only success and danger are supported) */
		variant?: HeatmapVariant;
		/** Compact mode (smaller cells, tighter gap) */
		isCompact?: boolean;
		/** Number of columns (default 53 for weekly calendar) */
		cols?: number;
		/** Additional CSS classes */
		class?: string;
		/** HeatmapCell children */
		children?: import('svelte').Snippet;
	}

	let {
		variant,
		isCompact = false,
		cols = 53,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-heatmap'];
		if (variant) base.push(`pa-heatmap--${variant}`);
		if (isCompact) base.push('pa-heatmap--compact');
		if (className) base.push(className);
		return base.join(' ');
	});

	const style = $derived(() => {
		if (cols !== 53) {
			return `grid-template-columns: repeat(${cols}, 1.2rem)`;
		}
		return '';
	});
</script>

<div class={classes()} style={style()}>
	{@render children?.()}
</div>
