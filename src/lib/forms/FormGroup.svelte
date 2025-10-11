<script lang="ts">
	/**
	 * Pure Admin FormGroup Component (Svelte 5)
	 * Based on @pure-admin/core snippets/forms.html
	 */

	interface Props {
		/** Has validation error */
		hasError?: boolean;
		/** Has validation success */
		hasSuccess?: boolean;
		/** Mark as required */
		isRequired?: boolean;
		/** Horizontal layout (label left, input right) */
		horizontal?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		hasError = false,
		hasSuccess = false,
		isRequired = false,
		horizontal = false,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-form-group'];
		if (hasSuccess) base.push('pa-form-group--success');
		if (hasError) base.push('pa-form-group--error');
		if (isRequired) base.push('pa-form-group--required');
		if (horizontal) base.push('pa-form-group--horizontal');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
