<script lang="ts">
	/**
	 * NavbarSearch Component
	 *
	 * A search input that opens the CommandPalette when clicked.
	 * Shows a visual hint for the keyboard shortcut.
	 */

	import { _ } from '../i18n';

	interface Props {
		/** Placeholder text */
		placeholder?: string;
		/** Click handler (typically opens command palette) */
		onclick?: () => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		placeholder = 'Search...',
		onclick,
		class: className = ''
	}: Props = $props();

	// Core defines no size modifiers for the pill trigger — only `--field` and
	// `--input` exist (see core `_command-palette.scss`). The trigger is the base
	// `.pa-navbar-search`; a consumer sizes the zone via `class` if needed.
	const classes = $derived(() => {
		const base = ['pa-navbar-search'];
		if (className) base.push(className);
		return base.join(' ');
	});

	function handleClick() {
		onclick?.();
	}
</script>

<!-- A real <button> (mirrors the core demo's trigger) — focus + Enter/Space for free. -->
<button
	type="button"
	class={classes()}
	onclick={handleClick}
	aria-label={$_('pureAdmin.a11y.openSearch')}
>
	<span class="pa-navbar-search__icon">🔍</span>
	<span class="pa-navbar-search__placeholder">{placeholder}</span>
	<span class="pa-navbar-search__shortcut">
		<kbd>Ctrl</kbd>
		<kbd>K</kbd>
	</span>
</button>
