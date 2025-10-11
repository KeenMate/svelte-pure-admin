<script lang="ts">
	/**
	 * Pure Admin Column Component (Svelte 5)
	 * Wrapper for Pure.css grid columns (pure-u-*)
	 */

	type ColumnSize = '1' | '1-2' | '1-3' | '2-3' | '1-4' | '3-4' | '1-5' | '2-5' | '3-5' | '4-5' | '1-6' | '5-6' | '1-8' | '3-8' | '5-8' | '7-8' | '1-12' | '5-12' | '7-12' | '11-12' | '1-24' | '5-24' | '7-24' | '11-24' | '13-24' | '17-24' | '19-24' | '23-24';

	interface Props {
		/** Base column size (e.g., "1", "1-2", "1-3", "2-3") */
		size?: ColumnSize;
		/** Column size on small screens (≥568px) */
		sm?: ColumnSize;
		/** Column size on medium screens (≥768px) */
		md?: ColumnSize;
		/** Column size on large screens (≥1024px) */
		lg?: ColumnSize;
		/** Column size on extra large screens (≥1280px) */
		xl?: ColumnSize;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		size,
		sm,
		md,
		lg,
		xl,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base: string[] = [];

		// Base size
		if (size) base.push(`pure-u-${size}`);

		// Responsive sizes
		if (sm) base.push(`pure-u-sm-${sm}`);
		if (md) base.push(`pure-u-md-${md}`);
		if (lg) base.push(`pure-u-lg-${lg}`);
		if (xl) base.push(`pure-u-xl-${xl}`);

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
