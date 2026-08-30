<script lang="ts">
	import { page } from '$app/stores';
	import { SearchResults } from '@keenmate/svelte-pure-admin';
	import type { SearchResult } from '@keenmate/svelte-pure-admin';
	import { searchPages } from '$lib/pages';

	// The type-and-go destination: the navbar/sidebar --input variants submit a GET
	// form here, so the query lives in ?q= and results recompute reactively.
	const query = $derived($page.url.searchParams.get('q') ?? '');
	const results = $derived<SearchResult[]>(
		searchPages(query).map((p) => ({
			id: p.id,
			title: p.title,
			subtitle: p.path,
			icon: p.icon,
			type: 'Page',
			href: p.path
		}))
	);
</script>

<div class="pa-page-content">
	<h1>Search</h1>
	{#if query}
		<p class="text-muted">
			{results.length} result{results.length === 1 ? '' : 's'} for “{query}”.
		</p>
		<SearchResults {results} variant="detailed" emptyText="No pages match your search." />
	{:else}
		<p class="text-muted">Type a query in the search box to find pages.</p>
	{/if}
</div>
