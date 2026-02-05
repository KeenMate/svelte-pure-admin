<script lang="ts">
	/**
	 * Pure Admin ProfilePanelFavoriteItem Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/profile.html
	 * Renders a favorite item in the profile panel favorites tab
	 */

	import { _ } from '../i18n';

	interface Props {
		/** Navigation href (uses data-href pattern for click handling) */
		href?: string;
		/** Icon snippet */
		icon?: import('svelte').Snippet;
		/** Label text */
		labelText: string;
		/** Show remove button */
		removable?: boolean;
		/** Click handler */
		onclick?: () => void;
		/** Remove callback */
		onremove?: () => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		href,
		icon,
		labelText,
		removable = true,
		onclick,
		onremove,
		class: className = ''
	}: Props = $props();

	// Build class string for item
	const classes = $derived(() => {
		const base = ['pa-profile-panel__favorite-item'];
		if (className) base.push(className);
		return base.join(' ');
	});

	function handleClick() {
		if (onclick) {
			onclick();
		} else if (href) {
			window.location.href = href;
		}
	}

	function handleRemove(e: MouseEvent) {
		e.stopPropagation();
		if (onremove) onremove();
	}
</script>

<li>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class={classes()} data-href={href} onclick={handleClick}>
		{#if icon}
			<span class="pa-profile-panel__favorite-icon">{@render icon()}</span>
		{/if}
		<span class="pa-profile-panel__favorite-label">{labelText}</span>
		{#if removable}
			<button
				class="pa-profile-panel__favorite-remove"
				title={$_('pureAdmin.a11y.removeFromFavorites')}
				onclick={handleRemove}
			>
				✕
			</button>
		{/if}
	</div>
</li>
