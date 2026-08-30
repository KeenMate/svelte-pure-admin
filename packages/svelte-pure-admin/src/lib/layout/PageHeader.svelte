<script lang="ts">
	/**
	 * PageHeader — the page-title block (`.pc-page-header`) for a `Navbar` zone
	 * (typically CENTER). A thin structural wrapper (core gives it truncation /
	 * flexing); to have the title degrade as the header narrows, wrap it in a
	 * `FitSlot` (e.g. a `steps` ladder, long title → short → gone).
	 */
	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Title content (usually an `<h2>` / `Heading`) */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const classes = $derived(() => {
		const base = ['pc-page-header'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
