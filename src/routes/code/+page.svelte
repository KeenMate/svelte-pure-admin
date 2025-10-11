<script lang="ts">
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

<h1>Code</h1>
<p>Display code snippets, JSON data, configuration files, and terminal output with syntax highlighting and copy functionality.</p>

<!-- Inline Code -->
<Card>
	{#snippet header()}
		<h3>Inline Code</h3>
	{/snippet}

	<p>Use the <code>&lt;code&gt;</code> element for inline code references like <code>npm install</code> or <code>const myVariable = true</code>.</p>
	<p>Configure the server using <code>config.json</code> and set <code>port: 3000</code> in the configuration file.</p>
	<p>Import components with <code>import {`{ Button }`} from 'react'</code> syntax.</p>
</Card>

<!-- Basic Code Blocks -->
<Card>
	{#snippet header()}
		<h3>Basic Code Blocks</h3>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2">
			<h4>JavaScript</h4>
			<Code language="javascript">{`function greet(name) {
    return \`Hello, \${name}!\`;
}

const result = greet('World');
console.log(result);`}</Code>
		</Column>

		<Column size="1" md="1-2">
			<h4>JSON</h4>
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
			<h4>HTML</h4>
			<Code language="html">{`<div class="pa-card">
    <div class="pa-card__header">
        <h3>Card Title</h3>
    </div>
    <div class="pa-card__body">
        Content here
    </div>
</div>`}</Code>
		</Column>

		<Column size="1" md="1-2">
			<h4>CSS</h4>
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
		<h3>Code Blocks with Headers</h3>
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
		<h3>Terminal Output</h3>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2">
			<h4>Bash Commands</h4>
			<Code language="bash">{`$ npm install
$ npm run build
$ npm start

Server running on port 3000...`}</Code>
		</Column>

		<Column size="1" md="1-2">
			<h4>SQL Query</h4>
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
		<h3>Compact Variant</h3>
	{/snippet}

	<p>Use <code>.pa-code--compact</code> for smaller code snippets.</p>
	<Code language="python" compact>{`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`}</Code>
</Card>

<!-- All Language Variants -->
<Card>
	{#snippet header()}
		<h3>Language Accent Colors</h3>
	{/snippet}

	<p>Code blocks with language-specific colored left borders for visual identification.</p>

	<Grid>
		<Column size="1" md="1-3">
			<h5>JavaScript</h5>
			<Code language="javascript" compact>console.log('Hello');</Code>
		</Column>
		<Column size="1" md="1-3">
			<h5>JSON</h5>
			<Code language="json" compact>{`{"key": "value"}`}</Code>
		</Column>
		<Column size="1" md="1-3">
			<h5>HTML</h5>
			<Code language="html" compact>{`<div>Hello</div>`}</Code>
		</Column>
		<Column size="1" md="1-3">
			<h5>CSS</h5>
			<Code language="css" compact>.class {`{ color: red; }`}</Code>
		</Column>
		<Column size="1" md="1-3">
			<h5>Bash</h5>
			<Code language="bash" compact>$ npm install</Code>
		</Column>
		<Column size="1" md="1-3">
			<h5>SQL</h5>
			<Code language="sql" compact>SELECT * FROM users;</Code>
		</Column>
		<Column size="1" md="1-3">
			<h5>Python</h5>
			<Code language="python" compact>print("Hello World")</Code>
		</Column>
	</Grid>
</Card>

<!-- Usage Examples -->
<Card>
	{#snippet header()}
		<h3>Usage Examples</h3>
	{/snippet}

	<h4>Inline Code</h4>
	<Code language="html">{`<p>Use <code>inline code</code> for references.</p>`}</Code>

	<h4>Basic Code Block</h4>
	<Code language="html">{`<pre class="pa-code pa-code--javascript">
const greeting = 'Hello';
console.log(greeting);
</pre>`}</Code>

	<h4>Code Block with Header</h4>
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
