<script lang="ts">
	/**
	 * Pure Admin SmallText Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 * For form help text and validation messages
	 */

	// Core help text has only --error/--success/--warning (+ --color-{1..9}); no --info.
	type TextAccent = 'error' | 'success' | 'warning';

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
		const base = ['pa-form-help'];
		if (accent) base.push(`pa-form-help--${accent}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<small class={classes()}>
	{@render children?.()}
</small>
