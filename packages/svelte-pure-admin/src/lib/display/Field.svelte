<script lang="ts">
	/**
	 * Pure Admin Field Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core data-display.scss
	 *
	 * Single label-value pair for displaying read-only data.
	 * Supports copyable variants with clipboard functionality.
	 */

	import { _ } from '../i18n';

	interface Props {
		/** Label text (simple mode) */
		labelText?: string;
		/** Value text (simple mode) */
		valueText?: string | number;
		/** Full width in grid layouts (spans entire row) */
		full?: boolean;
		/** Copy mode: 'btn' (always visible), 'click' (value clickable), 'hover' (button on hover) */
		copyMode?: 'btn' | 'click' | 'hover';
		/** Override what gets copied (defaults to value prop) */
		copyValue?: string;
		/** Callback to get value to copy (for dynamic values) */
		copyValueCallback?: () => string;
		/** Hint text for click mode (default: i18n 'field.clickToCopy') */
		copyHintText?: string;
		/** Feedback text after copy (default: i18n 'field.copied') */
		copiedText?: string;
		/** Callback after successful copy */
		oncopy?: (value: string) => void;
		/** Additional CSS classes */
		class?: string;
		/** Complex label content (snippet) */
		labelSnippet?: import('svelte').Snippet;
		/** Complex value content (snippet) */
		valueSnippet?: import('svelte').Snippet;
		/** Alias for valueSnippet - main content */
		children?: import('svelte').Snippet;
	}

	let {
		labelText,
		valueText,
		full = false,
		copyMode,
		copyValue,
		copyValueCallback,
		copyHintText,
		copiedText,
		oncopy,
		class: className = '',
		labelSnippet,
		valueSnippet,
		children
	}: Props = $props();

	// Copied feedback state
	let copied = $state(false);
	let copiedTimeout: ReturnType<typeof setTimeout> | null = null;

	// Resolve i18n text with prop override
	const resolvedHintText = $derived(copyHintText ?? $_('pureAdmin.field.clickToCopy'));
	const resolvedCopiedText = $derived(copiedText ?? $_('pureAdmin.field.copied'));

	// Check if there's something to copy (required for copy functionality)
	const canCopy = $derived(
		copyValue !== undefined || copyValueCallback !== undefined || valueText !== undefined
	);

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-field'];
		if (full) base.push('pa-field--full');
		// Only add copy classes if there's something to copy
		if (copyMode && canCopy) {
			if (copyMode === 'btn') base.push('pa-field--copy-btn');
			if (copyMode === 'click') base.push('pa-field--copy-click', 'pa-field--copy-click-custom');
			if (copyMode === 'hover') base.push('pa-field--copy-hover');
			if (copied) base.push('pa-field--copied', 'pa-field--copied-custom');
		}
		if (className) base.push(className);
		return base.join(' ');
	});

	// Determine which value content to render
	const hasValueContent = $derived(valueSnippet || children || valueText !== undefined);

	// Get the text to copy
	function getTextToCopy(): string {
		if (copyValue !== undefined) return copyValue;
		if (copyValueCallback !== undefined) return copyValueCallback();
		if (valueText !== undefined) return String(valueText);
		return '';
	}

	// Copy to clipboard
	async function handleCopy() {
		const text = getTextToCopy();
		if (!text) return;

		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			oncopy?.(text);

			// Clear previous timeout if exists
			if (copiedTimeout) clearTimeout(copiedTimeout);

			// Reset copied state after 1.5 seconds
			copiedTimeout = setTimeout(() => {
				copied = false;
			}, 1500);
		} catch (err) {
			console.error('Failed to copy to clipboard:', err);
		}
	}

	// Handle click on value (for copy-click mode)
	function handleValueClick() {
		if (copyMode === 'click') {
			handleCopy();
		}
	}
</script>

<div class={classes()}>
	{#if labelSnippet}
		<span class="pa-field__label">
			{@render labelSnippet()}
		</span>
	{:else if labelText}
		<span class="pa-field__label">{labelText}</span>
	{/if}

	{#if hasValueContent}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<span
			class="pa-field__value"
			onclick={copyMode === 'click' && canCopy ? handleValueClick : undefined}
		>
			{#if valueSnippet}
				{@render valueSnippet()}
			{:else if children}
				{@render children()}
			{:else if valueText !== undefined}
				{valueText}
			{/if}
			{#if (copyMode === 'btn' || copyMode === 'hover') && canCopy}
				<button
					type="button"
					class="pa-field__copy"
					class:pa-field__copy--copied={copied}
					onclick={handleCopy}
					aria-label={copied ? resolvedCopiedText : resolvedHintText}
				>
					{#if copied}
						<!-- Checkmark icon -->
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="20 6 9 17 4 12"/>
						</svg>
					{:else}
						<!-- Copy icon -->
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
							<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
						</svg>
					{/if}
				</button>
			{/if}
			{#if copyMode === 'click' && canCopy}
				<span class="pa-field__copy-hint">{copied ? resolvedCopiedText : resolvedHintText}</span>
			{/if}
		</span>
	{/if}
</div>

<style>
	/* Hide CSS-generated ::after text when using Svelte-rendered text */
	/* Use high specificity to override the SCSS !important rules */
	:global(.pa-field.pa-field--copy-click-custom .pa-field__value)::after,
	:global(.pa-field.pa-field--copied-custom .pa-field__value)::after {
		content: '' !important;
		display: none !important;
	}

	/* Style for Svelte-rendered hint text (matches CSS ::after styling) */
	.pa-field__copy-hint {
		font-size: 1rem; /* matches $font-size-2xs (10px) */
		margin-left: var(--pa-spacing-sm, 0.5rem);
		transition: opacity 0.15s;
	}

	:global(.pa-field--copy-click) .pa-field__copy-hint {
		opacity: 0;
	}

	:global(.pa-field--copy-click:hover) .pa-field__copy-hint {
		opacity: 0.6;
	}

	:global(.pa-field--copied) .pa-field__copy-hint {
		opacity: 1 !important;
		color: var(--pa-color-4, #28a745);
	}

	/* Visual feedback for copy button when copied */
	.pa-field__copy--copied {
		color: var(--pa-color-4, #28a745) !important;
		opacity: 1 !important;
	}
</style>
