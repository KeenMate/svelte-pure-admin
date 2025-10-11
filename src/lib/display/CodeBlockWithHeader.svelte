<script lang="ts">
	/**
	 * Pure Admin CodeBlockWithHeader Component (Svelte 5)
	 * Based on @pure-admin/core snippets/code.html
	 * Code block with header (title and copy button)
	 */

	import Button from '../buttons/Button.svelte';

	type Language = 'javascript' | 'json' | 'html' | 'css' | 'bash' | 'sql' | 'python';

	interface Props {
		/** Title (e.g., filename) */
		title: string;
		/** Programming language for styling */
		language?: Language;
		/** Show copy button */
		showCopy?: boolean;
		/** Additional CSS classes */
		class?: string;
		/** Code content */
		children?: import('svelte').Snippet;
	}

	let {
		title,
		language,
		showCopy = true,
		class: className = '',
		children
	}: Props = $props();

	let copied = $state(false);

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-code-block'];
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build code block class string
	const codeClasses = $derived(() => {
		const base = ['pa-code'];
		if (language) base.push(`pa-code--${language}`);
		return base.join(' ');
	});

	function handleCopy() {
		// Get the code content
		const codeElement = document.querySelector('.pa-code-block__body .pa-code');
		if (codeElement) {
			const code = codeElement.textContent || '';

			navigator.clipboard.writeText(code).then(() => {
				copied = true;
				setTimeout(() => {
					copied = false;
				}, 2000);
			});
		}
	}
</script>

<div class={classes()}>
	<div class="pa-code-block__header">
		<span class="pa-code-block__title">{title}</span>
		{#if showCopy}
			<Button variant={copied ? 'success' : 'secondary'} size="xs" onclick={handleCopy}>
				{#snippet icon()}
					{copied ? '✓' : '📋'}
				{/snippet}
				{copied ? 'Copied!' : 'Copy'}
			</Button>
		{/if}
	</div>
	<div class="pa-code-block__body">
		<pre class={codeClasses()}>{@render children?.()}</pre>
	</div>
</div>
