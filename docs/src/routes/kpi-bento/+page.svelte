<script lang="ts">
	import {
		Paragraph,
		Card,
		Code,
		BasicList,
		KpiBento,
		KpiBentoTile
	} from '@keenmate/svelte-pure-admin';

	// Sparkline shapes — kept as constants to keep the markup tidy
	const sparks = {
		completion: '0,18 12,16 24,17 36,12 48,15 60,9 72,11 84,7 96,5',
		revenue:    '0,20 12,19 24,17 36,14 48,11 60,9 72,7 84,5 96,4',
		serverTemp: '0,17 12,16 24,15 36,13 48,12 60,10 72,9 84,7 96,6',
		capacity:   '0,15 12,12 24,16 36,9 48,13 60,7 72,11 84,5 96,9',
		errorRate:  '0,7 12,9 24,8 36,11 48,10 60,12 72,11 84,13 96,15',
		tokyo:      '0,14 12,11 24,15 36,9 48,13 60,8 72,12 84,10 96,9'
	};
	const polygons = {
		completion: '0,18 12,16 24,17 36,12 48,15 60,9 72,11 84,7 96,5 100,24 0,24',
		revenue:    '0,20 12,19 24,17 36,14 48,11 60,9 72,7 84,5 96,4 100,24 0,24',
		serverTemp: '0,17 12,16 24,15 36,13 48,12 60,10 72,9 84,7 96,6 100,24 0,24',
		capacity:   '0,15 12,12 24,16 36,9 48,13 60,7 72,11 84,5 96,9 100,24 0,24',
		errorRate:  '0,7 12,9 24,8 36,11 48,10 60,12 72,11 84,13 96,15 100,24 0,24',
		tokyo:      '0,14 12,11 24,15 36,9 48,13 60,8 72,12 84,10 96,9 100,24 0,24'
	};
</script>

<Paragraph>
	"Bento" KPI layout — magazine-style asymmetric tile sizing with sparklines as soft background fills behind the values.
	Six tiles arranged on a 6-col × 3-row grid: one hero (left-half × 2 rows), two stacked (right-half × 2 rows),
	three equal tiles in the bottom row. Pass tiles in order — placement is by source order via <Code>:nth-child</Code>.
	Container query collapses to single-column under 700 px.
</Paragraph>

<KpiBento
	titleText="Key Performance Indicators"
	isLive
	footerText="Bento layout — Asymmetric sizing, sparklines behind values, hero left."
>
	<KpiBentoTile
		isHero
		variant="up-strong"
		labelText="Monthly Revenue"
		prefix="$"
		valueText="871"
		unit="K"
		deltaText="+15.8%"
		detailTitleText="Monthly Revenue · 12MO"
		previousValueText="$752K"
		targetText="$900K"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={polygons.revenue} />
				<polyline points={sparks.revenue} />
			</svg>
		{/snippet}
	</KpiBentoTile>

	<KpiBentoTile
		variant="positive"
		labelText="Completion Rate"
		valueText="87.9"
		unit="%"
		deltaText="+4.4%"
		detailTitleText="Completion Rate · 30D"
		targetText="90.0%"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={polygons.completion} />
				<polyline points={sparks.completion} />
			</svg>
		{/snippet}
	</KpiBentoTile>

	<KpiBentoTile
		variant="negative"
		labelText="Server Temp"
		valueText="25.0"
		unit="°C"
		deltaText="+1.9%"
		detailTitleText="Server Temp · 24H"
		targetText="≤ 25°C"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={polygons.serverTemp} />
				<polyline points={sparks.serverTemp} />
			</svg>
		{/snippet}
	</KpiBentoTile>

	<KpiBentoTile
		variant="up-strong"
		labelText="Server Capacity"
		valueText="86.8"
		unit="%"
		deltaText="+22.2%"
		detailTitleText="Server Capacity · 7D"
		targetText="80.0%"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={polygons.capacity} />
				<polyline points={sparks.capacity} />
			</svg>
		{/snippet}
	</KpiBentoTile>

	<KpiBentoTile
		variant="up-strong"
		labelText="Error Rate"
		valueText="0.28"
		unit="%"
		deltaText="-32.6%"
		detailTitleText="Error Rate · 24H"
		targetText="≤ 0.50%"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={polygons.errorRate} />
				<polyline points={sparks.errorRate} />
			</svg>
		{/snippet}
	</KpiBentoTile>

	<KpiBentoTile
		variant="positive"
		labelText="Tokyo Office"
		prefix="¥"
		valueText="12.1"
		unit="M"
		deltaText="+8.5%"
		detailTitleText="Tokyo Office · 12MO"
		targetText="¥13.0M"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={polygons.tokyo} />
				<polyline points={sparks.tokyo} />
			</svg>
		{/snippet}
	</KpiBentoTile>

	{#snippet footer()}
		<span><strong>Bento layout</strong> — Asymmetric tile sizing, sparklines behind values, hero left-half × 2 rows.</span>
		<span>Hover any KPI for detail</span>
	{/snippet}
</KpiBento>

<br />

<Card titleText="Usage Guide">
	<h4>When to use</h4>
	<Paragraph>
		Editorial-feeling dashboards where one KPI is the headline and the rest are supporting. The hero tile gets a
		container-query-relative value so it scales gracefully across page-grid widths. The asymmetric layout reads
		as "magazine cover": the eye lands on the hero first, then sweeps right and down through the supporting tiles.
	</Paragraph>

	<h4 class="mt-4">Tile order matters</h4>
	<Paragraph>
		Tile placement is hardcoded by source order via <Code>:nth-child</Code>. Pass exactly 6 tiles in this order:
		<strong>hero, a (top-right), b (bottom-right), c (bottom-left), d (bottom-middle), e (bottom-right)</strong>.
		Mark the first tile with <Code>isHero</Code> for the larger value font + taller chart.
	</Paragraph>

	<h4 class="mt-4">Chart as background</h4>
	<Paragraph>
		The chart cell is absolutely positioned across the bottom 65% of the tile with z-index 0; label / delta / value
		sit at z-index 1 over it. Polyline opacity 0.55, fill opacity 0.10 — soft enough that the focal value stays
		readable but the trend is still legible.
	</Paragraph>
</Card>

<br />

<Card titleText="Component Reference">
	<h4>KpiBento props</h4>
	<BasicList spacing="compact">
		<li><Code>titleText</Code> — card title in the header.</li>
		<li><Code>isLive</Code> — show the LIVE pill with animated green dot.</li>
		<li><Code>footerText</Code> — footer caption (plain string). Override via <Code>footer</Code> snippet.</li>
	</BasicList>

	<h4 class="mt-4">KpiBentoTile props</h4>
	<BasicList spacing="compact">
		<li><Code>variant</Code> — accent colour: <Code>positive</Code> / <Code>negative</Code> / <Code>neutral</Code> / <Code>up-strong</Code> / <Code>down-strong</Code>.</li>
		<li><Code>isHero</Code> — bump value font + chart height. Set on the first (left-half) tile.</li>
		<li><Code>labelText</Code> — uppercase mono label.</li>
		<li><Code>valueText</Code> / <Code>unit</Code> / <Code>prefix</Code> — focal value cell.</li>
		<li><Code>deltaText</Code> — Δ% text (coloured by <Code>variant</Code>).</li>
		<li><Code>chart</Code> — snippet for the background sparkline (SVG, canvas, etc.).</li>
		<li><Code>detailTitleText</Code> + <Code>previousValueText</Code> + <Code>targetText</Code> + <Code>deltaAbsoluteText</Code> — popover (auto-generated).</li>
	</BasicList>
</Card>
