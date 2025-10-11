<script lang="ts">
	/**
	 * Pure Admin Alert Component (Svelte 5)
	 * Based on @pure-admin/core snippets/alerts.html
	 */

	type AlertVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	type AlertSize = 'sm' | 'lg';

	interface Props {
		/** Alert variant */
		variant?: AlertVariant;
		/** Alert size */
		size?: AlertSize;
		/** Dismissible alert */
		dismissible?: boolean;
		/** Outline style */
		outline?: boolean;
		/** Alert heading */
		heading?: string;
		/** Additional CSS classes */
		class?: string;
		/** Icon snippet (when provided, content is wrapped in pa-alert__content) */
		icon?: import('svelte').Snippet;
		/** Children (alert content) */
		children?: import('svelte').Snippet;
	}

	let {
		variant = 'primary',
		size,
		dismissible = false,
		outline = false,
		heading,
		class: className = '',
		icon,
		children
	}: Props = $props();

	let visible = $state(true);

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-alert'];

		// Variant
		if (outline) {
			base.push(`pa-alert--outline-${variant}`);
		} else {
			base.push(`pa-alert--${variant}`);
		}

		// Size
		if (size) base.push(`pa-alert--${size}`);

		// Modifiers
		if (dismissible) base.push('pa-alert--dismissible');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});

	function dismiss() {
		visible = false;
	}
</script>

{#if visible}
	<div class={classes()} role="alert">
		{#if icon}
			<!-- Complex alert with icon -->
			<span class="pa-alert__icon">
				{@render icon()}
			</span>
			<div class="pa-alert__content">
				{#if heading}
					<h4 class="pa-alert__heading">{heading}</h4>
				{/if}
				{@render children?.()}
			</div>
		{:else}
			<!-- Simple alert -->
			{#if heading}
				<h4 class="pa-alert__heading">{heading}</h4>
			{/if}
			{@render children?.()}
		{/if}

		{#if dismissible}
			<button class="pa-alert__close" onclick={dismiss} aria-label="Close">
				✕
			</button>
		{/if}
	</div>
{/if}
