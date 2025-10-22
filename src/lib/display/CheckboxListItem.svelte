<script lang="ts">
	/**
	 * Pure Admin CheckboxListItem Component (Svelte 5)
	 * Based on @pure-admin/core snippets/checkbox-lists.html
	 * Individual checkbox list item with label, description, and actions
	 */

	type ItemState = 'disabled' | 'locked';

	interface Props {
		/** Checkbox ID (required for label association) */
		id: string;
		/** Checkbox label text */
		label: string;
		/** Optional description text */
		description?: string;
		/** Item state */
		state?: ItemState;
		/** Checked state (bindable) */
		checked?: boolean;
		/** Disabled state */
		disabled?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Change event handler */
		onChange?: (checked: boolean) => void;
		/** Actions snippet (buttons, etc.) */
		actions?: import('svelte').Snippet;
	}

	let {
		id,
		label,
		description,
		state,
		checked = $bindable(false),
		disabled = false,
		class: className = '',
		onChange,
		actions
	}: Props = $props();

	// Build class string for item
	const itemClasses = $derived(() => {
		const base = ['pa-checkbox-list__item'];

		// State modifiers
		if (state === 'disabled') base.push('pa-checkbox-list__item--disabled');
		if (state === 'locked') base.push('pa-checkbox-list__item--locked');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});

	// Handle checkbox change
	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		checked = target.checked;
		onChange?.(checked);
	}

	// Determine if checkbox should be disabled
	const isDisabled = $derived(disabled || state === 'disabled' || state === 'locked');
</script>

<li class={itemClasses()}>
	{#if description}
		<!-- With description: checkbox first, then label with description -->
		<input
			type="checkbox"
			class="pa-checkbox-list__checkbox"
			{id}
			bind:checked
			disabled={isDisabled}
			onchange={handleChange}
		/>
		<label class="pa-checkbox-list__label" for={id}>
			{label}
			<span class="pa-checkbox-list__description">{description}</span>
		</label>
	{:else}
		<!-- Without description: label wraps checkbox -->
		<label class="pa-checkbox-list__label">
			<input
				type="checkbox"
				class="pa-checkbox-list__checkbox"
				{id}
				bind:checked
				disabled={isDisabled}
				onchange={handleChange}
			/>
			<span class="pa-checkbox-list__text">{label}</span>
		</label>
	{/if}

	{#if actions}
		<div class="pa-checkbox-list__actions">
			{@render actions()}
		</div>
	{/if}
</li>
