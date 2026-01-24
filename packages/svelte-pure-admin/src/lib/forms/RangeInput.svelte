<script lang="ts">
	/**
	 * Pure Admin RangeInput Component (Svelte 5)
	 * Specialized input for range sliders
	 */

	import type { ThemeColor } from '../types';

	type InputSize = 'xs' | 'sm' | 'lg' | 'xl';
	type InputState = 'success' | 'warning' | 'error';

	interface Props {
		/** Current value (bindable) */
		value?: number;
		/** Input size */
		size?: InputSize;
		/** Validation state */
		state?: InputState;
		/** Theme color variant (1-9) */
		themeColor?: ThemeColor;
		/** Disabled state */
		disabled?: boolean;
		/** Input ID */
		id?: string;
		/** Input name */
		name?: string;
		/** Minimum value */
		min?: number;
		/** Maximum value */
		max?: number;
		/** Step increment */
		step?: number | 'any';
		/** Show value label */
		showValue?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Input handler */
		oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
		/** Change handler */
		onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
	}

	let {
		value = $bindable(50),
		size,
		state,
		themeColor,
		disabled = false,
		id,
		name,
		min = 0,
		max = 100,
		step = 1,
		showValue = false,
		class: className = '',
		oninput,
		onchange
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-input', 'pa-input--range'];
		if (size) base.push(`pa-input--${size}`);
		if (state) base.push(`pa-input--${state}`);
		if (themeColor) base.push(`pa-input--color-${themeColor}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

{#if showValue}
	<div class="pa-range-wrapper">
		<input
			type="range"
			bind:value
			{id}
			{name}
			{min}
			{max}
			{step}
			{disabled}
			class={classes()}
			{oninput}
			{onchange}
		/>
		<span class="pa-range-value">{value}</span>
	</div>
{:else}
	<input
		type="range"
		bind:value
		{id}
		{name}
		{min}
		{max}
		{step}
		{disabled}
		class={classes()}
		{oninput}
		{onchange}
	/>
{/if}
