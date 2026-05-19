<script lang="ts">
	/**
	 * Pure Admin KPI Detail Popover (Svelte 5)
	 * Shared popover element used by every KPI tile/row component.
	 *
	 * Renders `<div class="pa-kpi-detail" role="tooltip">` directly (no wrapper)
	 * so the `kpiPopover` action on the parent tile can find it via
	 * `:scope > .pa-kpi-detail`.
	 *
	 * Renders nothing when there's no title and no custom content — keeps the
	 * popover wiring opt-in (set `titleText` to enable).
	 */

	import type { KpiDetailRow } from './kpi-detail';

	interface Props {
		/** Popover title text. Setting this (or `customContent`) enables the popover. */
		titleText?: string;
		/** Auto-generated detail rows. Ignored when `customContent` is provided. */
		rows?: KpiDetailRow[];
		/** Fully-custom popover content (renders raw inside `.pa-kpi-detail`). Overrides `titleText` and `rows`. */
		customContent?: import('svelte').Snippet;
	}

	let { titleText, rows = [], customContent }: Props = $props();

	const show = $derived(!!customContent || !!titleText);
</script>

{#if show}
	<div class="pa-kpi-detail" role="tooltip">
		{#if customContent}
			{@render customContent()}
		{:else}
			{#if titleText}<div class="pa-kpi-detail__title">{titleText}</div>{/if}
			{#if rows.length > 0}
				<dl>
					{#each rows as row (row.labelText)}
						<dt>{row.labelText}</dt>
						<dd class={row.sentiment ?? ''}>{row.valueText}</dd>
					{/each}
				</dl>
			{/if}
		{/if}
	</div>
{/if}
