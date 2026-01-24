<script lang="ts">
	/**
	 * Pure Admin FileInput Component (Svelte 5)
	 * Specialized input for file uploads
	 */

	import type { ThemeColor } from '../types';

	type InputSize = 'xs' | 'sm' | 'lg' | 'xl';
	type InputState = 'success' | 'warning' | 'error';

	interface Props {
		/** Selected files (bindable) */
		files?: FileList | null;
		/** Input size */
		size?: InputSize;
		/** Validation state */
		state?: InputState;
		/** Theme color variant (1-9) */
		themeColor?: ThemeColor;
		/** Disabled state */
		disabled?: boolean;
		/** Required field */
		required?: boolean;
		/** Input ID */
		id?: string;
		/** Input name */
		name?: string;
		/** Accepted file types (e.g., '.pdf,.doc', 'image/*', 'audio/*') */
		accept?: string;
		/** Allow multiple file selection */
		multiple?: boolean;
		/** Use camera/microphone capture (mobile) */
		capture?: 'user' | 'environment';
		/** Additional CSS classes */
		class?: string;
		/** Change handler */
		onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
	}

	let {
		files = $bindable(null),
		size,
		state,
		themeColor,
		disabled = false,
		required = false,
		id,
		name,
		accept,
		multiple = false,
		capture,
		class: className = '',
		onchange
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-input', 'pa-input--file'];
		if (size) base.push(`pa-input--${size}`);
		if (state) base.push(`pa-input--${state}`);
		if (themeColor) base.push(`pa-input--color-${themeColor}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<input
	type="file"
	bind:files
	{id}
	{name}
	{accept}
	{multiple}
	{capture}
	{disabled}
	{required}
	class={classes()}
	{onchange}
/>
