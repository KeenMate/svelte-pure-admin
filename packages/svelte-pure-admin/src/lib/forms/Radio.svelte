<script lang="ts">
	/**
	 * Pure Admin Radio Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 *
	 * Uses the pa-radio label pattern from pure-admin-visual:
	 * <label class="pa-radio">
	 *   <input type="radio" ...>
	 *   Label text
	 * </label>
	 */

	type RadioSize = 'xs' | 'sm' | 'lg' | 'xl';

	interface Props {
		/** Radio group value (bindable) */
		group?: string | number;
		/** Radio value */
		value: string | number;
		/** Disabled state */
		disabled?: boolean;
		/** Radio name (group name) */
		name: string;
		/** Radio size */
		size?: RadioSize;
		/** Label text */
		labelText?: string;
		/** Additional CSS classes for wrapper */
		class?: string;
		/** Label snippet (alternative to label prop for custom content) */
		labelSnippet?: import('svelte').Snippet;
		/** Change handler */
		onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
	}

	let {
		group = $bindable(),
		value,
		disabled = false,
		name,
		size,
		labelText,
		class: className = '',
		labelSnippet,
		onchange
	}: Props = $props();

	// Build class string for label wrapper
	const wrapperClasses = $derived(() => {
		const base = ['pa-radio'];
		if (size) base.push(`pa-radio--${size}`);
		// Core has no `.pa-radio--disabled` (only size modifiers) — the native
		// `disabled` attribute on the <input> is the disabled contract
		// (snippets/forms.html). Checkbox has --disabled; radio does not.
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<label class={wrapperClasses()}>
	<input
		type="radio"
		bind:group
		{value}
		{name}
		{disabled}
		{onchange}
	/>
	{#if labelSnippet}
		{@render labelSnippet()}
	{:else if labelText}
		{labelText}
	{/if}
</label>
