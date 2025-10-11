<script lang="ts">
	/**
	 * Pure Admin Select Component (Svelte 5)
	 * Based on @pure-admin/core snippets/forms.html
	 */

	interface Props {
		/** Select value */
		value?: string;
		/** Disabled state */
		disabled?: boolean;
		/** Required field */
		required?: boolean;
		/** Select ID */
		id?: string;
		/** Select name */
		name?: string;
		/** Additional CSS classes */
		class?: string;
		/** Change handler */
		onChange?: (event: Event & { currentTarget: HTMLSelectElement }) => void;
		/** Children content (option elements) */
		children?: import('svelte').Snippet;
	}

	let {
		value = $bindable(''),
		disabled = false,
		required = false,
		id,
		name,
		class: className = '',
		onChange,
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-select'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<select bind:value {id} {name} {disabled} {required} class={classes()} onchange={onChange}>
	{@render children?.()}
</select>
