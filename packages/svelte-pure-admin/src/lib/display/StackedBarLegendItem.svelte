<script lang="ts">
	/**
	 * Pure Admin StackedBarLegendItem Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */

	type SwatchVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';

	interface Props {
		/** Swatch color variant */
		variant?: SwatchVariant;
		/** Additional CSS classes */
		class?: string;
		/** Label content */
		children?: import('svelte').Snippet;
	}

	let {
		variant = 'primary',
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-stacked-bar__legend-item'];
		if (className) base.push(className);
		return base.join(' ');
	});

	const swatchClasses = $derived(() => {
		const base = ['pa-stacked-bar__legend-swatch'];
		if (variant) base.push(`pa-stacked-bar__legend-swatch--${variant}`);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	<span class={swatchClasses()}></span>
	{@render children?.()}
</div>
