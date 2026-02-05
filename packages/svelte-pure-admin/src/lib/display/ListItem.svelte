<script lang="ts">
	/**
	 * Pure Admin ListItem Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core scss/core-components/_lists.scss
	 */

	interface Props {
		/** Title text */
		titleText?: string;
		/** Subtitle text */
		subtitleText?: string;
		/** Meta text */
		metaText?: string;
		/** Avatar content (string) or snippet */
		avatar?: string | import('svelte').Snippet;
		/** Additional CSS classes */
		class?: string;
		/** Content snippet (for custom layouts) */
		children?: import('svelte').Snippet;
	}

	let { titleText, subtitleText, metaText, class: className = '', avatar, children }: Props = $props();

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
			{#if titleText}
				<div class="pa-list__title">{titleText}</div>
			{/if}
			{#if subtitleText}
				<div class="pa-list__subtitle">{subtitleText}</div>
			{/if}
			{#if metaText}
				<div class="pa-list__meta">{metaText}</div>
			{/if}
		</div>
	{/if}
</div>
