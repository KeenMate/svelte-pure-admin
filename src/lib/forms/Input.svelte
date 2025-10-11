<script lang="ts">
	/**
	 * Pure Admin Input Component (Svelte 5)
	 * Based on @pure-admin/core snippets/forms.html
	 */

	type InputSize = 'xs' | 'sm' | 'lg' | 'xl';
	type InputState = 'success' | 'error';
	type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';

	interface Props {
		/** Input type */
		type?: InputType;
		/** Input value */
		value?: string | number;
		/** Input size */
		size?: InputSize;
		/** Validation state */
		state?: InputState;
		/** Disabled state */
		disabled?: boolean;
		/** Readonly state */
		readonly?: boolean;
		/** Required field */
		required?: boolean;
		/** Placeholder text */
		placeholder?: string;
		/** Input ID */
		id?: string;
		/** Input name */
		name?: string;
		/** Additional CSS classes */
		class?: string;
		/** Input handler */
		onInput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
		/** Change handler */
		onChange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
		/** Blur handler */
		onBlur?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
	}

	let {
		type = 'text',
		value = $bindable(''),
		size,
		state,
		disabled = false,
		readonly = false,
		required = false,
		placeholder,
		id,
		name,
		class: className = '',
		onInput,
		onChange,
		onBlur
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-input'];
		if (size) base.push(`pa-input--${size}`);
		if (state === 'success') base.push('pa-input--success');
		if (state === 'error') base.push('pa-input--error');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<input
	{type}
	bind:value
	{id}
	{name}
	{placeholder}
	{disabled}
	{readonly}
	{required}
	class={classes()}
	oninput={onInput}
	onchange={onChange}
	onblur={onBlur}
/>
