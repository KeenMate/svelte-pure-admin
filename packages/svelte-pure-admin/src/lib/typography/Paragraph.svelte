<script lang="ts">
	/**
	 * Pure Admin Paragraph Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core typography utilities
	 */

	import type { HorizontalAlignment, TextMode, Size } from '../types';

	type SemanticStyle = 'default' | 'caption' | 'lead';

	interface Props {
		/** Horizontal text alignment */
		horizontalAlignment?: HorizontalAlignment;
		/** Text color mode (muted uses secondary color) */
		mode?: TextMode;
		/** Text size variant */
		size?: Size;
		/** Semantic text style (caption for small labels, lead for introductory text) */
		semantic?: SemanticStyle;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		horizontalAlignment,
		mode,
		size,
		semantic,
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base: string[] = [];
		if (horizontalAlignment) base.push(`pa-text--${horizontalAlignment}`);
		if (mode === 'muted') base.push('pa-text--secondary');
		if (size) base.push(`pa-text--${size}`);
		if (semantic && semantic !== 'default') base.push(`pa-text--${semantic}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<p class={classes()}>
	{@render children?.()}
</p>
