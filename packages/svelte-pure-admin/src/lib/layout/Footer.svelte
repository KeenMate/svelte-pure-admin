<script lang="ts">
	/**
	 * Pure Admin Footer Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/layout.html
	 *
	 * THREE-SECTION LAYOUT (v1.0.0-rc06):
	 * - .pa-footer__left - Copyright (stays anchored left)
	 * - .pa-footer__center - Optional center content (flexible, fills space)
	 * - .pa-footer__right - Version info, links (stays anchored right)
	 *
	 * Auto-config: When no left snippet is provided, uses config.app.copyright
	 */
	import { usePureAdminConfig } from '../config/hooks';
	import Paragraph from '../typography/Paragraph.svelte';

	const config = usePureAdminConfig();

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Left section snippet (copyright area) */
		left?: import('svelte').Snippet;
		/** Center section snippet (optional content) */
		center?: import('svelte').Snippet;
		/** Right section snippet (version info, links) */
		right?: import('svelte').Snippet;
		/** Make right section vertical (stacks items) */
		rightVertical?: boolean;
		/** Children content (legacy fallback - renders all content) */
		children?: import('svelte').Snippet;
	}

	let {
		class: className = '',
		left,
		center,
		right,
		rightVertical = false,
		children
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-layout__footer'];
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build right section classes
	const rightClasses = $derived(() => {
		const base = ['pa-footer__right'];
		if (rightVertical) base.push('pa-footer__right--vertical');
		return base.join(' ');
	});

	// Check if using three-section layout
	const useThreeSectionLayout = $derived(() => {
		return left || center || right || (!children && config().app.copyright);
	});
</script>

<footer class={classes()}>
	{#if useThreeSectionLayout()}
		<!-- Left Section (stays anchored left) -->
		<div class="pa-footer__left">
			{#if left}
				{@render left()}
			{:else if config().app.copyright}
				<Paragraph>{config().app.copyright}</Paragraph>
			{/if}
		</div>

		<!-- Center Section (flexible, fills space) -->
		<div class="pa-footer__center">
			{#if center}
				{@render center()}
			{/if}
		</div>

		<!-- Right Section (stays anchored right) -->
		<div class={rightClasses()}>
			{#if right}
				{@render right()}
			{/if}
		</div>
	{:else if children}
		<!-- Legacy fallback: render children directly -->
		{@render children()}
	{/if}
</footer>
