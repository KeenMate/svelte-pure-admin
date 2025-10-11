<script lang="ts">
	/**
	 * Pure Admin SmallText Component (Svelte 5)
	 * Based on @pure-admin/core snippets/forms.html
	 * For form help text and validation messages
	 */

	type TextAccent = 'success' | 'error' | 'warning' | 'info';

	interface Props {
		/** Text accent/variant */
		accent?: TextAccent;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		accent,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-form-text'];
		if (accent) base.push(`pa-form-text--${accent}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<small class={classes()}>
	{@render children?.()}
</small>
