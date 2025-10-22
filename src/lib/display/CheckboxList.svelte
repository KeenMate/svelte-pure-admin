<script lang="ts">
	/**
	 * Pure Admin CheckboxList Component (Svelte 5)
	 * Based on @pure-admin/core snippets/checkbox-lists.html
	 * Container for checkbox list items
	 */

	type ListVariant = 'compact' | 'bordered' | 'striped';
	type ListLayout = 'inline' | 'grid' | '2col' | '3col';

	interface Props {
		/** List style variant */
		variant?: ListVariant;
		/** Layout style */
		layout?: ListLayout;
		/** Additional CSS classes */
		class?: string;
		/** Children (CheckboxListItem components) */
		children?: import('svelte').Snippet;
	}

	let { variant, layout, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-checkbox-list'];

		// Variant modifiers
		if (variant === 'compact') base.push('pa-checkbox-list--compact');
		if (variant === 'bordered') base.push('pa-checkbox-list--bordered');
		if (variant === 'striped') base.push('pa-checkbox-list--striped');

		// Layout modifiers
		if (layout === 'inline') base.push('pa-checkbox-list--inline');
		if (layout === 'grid') base.push('pa-checkbox-list--grid');
		if (layout === '2col') base.push('pa-checkbox-list--2col');
		if (layout === '3col') base.push('pa-checkbox-list--3col');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<ul class={classes()}>
	{@render children?.()}
</ul>
