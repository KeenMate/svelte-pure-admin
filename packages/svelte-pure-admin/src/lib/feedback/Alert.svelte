<script lang="ts">
	/**
	 * Pure Admin Alert Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/alerts.html
	 */

	import { _ } from '../i18n';

	type AlertVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	type AlertSize = 'sm' | 'lg';

	interface Props {
		/** Alert variant */
		variant?: AlertVariant;
		/** Alert size */
		size?: AlertSize;
		/** Dismissible alert */
		isDismissible?: boolean;
		/** Outline style */
		isOutline?: boolean;
		/** Alert heading text */
		headingText?: string;
		/** Additional CSS classes */
		class?: string;
		/** Icon snippet (when provided, content is wrapped in pa-alert__content) */
		icon?: import('svelte').Snippet;
		/** Children (alert content) */
		children?: import('svelte').Snippet;
		/** List snippet for alert lists */
		list?: import('svelte').Snippet;
		/** Actions snippet for alert action buttons */
		actions?: import('svelte').Snippet;
		/** Callback fired when alert is dismissed */
		ondismiss?: () => void;
	}

	let {
		variant = 'primary',
		size,
		isDismissible = false,
		isOutline = false,
		headingText,
		class: className = '',
		icon,
		children,
		list,
		actions,
		ondismiss
	}: Props = $props();

	let visible = $state(true);

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-alert'];

		// Variant
		if (isOutline) {
			base.push(`pa-alert--outline-${variant}`);
		} else {
			base.push(`pa-alert--${variant}`);
		}

		// Size
		if (size) base.push(`pa-alert--${size}`);

		// Modifiers
		if (isDismissible) base.push('pa-alert--dismissible');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});

	function dismiss() {
		visible = false;
		ondismiss?.();
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
				{#if headingText}
					<h4 class="pa-alert__heading">{headingText}</h4>
				{/if}
				{@render children?.()}
				{#if list}
					<ul class="pa-alert__list">
						{@render list()}
					</ul>
				{/if}
				{#if actions}
					<div class="pa-alert__actions">
						{@render actions()}
					</div>
				{/if}
			</div>
		{:else}
			<!-- Simple alert -->
			{#if headingText}
				<h4 class="pa-alert__heading">{headingText}</h4>
			{/if}
			{@render children?.()}
			{#if list}
				<ul class="pa-alert__list">
					{@render list()}
				</ul>
			{/if}
			{#if actions}
				<div class="pa-alert__actions">
					{@render actions()}
				</div>
			{/if}
		{/if}

		{#if isDismissible}
			<button class="pa-alert__close" onclick={dismiss} aria-label={$_('pureAdmin.common.buttons.close')}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
			</button>
		{/if}
	</div>
{/if}
