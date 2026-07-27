<script lang="ts">
	/**
	 * Pure Admin Splitter Gutter (Svelte 5)
	 * The draggable `.pa-splitter__gutter` placed between two <SplitterPane>s.
	 * Reads the parent splitter's orientation from context so `aria-orientation`
	 * matches without a prop.
	 */
	import { getContext } from 'svelte';
	import { SPLITTER_CONTEXT, type SplitterContext } from './splitter-context';

	interface Props {
		/** Additional CSS classes. */
		class?: string;
		/** Accessible label for the resize handle. */
		ariaLabel?: string;
	}

	let { class: className = '', ariaLabel }: Props = $props();

	const ctx = getContext<SplitterContext | undefined>(SPLITTER_CONTEXT);
	// A horizontal (side-by-side) split has a vertically-oriented gutter, and vice versa.
	const ariaOrientation = $derived(
		(ctx?.orientation ?? 'horizontal') === 'horizontal' ? 'vertical' : 'horizontal'
	);

	const classes = $derived(
		className ? `pa-splitter__gutter ${className}` : 'pa-splitter__gutter'
	);
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
	class={classes}
	role="separator"
	aria-orientation={ariaOrientation}
	aria-label={ariaLabel}
	tabindex="0"
></div>
