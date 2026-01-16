<script lang="ts">
	/**
	 * Pure Admin RadioGroup Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 *
	 * Wrapper for grouping radio buttons:
	 * <div class="pa-radio-group">
	 *   <Radio ... />
	 *   <Radio ... />
	 * </div>
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content (Radio components) */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-radio-group'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
