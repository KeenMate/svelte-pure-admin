<script lang="ts">
	/**
	 * Pure Admin TimelineItem Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/timeline.html
	 * Individual timeline entry - adapts to parent timeline variant
	 * IMPORTANT: Uses clear naming - iconText (not icon), avatarUrl (not avatar)
	 */

	import type { TimelineItemVariant } from './timeline-types';

	interface Props {
		/** Color variant (for simple timeline) */
		variant?: TimelineItemVariant;
		/** Filled marker instead of outline (for simple timeline) */
		isFilled?: boolean;
		/** Date header (for feed timeline with date sections) */
		isDateHeader?: boolean;
		/** Time/date text (simple: right side, alternating: top, feed: left prefix) */
		timeText?: string;
		/** Date text (alternating timeline) */
		date?: string;
		/** Icon text content (alternating timeline) - string only */
		iconText?: string;
		/** Icon template snippet (for custom icon rendering) */
		iconTemplate?: import('svelte').Snippet;
		/** Avatar image URL (feed timeline) */
		avatarUrl?: string;
		/** Avatar alt text */
		avatarAlt?: string;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
		/** Additional CSS classes */
		class?: string;
		/** Content snippet */
		children?: import('svelte').Snippet;
		/** Comment snippet (feed timeline) */
		commentTemplate?: import('svelte').Snippet;
	}

	let {
		variant,
		isFilled = false,
		isDateHeader = false,
		timeText,
		date,
		iconText,
		iconTemplate,
		avatarUrl,
		avatarAlt = 'User',
		onclick,
		class: className = '',
		children,
		commentTemplate
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-timeline__item'];

		// Variant
		if (variant) base.push(`pa-timeline__item--${variant}`);

		// Modifiers
		if (isFilled) base.push('pa-timeline__item--filled');
		if (isDateHeader) base.push('pa-timeline__item--date-header');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<li
	class={classes()}
	onclick={onclick}
	onkeydown={onclick ? (e) => e.key === 'Enter' && onclick(e as any) : undefined}
	tabindex={onclick ? 0 : undefined}
	role={onclick ? 'button' : undefined}
>
	{#if isDateHeader}
		<!-- Date header (for feed timeline) -->
		{#if iconText || iconTemplate}
			<div class="pa-timeline__date-icon">
				{#if iconTemplate}
					{@render iconTemplate()}
				{:else}
					{iconText}
				{/if}
			</div>
		{/if}
		<div class="pa-timeline__date-label">{@render children?.()}</div>
	{:else if date && (iconText || iconTemplate)}
		<!-- Alternating timeline -->
		<div class="pa-timeline__date">{date}</div>
		<div class="pa-timeline__icon">
			{#if iconTemplate}
				{@render iconTemplate()}
			{:else}
				{iconText}
			{/if}
		</div>
		<div class="pa-timeline__content">
			{@render children?.()}
		</div>
	{:else if avatarUrl}
		<!-- Feed timeline with avatar -->
		{#if timeText}
			<div class="pa-timeline__time">{timeText}</div>
		{/if}
		<div class="pa-timeline__content">
			<div class="pa-timeline__avatar">
				<img src={avatarUrl} alt={avatarAlt} />
			</div>
			{@render children?.()}
			{#if commentTemplate}
				<div class="pa-timeline__comment">
					{@render commentTemplate()}
				</div>
			{/if}
		</div>
	{:else}
		<!-- Simple timeline -->
		{#if timeText}
			<div class="pa-timeline__time">{timeText}</div>
		{/if}
		<div class="pa-timeline__content">
			{@render children?.()}
		</div>
	{/if}
</li>
