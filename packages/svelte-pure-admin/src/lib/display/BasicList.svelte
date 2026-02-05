<script lang="ts">
	/**
	 * Pure Admin BasicList Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/lists.html
	 * For simple unordered lists with various modifiers
	 */

	type ListSpacing = 'compact' | 'spacious';
	type ListIconVariant = 'success' | 'danger' | 'info' | 'warning';

	interface Props {
		/** Spacing variant */
		spacing?: ListSpacing;
		/** Remove bullets and padding */
		isUnstyled?: boolean;
		/** Display items inline (horizontal) */
		isInline?: boolean;
		/** Add borders between items */
		isBordered?: boolean;
		/** Zebra striping on even rows */
		isStriped?: boolean;
		/** Show icons (checkmarks by default) */
		hasIcon?: boolean;
		/** Icon variant (when hasIcon=true) */
		iconVariant?: ListIconVariant;
		/** Additional CSS classes */
		class?: string;
		/** List items */
		children?: import('svelte').Snippet;
	}

	let {
		spacing,
		isUnstyled = false,
		isInline = false,
		isBordered = false,
		isStriped = false,
		hasIcon = false,
		iconVariant = 'success',
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-list-basic'];

		// Spacing
		if (spacing) base.push(`pa-list-basic--${spacing}`);

		// Modifiers
		if (isUnstyled) base.push('pa-list-basic--unstyled');
		if (isInline) base.push('pa-list-basic--inline');
		if (isBordered) base.push('pa-list-basic--bordered');
		if (isStriped) base.push('pa-list-basic--striped');

		// Icon modifiers
		if (hasIcon) {
			base.push('pa-list-basic--icon');
			if (iconVariant !== 'success') {
				base.push(`pa-list-basic--${iconVariant}`);
			}
		}

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<ul class={classes()}>
	{@render children?.()}
</ul>
