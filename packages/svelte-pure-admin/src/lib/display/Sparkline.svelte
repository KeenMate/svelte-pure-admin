<script lang="ts">
	/**
	 * Pure Admin Sparkline Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */
	import type { DataVizVariant } from '../types';

	interface Props {
		/** Size variant */
		size?: 'sm' | 'lg';
		/** Color variant */
		variant?: DataVizVariant;
		/** Additional CSS classes */
		class?: string;
		/** SparklineBar children */
		children?: import('svelte').Snippet;
	}

	let {
		size,
		variant,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-sparkline'];
		if (size) base.push(`pa-sparkline--${size}`);
		if (variant) base.push(`pa-sparkline--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
