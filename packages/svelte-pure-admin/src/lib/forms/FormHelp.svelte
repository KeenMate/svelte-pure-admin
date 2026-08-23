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

	import type { ThemeColor } from '../types';

	// Core defines only --error / --success / --warning (plus --color-N via
	// themeColor); there is no `.pa-form-help--info` (see snippets/forms.html).
	type HelpVariant = 'error' | 'success' | 'warning';

	interface Props {
		/** Help text variant */
		variant?: HelpVariant;
		/** Theme color variant (1-9) — applies pa-form-help--color-N */
		themeColor?: ThemeColor;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let {
		variant,
		themeColor,
		class: className = '',
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-form-help'];
		if (variant) base.push(`pa-form-help--${variant}`);
		if (themeColor) base.push(`pa-form-help--color-${themeColor}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<span class={classes()}>
	{@render children?.()}
</span>
