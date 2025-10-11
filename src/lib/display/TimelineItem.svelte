<script lang="ts">
	/**
	 * Pure Admin TimelineItem Component (Svelte 5)
	 * Based on @pure-admin/core snippets/timeline.html
	 * Individual timeline entry - adapts to parent timeline variant
	 */

	type TimelineVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

	interface Props {
		/** Color variant (for simple timeline) */
		variant?: TimelineVariant;
		/** Filled marker instead of outline (for simple timeline) */
		filled?: boolean;
		/** Date header (for feed timeline with date sections) */
		dateHeader?: boolean;
		/** Time/date text (simple: right side, alternating: top, feed: left prefix) */
		time?: string;
		/** Date text (alternating timeline) */
		date?: string;
		/** Icon (alternating timeline) */
		icon?: string;
		/** Avatar image URL (feed timeline) */
		avatar?: string;
		/** Avatar alt text */
		avatarAlt?: string;
		/** Additional CSS classes */
		class?: string;
		/** Content snippet */
		children?: import('svelte').Snippet;
		/** Comment snippet (feed timeline) */
		comment?: import('svelte').Snippet;
	}

	let {
		variant,
		filled = false,
		dateHeader = false,
		time,
		date,
		icon,
		avatar,
		avatarAlt = 'User',
		class: className = '',
		children,
		comment
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

<li class={classes()}>
	{#if dateHeader}
		<!-- Date header (for feed timeline) -->
		{#if icon}
			<div class="pa-timeline__date-icon">{icon}</div>
		{/if}
		<div class="pa-timeline__date-label">{@render children?.()}</div>
	{:else if date && icon}
		<!-- Alternating timeline -->
		<div class="pa-timeline__date">{date}</div>
		<div class="pa-timeline__icon">{icon}</div>
		<div class="pa-timeline__content">
			{@render children?.()}
		</div>
	{:else if avatar}
		<!-- Feed timeline with avatar -->
		{#if time}
			<div class="pa-timeline__time">{time}</div>
		{/if}
		<div class="pa-timeline__content">
			<div class="pa-timeline__avatar">
				<img src={avatar} alt={avatarAlt} />
			</div>
			{@render children?.()}
			{#if comment}
				<div class="pa-timeline__comment">
					{@render comment()}
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
