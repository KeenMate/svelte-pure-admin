<script lang="ts">
	import Heading from '$lib/typography/Heading.svelte';
	import Paragraph from '$lib/typography/Paragraph.svelte';
	import { Card, Code, CommandPalette, Button } from '$lib';
	import { onMount } from 'svelte';

	let showPalette = $state(false);

	// Sample data for command palette
	const products = [
		{ id: 1, name: 'MacBook Pro 16"', price: '$2,499' },
		{ id: 2, name: 'MacBook Air M2', price: '$1,199' },
		{ id: 3, name: 'iPhone 15 Pro', price: '$999' },
		{ id: 4, name: 'iPad Pro 12.9"', price: '$1,099' },
		{ id: 5, name: 'AirPods Pro', price: '$249' }
	];

	const orders = [
		{ id: 1001, customer: 'John Doe', status: 'Shipped', total: '$1,249' },
		{ id: 1002, customer: 'Jane Smith', status: 'Processing', total: '$849' },
		{ id: 1003, customer: 'Bob Wilson', status: 'Delivered', total: '$2,399' },
		{ id: 1004, customer: 'Sarah Chen', status: 'Pending', total: '$599' }
	];

	const users = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
		{ id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Manager' },
		{ id: 4, name: 'Sarah Chen', email: 'sarah@example.com', role: 'User' }
	];

	const invoices = [
		{ id: 501, customer: 'Acme Corp', amount: '$5,000', status: 'Paid' },
		{ id: 502, customer: 'TechStart Inc', amount: '$3,200', status: 'Unpaid' },
		{ id: 503, customer: 'Global Solutions', amount: '$7,500', status: 'Paid' },
		{ id: 504, customer: 'StartupHub', amount: '$1,800', status: 'Overdue' }
	];

	const allItems = [
		...products.map((p) => ({ context: 'products', title: p.name, subtitle: p.price })),
		...orders.map((o) => ({ context: 'orders', title: `Order #${o.id}`, subtitle: o.customer })),
		...users.map((u) => ({ context: 'users', title: u.name, subtitle: u.email })),
		...invoices.map((i) => ({ context: 'invoices', title: `Invoice #${i.id}`, subtitle: i.customer }))
	];
</script>

<svelte:head>
	<title>Command Palette - Pure Admin Svelte</title>
</svelte:head>

<Heading level={1}>Command Palette</Heading>
<Paragraph>MacOS Spotlight-style quick navigation with keyboard shortcuts and context switching.</Paragraph>

