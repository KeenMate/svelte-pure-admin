<script lang="ts">
	/**
	 * Pure Admin TableResponsive Component (Svelte 5)
	 *
	 * @deprecated Emits `<div class="pa-table-responsive">`, but core defines NO
	 * such class (grep of the compiled CSS = 0) — so this wrapper is a no-op that
	 * makes nothing responsive. Responsiveness in core is a modifier on the
	 * `<table>` itself, not a wrapper (see snippets/tables.html). Migrate to:
	 *   • `<Table isResponsive>` (+ `data-label` on each `<td>`) — mobile rows
	 *     collapse to labelled cards; or
	 *   • `<TableContainer>` — a framed wrapper with horizontal scroll on overflow.
	 * Kept rendering unchanged as legacy tolerance; slated for removal in a future
	 * major.
	 */

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	// NOTE: `pa-table-responsive` is a phantom class (no core CSS). Retained only
	// so existing markup doesn't break; see the @deprecated note above.
	const classes = $derived(() => {
		const base = ['pa-table-responsive'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
