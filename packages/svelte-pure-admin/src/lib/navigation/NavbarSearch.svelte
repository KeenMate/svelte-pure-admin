<script lang="ts">
	/**
	 * NavbarSearch Component
	 *
	 * A search input that opens the CommandPalette when clicked.
	 * Shows a visual hint for the keyboard shortcut.
	 */

	import { _ } from '../i18n';

	type NavbarSearchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	interface Props {
		/** Placeholder text */
		placeholder?: string;
		/** Size variant (matches input sizes) */
		size?: NavbarSearchSize;
		/** Click handler (typically opens command palette) */
		onclick?: () => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		placeholder = 'Search...',
		size = 'lg',
		onclick,
		class: className = ''
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-navbar-search'];
		if (size) base.push(`pa-navbar-search--${size}`);
		if (className) base.push(className);
		return base.join(' ');
	});

	function handleClick() {
		onclick?.();
	}

	function handleKeyDown(event: KeyboardEvent) {
		// Allow Enter or Space to trigger
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onclick?.();
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={classes()}
	onclick={handleClick}
	onkeydown={handleKeyDown}
	tabindex="0"
	role="button"
	aria-label={$_('pureAdmin.a11y.openSearch')}
>
	<span class="pa-navbar-search__icon">🔍</span>
	<span class="pa-navbar-search__placeholder">{placeholder}</span>
	<span class="pa-navbar-search__shortcut">
		<kbd>Ctrl</kbd>
		<kbd>K</kbd>
	</span>
</div>
