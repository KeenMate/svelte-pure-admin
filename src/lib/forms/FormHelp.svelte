<script lang="ts">
	/**
	 * Pure Admin FormHelp Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 *
	 * For form help text and validation messages:
	 * <span class="pa-form-help">Help text</span>
	 * <span class="pa-form-help pa-form-help--error">Error message</span>
	 * <span class="pa-form-help pa-form-help--success">Success message</span>
	 */

	type HelpVariant = 'error' | 'success' | 'warning' | 'info';

	interface Props {
		/** Help text variant */
		variant?: HelpVariant;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		variant,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-form-help'];
		if (variant) base.push(`pa-form-help--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<span class={classes()}>
	{@render children?.()}
</span>
