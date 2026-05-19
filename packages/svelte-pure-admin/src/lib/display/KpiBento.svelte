<script lang="ts">
	/**
	 * Pure Admin KPI Bento (Svelte 5)
	 * Based on @keenmate/pure-admin-core 2.7.1 _kpi-bento.scss
	 *
	 * Magazine-style asymmetric tile sizing. 6 tiles arranged on a 6-col × 3-row
	 * grid (hero left-half × 2 rows, two stacked right-half × 2 rows, three
	 * equal tiles bottom row). Tile placement is by source order via :nth-child
	 * — pass tiles in this order: hero, a, b, c, d, e.
	 * Container query collapses to single-column under 700px.
	 */

	interface Props {
		/** Card title in the header. */
		titleText?: string;
		/** Show the LIVE pill (animated green dot) next to the title. */
		isLive?: boolean;
		/** Footer caption (plain string). Override via the `footer` snippet for richer markup. */
		footerText?: string;
		/** Additional CSS classes appended to the card. */
		class?: string;
		/** Tile content — pass 6 KpiBentoTile instances in order: hero, a, b, c, d, e. */
		children?: import('svelte').Snippet;
		/** Footer snippet override. Takes precedence over `footerText`. */
		footer?: import('svelte').Snippet;
	}

	let {
		titleText,
		isLive = false,
		footerText,
		class: className = '',
		children,
		footer
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-card', 'pa-kpi-bento'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if titleText || isLive}
		<div class="pa-card__header pa-kpi-header">
			{#if titleText}<h3>{titleText}</h3>{/if}
			{#if isLive}
				<span class="pa-kpi-live"><span class="pa-kpi-live__dot"></span>LIVE</span>
			{/if}
		</div>
	{/if}

	<div class="pa-card__body pa-kpi-bento__body">
		<div class="pa-kpi-bento__grid">
			{@render children?.()}
		</div>
	</div>

	{#if footer || footerText}
		<div class="pa-card__footer pa-kpi-footer">
			{#if footer}
				{@render footer()}
			{:else}
				<span>{footerText}</span>
			{/if}
		</div>
	{/if}
</div>
