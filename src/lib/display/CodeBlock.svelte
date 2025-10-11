<script lang="ts">
	/**
	 * Pure Admin CodeBlock Component (Svelte 5)
	 * Based on @pure-admin/core snippets/code.html
	 * For code blocks (pre elements) with syntax highlighting hints
	 */

	type Language = 'javascript' | 'json' | 'html' | 'css' | 'bash' | 'sql' | 'python';

	interface Props {
		/** Programming language for styling */
		language?: Language;
		/** Compact layout (smaller padding) */
		compact?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Code content */
		children?: import('svelte').Snippet;
	}

	let { language, compact = false, class: className = '', children }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-code'];

		// Compact modifier
		if (compact) base.push('pa-code--compact');

		// Language variant
		if (language) base.push(`pa-code--${language}`);

		// Custom classes
		if (className) base.push(className);

		return base.join(' ');
	});
</script>

<pre class={classes()}>{@render children?.()}</pre>
