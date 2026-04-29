<script lang="ts">
	/**
	 * Pure Admin Alert Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/alerts.html
	 */

	import { _ } from '../i18n';

	import type { ThemeColor } from '../types';

	type AlertVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	type AlertSize = 'sm' | 'lg';

	interface Props {
		/** Alert variant */
		variant?: AlertVariant;
		/** Alert size */
		size?: AlertSize;
		/** Theme color slot variant (1-9) — applies pa-alert--color-N or pa-alert--outline-color-N */
		themeColor?: ThemeColor;
		/** Dismissible alert */
		isDismissible?: boolean;
		/** Outline style */
		isOutline?: boolean;
		/**
		 * Use the punchy/large heading variant (pa-alert__heading--lg).
		 * Pre-v2.5.0 default; opt-in since core v2.5.0 made the body-sized heading the default.
		 */
		isHeadingLarge?: boolean;
		/**
		 * Stack icon at the top of multi-line content (pa-alert--multiline).
		 * Default alignment is centred; flip this on when icon + heading + body sit beside each other.
		 */
		isMultiline?: boolean;
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
		themeColor,
		isDismissible = false,
		isOutline = false,
		isHeadingLarge = false,
		isMultiline = false,
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

		// Variant (theme color slot takes priority over named variant)
		if (themeColor) {
			if (isOutline) {
				base.push(`pa-alert--outline-color-${themeColor}`);
			} else {
				base.push(`pa-alert--color-${themeColor}`);
			}
		} else if (isOutline) {
			base.push(`pa-alert--outline-${variant}`);
		} else {
			base.push(`pa-alert--${variant}`);
		}

		// Size
		if (size) base.push(`pa-alert--${size}`);

		// Modifiers
		if (isDismissible) base.push('pa-alert--dismissible');
		if (isMultiline) base.push('pa-alert--multiline');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});

	function dismiss() {
		visible = false;
		ondismiss?.();
	}
</script>

{#snippet body()}
	{#if headingText}
		<h4 class={isHeadingLarge ? 'pa-alert__heading pa-alert__heading--lg' : 'pa-alert__heading'}>{headingText}</h4>
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
{/snippet}

{#if visible}
	<div class={classes()} role="alert">
		{#if icon}
			<span class="pa-alert__icon">
				{@render icon()}
			</span>
		{/if}

		{#if icon || isDismissible}
			<div class="pa-alert__content">
				{@render body()}
			</div>
		{:else}
			{@render body()}
		{/if}

		{#if isDismissible}
			<button type="button" class="pa-alert__close" onclick={dismiss} aria-label={$_('pureAdmin.common.buttons.close')}>
				<span aria-hidden="true">×</span>
			</button>
		{/if}
	</div>
{/if}