<!-- Live Demo -->
<Card>
	{#snippet header()}
		<Heading level={3}>Live Demo</Heading>
	{/snippet}

	<div style="text-align: center; padding: 2rem;">
		<Button variant="primary" size="lg" onclick={() => (showPalette = true)}>
			<span style="margin-right: 0.5rem;">🔍</span>
			Open Command Palette
			<span class="pa-badge pa-badge--secondary pa-badge--sm" style="margin-left: 0.75rem;">
				Ctrl+K
			</span>
		</Button>

		<Paragraph class="mt-4 text-secondary">
			Or press <kbd style="padding: 0.25rem 0.5rem; background: #f3f4f6; border-radius: 0.25rem; font-family: monospace;">Ctrl+K</kbd>
			(or <kbd style="padding: 0.25rem 0.5rem; background: #f3f4f6; border-radius: 0.25rem; font-family: monospace;">Cmd+K</kbd> on Mac) to open
		</Paragraph>
	</div>

	<CommandPalette bind:show={showPalette} items={allItems} />
</Card>

<!-- Keyboard Shortcuts -->
<Card>
	{#snippet header()}
		<Heading level={3}>Keyboard Shortcuts</Heading>
	{/snippet}

	<div class="pa-table-container">
		<table class="pa-table">
			<thead>
				<tr>
					<th>Key</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<kbd style="padding: 0.25rem 0.5rem; background: #f3f4f6; border-radius: 0.25rem; font-family: monospace;">Ctrl+K</kbd>
						/
						<kbd style="padding: 0.25rem 0.5rem; background: #f3f4f6; border-radius: 0.25rem; font-family: monospace;">Cmd+K</kbd>
					</td>
					<td>Open/close command palette</td>
				</tr>
				<tr>
					<td>
						<kbd style="padding: 0.25rem 0.5rem; background: #f3f4f6; border-radius: 0.25rem; font-family: monospace;">↑</kbd>
						<kbd style="padding: 0.25rem 0.5rem; background: #f3f4f6; border-radius: 0.25rem; font-family: monospace;">↓</kbd>
					</td>
					<td>Navigate through results</td>
				</tr>
				<tr>
					<td>
						<kbd style="padding: 0.25rem 0.5rem; background: #f3f4f6; border-radius: 0.25rem; font-family: monospace;">←</kbd>
						<kbd style="padding: 0.25rem 0.5rem; background: #f3f4f6; border-radius: 0.25rem; font-family: monospace;">→</kbd>
					</td>
					<td>Navigate between pages</td>
				</tr>
				<tr>
					<td>
						<kbd style="padding: 0.25rem 0.5rem; background: #f3f4f6; border-radius: 0.25rem; font-family: monospace;">Enter</kbd>
					</td>
					<td>Select highlighted result</td>
				</tr>
				<tr>
					<td>
						<kbd style="padding: 0.25rem 0.5rem; background: #f3f4f6; border-radius: 0.25rem; font-family: monospace;">Esc</kbd>
					</td>
					<td>Close command palette</td>
				</tr>
			</tbody>
		</table>
	</div>
</Card>

<!-- Context Switching -->
<Card>
	{#snippet header()}
		<Heading level={3}>Context Switching</Heading>
	{/snippet}

	<Paragraph class="mb-4">Use prefixes to search within specific contexts:</Paragraph>

	<div class="pa-table-container">
		<table class="pa-table">
			<thead>
				<tr>
					<th>Prefix</th>
					<th>Context</th>
					<th>Example</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>/p</code></td>
					<td>Products</td>
					<td><code>/p macbook</code></td>
				</tr>
				<tr>
					<td><code>/o</code></td>
					<td>Orders</td>
					<td><code>/o 1001</code></td>
				</tr>
				<tr>
					<td><code>/u</code></td>
					<td>Users</td>
					<td><code>/u john</code></td>
				</tr>
				<tr>
					<td><code>/i</code></td>
					<td>Invoices</td>
					<td><code>/i 501</code></td>
				</tr>
			</tbody>
		</table>
	</div>

	<Paragraph class="mt-4 text-secondary" style="font-size: 0.875rem;">
		<strong>Tip:</strong> Start typing a prefix to filter results by context. For example, typing "/p mac" will
		search only within products for "mac".
	</Paragraph>
</Card>

<!-- Key Features -->
<Card>
	{#snippet header()}
		<Heading level={3}>Key Features</Heading>
	{/snippet}

	<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
		<div>
			<Heading level={4} style="margin-bottom: 0.5rem;">⚡ Lightning Fast</Heading>
			<Paragraph class="text-secondary">Instant search results with optimized fuzzy matching algorithm.</Paragraph>
		</div>

		<div>
			<Heading level={4} style="margin-bottom: 0.5rem;">🎯 Context-Aware</Heading>
			<Paragraph class="text-secondary">Switch between different data contexts using simple prefixes.</Paragraph>
		</div>

		<div>
			<Heading level={4} style="margin-bottom: 0.5rem;">⌨️ Keyboard Control</Heading>
			<Paragraph class="text-secondary">Navigate entirely with keyboard - no mouse required.</Paragraph>
		</div>

		<div>
			<Heading level={4} style="margin-bottom: 0.5rem;">🔍 Fuzzy Matching</Heading>
			<Paragraph class="text-secondary">Find items even with typos or partial matches.</Paragraph>
		</div>

		<div>
			<Heading level={4} style="margin-bottom: 0.5rem;">📄 Pagination</Heading>
			<Paragraph class="text-secondary">Browse through large result sets with arrow key navigation.</Paragraph>
		</div>

		<div>
			<Heading level={4} style="margin-bottom: 0.5rem;">🎨 Themeable</Heading>
			<Paragraph class="text-secondary">Matches your application theme automatically.</Paragraph>
		</div>
	</div>
</Card>

<!-- Usage Examples -->
<Card>
	{#snippet header()}
		<Heading level={3}>Usage Examples</Heading>
	{/snippet}

	<Heading level={4}>Basic Implementation</Heading>
	<Code language="javascript">{`< script>
  import { CommandPalette } from '@pure-admin/svelte';

  let showPalette = $state(false);

  const items = [
    { context: 'products', title: 'MacBook Pro', subtitle: '$2,499' },
    { context: 'orders', title: 'Order #1001', subtitle: 'John Doe' }
  ];
</script>

<CommandPalette bind:show={showPalette} {items} />`}</Code>

	<Heading level={4} class="mt-4">With Keyboard Shortcut</Heading>
	<Code language="javascript">{`< script>
  import { onMount } from 'svelte';

  onMount(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showPalette = true;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });
</script>`}</Code>

	<Heading level={4} class="mt-4">Custom Context Prefixes</Heading>
	<Code language="javascript">{`const contextPrefixes = {
  '/p': 'products',
  '/o': 'orders',
  '/u': 'users',
  '/i': 'invoices'
};`}</Code>

	<Heading level={4} class="mt-4">Try These Searches</Heading>
	<ul>
		<li><strong>Products:</strong> Try searching for "macbook", "iphone", or "/p mac"</li>
		<li><strong>Orders:</strong> Search "1001", "shipped", or "/o john"</li>
		<li><strong>Users:</strong> Search "john", "admin", or "/u smith"</li>
		<li><strong>Invoices:</strong> Search "501", "unpaid", or "/i acme"</li>
	</ul>
</Card>

<!-- Integration Tips -->
<Card>
	{#snippet header()}
		<Heading level={3}>Integration Tips</Heading>
	{/snippet}

	<Heading level={4}>Best Practices</Heading>
	<ul>
		<li>Include the command palette button in your header/navbar for easy access</li>
		<li>Show the keyboard shortcut hint (Ctrl+K) next to the button</li>
		<li>Provide diverse data sources (pages, products, users, settings, etc.)</li>
		<li>Use meaningful context prefixes that are easy to remember</li>
		<li>Include both title and subtitle for better context in results</li>
		<li>Implement fuzzy matching for typo-tolerant search</li>
	</ul>

	<Heading level={4} class="mt-4">Performance Tips</Heading>
	<ul>
		<li>Index your data in advance for faster search results</li>
		<li>Limit initial results to 20-50 items, use pagination for more</li>
		<li>Debounce search input to avoid excessive filtering</li>
		<li>Consider using Web Workers for large datasets</li>
		<li>Cache frequently searched terms and results</li>
	</ul>
</Card>
