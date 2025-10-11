<script lang="ts">
	/**
	 * Pure Admin Button Component (Svelte 5)
	 * Based on @pure-admin/core snippets/buttons.html
	 */

	type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	type ButtonSize = 'xs' | 'sm' | 'lg' | 'xl';
	type ButtonWidth = '3x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x' | '12x';
	type ButtonAlign = 'left' | 'right' | 'center' | 'justify';

	interface Props {
		/** Button variant */
		variant?: ButtonVariant;
		/** Button size */
		size?: ButtonSize;
		/** Outline style */
		outline?: boolean;
		/** Block (full width) button */
		block?: boolean;
		/** Icon-only button (no text) */
		iconOnly?: boolean;
		/** Loading state */
		loading?: boolean;
		/** Ripple effect on click */
		ripple?: boolean;
		/** Fixed width */
		width?: ButtonWidth;
		/** Button content alignment (for fixed width buttons) */
		align?: ButtonAlign;
		/** Disabled state */
		disabled?: boolean;
		/** Button type */
		type?: 'button' | 'submit' | 'reset';
		/** Click handler */
		onClick?: (event: MouseEvent) => void;
		/** Additional CSS classes */
		class?: string;
		/** Icon snippet (renders in pa-btn__icon) */
		icon?: import('svelte').Snippet;
		/** Children (button content) */
		children?: import('svelte').Snippet;
	}

	let {
		variant = 'primary',
		size,
		outline = false,
		block = false,
		iconOnly = false,
		loading = false,
		ripple = false,
		width,
		align,
		disabled = false,
		type = 'button',
		onClick,
		class: className = '',
		icon,
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-btn'];

		// Variant
		if (outline) {
			base.push(`pa-btn--outline-${variant}`);
		} else {
			base.push(`pa-btn--${variant}`);
		}

		// Size
		if (size) base.push(`pa-btn--${size}`);

		// Modifiers
		if (block) base.push('pa-btn--block');
		if (iconOnly) base.push('pa-btn--icon-only');
		if (loading) base.push('pa-btn--loading');
		if (ripple) base.push('pa-btn--ripple');

		// Width
		if (width) base.push(`pa-btn--w-${width}`);

		// Alignment
		if (align) base.push(`pa-btn--align-${align}`);

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<button
	{type}
	disabled={disabled || loading}
	class={classes()}
	onclick={onClick}
	data-ripple={ripple ? true : undefined}
>
	{#if loading}
		<span class="pa-btn__spinner"></span>
	{/if}
	{#if icon}
		<span class="pa-btn__icon">
			{@render icon()}
		</span>
	{/if}
	{@render children?.()}
</button>
