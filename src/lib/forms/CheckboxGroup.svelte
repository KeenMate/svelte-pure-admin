<script lang="ts">
	/**
	 * Pure Admin CheckboxGroup Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 *
	 * Wrapper for grouping checkboxes:
	 * <div class="pa-checkbox-group">
	 *   <Checkbox ... />
	 *   <Checkbox ... />
	 * </div>
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content (Checkbox components) */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-checkbox-group'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
