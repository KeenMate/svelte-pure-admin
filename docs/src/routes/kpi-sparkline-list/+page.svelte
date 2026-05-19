<script lang="ts">
	import {
		Paragraph,
		Heading,
		Card,
		Grid,
		Column,
		Code,
		BasicList,
		KpiSparklineList,
		KpiSparklineRow
	} from '@keenmate/svelte-pure-admin';

	// SVG sparkline shapes (one per KPI) — keep markup repetition out of the template
	const sparklines = {
		completion: {
			polygon: '0,18 12,16 24,17 36,12 48,15 60,9 72,11 84,7 96,5 100,24 0,24',
			polyline: '0,18 12,16 24,17 36,12 48,15 60,9 72,11 84,7 96,5',
			endX: 96, endY: 5
		},
		revenue: {
			polygon: '0,20 12,19 24,17 36,14 48,11 60,9 72,7 84,5 96,4 100,24 0,24',
			polyline: '0,20 12,19 24,17 36,14 48,11 60,9 72,7 84,5 96,4',
			endX: 96, endY: 4
		},
		serverTemp: {
			polygon: '0,17 12,16 24,15 36,13 48,12 60,10 72,9 84,7 96,6 100,24 0,24',
			polyline: '0,17 12,16 24,15 36,13 48,12 60,10 72,9 84,7 96,6',
			endX: 96, endY: 6
		},
		capacity: {
			polygon: '0,15 12,12 24,16 36,9 48,13 60,7 72,11 84,5 96,9 100,24 0,24',
			polyline: '0,15 12,12 24,16 36,9 48,13 60,7 72,11 84,5 96,9',
			endX: 96, endY: 9
		},
		errorRate: {
			polygon: '0,7 12,9 24,8 36,11 48,10 60,12 72,11 84,13 96,15 100,24 0,24',
			polyline: '0,7 12,9 24,8 36,11 48,10 60,12 72,11 84,13 96,15',
			endX: 96, endY: 15
		},
		tokyo: {
			polygon: '0,14 12,11 24,15 36,9 48,13 60,8 72,12 84,10 96,9 100,24 0,24',
			polyline: '0,14 12,11 24,15 36,9 48,13 60,8 72,12 84,10 96,9',
			endX: 96, endY: 9
		}
	};
</script>

<Paragraph>
	Bloomberg-y "sparkline list" KPI indicator. Each KPI becomes one row:
	<strong>name · sparkline · value · Δ%</strong>. No view-mode toggle, no status pills, no prev row —
	built for fast vertical scanning and side-by-side comparison rather than per-tile depth. Sparkline gets
	a filled area under the line for stronger visual weight than the terminal-grid version. Hover any row
	for the structured detail breakdown.
</Paragraph>
<Paragraph>
	Two list-level modifiers are independently composable: <Code>isChartFirst</Code> flips the value/chart
	stacking order at narrow widths, and <Code>noDelta</Code> drops the rightmost (Δ%) column when the
	sparkline's slope already conveys direction. Source markup stays the same; pick modifiers per instance.
</Paragraph>

<!-- Canonical full-width sparkline list (6 rows) -->
<KpiSparklineList
	titleText="Key Performance Indicators"
	isLive
	footerText="Sparkline list — Each KPI becomes a row: name · sparkline · value · Δ%. Fast comparison."
