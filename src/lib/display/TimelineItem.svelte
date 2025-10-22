<script lang="ts">
	/**
	 * Pure Admin TimelineItem Component (Svelte 5)
	 * Based on @pure-admin/core snippets/timeline.html
	 * Individual timeline entry - adapts to parent timeline variant
	 * IMPORTANT: Uses clear naming - iconText (not icon), avatarUrl (not avatar)
	 */

	import type { TimelineItemVariant } from './timeline-types';

	interface Props {
		/** Color variant (for simple timeline) */
		variant?: TimelineItemVariant;
		/** Filled marker instead of outline (for simple timeline) */
		filled?: boolean;
		/** Date header (for feed timeline with date sections) */
		dateHeader?: boolean;
		/** Time/date text (simple: right side, alternating: top, feed: left prefix) */
		time?: string;
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
		filled = false,
		dateHeader = false,
		time,
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
		if (filled) base.push('pa-timeline__item--filled');
		if (dateHeader) base.push('pa-timeline__item--date-header');

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<li class={classes()} {onclick}>
	{#if dateHeader}
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
		{#if time}
			<div class="pa-timeline__time">{time}</div>
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
		{#if time}
			<div class="pa-timeline__time">{time}</div>
		{/if}
		<div class="pa-timeline__content">
			{@render children?.()}
		</div>
	{/if}
</li>
