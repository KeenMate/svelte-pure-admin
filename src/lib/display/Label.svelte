<script lang="ts">
	/**
	 * Pure Admin Label Component (Svelte 5)
	 * Based on @pure-admin/core snippets/badges.html
	 */

	type LabelVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
	type LabelSize = 'sm';

	interface Props {
		/** Label variant */
		variant?: LabelVariant;
		/** Label size */
		size?: LabelSize;
		/** Outline style */
		outline?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		variant,
		size,
		outline = false,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-label'];
		if (variant) base.push(`pa-label--${variant}`);
		if (size) base.push(`pa-label--${size}`);
		if (outline) base.push('pa-label--outline');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<span class={classes()}>
	{@render children?.()}
</span>
