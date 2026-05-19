/**
 * Pure Admin KPI detail-popover helpers.
 *
 * Shared types + auto-row builder used by every KPI tile/row component
 * (KpiStripRow, KpiSparklineRow, KpiBentoTile, KpiHeroMain, KpiHeroSide,
 *  KpiGauge, KpiTerminalTile, KpiEditorialTile).
 *
 * The auto-row builder turns the row's typed props (Current value + optional
 * Previous / Δ absolute / Δ percent / Target) into the popover body so
 * consumers don't have to hand-author `<dl><dt><dd>` markup for the typical
 * case. Consumers can pass `detailRows` for a typed-list override or a
 * `detail` snippet for fully-custom popover markup.
 */

/** Sentiment colour for a popover `<dd>`. Maps to the matching `.pos` / `.neg` / `.warn` class inside `pa-kpi-detail`. */
export type KpiDetailSentiment = 'pos' | 'neg' | 'warn';

/** A single `<dt>` / `<dd>` pair in the auto-generated detail popover. */
export type KpiDetailRow = {
	labelText: string;
	valueText: string;
	sentiment?: KpiDetailSentiment;
};

/** Delta / sentiment variants used across KPI components. Union covers every variant scale (strip/editorial: up-strong/down-strong; sparkline/terminal: very-*; gauge: warning). */
export type KpiAnyDeltaVariant =
	| 'positive' | 'negative' | 'neutral' | 'up-strong' | 'down-strong'
	| 'very-positive' | 'very-negative'
	| 'warning';

/** Map a delta variant onto the popover sentiment class. */
export function deltaToSentiment(variant?: KpiAnyDeltaVariant): KpiDetailSentiment | undefined {
	if (variant === 'positive' || variant === 'up-strong' || variant === 'very-positive') return 'pos';
	if (variant === 'negative' || variant === 'down-strong' || variant === 'very-negative') return 'neg';
	if (variant === 'warning') return 'warn';
	return undefined;
}

/** Input shape for the auto-row builder. All fields optional — the builder skips rows whose data is missing. */
export interface KpiAutoDetailInput {
	prefix?: string;
	valueText?: string | number;
	unit?: string;
	previousValueText?: string;
	deltaAbsoluteText?: string;
	deltaAbsoluteSentiment?: KpiDetailSentiment;
	deltaText?: string;
	deltaSentiment?: KpiDetailSentiment;
	targetText?: string;
}

/**
 * Build the canonical detail-popover rows from a row's typed props.
 * Order: Current → Previous → Δ absolute → Δ percent → Target.
 * Rows with no corresponding data are skipped.
 */
export function buildAutoDetailRows(input: KpiAutoDetailInput): KpiDetailRow[] {
	const rows: KpiDetailRow[] = [];

	if (input.valueText !== undefined || input.prefix || input.unit) {
		rows.push({
			labelText: 'Current',
			valueText: `${input.prefix ?? ''}${input.valueText ?? ''}${input.unit ?? ''}`
		});
	}
	if (input.previousValueText !== undefined) {
		rows.push({ labelText: 'Previous', valueText: input.previousValueText });
	}
	if (input.deltaAbsoluteText !== undefined) {
		rows.push({
			labelText: 'Δ absolute',
			valueText: input.deltaAbsoluteText,
			sentiment: input.deltaAbsoluteSentiment ?? input.deltaSentiment
		});
	}
	if (input.deltaText !== undefined) {
		rows.push({
			labelText: 'Δ percent',
			valueText: input.deltaText,
			sentiment: input.deltaSentiment
		});
	}
	if (input.targetText !== undefined) {
		rows.push({ labelText: 'Target', valueText: input.targetText });
	}

	return rows;
}
