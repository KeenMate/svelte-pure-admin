<script lang="ts">
	/**
	 * Pure Admin ProfilePanelFavorites Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/profile.html
	 * Container for favorites list in the profile panel
	 */

	interface Props {
		/** Favorites items snippet (use ProfilePanelFavoriteItem) */
		children?: import('svelte').Snippet;
		/** Add button snippet */
		addButton?: import('svelte').Snippet;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		children,
		addButton,
		class: className = ''
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-profile-panel__favorites'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	<ul>
		{@render children?.()}
	</ul>
</div>

{#if addButton}
	<div class="pa-profile-panel__favorites-add">
		{@render addButton()}
	</div>
{/if}
