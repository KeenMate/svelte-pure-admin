<script lang="ts">
	/**
	 * Pure Admin Card Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/cards.html
	 */

	type CardVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info'
		| 'color-1' | 'color-2' | 'color-3' | 'color-4' | 'color-5'
		| 'color-6' | 'color-7' | 'color-8' | 'color-9';

	interface Props {
		/** Card variant (applies to whole card) */
		variant?: CardVariant;
		/** Remove padding from body */
		noPadding?: boolean;
		/** Stat card style */
		stat?: boolean;
		/** Simple title text (alternative to header snippet) */
		title?: string;
		/** Subtitle/description text (shown below title) */
		subtitle?: string;
		/** Inline tabs style (pill-style buttons inside card header row) */
		inlineTabs?: boolean;
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
		noPadding = false,
		stat = false,
		title,
		subtitle,
		inlineTabs = false,
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
		if (stat) base.push('pa-card--stat');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build body class string
	const bodyClasses = $derived(() => {
		const base = ['pa-card__body'];
		if (noPadding) base.push('pa-card__body--no-padding');
		return base.join(' ');
	});

	// Build tabs class string
	const tabsClasses = $derived(() => {
		const base = ['pa-card__tabs'];
		if (inlineTabs) base.push('pa-card__tabs--inline');
		return base.join(' ');
	});

	// Determine if we should show header
	const hasHeader = $derived(header || title || titleIcon || subtitle || tools || tabs);
	// Determine if we should show footer
	const hasFooter = $derived(footer || actions);
</script>

<div class={classes()}>
	{#if hasHeader}
		<div class="pa-card__header">
			{#if tabs}
				<div class={tabsClasses()}>
					{@render tabs()}
				</div>
			{:else if header}
				{@render header()}
			{:else}
				{#if titleIcon && title}
					<div class="pa-card__title">
						<span class="pa-card__title-icon">
							{@render titleIcon()}
						</span>
						<h4 class="pa-card__title-text">{title}</h4>
					</div>
				{:else if title}
					<h4>{title}</h4>
				{/if}
				{#if subtitle}
					<p class="pa-text pa-text--secondary">{subtitle}</p>
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
