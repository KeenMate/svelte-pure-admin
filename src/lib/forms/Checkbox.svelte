<script lang="ts">
	/**
	 * Pure Admin Checkbox Component (Svelte 5)
	 * Based on @pure-admin/core snippets/forms.html
	 */

	interface Props {
		/** Checkbox checked state */
		checked?: boolean;
		/** Disabled state */
		disabled?: boolean;
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
		/** Label snippet (alternative to label prop) */
		labelSnippet?: import('svelte').Snippet;
		/** Change handler */
		onChange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
	}

	let {
		checked = $bindable(false),
		disabled = false,
		id,
		name,
		value,
		label,
		class: className = '',
		labelSnippet,
		onChange
	}: Props = $props();

	// Build class string for wrapper
	const wrapperClasses = $derived(() => {
		const base = ['pa-form-check'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={wrapperClasses()}>
	<input
		type="checkbox"
		class="pa-checkbox"
		bind:checked
		{id}
		{name}
		{value}
		{disabled}
		onchange={onChange}
	/>
	{#if labelSnippet}
		<label class="pa-form-check-label" for={id}>
			{@render labelSnippet()}
		</label>
	{:else if label}
		<label class="pa-form-check-label" for={id}>
			{label}
		</label>
	{/if}
</div>
