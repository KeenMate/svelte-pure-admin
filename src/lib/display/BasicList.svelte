<script lang="ts">
	/**
	 * Pure Admin BasicList Component (Svelte 5)
	 * Based on @pure-admin/core snippets/lists.html
	 * For simple unordered lists with various modifiers
	 */

	type ListSpacing = 'compact' | 'spacious';
	type ListIconVariant = 'success' | 'danger' | 'info' | 'warning';

	interface Props {
		/** Spacing variant */
		spacing?: ListSpacing;
		/** Remove bullets and padding */
		unstyled?: boolean;
		/** Display items inline (horizontal) */
		inline?: boolean;
		/** Add borders between items */
		bordered?: boolean;
		/** Zebra striping on even rows */
		striped?: boolean;
		/** Show icons (checkmarks by default) */
		icon?: boolean;
		/** Icon variant (when icon=true) */
		iconVariant?: ListIconVariant;
		/** Additional CSS classes */
		class?: string;
		/** List items */
		children?: import('svelte').Snippet;
	}

	let {
		spacing,
		unstyled = false,
		inline = false,
		bordered = false,
		striped = false,
		icon = false,
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
		if (unstyled) base.push('pa-list-basic--unstyled');
		if (inline) base.push('pa-list-basic--inline');
		if (bordered) base.push('pa-list-basic--bordered');
		if (striped) base.push('pa-list-basic--striped');

		// Icon modifiers
		if (icon) {
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
