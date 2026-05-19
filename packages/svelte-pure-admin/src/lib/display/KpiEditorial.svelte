<script lang="ts">
	/**
	 * Pure Admin KPI Editorial Minimal (Svelte 5)
	 * Based on @keenmate/pure-admin-core 2.7.1 _kpi-editorial-minimal.scss
	 * + demo/views/kpi-editorial-minimal.mustache
	 *
	 * Magazine-cover restraint — N×M grid of tiles with hairline rules between
	 * cells, light-weight numerals, no charts. Wrap tiles in this card and
	 * use KpiEditorialTile for each cell.
	 */

	interface Props {
		/** Card title in the header. */
		titleText?: string;
		/** Show the LIVE pill (animated green dot) next to the title. */
		isLive?: boolean;
		/** Footer caption (plain string). Override via the `footer` snippet for richer markup. */
		footerText?: string;
		/** Force 2-column grid (`pa-kpi-edit__grid--2col`) regardless of card width. */
		is2Columns?: boolean;
		/** Additional CSS classes appended to the card. */
		class?: string;
		/** Tile content (KpiEditorialTile instances). */
		children?: import('svelte').Snippet;
		/** Footer snippet override. Takes precedence over `footerText`. */
		footer?: import('svelte').Snippet;
	}

	let {
		titleText,
		isLive = false,
		footerText,
		is2Columns = false,
		class: className = '',
		children,
		footer
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-card', 'pa-kpi-edit'];
		if (className) base.push(className);
		return base.join(' ');
	});

	const gridClasses = $derived(() => {
		const base = ['pa-kpi-edit__grid'];
		if (is2Columns) base.push('pa-kpi-edit__grid--2col');
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

	<div class="pa-card__body pa-kpi-edit__body">
		<div class={gridClasses()}>
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
