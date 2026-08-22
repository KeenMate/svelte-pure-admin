<script lang="ts">
	/**
	 * NavbarSearchInput — "type-and-go" navbar search (core `.pa-navbar-search--input`,
	 * v2.9.0-rc15). A real `<input>` in the pill shell wrapped in a `<form>` whose
	 * native GET submit navigates to a results page on Enter — NO dropdown, NO palette.
	 *
	 * Contrast the other two navbar search shapes: `NavbarSearch` (a pill that opens the
	 * command palette) and `NavbarSearchField` (live in-place results). This one is the
	 * simplest: a plain form. Point `action` at your search route and `name` becomes the
	 * query param (e.g. `?q=…`); the consumer's results page (see `SearchResults`) renders
	 * the response. A single text field submits on Enter with no submit button.
	 */
	import { _ } from '../i18n';

	interface Props {
		/** Form target — your search results route (e.g. `/search`). */
		action: string;
		/** HTTP method (default `get`, so the query lands in the URL). */
		method?: 'get' | 'post';
		/** Query field name — becomes the URL param (default `q`). */
		name?: string;
		/** Bound query text. */
		value?: string;
		/** Placeholder for the input. */
		placeholder?: string;
		/** Additional CSS classes on the form shell. */
		class?: string;
	}

	let {
		action,
		method = 'get',
		name = 'q',
		value = $bindable(''),
		placeholder = 'Search...',
		class: className = ''
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-navbar-search', 'pa-navbar-search--input'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<form class={classes()} {action} {method} role="search">
	<span class="pa-navbar-search__icon" aria-hidden="true">🔍</span>
	<input
		type="search"
		{name}
		class="pa-navbar-search__field"
		bind:value
		{placeholder}
		autocomplete="off"
		aria-label={$_('pureAdmin.a11y.openSearch')}
	/>
</form>
