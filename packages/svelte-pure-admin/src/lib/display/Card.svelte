<script lang="ts">
	/**
	 * Pure Admin Card Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/cards.html
	 */

	import type { ThemeColor } from '../types';

	type CardVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info'
		| 'color-1' | 'color-2' | 'color-3' | 'color-4' | 'color-5'
		| 'color-6' | 'color-7' | 'color-8' | 'color-9';

	type HeaderUnderlineColor = 'success' | 'warning' | 'danger' | 'info';

	interface Props {
		/** Card variant (applies to whole card) */
		variant?: CardVariant;
		/** Live-data state — persistent tinted background reflecting latest change */
		liveState?: 'up' | 'down' | 'neutral';
		/** Ghost mode - invisible container, same spacing/sizing behavior (no bg, border, shadow) */
		isGhost?: boolean;
		/** Body has padding (set false to remove) */
		hasPadding?: boolean;
		/** Stat card style */
		isStat?: boolean;
		/** Simple title text (alternative to header snippet) */
		titleText?: string;
		/** Title snippet (for rich content titles with markup - alternative to titleText) */
		title?: import('svelte').Snippet;
		/** Description text shown inline with title, truncates with ellipsis (v1.4.1 three-part header) */
		descriptionText?: string;
		/** Description snippet (for rich content descriptions with markup - alternative to descriptionText) */
		description?: import('svelte').Snippet;
		/** Subtitle/description text (shown below title) - deprecated, use descriptionText for inline layout */
		subtitleText?: string;
		/** Subtitle snippet (for rich content subtitles with markup - alternative to subtitleText) */
		subtitle?: import('svelte').Snippet;
		/** Allow header description to wrap to its own line (v1.4.1 --wrap modifier) */
		headerWrap?: boolean;
		/** Accent border under heading in card header */
		isHeaderUnderlined?: boolean;
		/** Underline color variant (requires isHeaderUnderlined) */
		headerUnderlineColor?: HeaderUnderlineColor;
		/** Underline theme color slot 1-9 (requires isHeaderUnderlined) */
		headerUnderlineThemeColor?: ThemeColor;
		/** Inline tabs style (pill-style buttons inside card header row) */
		hasInlineTabs?: boolean;
		/** Additional CSS classes for the header element */
		headerClass?: string;
		/** Additional CSS classes */
		class?: string;
		/** Header snippet (for complex headers) */
		header?: import('svelte').Snippet;
		/** Title icon snippet (renders before title text) */
		titleIcon?: import('svelte').Snippet;
		/** Header tools snippet (rendered in header toolbar area) */
		tools?: import('svelte').Snippet;
		/** Tabs snippet (renders in card header as tabs) */
		tabs?: import('svelte').Snippet;
		/** Body snippet (main content) */
		children?: import('svelte').Snippet;
		/** Footer snippet (for complex footers) */
		footer?: import('svelte').Snippet;
		/** Footer actions snippet (rendered on right side of footer) */
		actions?: import('svelte').Snippet;
	}

	let {
		variant,
		liveState,
		isGhost = false,
		hasPadding = true,
		isStat = false,
		titleText,
		title,
		descriptionText,
		description,
		subtitleText,
		subtitle,
		headerWrap = false,
		isHeaderUnderlined = false,
		headerUnderlineColor,
		headerUnderlineThemeColor,
		hasInlineTabs = false,
		headerClass,
		class: className = '',
		header,
		titleIcon,
		tools,
		tabs,
		children,
		footer,
		actions
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-card'];
		if (variant) base.push(`pa-card--${variant}`);
		if (liveState) base.push(`pa-card--live-${liveState}`);
		if (isGhost) base.push('pa-card--ghost');
		if (isStat) base.push('pa-card--stat');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build body class string
	const bodyClasses = $derived(() => {
		const base = ['pa-card__body'];
		if (!hasPadding) base.push('pa-card__body--no-padding');
		return base.join(' ');
	});

	// Build tabs class string
	const tabsClasses = $derived(() => {
		const base = ['pa-card__tabs'];
		if (hasInlineTabs) base.push('pa-card__tabs--inline');
		return base.join(' ');
	});

	// Build header class string (v1.4.1 three-part layout with --wrap modifier)
	const headerClasses = $derived(() => {
		const base = ['pa-card__header'];
		if (headerWrap) base.push('pa-card__header--wrap');
		if (isHeaderUnderlined) {
			base.push('pa-card__header--underlined');
			if (headerUnderlineColor) base.push(`pa-card__header--underline-${headerUnderlineColor}`);
			if (headerUnderlineThemeColor) base.push(`pa-card__header--underline-color-${headerUnderlineThemeColor}`);
		}
		if (headerClass) base.push(headerClass);
		return base.join(' ');
	});

	// Determine if we should show header
	const hasHeader = $derived(header || titleText || title || titleIcon || descriptionText || description || subtitleText || subtitle || tools || tabs);
	// Determine if we should show footer
	const hasFooter = $derived(footer || actions);
</script>

<div class={classes()}>
	{#if hasHeader}
		<div class={headerClasses()}>
			{#if tabs}
				<div class={tabsClasses()}>
					{@render tabs()}
				</div>
			{:else if header}
				{@render header()}
			{:else}
				<!-- Three-part header layout (v1.4.1): Title - Description - Tools/Actions -->
				{#if titleIcon && (titleText || title)}
					<div class="pa-card__title">
						<span class="pa-card__title-icon">
							{@render titleIcon()}
						</span>
						<h3 class="pa-card__title-text">
							{#if title}{@render title()}{:else}{titleText}{/if}
						</h3>
					</div>
				{:else if title}
					<h3>{@render title()}</h3>
				{:else if titleText}
					<h3>{titleText}</h3>
				{/if}
				{#if description}
					<p>{@render description()}</p>
				{:else if descriptionText}
					<!-- Description fills available space and truncates with ellipsis -->
					<p>{descriptionText}</p>
				{:else if subtitle}
					<p class="pa-text pa-text--secondary">{@render subtitle()}</p>
				{:else if subtitleText}
					<!-- Legacy subtitleText (shown as secondary text) -->
					<p class="pa-text pa-text--secondary">{subtitleText}</p>
				{/if}
				{#if tools}
					<div class="pa-card__tools">
						{@render tools()}
					</div>
				{/if}
			{/if}
		</div>
	{/if}

	<div class={bodyClasses()}>
		{@render children?.()}
	</div>

	{#if hasFooter}
		<div class="pa-card__footer">
			{#if footer}
				{@render footer()}
			{:else if actions}
				<div class="pa-card__actions">
					{@render actions()}
				</div>
			{/if}
		</div>
	{/if}
</div>
