<script lang="ts">
	/**
	 * Pure Admin Radio Component (Svelte 5)
	 * Based on @pure-admin/core snippets/forms.html
	 */

	interface Props {
		/** Radio group value */
		group?: string | number;
		/** Radio value */
		value: string | number;
		/** Disabled state */
		disabled?: boolean;
		/** Radio ID (required for label association) */
		id: string;
		/** Radio name (group name) */
		name: string;
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
		group = $bindable(),
		value,
		disabled = false,
		id,
		name,
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
		type="radio"
		class="pa-radio"
		bind:group
		{value}
		{id}
		{name}
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
