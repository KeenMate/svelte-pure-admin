<script lang="ts">
	/**
	 * Pure Admin Checkbox Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 *
	 * Uses the custom tri-state checkbox pattern from pure-admin-visual:
	 * - Supports checked, unchecked, and indeterminate states
	 * - X-mark variant (shows X instead of checkmark when checked)
	 * - Size variants (xs, sm, default, lg, xl)
	 *
	 * This is a labeled checkbox (label wraps the box).
	 * For the raw checkbox without label wrapper, use CheckboxBox.
	 */

	type CheckboxSize = 'xs' | 'sm' | 'lg' | 'xl';

	interface Props {
		/** Checkbox checked state */
		checked?: boolean;
		/** Indeterminate state (partial selection) */
		indeterminate?: boolean;
		/** Disabled state */
		disabled?: boolean;
		/** Use X mark instead of checkmark when checked */
		xMark?: boolean;
		/** Checkbox size */
		size?: CheckboxSize;
		/** Checkbox ID (required for label association) */
		id: string;
		/** Checkbox name */
		name?: string;
		/** Checkbox value */
		value?: string;
		/** Label text */
		label?: string;
		/** Additional CSS classes for wrapper */
		class?: string;
		/** Label snippet (alternative to label prop for custom label content) */
		labelSnippet?: import('svelte').Snippet;
		/** Change handler */
		onChange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
	}

	let {
		checked = $bindable(false),
		indeterminate = false,
		disabled = false,
		xMark = false,
		size,
		id,
		name,
		value,
		label,
		class: className = '',
		labelSnippet,
		onChange
	}: Props = $props();

	let inputElement: HTMLInputElement;

	// Sync indeterminate property (can only be set via JS, not attribute)
	$effect(() => {
		if (inputElement) {
			inputElement.indeterminate = indeterminate;
		}
	});

	// Build class string for wrapper (using pa-checkbox pattern)
	const wrapperClasses = $derived(() => {
		const base = ['pa-checkbox'];
		if (size) base.push(`pa-checkbox--${size}`);
		if (xMark) base.push('pa-checkbox--x');
		if (disabled) base.push('pa-checkbox--disabled');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<label class={wrapperClasses()}>
	<input
		bind:this={inputElement}
		type="checkbox"
		bind:checked
		{id}
		{name}
		{value}
		{disabled}
		onchange={onChange}
	/>
	<span class="pa-checkbox__box"></span>
	{#if labelSnippet}
		<span class="pa-checkbox__label">
			{@render labelSnippet()}
		</span>
	{:else if label}
		<span class="pa-checkbox__label">{label}</span>
	{/if}
</label>
