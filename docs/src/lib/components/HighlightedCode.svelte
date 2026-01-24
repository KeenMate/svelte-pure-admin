<script lang="ts">
	/**
	 * Syntax-highlighted code block component using highlight.js
	 */
	import { onMount } from 'svelte';
	import hljs from 'highlight.js/lib/core';

	// Import only the languages we need
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import json from 'highlight.js/lib/languages/json';
	import xml from 'highlight.js/lib/languages/xml';
	import css from 'highlight.js/lib/languages/css';
	import bash from 'highlight.js/lib/languages/bash';
	import sql from 'highlight.js/lib/languages/sql';
	import python from 'highlight.js/lib/languages/python';

	// Register languages
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('json', json);
	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('html', xml);
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('bash', bash);
	hljs.registerLanguage('shell', bash);
	hljs.registerLanguage('sql', sql);
	hljs.registerLanguage('python', python);
	// Svelte uses XML for template highlighting
	hljs.registerLanguage('svelte', xml);

	type Language =
		| 'javascript'
		| 'typescript'
		| 'json'
		| 'html'
		| 'xml'
		| 'css'
		| 'bash'
		| 'shell'
		| 'sql'
		| 'python'
		| 'svelte';

	interface Props {
		/** Code to highlight */
		code: string;
		/** Programming language */
		language?: Language;
		/** Show line numbers */
		showLineNumbers?: boolean;
		/** Additional CSS classes */
		class?: string;
	}

	let { code, language = 'typescript', showLineNumbers = false, class: className = '' }: Props = $props();

	let highlightedCode = $state('');

	// Highlight on mount and when code/language changes
	$effect(() => {
		if (code && language) {
			try {
				const result = hljs.highlight(code, { language });
				highlightedCode = result.value;
			} catch {
				// Fallback to plain text if language not supported
				highlightedCode = escapeHtml(code);
			}
		}
	});

	function escapeHtml(text: string): string {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	// Generate line numbers if needed
	const lines = $derived(() => code.split('\n'));
	const lineNumbers = $derived(() => {
		if (!showLineNumbers) return '';
		return lines()
			.map((_, i) => i + 1)
			.join('\n');
	});

	const wrapperClasses = $derived(() => {
		const base = ['hljs-wrapper', `language-${language}`];
		if (showLineNumbers) base.push('with-line-numbers');
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={wrapperClasses()}>
	{#if showLineNumbers}
		<pre class="hljs-line-numbers" aria-hidden="true">{lineNumbers()}</pre>
	{/if}
	<pre class="hljs"><code>{@html highlightedCode}</code></pre>
</div>

<style>
	.hljs-wrapper {
		position: relative;
		margin: 0.5rem 0 1rem;
		border-radius: 6px;
		overflow: hidden;
		background: #1e1e1e;
	}

	.hljs-wrapper.with-line-numbers {
		display: flex;
	}

	.hljs-line-numbers {
		flex-shrink: 0;
		padding: 1rem 0.75rem;
		margin: 0;
		text-align: right;
		color: #6e7681;
		background: #161616;
		border-right: 1px solid #333;
		user-select: none;
		font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	pre.hljs {
		flex: 1;
		margin: 0;
		padding: 1rem;
		overflow-x: auto;
		font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
		font-size: 0.875rem;
		line-height: 1.5;
		background: transparent;
	}

	pre.hljs code {
		background: transparent;
		padding: 0;
	}

	/* Dark theme (GitHub Dark style) */
	:global(.hljs) {
		color: #e6edf3;
	}

	:global(.hljs-comment),
	:global(.hljs-quote) {
		color: #8b949e;
		font-style: italic;
	}

	:global(.hljs-keyword),
	:global(.hljs-selector-tag),
	:global(.hljs-addition) {
		color: #ff7b72;
	}

	:global(.hljs-number),
	:global(.hljs-string),
	:global(.hljs-meta .hljs-meta-string),
	:global(.hljs-literal),
	:global(.hljs-doctag),
	:global(.hljs-regexp) {
		color: #a5d6ff;
	}

	:global(.hljs-string) {
		color: #a5d6ff;
	}

	:global(.hljs-title),
	:global(.hljs-section),
	:global(.hljs-name),
	:global(.hljs-selector-id),
	:global(.hljs-selector-class) {
		color: #d2a8ff;
	}

	:global(.hljs-attribute),
	:global(.hljs-attr),
	:global(.hljs-variable),
	:global(.hljs-template-variable),
	:global(.hljs-class .hljs-title),
	:global(.hljs-type) {
		color: #79c0ff;
	}

	:global(.hljs-symbol),
	:global(.hljs-bullet),
	:global(.hljs-subst),
	:global(.hljs-meta),
	:global(.hljs-meta .hljs-keyword),
	:global(.hljs-selector-attr),
	:global(.hljs-selector-pseudo),
	:global(.hljs-link) {
		color: #ffa657;
	}

	:global(.hljs-built_in),
	:global(.hljs-deletion) {
		color: #ffa657;
	}

	:global(.hljs-formula) {
		background-color: #161b22;
	}

	:global(.hljs-emphasis) {
		font-style: italic;
	}

	:global(.hljs-strong) {
		font-weight: bold;
	}

	/* JSON specific */
	:global(.hljs-attr) {
		color: #79c0ff;
	}

	/* TypeScript/JavaScript specific */
	:global(.hljs-params) {
		color: #e6edf3;
	}

	:global(.hljs-function) {
		color: #d2a8ff;
	}

	:global(.hljs-title.function_) {
		color: #d2a8ff;
	}

	:global(.hljs-property) {
		color: #79c0ff;
	}
</style>
