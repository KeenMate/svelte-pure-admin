<script lang="ts">
	/**
	 * Pure Admin Dot Leaders Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core _data-display.scss
	 *
	 * Restaurant menu / invoice style with dotted lines connecting label to value.
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** DotLeadersItem children */
		children?: import('svelte').Snippet;
	}

	let {
		class: className = '',
		children
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-dot-leaders'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
