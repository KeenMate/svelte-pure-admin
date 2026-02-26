<script lang="ts">
	/**
	 * Pure Admin BarList Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-viz.scss
	 */
	import type { DataVizVariant } from '../types';

	interface Props {
		/** Color variant */
		variant?: DataVizVariant;
		/** Compact mode (tighter spacing, smaller fonts) */
		isCompact?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** BarListItem children */
		children?: import('svelte').Snippet;
	}

	let {
		variant,
		isCompact = false,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-bar-list'];
		if (variant) base.push(`pa-bar-list--${variant}`);
		if (isCompact) base.push('pa-bar-list--compact');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
