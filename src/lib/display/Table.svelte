<script lang="ts">
	/**
	 * Pure Admin Table Component (Svelte 5)
	 * Based on @pure-admin/core snippets/tables.html
	 */

	type TableSpacing = '2x' | '3x';

	interface Props {
		/** Striped rows */
		striped?: boolean;
		/** Custom spacing (2x or 3x) */
		spacing?: TableSpacing;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		striped = false,
		spacing,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-table'];
		if (striped) base.push('pa-table--striped');
		if (spacing) base.push(`pa-table--${spacing}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<table class={classes()}>
	{@render children?.()}
</table>
