<script lang="ts">
	/**
	 * Pure Admin Text Component (Svelte 5)
	 * For inline text with color variants
	 * Uses utility classes like text-danger, text-success, etc.
	 */

	type TextVariant = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'muted' | 'light' | 'dark';

	interface Props {
		/** Text color variant */
		variant?: TextVariant;
		/** Title attribute (tooltip on hover) */
		title?: string;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		variant,
		title,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base: string[] = [];
		if (variant && variant !== 'default') base.push(`text-${variant}`);
		if (className) base.push(className);
		return base.length > 0 ? base.join(' ') : undefined;
	});
</script>

<span class={classes()} {title}>
	{@render children?.()}
</span>
