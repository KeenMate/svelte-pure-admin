<script lang="ts">
	/**
	 * Pure Admin FormGroup Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 */

	type ValidationState = 'success' | 'warning' | 'error';

	interface Props {
		/** Validation state (success, warning, error) */
		state?: ValidationState;
		/** Has validation error (legacy, prefer state prop) */
		isError?: boolean;
		/** Has validation success (legacy, prefer state prop) */
		isSuccess?: boolean;
		/** Horizontal layout (label left, input right) */
		isHorizontal?: boolean;
		/** Horizontal layout - alias for isHorizontal */
		horizontal?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		state,
		isError = false,
		isSuccess = false,
		isHorizontal = false,
		horizontal = false,
		class: className = '',
		children
	}: Props = $props();

	// Merge horizontal props (horizontal is alias for isHorizontal)
	const effectiveHorizontal = $derived(isHorizontal || horizontal);

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-form-group'];
		// New state prop takes precedence
		if (state) {
			base.push(`pa-form-group--${state}`);
		} else {
			// Legacy boolean props
			if (isSuccess) base.push('pa-form-group--success');
			if (isError) base.push('pa-form-group--error');
		}
		// Core has no `.pa-form-group--required` — required is the native
		// `required` attribute on the control, which core's
		// `:has(:required) > label::after` turns into the label asterisk.
		if (effectiveHorizontal) base.push('pa-form-group--horizontal');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
