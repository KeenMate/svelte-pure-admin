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
		hasError?: boolean;
		/** Has validation success (legacy, prefer state prop) */
		hasSuccess?: boolean;
		/** Mark as required */
		isRequired?: boolean;
		/** Horizontal layout (label left, input right) */
		isHorizontal?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		state,
		hasError = false,
		hasSuccess = false,
		isRequired = false,
		isHorizontal = false,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-form-group'];
		// New state prop takes precedence
		if (state) {
			base.push(`pa-form-group--${state}`);
		} else {
			// Legacy boolean props
			if (hasSuccess) base.push('pa-form-group--success');
			if (hasError) base.push('pa-form-group--error');
		}
		if (isRequired) base.push('pa-form-group--required');
		if (isHorizontal) base.push('pa-form-group--horizontal');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
