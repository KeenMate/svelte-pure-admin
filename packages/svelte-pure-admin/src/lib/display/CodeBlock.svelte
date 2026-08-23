<script lang="ts">
	/**
	 * Pure Admin CodeBlock Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/code.html
	 * For code blocks (pre elements) with syntax highlighting hints
	 */

	// Core defines language accents only for these seven (code.html / _code.scss);
	// there is no pa-code--typescript or pa-code--svelte — dropped from the union.
	type Language = 'javascript' | 'json' | 'html' | 'css' | 'bash' | 'sql' | 'python';

	interface Props {
		/** Programming language for styling */
		language?: Language;
		/** Compact layout (smaller padding) */
		isCompact?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Code content */
		children?: import('svelte').Snippet;
	}

	let { language, isCompact = false, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-code'];

		// Compact modifier
		if (isCompact) base.push('pa-code--compact');

		// Language variant
		if (language) base.push(`pa-code--${language}`);

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<pre class={classes()}>{@render children?.()}</pre>