>
	<KpiSparklineRow
		variant="up"
		labelText="Completion Rate"
		valueText="87.9"
		unit="%"
		deltaText="+4.4%"
		deltaVariant="positive"
		detailTitleText="Completion Rate · 30D"
		previousValueText="84.2%"
		deltaAbsoluteText="+3.7pp"
		targetText="90.0%"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={sparklines.completion.polygon} />
				<polyline points={sparklines.completion.polyline} />
				<circle cx={sparklines.completion.endX} cy={sparklines.completion.endY} r="2" />
			</svg>
		{/snippet}
	</KpiSparklineRow>

	<KpiSparklineRow
		variant="up"
		labelText="Monthly Revenue"
		prefix="$"
		valueText="862"
		unit="K"
		deltaText="+14.7%"
		deltaVariant="positive"
		detailTitleText="Monthly Revenue · 12MO"
		previousValueText="$752K"
		deltaAbsoluteText="+$110K"
		targetText="$900K"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={sparklines.revenue.polygon} />
				<polyline points={sparklines.revenue.polyline} />
				<circle cx={sparklines.revenue.endX} cy={sparklines.revenue.endY} r="2" />
			</svg>
		{/snippet}
	</KpiSparklineRow>

	<KpiSparklineRow
		variant="down"
		labelText="Server Temp"
		valueText="23.8"
		unit="°C"
		deltaText="-2.7%"
		deltaVariant="negative"
		detailTitleText="Server Temp · 24H"
		previousValueText="24.5°C"
		deltaAbsoluteText="−0.7°C"
		targetText="≤ 23°C"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={sparklines.serverTemp.polygon} />
				<polyline points={sparklines.serverTemp.polyline} />
				<circle cx={sparklines.serverTemp.endX} cy={sparklines.serverTemp.endY} r="2" />
			</svg>
		{/snippet}
	</KpiSparklineRow>

	<KpiSparklineRow
		variant="up"
		labelText="Server Capacity"
		valueText="83.1"
		unit="%"
		deltaText="+17.1%"
		deltaVariant="positive"
		detailTitleText="Server Capacity · 7D"
		previousValueText="71.0%"
		deltaAbsoluteText="+12.1pp"
		targetText="≤ 75%"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={sparklines.capacity.polygon} />
				<polyline points={sparklines.capacity.polyline} />
				<circle cx={sparklines.capacity.endX} cy={sparklines.capacity.endY} r="2" />
			</svg>
		{/snippet}
	</KpiSparklineRow>

	<KpiSparklineRow
		variant="up-strong"
		labelText="Error Rate"
		valueText="0.25"
		unit="%"
		deltaText="-38.1%"
		deltaVariant="very-positive"
		detailTitleText="Error Rate · 24H"
		previousValueText="0.40%"
		deltaAbsoluteText="−0.15pp"
		targetText="≤ 0.50%"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={sparklines.errorRate.polygon} />
				<polyline points={sparklines.errorRate.polyline} />
				<circle cx={sparklines.errorRate.endX} cy={sparklines.errorRate.endY} r="2" />
			</svg>
		{/snippet}
	</KpiSparklineRow>

	<KpiSparklineRow
		variant="up"
		labelText="Tokyo Office"
		prefix="¥"
		valueText="11.6"
		unit="M"
		deltaText="+3.6%"
		deltaVariant="positive"
		detailTitleText="Tokyo Office · 12MO"
		previousValueText="¥11.2M"
		deltaAbsoluteText="+0.40M"
		targetText="¥13.0M"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={sparklines.tokyo.polygon} />
				<polyline points={sparklines.tokyo.polyline} />
				<circle cx={sparklines.tokyo.endX} cy={sparklines.tokyo.endY} r="2" />
			</svg>
		{/snippet}
	</KpiSparklineRow>

	{#snippet footer()}
		<span><strong>Sparkline list</strong> — Each KPI becomes a row: name · sparkline · value · Δ%. Fast comparison.</span>
		<span>Hover any KPI for detail</span>
	{/snippet}
</KpiSparklineList>

<br />

<!-- ============================================================
     2. Layout variant: noDelta (3-col rows)
     ============================================================ -->

<Heading level={3}>Layout variant · <Code>noDelta</Code></Heading>
<Paragraph>
	Drops the rightmost (Δ%) column — each row reads as <strong>label · sparkline · value</strong>. Useful
	when the sparkline's slope already conveys direction and the percentage delta would be redundant chrome.
	The row template shrinks from 4 to 3 columns at wide widths; at narrow widths the responsive 2-row /
	3-row layouts also collapse to a delta-less shape. The Δ% data is left on each row so the popover still
	surfaces it on hover.
</Paragraph>

<KpiSparklineList
	titleText="Key Performance Indicators"
	isLive
	noDelta
	footerText="Sparkline list · noDelta — Drops the Δ% column; the sparkline carries direction."
>
	<KpiSparklineRow
		variant="up"
		labelText="Completion Rate"
		valueText="87.9"
		unit="%"
		deltaText="+4.4%"
		deltaVariant="positive"
		detailTitleText="Completion Rate · 30D"
		previousValueText="84.2%"
		deltaAbsoluteText="+3.7pp"
		targetText="90.0%"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={sparklines.completion.polygon} />
				<polyline points={sparklines.completion.polyline} />
				<circle cx={sparklines.completion.endX} cy={sparklines.completion.endY} r="2" />
			</svg>
		{/snippet}
	</KpiSparklineRow>

	<KpiSparklineRow
		variant="up"
		labelText="Monthly Revenue"
		prefix="$"
		valueText="862"
		unit="K"
		deltaText="+14.7%"
		deltaVariant="positive"
		detailTitleText="Monthly Revenue · 12MO"
		previousValueText="$752K"
		deltaAbsoluteText="+$110K"
		targetText="$900K"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={sparklines.revenue.polygon} />
				<polyline points={sparklines.revenue.polyline} />
				<circle cx={sparklines.revenue.endX} cy={sparklines.revenue.endY} r="2" />
			</svg>
		{/snippet}
	</KpiSparklineRow>

	<KpiSparklineRow
		variant="down"
		labelText="Server Temp"
		valueText="23.8"
		unit="°C"
		deltaText="-2.7%"
		deltaVariant="negative"
		detailTitleText="Server Temp · 24H"
		previousValueText="24.5°C"
		deltaAbsoluteText="−0.7°C"
		targetText="≤ 23°C"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={sparklines.serverTemp.polygon} />
				<polyline points={sparklines.serverTemp.polyline} />
				<circle cx={sparklines.serverTemp.endX} cy={sparklines.serverTemp.endY} r="2" />
			</svg>
		{/snippet}
	</KpiSparklineRow>

	<KpiSparklineRow
		variant="up-strong"
		labelText="Error Rate"
		valueText="0.25"
		unit="%"
		deltaText="-38.1%"
		deltaVariant="very-positive"
		detailTitleText="Error Rate · 24H"
		previousValueText="0.40%"
		deltaAbsoluteText="−0.15pp"
		targetText="≤ 0.50%"
	>
		{#snippet chart()}
			<svg viewBox="0 0 100 24" preserveAspectRatio="none">
				<polygon points={sparklines.errorRate.polygon} />
				<polyline points={sparklines.errorRate.polyline} />
				<circle cx={sparklines.errorRate.endX} cy={sparklines.errorRate.endY} r="2" />
			</svg>
		{/snippet}
	</KpiSparklineRow>

	{#snippet footer()}
		<span><strong>Sparkline list · <Code>noDelta</Code></strong> — Drops the Δ% column; the sparkline carries direction.</span>
		<span>Δ% row left in markup so the same data shows on hover</span>
	{/snippet}
</KpiSparklineList>

<br />

<Heading level={3}>1×3 page-grid — <Code>isChartFirst</Code> comparison</Heading>
<Paragraph>
	Three smaller cards side-by-side. The middle card uses the <Code>isChartFirst</Code> modifier so you can
	see the two stacking styles at the same width: <strong>card 1 + 3 = value-above-chart (default)</strong>,
	<strong>card 2 = chart-above-value (modifier)</strong>.
</Paragraph>

<Grid>
	<Column size="100" md="1-3">
		<KpiSparklineList>
			<KpiSparklineRow variant="up" labelText="Completion Rate" valueText="87.9" unit="%" deltaText="+4.4%" deltaVariant="positive" detailTitleText="Completion Rate · 30D" previousValueText="84.2%" targetText="90.0%">
				{#snippet chart()}
					<svg viewBox="0 0 100 24" preserveAspectRatio="none">
						<polygon points={sparklines.completion.polygon} />
						<polyline points={sparklines.completion.polyline} />
						<circle cx={sparklines.completion.endX} cy={sparklines.completion.endY} r="2" />
					</svg>
				{/snippet}
			</KpiSparklineRow>
			<KpiSparklineRow variant="up" labelText="Monthly Revenue" prefix="$" valueText="862" unit="K" deltaText="+14.7%" deltaVariant="positive" detailTitleText="Monthly Revenue · 12MO" previousValueText="$752K" targetText="$900K">
				{#snippet chart()}
					<svg viewBox="0 0 100 24" preserveAspectRatio="none">
						<polygon points={sparklines.revenue.polygon} />
						<polyline points={sparklines.revenue.polyline} />
						<circle cx={sparklines.revenue.endX} cy={sparklines.revenue.endY} r="2" />
					</svg>
				{/snippet}
			</KpiSparklineRow>
		</KpiSparklineList>
	</Column>

	<Column size="100" md="1-3">
		<KpiSparklineList isChartFirst>
			<KpiSparklineRow variant="down" labelText="Server Temp" valueText="23.8" unit="°C" deltaText="-2.7%" deltaVariant="negative" detailTitleText="Server Temp · 24H" previousValueText="24.5°C">
				{#snippet chart()}
					<svg viewBox="0 0 100 24" preserveAspectRatio="none">
						<polygon points={sparklines.serverTemp.polygon} />
						<polyline points={sparklines.serverTemp.polyline} />
						<circle cx={sparklines.serverTemp.endX} cy={sparklines.serverTemp.endY} r="2" />
					</svg>
				{/snippet}
			</KpiSparklineRow>
			<KpiSparklineRow variant="up" labelText="Server Capacity" valueText="83.1" unit="%" deltaText="+17.1%" deltaVariant="positive" detailTitleText="Server Capacity · 7D">
				{#snippet chart()}
					<svg viewBox="0 0 100 24" preserveAspectRatio="none">
						<polygon points={sparklines.capacity.polygon} />
						<polyline points={sparklines.capacity.polyline} />
						<circle cx={sparklines.capacity.endX} cy={sparklines.capacity.endY} r="2" />
					</svg>
				{/snippet}
			</KpiSparklineRow>
		</KpiSparklineList>
	</Column>

	<Column size="100" md="1-3">
		<KpiSparklineList>
			<KpiSparklineRow variant="up-strong" labelText="Error Rate" valueText="0.25" unit="%" deltaText="-38.1%" deltaVariant="very-positive" detailTitleText="Error Rate · 24H">
				{#snippet chart()}
					<svg viewBox="0 0 100 24" preserveAspectRatio="none">
						<polygon points={sparklines.errorRate.polygon} />
						<polyline points={sparklines.errorRate.polyline} />
						<circle cx={sparklines.errorRate.endX} cy={sparklines.errorRate.endY} r="2" />
					</svg>
				{/snippet}
			</KpiSparklineRow>
			<KpiSparklineRow variant="up" labelText="Tokyo Office" prefix="¥" valueText="11.6" unit="M" deltaText="+3.6%" deltaVariant="positive" detailTitleText="Tokyo Office · 12MO">
				{#snippet chart()}
					<svg viewBox="0 0 100 24" preserveAspectRatio="none">
						<polygon points={sparklines.tokyo.polygon} />
						<polyline points={sparklines.tokyo.polyline} />
						<circle cx={sparklines.tokyo.endX} cy={sparklines.tokyo.endY} r="2" />
					</svg>
				{/snippet}
			</KpiSparklineRow>
		</KpiSparklineList>
	</Column>
</Grid>

<br />

<Card titleText="Usage Guide">
	<h4>When to use</h4>
	<Paragraph>
		Vertical scanning of many KPIs side-by-side. Each row reads label · trend · value · Δ% in a single
		glance. Best for "give me the whole board at once" use cases — financial dashboards, ops monitoring,
		performance reviews. If you want per-tile depth or status pills, pick Terminal grid or Editorial
		minimal instead.
	</Paragraph>

	<h4 class="mt-4">Chart cell is library-agnostic</h4>
	<Paragraph>
		Pass any chart content via the <Code>chart</Code> snippet — inline SVG (as shown), Chart.js
		<Code>{`<canvas>`}</Code>, or any other library. When SVG with a <Code>{`<circle>`}</Code> endpoint
		marker is detected, the <Code>kpiSparklineDots</Code> action auto-converts it to a CSS-pixel-sized
		span so the dot stays round under the SVG's <Code>preserveAspectRatio="none"</Code> stretching.
	</Paragraph>

	<h4 class="mt-4">Two sentiment scales</h4>
	<Paragraph>
		<Code>variant</Code> sets the trend colour (line, area-fill, dot) via a <Code>currentColor</Code>
		cascade — 5 levels: <Code>up-strong</Code> / <Code>up</Code> / <Code>flat</Code> / <Code>down</Code> /
		<Code>down-strong</Code>. <Code>deltaVariant</Code> colours the Δ% cell using a different 5-step
		scale: <Code>very-positive</Code> / <Code>positive</Code> / <Code>neutral</Code> / <Code>negative</Code>
		/ <Code>very-negative</Code>. The two scales are distinct because the line and the delta value can
		disagree (e.g., a sharp drop in error rate is line-going-down but delta-very-positive).
	</Paragraph>

	<h4 class="mt-4">Responsive layout</h4>
	<Paragraph>
		Container queries (driven by card width, not viewport) collapse the 4-col grid in stages: below
		640 px → label/value/delta on one row with chart spanning below; below 360 px → label / chart /
		value+delta as three rows.
	</Paragraph>

	<h4 class="mt-4">List-level modifiers (composable)</h4>
	<Paragraph>
		Two independently composable boolean props on <Code>KpiSparklineList</Code>:
	</Paragraph>
	<BasicList spacing="compact">
		<li>
			<Code>isChartFirst</Code> — flips the mid-narrow 2-row collapsed layout from "value-above-chart"
			to "label / chart / value+delta", preserving the canonical L→R reading order when rotated 90°. The
			very-narrow ≤360 px fallback always uses the 3-row layout regardless of modifier — neither variant
			has room for label+value+delta on one line at that width.
		</li>
		<li>
			<Code>noDelta</Code> — drops the rightmost Δ% column. At wide widths the row shrinks from 4 cols
			to 3 (<Code>label · chart · value</Code>); at mid-narrow the top row becomes <Code>label value</Code>
			only; at very-narrow the bottom row becomes a single full-width value cell. The delta element is
			hidden via <Code>display: none</Code>, so the same markup keeps the value available for the popover
			on hover.
		</li>
	</BasicList>
	<Paragraph>
		Composing both (<Code>isChartFirst</Code> + <Code>noDelta</Code>) at mid-narrow gives a clean 3-row
		single-column stack: <Code>label / chart / value</Code>.
	</Paragraph>
</Card>

<br />

<Card titleText="Component Reference">
	<h4>KpiSparklineList props</h4>
	<BasicList spacing="compact">
		<li><Code>titleText</Code> — card title in the header.</li>
		<li><Code>isLive</Code> — show the LIVE pill with animated green dot.</li>
		<li><Code>footerText</Code> — footer caption (plain string). Override via <Code>footer</Code> snippet.</li>
		<li><Code>isChartFirst</Code> — apply <Code>pa-kpi-spark-list--chart-first</Code> modifier (rotates the narrow-card layout to label-on-top / chart-middle / value+delta-bottom).</li>
		<li><Code>noDelta</Code> — apply <Code>pa-kpi-spark-list--no-delta</Code> modifier (drops the Δ% column; composes with <Code>isChartFirst</Code>).</li>
	</BasicList>

	<h4 class="mt-4">KpiSparklineRow props</h4>
	<BasicList spacing="compact">
		<li><Code>variant</Code> — trend line/area/dot colour: <Code>up-strong</Code> / <Code>up</Code> / <Code>flat</Code> / <Code>down</Code> / <Code>down-strong</Code>.</li>
		<li><Code>labelText</Code> — uppercase mono label.</li>
		<li><Code>valueText</Code> / <Code>unit</Code> / <Code>prefix</Code> — focal value cell.</li>
		<li><Code>deltaText</Code> + <Code>deltaVariant</Code> — Δ% text and sentiment: <Code>very-positive</Code> / <Code>positive</Code> / <Code>neutral</Code> / <Code>negative</Code> / <Code>very-negative</Code>.</li>
		<li><Code>chart</Code> — snippet for the chart cell (SVG, canvas, anything).</li>
		<li><Code>detailTitleText</Code> — popover title (setting this enables the auto-generated popover).</li>
		<li><Code>previousValueText</Code> — "Previous" row in the auto-generated popover.</li>
		<li><Code>targetText</Code> — "Target" row in the auto-generated popover.</li>
		<li><Code>deltaAbsoluteText</Code> — "Δ absolute" row in the auto-generated popover.</li>
	</BasicList>
</Card>
