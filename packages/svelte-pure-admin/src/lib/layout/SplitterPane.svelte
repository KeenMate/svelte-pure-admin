<script lang="ts">
	/**
	 * Pure Admin Splitter Pane (Svelte 5)
	 * A single `.pa-splitter__pane` inside <Splitter>. Sizing is per-pane via
	 * data attributes read by splitter.js; unsized panes share the leftover.
	 */
	interface Props {
		/** Initial size — `"240px"` or `"30%"` (default: shared leftover). */
		size?: string;
		/** Minimum size — `"150px"` or `"10%"`. */
		min?: string;
		/** Maximum size — `"400px"` or `"50%"`. */
		max?: string;
		/** Pane can collapse to a rail. First/last dock to the edge; middle panes collapse in place. */
		isMinimizable?: boolean;
		/** Additional CSS classes. */
		class?: string;
		/** Inline style. */
		style?: string;
		/** Pane content. */
		children?: import('svelte').Snippet;
	}

	let {
		size,
		min,
		max,
		isMinimizable = false,
		class: className = '',
		style,
		children
	}: Props = $props();

	const classes = $derived(className ? `pa-splitter__pane ${className}` : 'pa-splitter__pane');
</script>

<div
	class={classes}
	{style}
	data-pa-splitter-size={size}
	data-pa-splitter-min={min}
	data-pa-splitter-max={max}
	data-pa-splitter-minimize={isMinimizable ? '' : undefined}
>
	{@render children?.()}
</div>
