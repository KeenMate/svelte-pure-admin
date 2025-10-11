<script lang="ts">
	/**
	 * Pure Admin OrderedList Component (Svelte 5)
	 * Based on @pure-admin/core snippets/lists.html
	 * For ordered lists with numeric, roman, or alphabetical markers
	 */

	type ListStyle = 'roman' | 'alpha';

	interface Props {
		/** List style (default: numeric 1,2,3...) */
		style?: ListStyle;
		/** Additional CSS classes */
		class?: string;
		/** List items */
		children?: import('svelte').Snippet;
	}

	let { style, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-list-ordered'];

		// Style
		if (style) base.push(`pa-list-ordered--${style}`);

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<ol class={classes()}>
	{@render children?.()}
</ol>
