<script lang="ts">
	/**
	 * Pure Admin CheckboxBox Component (Svelte 5)
	 * Low-level checkbox input + box pattern for use in composite components
	 *
	 * This is a building block component that renders:
	 * <span class="pa-checkbox">
	 *   <input type="checkbox" />
	 *   <span class="pa-checkbox__box"></span>
	 * </span>
	 *
	 * Used by: CheckboxListItem, Checkbox
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
		/** Checkbox ID */
		id?: string;
		/** Checkbox name */
		name?: string;
		/** Checkbox value */
		value?: string;
		/** Additional CSS classes */
		class?: string;
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
		class: className = '',
		onChange
	}: Props = $props();

	let inputElement: HTMLInputElement;

	// Sync indeterminate property (can only be set via JS, not attribute)
	$effect(() => {
		if (inputElement) {
			inputElement.indeterminate = indeterminate;
		}
	});

	// Build class string for wrapper
	const wrapperClasses = $derived(() => {
		const base = ['pa-checkbox'];
		if (size) base.push(`pa-checkbox--${size}`);
		if (xMark) base.push('pa-checkbox--x');
		if (disabled) base.push('pa-checkbox--disabled');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<span class={wrapperClasses()}>
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
</span>
