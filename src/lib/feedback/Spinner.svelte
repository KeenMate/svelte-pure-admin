<script lang="ts">
	/**
	 * Pure Admin Spinner Component (Svelte 5)
	 * Based on @pure-admin/core snippets/loaders.html
	 */

	type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	type SpinnerVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

	interface Props {
		/** Spinner size */
		size?: SpinnerSize;
		/** Spinner variant/color */
		variant?: SpinnerVariant;
		/** Additional CSS classes */
		class?: string;
	}

	let { size, variant, class: className = '' }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-spinner'];
		if (size) base.push(`pa-spinner--${size}`);
		if (variant) base.push(`pa-spinner--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}></div>
