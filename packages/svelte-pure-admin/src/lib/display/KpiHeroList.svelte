<script lang="ts" module>
	/** Split-ratio modifier for the hero / rail layout. Default (omitted) is 1:1. */
	export type KpiHeroSplit = '2-3' | '3-4';
</script>

<script lang="ts">
	/**
	 * Pure Admin KPI Hero + Supporting (Svelte 5)
	 * Based on @keenmate/pure-admin-core 2.7.2 _kpi-hero-supporting.scss
	 *
	 * Marketing/exec dashboard pattern: one headline metric on the left (huge
	 * value, meta row, big filled-area sparkline) and a vertical rail of
	 * compact supporting tiles on the right. Pass the hero as the first child
	 * (KpiHeroMain) and supporting tiles inside the `rail` snippet (KpiHeroSide
	 * instances). Container query collapses to single column under 700px.
	 *
	 * `heroSplit` shifts weight onto the hero — `'2-3'` (hero 2/3, rail 1/3)
	 * or `'3-4'` (hero 3/4, rail thin sidebar). Default (omitted) is 1:1.
	 */

	interface Props {
		/** Card title in the header. */
		titleText?: string;
		/** Show the LIVE pill (animated green dot) next to the title. */
		isLive?: boolean;
		/** Footer caption (plain string). Override via the `footer` snippet for richer markup. */
		footerText?: string;
		/**
		 * Hero / rail split-ratio modifier. Default (omitted) is 1:1 (50/50).
		 * `'2-3'` gives the hero 2/3 of the width; `'3-4'` gives the hero 3/4 (rail = thin sidebar).
		 */
		heroSplit?: KpiHeroSplit;
		/** Additional CSS classes appended to the card. */
		class?: string;
		/** Hero panel content (typically a single KpiHeroMain). */
		children?: import('svelte').Snippet;
		/** Right-side rail content (typically multiple KpiHeroSide tiles). */
		rail?: import('svelte').Snippet;
		/** Footer snippet override. Takes precedence over `footerText`. */
		footer?: import('svelte').Snippet;
	}

	let {
		titleText,
		isLive = false,
		footerText,
		heroSplit,
		class: className = '',
		children,
		rail,
		footer
	}: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-card', 'pa-kpi-hero-list'];
		if (className) base.push(className);
		return base.join(' ');
	});

	const layoutClasses = $derived(() => {
		const base = ['pa-kpi-hero-list__layout'];
		if (heroSplit) base.push(`pa-kpi-hero-list__layout--hero-${heroSplit}`);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if titleText || isLive}
		<div class="pa-card__header pa-kpi-header">
			{#if titleText}<div class="pa-card__title"><h3 class="pa-card__title-text">{titleText}</h3></div>{/if}
			{#if isLive}
				<span class="pa-kpi-live"><span class="pa-kpi-live__dot"></span>LIVE</span>
			{/if}
		</div>
	{/if}

	<div class="pa-card__body pa-kpi-hero-list__body">
		<div class={layoutClasses()}>
			{@render children?.()}
			{#if rail}
				<div class="pa-kpi-hero-list__rail">{@render rail()}</div>
			{/if}
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
