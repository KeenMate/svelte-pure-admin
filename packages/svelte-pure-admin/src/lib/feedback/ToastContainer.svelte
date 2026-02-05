<script lang="ts">
	/**
	 * Pure Admin ToastContainer Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/toasts.html
	 */

	// Logical positions (RTL-aware) - preferred for new code
	// Physical positions are deprecated but still supported for backwards compatibility
	type ToastPosition =
		| 'top-end'      // Preferred (right in LTR, left in RTL)
		| 'top-center'
		| 'top-start'    // Preferred (left in LTR, right in RTL)
		| 'bottom-end'   // Preferred
		| 'bottom-center'
		| 'bottom-start' // Preferred
		// Deprecated physical positions (mapped to logical equivalents)
		| 'top-right'
		| 'top-left'
		| 'bottom-right'
		| 'bottom-left';

	interface Props {
		/** Container position. Use logical positions (top-end, top-start, etc.) for RTL support. Default: 'top-end' */
		position?: ToastPosition;
		/** Additional CSS classes */
		class?: string;
		/** Children content */
		children?: import('svelte').Snippet;
	}

	let { position = 'top-end', class: className = '', children }: Props = $props();

	// Map physical positions to logical CSS classes (RTL-aware)
	const positionClassMap: Record<string, string> = {
		'top-right': 'top-end',
		'top-left': 'top-start',
		'bottom-right': 'bottom-end',
		'bottom-left': 'bottom-start',
		'top-center': 'top-center',
		'bottom-center': 'bottom-center',
		// Pass through logical positions as-is
		'top-end': 'top-end',
		'top-start': 'top-start',
		'bottom-end': 'bottom-end',
		'bottom-start': 'bottom-start'
	};

	// Build class string
	const classes = $derived(() => {
		const posClass = positionClassMap[position] || 'top-end';
		const base = ['pa-toast-container', `pa-toast-container--${posClass}`];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{@render children?.()}
</div>
