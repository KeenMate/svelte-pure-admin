<script lang="ts">
	/**
	 * Pure Admin InputGroup Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/forms.html
	 */

	interface Props {
		/** Size variant - should match the size of inputs inside */
		size?: 'xs' | 'sm' | 'lg' | 'xl';
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { size, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-input-group'];
		if (size) base.push(`pa-input-group--${size}`);
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
