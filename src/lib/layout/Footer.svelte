<script lang="ts">
	/**
	 * Pure Admin Footer Component (Svelte 5)
	 * Based on @pure-admin/core snippets/layout.html
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['admin-footer'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<footer class={classes()}>
	<div class="admin-footer__content">
		{@render children?.()}
	</div>
</footer>
