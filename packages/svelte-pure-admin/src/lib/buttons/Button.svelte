<script lang="ts">
	/**
	 * Pure Admin Button Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/buttons.html
	 */

	type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	type ButtonSize = 'xs' | 'sm' | 'lg' | 'xl';
	type ButtonAlign = 'left' | 'right' | 'center' | 'justify';

	/**
	 * Note: Fixed width buttons should use utility classes (e.g., `class="wr-5 minwr-5"`)
	 * instead of component props. The `pa-btn--w-*` classes were removed in pure-admin-core rc04.
	 */
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
		/** Button content alignment */
		align?: ButtonAlign;
		/** Used in input group (adds pa-input-group__button class) */
		isInputGroupButton?: boolean;
		/** Disabled state */
		disabled?: boolean;
		/** Button type */
		type?: 'button' | 'submit' | 'reset';
		/** Link URL (renders as anchor tag instead of button) */
		href?: string;
		/** Link target (only used with href) */
		target?: '_blank' | '_self' | '_parent' | '_top';
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
		/** Title attribute (tooltip) */
		title?: string;
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
		align,
		isInputGroupButton = false,
		disabled = false,
		type = 'button',
		href,
		target,
		onclick,
		title,
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

		// Alignment
		if (align) base.push(`pa-btn--align-${align}`);

		// Input group button
		if (isInputGroupButton) base.push('pa-input-group__button');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

{#if href}
	<a
		{href}
		{target}
		{title}
		class={classes()}
		class:disabled={disabled || loading}
		{onclick}
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
	</a>
{:else}
	<button
		{type}
		{title}
		disabled={disabled || loading}
		class={classes()}
		{onclick}
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
{/if}
