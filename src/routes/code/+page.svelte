<script lang="ts">
	import Heading from '$lib/typography/Heading.svelte';
	import Paragraph from '$lib/typography/Paragraph.svelte';
	import { Card, Grid, Column, Code, CodeBlock } from '$lib';

	function copyCode(event: MouseEvent) {
		const button = event.currentTarget as HTMLButtonElement;
		const codeBlock = button.closest('.pa-code-block');
		if (!codeBlock) return;

		const code = codeBlock.querySelector('.pa-code')?.textContent;
		if (!code) return;

		navigator.clipboard.writeText(code).then(() => {
			const originalHTML = button.innerHTML;
			button.innerHTML = '<span class="pa-btn__icon">✓</span> Copied!';
			button.classList.add('pa-btn--success');

			setTimeout(() => {
				button.innerHTML = originalHTML;
				button.classList.remove('pa-btn--success');
			}, 2000);
		});
	}
</script>

<svelte:head>
	<title>Code - Pure Admin Svelte</title>
</svelte:head>

<Heading level={1}>Code</Heading>
<Paragraph>Display code snippets, JSON data, configuration files, and terminal output with syntax highlighting and copy functionality.</Paragraph>

<!-- Inline Code -->
<Card>
	{#snippet header()}
		<Heading level={3}>Inline Code</Heading>
	{/snippet}

	<Paragraph>Use the <code>&lt;code&gt;</code> element for inline code references like <code>npm install</code> or <code>const myVariable = true</code>.</Paragraph>
	<Paragraph>Configure the server using <code>config.json</code> and set <code>port: 3000</code> in the configuration file.</Paragraph>
	<Paragraph>Import components with <code>import {`{ Button }`} from 'react'</code> syntax.</Paragraph>
</Card>

<!-- Basic Code Blocks -->
<Card>
	{#snippet header()}
		<Heading level={3}>Basic Code Blocks</Heading>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2">
			<Heading level={4}>JavaScript</Heading>
			<Code language="javascript">{`function greet(name) {
    return \`Hello, \${name}!\`;
}

const result = greet('World');
console.log(result);`}</Code>
		</Column>

		<Column size="1" md="1-2">
			<Heading level={4}>JSON</Heading>
			<Code language="json">{`{
    "name": "Pure Admin",
    "version": "1.0.0",
    "theme": "corporate",
    "features": [
        "responsive",
        "themeable",
        "lightweight"
    ]
}`}</Code>
		</Column>

		<Column size="1" md="1-2">
			<Heading level={4}>HTML</Heading>
			<Code language="html">{`<div class="pa-card">
    <div class="pa-card__header">
        <Heading level={3}>Card Title</Heading>
    </div>
    <div class="pa-card__body">
        Content here
    </div>
</div>`}</Code>
		</Column>

		<Column size="1" md="1-2">
			<Heading level={4}>CSS</Heading>
			<Code language="css">{`.pa-btn {
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    background-color: #3b82f6;
    color: #ffffff;
}`}</Code>
		</Column>
	</Grid>
</Card>

<!-- Code Blocks with Headers and Copy -->
<Card>
	{#snippet header()}
		<Heading level={3}>Code Blocks with Headers</Heading>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2">
			<div class="pa-code-block">
				<div class="pa-code-block__header">
					<span class="pa-code-block__title">server.js</span>
					<button class="pa-btn pa-btn--xs pa-btn--secondary" onclick={copyCode}>
						<span class="pa-btn__icon">📋</span>
						Copy
					</button>
				</div>
				<div class="pa-code-block__body">
					<Code>{`const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000);`}</Code>
				</div>
			</div>
		</Column>

		<Column size="1" md="1-2">
			<div class="pa-code-block">
				<div class="pa-code-block__header">
					<span class="pa-code-block__title">package.json</span>
					<button class="pa-btn pa-btn--xs pa-btn--secondary" onclick={copyCode}>
						<span class="pa-btn__icon">📋</span>
						Copy
					</button>
				</div>
				<div class="pa-code-block__body">
					<Code language="json">{`{
    "name": "my-app",
    "version": "1.0.0",
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js"
    }
}`}</Code>
				</div>
			</div>
		</Column>
	</Grid>
</Card>

<!-- Terminal/Bash Output -->
<Card>
	{#snippet header()}
		<Heading level={3}>Terminal Output</Heading>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2">
			<Heading level={4}>Bash Commands</Heading>
			<Code language="bash">{`$ npm install
$ npm run build
$ npm start

Server running on port 3000...`}</Code>
		</Column>

		<Column size="1" md="1-2">
			<Heading level={4}>SQL Query</Heading>
			<Code language="sql">{`SELECT users.name, orders.total
FROM users
INNER JOIN orders
    ON users.id = orders.user_id
WHERE orders.status = 'completed'
ORDER BY orders.total DESC;`}</Code>
		</Column>
	</Grid>
</Card>

<!-- Compact Code Blocks -->
<Card>
	{#snippet header()}
		<Heading level={3}>Compact Variant</Heading>
	{/snippet}

	<Paragraph>Use <code>.pa-code--compact</code> for smaller code snippets.</Paragraph>
	<Code language="python" compact>{`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`}</Code>
</Card>

<!-- All Language Variants -->
<Card>
	{#snippet header()}
		<Heading level={3}>Language Accent Colors</Heading>
	{/snippet}

	<Paragraph>Code blocks with language-specific colored left borders for visual identification.</Paragraph>

	<Grid>
		<Column size="1" md="1-3">
			<Heading level={5}>JavaScript</Heading>
			<Code language="javascript" compact>console.log('Hello');</Code>
		</Column>
		<Column size="1" md="1-3">
			<Heading level={5}>JSON</Heading>
			<Code language="json" compact>{`{"key": "value"}`}</Code>
		</Column>
		<Column size="1" md="1-3">
			<Heading level={5}>HTML</Heading>
			<Code language="html" compact>{`<div>Hello</div>`}</Code>
		</Column>
		<Column size="1" md="1-3">
			<Heading level={5}>CSS</Heading>
			<Code language="css" compact>.class {`{ color: red; }`}</Code>
		</Column>
		<Column size="1" md="1-3">
			<Heading level={5}>Bash</Heading>
			<Code language="bash" compact>$ npm install</Code>
		</Column>
		<Column size="1" md="1-3">
			<Heading level={5}>SQL</Heading>
			<Code language="sql" compact>SELECT * FROM users;</Code>
		</Column>
		<Column size="1" md="1-3">
			<Heading level={5}>Python</Heading>
			<Code language="python" compact>print("Hello World")</Code>
		</Column>
	</Grid>
</Card>

<!-- Usage Examples -->
<Card>
	{#snippet header()}
		<Heading level={3}>Usage Examples</Heading>
	{/snippet}

	<Heading level={4}>Inline Code</Heading>
	<Code language="html">{`<Paragraph>Use <code>inline code</code> for references.</Paragraph>`}</Code>

	<Heading level={4}>Basic Code Block</Heading>
	<Code language="html">{`<pre class="pa-code pa-code--javascript">
const greeting = 'Hello';
console.log(greeting);
</pre>`}</Code>

	<Heading level={4}>Code Block with Header</Heading>
	<Code language="html">{`<div class="pa-code-block">
    <div class="pa-code-block__header">
        <span class="pa-code-block__title">filename.js</span>
        <button class="pa-btn pa-btn--xs">Copy</button>
    </div>
    <div class="pa-code-block__body">
        <pre class="pa-code">// your code here</pre>
    </div>
</div>`}</Code>
</Card>
