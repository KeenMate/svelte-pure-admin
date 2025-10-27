<script lang="ts">
	/**
	 * Pure Admin Card Component (Svelte 5)
	 * Based on @pure-admin/core snippets/cards.html
	 */

	type CardVariant = 'primary' | 'success' | 'warning' | 'danger';

	interface Props {
		/** Card variant */
		variant?: CardVariant;
		/** Remove padding from body */
		noPadding?: boolean;
		/** Stat card style */
		stat?: boolean;
		/** Simple title text (alternative to header snippet) */
		title?: string;
		/** Additional CSS classes */
		class?: string;
		/** Header snippet (for complex headers) */
		header?: import('svelte').Snippet;
		/** Title icon snippet (rendered before title) */
		titleIcon?: import('svelte').Snippet;
		/** Header tools snippet (rendered in header toolbar area) */
		tools?: import('svelte').Snippet;
		/** Tabs snippet (renders in card header as tabs) */
		tabs?: import('svelte').Snippet;
		/** Body snippet (main content) */
		children?: import('svelte').Snippet;
		/** Footer snippet (for complex footers) */
		footer?: import('svelte').Snippet;
		/** Footer meta snippet (rendered on left side of footer) */
		meta?: import('svelte').Snippet;
		/** Footer actions snippet (rendered on right side of footer) */
		actions?: import('svelte').Snippet;
	}

	let {
		variant,
		noPadding = false,
		stat = false,
		title,
		class: className = '',
		header,
		titleIcon,
		tools,
		tabs,
		children,
		footer,
		meta,
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

	// Determine if we should show header
	const hasHeader = $derived(header || title || titleIcon || tools || tabs || meta);
	// Determine if we should show footer
	const hasFooter = $derived(footer || actions);
</script>

<div class={classes()}>
	{#if hasHeader}
		<div class="pa-card__header">
			{#if tabs}
				<div class="pa-card__tabs">
					{@render tabs()}
				</div>
			{:else if header}
				{@render header()}
			{:else}
				{#if title || titleIcon}
					<div class="pa-card__title">
						{#if titleIcon}
							<span class="pa-card__title-icon">
								{@render titleIcon()}
							</span>
						{/if}
						{#if title}
							<h4 class="pa-card__title-text">{title}</h4>
						{/if}
					</div>
				{/if}
				{#if tools}
					<div class="pa-card__tools">
						{@render tools()}
					</div>
				{/if}
				{#if meta}
					<span class="pa-card__meta">
						{@render meta()}
					</span>
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
