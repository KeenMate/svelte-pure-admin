<script lang="ts">
	/**
	 * Pure Admin Textarea Component (Svelte 5)
	 * Based on @pure-admin/core snippets/forms.html
	 */

	interface Props {
		/** Textarea value */
		value?: string;
		/** Number of rows */
		rows?: number;
		/** Disabled state */
		disabled?: boolean;
		/** Readonly state */
		readonly?: boolean;
		/** Required field */
		required?: boolean;
		/** Placeholder text */
		placeholder?: string;
		/** Textarea ID */
		id?: string;
		/** Textarea name */
		name?: string;
		/** Additional CSS classes */
		class?: string;
		/** Input handler */
		onInput?: (event: Event & { currentTarget: HTMLTextAreaElement }) => void;
		/** Change handler */
		onChange?: (event: Event & { currentTarget: HTMLTextAreaElement }) => void;
	}

	let {
		value = $bindable(''),
		rows = 4,
		disabled = false,
		readonly = false,
		required = false,
		placeholder,
		id,
		name,
		class: className = '',
		onInput,
		onChange
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-textarea'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<textarea
	bind:value
	{id}
	{name}
	{rows}
	{placeholder}
	{disabled}
	{readonly}
	{required}
	class={classes()}
	oninput={onInput}
	onchange={onChange}
></textarea>
