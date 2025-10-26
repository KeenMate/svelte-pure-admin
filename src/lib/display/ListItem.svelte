<script lang="ts">
	/**
	 * Pure Admin ListItem Component (Svelte 5)
	 * Based on @pure-admin/core scss/core-components/_lists.scss
	 */

	interface Props {
		/** Title text */
		title?: string;
		/** Subtitle text */
		subtitle?: string;
		/** Meta text */
		meta?: string;
		/** Avatar content (string) or snippet */
		avatar?: string | import('svelte').Snippet;
		/** Additional CSS classes */
		class?: string;
		/** Content snippet (for custom layouts) */
		children?: import('svelte').Snippet;
	}

	let { title, subtitle, meta, class: className = '', avatar, children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-list__item'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if avatar}
		<div class="pa-list__avatar">
			{#if typeof avatar === 'string'}
				{avatar}
			{:else}
				{@render avatar()}
			{/if}
		</div>
	{/if}
	{#if children}
		{@render children()}
	{:else}
		<div class="pa-list__content">
			{#if title}
				<div class="pa-list__title">{title}</div>
			{/if}
			{#if subtitle}
				<div class="pa-list__subtitle">{subtitle}</div>
			{/if}
			{#if meta}
				<div class="pa-list__meta">{meta}</div>
			{/if}
		</div>
	{/if}
</div>
