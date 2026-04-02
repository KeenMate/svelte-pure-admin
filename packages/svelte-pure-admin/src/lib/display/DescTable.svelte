<script lang="ts">
	/**
	 * Pure Admin Descriptions Table Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-display.scss
	 *
	 * Ant Design style flat grid with label/value cells.
	 * Label cells get a tinted background for visual grouping.
	 */

	interface Props {
		/** Number of label-value columns (default 3, use 2 for wider values) */
		cols?: 2 | 3;
		/** Fixed-width label columns (default 14rem, override with labelWidth) */
		isFixed?: boolean;
		/** Custom label column width (CSS value, e.g. '20rem') — requires isFixed */
		labelWidth?: string;
		/** Vertically center labels and values */
		isMiddle?: boolean;
		/** Right-align labels */
		isLabelEnd?: boolean;
		/** Center-align labels */
		isLabelCenter?: boolean;
		/** Right-align values */
		isValueEnd?: boolean;
		/** Center-align values */
		isValueCenter?: boolean;
		/** Single-line ellipsis on labels and values */
		isTruncate?: boolean;
		/** Wrap in pa-desc-container for CSS container query responsive behavior */
		hasContainerQuery?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** DescTableItem children */
		children?: import('svelte').Snippet;
	}

	let {
		cols,
		isFixed = false,
		labelWidth,
		isMiddle = false,
		isLabelEnd = false,
		isLabelCenter = false,
		isValueEnd = false,
		isValueCenter = false,
		isTruncate = false,
		hasContainerQuery = false,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-desc-table'];
		if (cols === 2) base.push('pa-desc-table--cols-2');
		if (isFixed) base.push('pa-desc-table--fixed');
		if (isMiddle) base.push('pa-desc-table--middle');
		if (isLabelEnd) base.push('pa-desc-table--label-end');
		if (isLabelCenter) base.push('pa-desc-table--label-center');
		if (isValueEnd) base.push('pa-desc-table--value-end');
		if (isValueCenter) base.push('pa-desc-table--value-center');
		if (isTruncate) base.push('pa-desc-table--truncate');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build inline style for custom label width
	const style = $derived(labelWidth ? `--label-width: ${labelWidth}` : undefined);
</script>

{#if hasContainerQuery}
<div class="pa-desc-container">
	<div class={classes()} {style}>
		{@render children?.()}
	</div>
</div>
{:else}
<div class={classes()} {style}>
	{@render children?.()}
</div>
{/if}
