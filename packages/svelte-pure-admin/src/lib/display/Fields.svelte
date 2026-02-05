<script lang="ts">
	/**
	 * Pure Admin Fields Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core data-display.scss
	 *
	 * Container for multiple Field components with layout modifiers.
	 */

	interface Props {
		/** Number of grid columns (2, 3, or 4) */
		cols?: 2 | 3 | 4;
		/** Label left, value right (side-by-side) */
		isHorizontal?: boolean;
		/** Consistent label widths like a key-value table */
		isTable?: boolean;
		/** Bottom border separator between fields */
		isBordered?: boolean;
		/** Alternating background rows */
		isStriped?: boolean;
		/** Tighter spacing */
		isCompact?: boolean;
		/** Larger gaps between fields */
		isRelaxed?: boolean;
		/** Fields flow on one line */
		isInline?: boolean;
		/** Equal-width auto columns */
		isRow?: boolean;
		/** Subtle background panel */
		isFilled?: boolean;
		/** Theme color for left border (1-9) */
		color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
		/** Show left border (set false to remove) */
		hasBorder?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Field components */
		children?: import('svelte').Snippet;
	}

	let {
		cols,
		isHorizontal = false,
		isTable = false,
		isBordered = false,
		isStriped = false,
		isCompact = false,
		isRelaxed = false,
		isInline = false,
		isRow = false,
		isFilled = false,
		color,
		hasBorder = true,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-fields'];

		// Grid columns
		if (cols) base.push(`pa-fields--cols-${cols}`);

		// Layout modifiers
		if (isHorizontal) base.push('pa-fields--horizontal');
		if (isTable) base.push('pa-fields--table');
		if (isInline) base.push('pa-fields--inline');
		if (isRow) base.push('pa-fields--row');

		// Visual modifiers
		if (isBordered) base.push('pa-fields--bordered');
		if (isStriped) base.push('pa-fields--striped');
		if (isFilled) base.push('pa-fields--filled');

		// Spacing modifiers
		if (isCompact) base.push('pa-fields--compact');
		if (isRelaxed) base.push('pa-fields--relaxed');

		// Color variant
		if (color) base.push(`pa-fields--color-${color}`);

		// Border removal
		if (!hasBorder) base.push('pa-fields--no-border');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
