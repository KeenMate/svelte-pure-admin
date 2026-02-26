<script lang="ts">
	/**
	 * Pure Admin Banded Row Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-display.scss
	 *
	 * Single row in a Banded container: tinted label + value.
	 * Supports copyable variants with clipboard functionality.
	 */

	import { _ } from '../i18n';

	interface Props {
		/** Label text */
		labelText: string;
		/** Value text (simple mode) */
		valueText?: string | number;
		/** Additional CSS classes for the row */
		class?: string;
		/** Additional CSS classes for the label element */
		labelClass?: string;
		/** Copy mode: 'btn' (always visible), 'click' (value clickable), 'hover' (button on hover) */
		copyMode?: 'btn' | 'click' | 'hover';
		/** Override what gets copied (defaults to valueText) */
		copyValue?: string;
		/** Callback after successful copy */
		oncopy?: (value: string) => void;
		/** Complex value content (snippet) */
		children?: import('svelte').Snippet;
	}

	let {
		labelText,
		valueText,
		class: className = '',
		labelClass = '',
		copyMode,
		copyValue,
		oncopy,
		children
	}: Props = $props();

	// Copied feedback state
	let copied = $state(false);
	let copiedTimeout: ReturnType<typeof setTimeout> | null = null;

	const canCopy = $derived(
		copyValue !== undefined || valueText !== undefined
	);

	const classes = $derived(() => {
		const base = ['pa-banded__row'];
		if (copyMode && canCopy) {
			base.push(`pa-banded__row--copy-${copyMode}`);
			if (copyMode === 'click' && copied) base.push('pa-banded__row--copied');
		}
		if (className) base.push(className);
		return base.join(' ');
	});

	const labelClasses = $derived(() => {
		const base = ['pa-banded__label'];
		if (labelClass) base.push(labelClass);
		return base.join(' ');
	});

	function getTextToCopy(): string {
		if (copyValue !== undefined) return copyValue;
		if (valueText !== undefined) return String(valueText);
		return '';
	}

	async function handleCopy() {
		const text = getTextToCopy();
		if (!text) return;

		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			oncopy?.(text);

			if (copiedTimeout) clearTimeout(copiedTimeout);
			copiedTimeout = setTimeout(() => {
				copied = false;
			}, 1500);
		} catch (err) {
			console.error('Failed to copy to clipboard:', err);
		}
	}

	function handleValueClick() {
		if (copyMode === 'click') {
			handleCopy();
		}
	}
</script>

<div class={classes()}>
	<span class={labelClasses()}>{labelText}</span>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<span
		class="pa-banded__value"
		onclick={copyMode === 'click' && canCopy ? handleValueClick : undefined}
	>
		{#if children}
			{@render children()}
		{:else if valueText !== undefined}
			{valueText}
		{/if}
		{#if (copyMode === 'btn' || copyMode === 'hover') && canCopy}
			<button
				type="button"
				class="pa-banded__copy"
				onclick={handleCopy}
				aria-label={copied ? $_('pureAdmin.field.copied') : $_('pureAdmin.field.clickToCopy')}
			>
				{#if copied}
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="20 6 9 17 4 12"/>
					</svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 448 512" fill="currentColor">
						<path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H80V128H64z"/>
					</svg>
				{/if}
			</button>
		{/if}
	</span>
</div>

<style>
	/* Visual feedback for copy button when copied */
	:global(.pa-banded__copy) {
		transition: color 0.15s;
	}
</style>
