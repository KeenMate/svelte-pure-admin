<script lang="ts">
	/**
	 * Pure Admin Table Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/tables.html
	 */

	type TableSize = 'xs' | 'sm' | 'lg' | 'xl';

	interface Props {
		/** Striped rows */
		striped?: boolean;
		/** Table size (affects cell padding) - xs is compact, lg/xl are spacious */
		size?: TableSize;
		/** Responsive table with horizontal scrolling */
		isResponsive?: boolean;
		/** Responsive grid layout (collapses to cards on mobile) */
		responsiveGrid?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		striped = false,
		size,
		isResponsive = false,
		responsiveGrid = false,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-table'];
		if (striped) base.push('pa-table--striped');
		if (size) base.push(`pa-table--${size}`);
		if (isResponsive) base.push('pa-table--responsive');
		if (responsiveGrid) base.push('pa-table--responsive-grid');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<table class={classes()}>
	{@render children?.()}
</table>
