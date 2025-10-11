<script lang="ts">
	/**
	 * Pure Admin Tooltip Component (Svelte 5)
	 * Based on @pure-admin/core tooltips
	 */

	type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';
	type TooltipVariant = 'primary' | 'success' | 'warning' | 'danger';

	interface Props {
		/** Tooltip text */
		text: string;
		/** Tooltip position */
		position?: TooltipPosition;
		/** Tooltip color variant */
		variant?: TooltipVariant;
		/** Multiline tooltip (20rem width, left-aligned) */
		multiline?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		text,
		position,
		variant,
		multiline = false,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-tooltip'];
		if (position) base.push(`pa-tooltip--${position}`);
		if (variant) base.push(`pa-tooltip--${variant}`);
		if (multiline) base.push('pa-tooltip--multiline');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<span class={classes()} data-tooltip={text}>
	{@render children?.()}
</span>
