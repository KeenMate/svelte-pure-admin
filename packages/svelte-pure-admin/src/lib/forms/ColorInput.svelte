<script lang="ts">
	/**
	 * Pure Admin ColorInput Component (Svelte 5)
	 * Specialized input for color selection
	 */

	type InputSize = 'xs' | 'sm' | 'lg' | 'xl';

	interface Props {
		/** Color value as hex string (bindable) */
		value?: string;
		/** Input size */
		size?: InputSize;
		/** Disabled state */
		disabled?: boolean;
		/** Input ID */
		id?: string;
		/** Input name */
		name?: string;
		/** Show hex value next to picker */
		showValue?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Input handler */
		oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
		/** Change handler */
		onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
	}

	let {
		value = $bindable('#000000'),
		size,
		disabled = false,
		id,
		name,
		showValue = false,
		class: className = '',
		oninput,
		onchange
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-input', 'pa-input--color'];
		if (size) base.push(`pa-input--${size}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

{#if showValue}
	<div class="pa-color-wrapper">
		<input
			type="color"
			bind:value
			{id}
			{name}
			{disabled}
			class={classes()}
			{oninput}
			{onchange}
		/>
		<span class="pa-color-value">{value}</span>
	</div>
{:else}
	<input
		type="color"
		bind:value
		{id}
		{name}
		{disabled}
		class={classes()}
		{oninput}
		{onchange}
	/>
{/if}
