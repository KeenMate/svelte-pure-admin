<script lang="ts">
	import {
		Card,
		Grid,
		Column,
		Alert,
		Table,
		Button,
		ButtonGroup,
		BasicList,
		CommandPalette,
		NavbarSearch,
		Navbar
	} from '@keenmate/svelte-pure-admin';
	import type { Command, SearchContext, SearchResult } from '@keenmate/svelte-pure-admin';

	let showPalette = $state(false);

	// =========================================================================
	// SAMPLE DATA
	// =========================================================================

	const products = [
		{ id: 1, name: 'MacBook Pro 16"', price: '$2,499', sku: 'MBP-16' },
		{ id: 2, name: 'MacBook Air M2', price: '$1,199', sku: 'MBA-M2' },
		{ id: 3, name: 'iPhone 15 Pro', price: '$999', sku: 'IP15P' },
		{ id: 4, name: 'iPad Pro 12.9"', price: '$1,099', sku: 'IPAD-PRO' },
		{ id: 5, name: 'AirPods Pro', price: '$249', sku: 'APP-2' }
	];

	const users = [
		{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
		{ id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Manager' },
		{ id: 4, name: 'Sarah Chen', email: 'sarah@example.com', role: 'User' }
	];

	const reports = [
		{ id: 'product-sales', name: 'Product Sales', needsTimeRange: true },
		{ id: 'product-stock', name: 'Product Stock', needsTimeRange: false },
		{ id: 'user-activity', name: 'User Activity', needsTimeRange: true },
		{ id: 'revenue', name: 'Revenue Report', needsTimeRange: true }
	];

	// =========================================================================
	// COMMANDS (/prefix)
	// =========================================================================

	const commands: Command[] = [
		// Multi-step report command
		{
			shortcut: '/r',
			aliases: ['/report', '/reports'],
			name: 'Reports',
			description: 'Open a report with optional filters',
			icon: '📊',
			steps: [
				{
					id: 'report',
					placeholder: 'Select a report...',
					getOptions: (query) => {
						return reports
							.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
							.map((r) => ({
								id: r.id,
								label: r.name,
								description: r.needsTimeRange ? 'Supports time range' : 'No time range',
								icon: '📈',
								value: r
							}));
					}
				},
				{
					id: 'timeRange',
					prompt: ' in ',
					placeholder: 'Enter time range (e.g., 30 days)',
					freeText: true,
					shouldShow: (prev) => prev[0]?.option?.value?.needsTimeRange === true,
					getOptions: () => [
						{ id: '7d', label: '7 days', description: 'Last week', value: 7 },
						{ id: '30d', label: '30 days', description: 'Last month', value: 30 },
						{ id: '90d', label: '90 days', description: 'Last quarter', value: 90 },
						{ id: '365d', label: '1 year', description: 'Last year', value: 365 }
					]
				}
			],
			getPreview: (selections) => {
				const report = selections[0]?.option?.label || 'Unknown';
				const time = selections[1]?.option?.label || selections[1]?.freeText;
				if (time) {
					return `Open "${report}" for ${time}`;
				}
				return `Open "${report}"`;
			},
			onComplete: (selections) => {
				const report = selections[0]?.option?.value;
				const timeRange = selections[1]?.option?.value || selections[1]?.freeText;
				console.log('Opening report:', report?.id, 'Time range:', timeRange);
				alert(`Would navigate to: /reports/${report?.id}${timeRange ? `?range=${timeRange}` : ''}`);
			}
		},

		// Instant settings command
		{
			shortcut: '/settings',
			aliases: ['/config', '/preferences'],
			name: 'Settings',
			description: 'Open application settings',
			icon: '⚙️',
			steps: [],
			onComplete: () => {
				console.log('Opening settings');
				alert('Would navigate to: /settings');
			}
		},

		// Export command with format selection
		{
			shortcut: '/export',
			name: 'Export Data',
			description: 'Export data to file',
			icon: '📤',
			steps: [
				{
					id: 'type',
					placeholder: 'What to export?',
					getOptions: () => [
						{ id: 'products', label: 'Products', icon: '📦', value: 'products' },
						{ id: 'users', label: 'Users', icon: '👤', value: 'users' },
						{ id: 'orders', label: 'Orders', icon: '📋', value: 'orders' }
					]
				},
				{
					id: 'format',
					prompt: ' as ',
					placeholder: 'Select format',
					getOptions: () => [
						{ id: 'csv', label: 'CSV', description: 'Comma-separated values', value: 'csv' },
						{ id: 'json', label: 'JSON', description: 'JavaScript Object Notation', value: 'json' },
						{ id: 'xlsx', label: 'Excel', description: 'Microsoft Excel format', value: 'xlsx' }
					]
				}
			],
			getPreview: (selections) => {
				const type = selections[0]?.option?.label || '?';
				const format = selections[1]?.option?.label || '?';
				return `Export ${type} as ${format}`;
			},
			onComplete: (selections) => {
				const type = selections[0]?.option?.value;
				const format = selections[1]?.option?.value;
				console.log('Exporting:', type, 'as', format);
				alert(`Would export ${type} as ${format}`);
			}
		},

		// Help command
		{
			shortcut: '/help',
			aliases: ['/h', '/?'],
			name: 'Help',
			description: 'Show help and documentation',
			icon: '❓',
			steps: [],
			onComplete: () => {
				alert('Would open help documentation');
			}
		}
	];

	// =========================================================================
	// SEARCH CONTEXTS (:prefix)
	// =========================================================================

	const contexts: SearchContext[] = [
		{
			shortcut: ':p',
			aliases: [':products', ':prod'],
			name: 'Products',
			description: 'Search products by name or SKU',
			icon: '📦',
			onSearch: (query) => {
				const lowerQuery = query.toLowerCase();
				return products
					.filter(
						(p) =>
							p.name.toLowerCase().includes(lowerQuery) ||
							p.sku.toLowerCase().includes(lowerQuery)
					)
					.map((p) => ({
						id: `product-${p.id}`,
						title: p.name,
						subtitle: `SKU: ${p.sku} • ${p.price}`,
						icon: '📦',
						badge: p.price,
						data: p
					}));
			},
			onSelect: (result) => {
				console.log('Selected product:', result.data);
				alert(`Would navigate to: /products/${result.data.id}`);
			}
		},
		{
			shortcut: ':u',
			aliases: [':users', ':user'],
			name: 'Users',
			description: 'Search users by name or email',
			icon: '👤',
			onSearch: (query) => {
				const lowerQuery = query.toLowerCase();
				return users
					.filter(
						(u) =>
							u.name.toLowerCase().includes(lowerQuery) ||
							u.email.toLowerCase().includes(lowerQuery) ||
							u.role.toLowerCase().includes(lowerQuery)
					)
					.map((u) => ({
						id: `user-${u.id}`,
						title: u.name,
						subtitle: u.email,
						icon: '👤',
						badge: u.role,
						data: u
					}));
			},
			onSelect: (result) => {
				console.log('Selected user:', result.data);
				alert(`Would navigate to: /users/${result.data.id}`);
			}
		}
	];

	// =========================================================================
	// GLOBAL SEARCH
	// =========================================================================

	function globalSearch(query: string): SearchResult[] {
		const results: SearchResult[] = [];
		const lowerQuery = query.toLowerCase();

		// Search products
		products
			.filter((p) => p.name.toLowerCase().includes(lowerQuery))
			.slice(0, 3)
			.forEach((p) => {
				results.push({
					id: `product-${p.id}`,
					title: p.name,
					subtitle: p.price,
					icon: '📦',
					badge: 'Product',
					data: { type: 'product', ...p }
				});
			});

		// Search users
		users
			.filter((u) => u.name.toLowerCase().includes(lowerQuery))
			.slice(0, 3)
			.forEach((u) => {
				results.push({
					id: `user-${u.id}`,
					title: u.name,
					subtitle: u.email,
					icon: '👤',
					badge: 'User',
					data: { type: 'user', ...u }
				});
			});

		return results;
	}

	function handleGlobalSelect(result: SearchResult) {
		console.log('Global select:', result);
		alert(`Selected: ${result.title} (${result.data?.type})`);
	}
</script>

<!-- Demo Navbar with Search -->
<div class="mb-6">
	<Card>
		{#snippet header()}
			<h3>Navbar with Search Bar</h3>
		{/snippet}

		<p class="mb-3">
			Add a search bar to your navbar that opens the command palette when clicked:
		</p>

		<div class="pa-card__body--no-padding">
			<Navbar class="position-relative">
				{#snippet brand()}
					<h1>My App</h1>
				{/snippet}

				{#snippet search()}
					<NavbarSearch
						placeholder="Search or type / for commands..."
						onClick={() => (showPalette = true)}
					/>
				{/snippet}

				{#snippet navRight()}
					<li><a href="#notifications">🔔</a></li>
					<li><a href="#profile">👤</a></li>
				{/snippet}
			</Navbar>
		</div>

		<div class="mt-3">
			<Alert variant="info">
				<strong>Usage:</strong> The <code>NavbarSearch</code> component shows a search input with a keyboard shortcut hint.
				When clicked, it calls your <code>onclick</code> handler to open the command palette.
			</Alert>
		</div>
	</Card>
</div>

<div class="pa-layout-container">
	<p class="mb-6">
		Enhanced command palette with <strong>/commands</strong> for actions and
		<strong>:contexts</strong> for search. Press
		<kbd class="pa-command-palette__key">Ctrl+K</kbd> or
		<kbd class="pa-command-palette__key">Cmd+K</kbd> to open.
	</p>

	<Grid>
		<!-- Left Column -->
		<Column size="100" lg="50">
			<!-- Quick Start -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Quick Start</h3>
				{/snippet}

				<div class="mb-4">
					<Button variant="primary" size="lg" block onclick={() => (showPalette = true)}>
						{#snippet icon()}
							🔍
						{/snippet}
						Open Command Palette (Ctrl+K)
					</Button>
				</div>

				<Alert variant="primary" class="mb-4">
					<strong>Try it!</strong> Type <code>/</code> for commands or <code>:</code> for search contexts.
				</Alert>

				<h4 class="mb-2">Commands (/)</h4>
				<Table class="pa-table--compact">
					<thead>
						<tr>
							<th>Shortcut</th>
							<th>Name</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{#each commands as cmd}
							<tr>
								<td><code>{cmd.shortcut}</code></td>
								<td>{cmd.name}</td>
								<td>{cmd.description}</td>
							</tr>
						{/each}
					</tbody>
				</Table>
			</Card>

			<!-- Search Contexts -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Search Contexts (:)</h3>
				{/snippet}

				<p class="mb-3">Use <code>:</code> prefix to search within a specific context:</p>

				<Table class="pa-table--compact">
					<thead>
						<tr>
							<th>Shortcut</th>
							<th>Name</th>
							<th>Example</th>
						</tr>
					</thead>
					<tbody>
						{#each contexts as ctx}
							<tr>
								<td><code>{ctx.shortcut}</code></td>
								<td>{ctx.name}</td>
								<td><code>{ctx.shortcut} search term</code></td>
							</tr>
						{/each}
					</tbody>
				</Table>

				<Alert variant="success" class="mt-3">
					<strong>Tip:</strong> Aliases work too! Try <code>:products</code> or <code>:users</code>.
				</Alert>
			</Card>
		</Column>

		<!-- Right Column -->
		<Column size="100" lg="50">
			<!-- Multi-step Commands -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Multi-Step Commands</h3>
				{/snippet}

				<p class="mb-3">Commands can have multiple steps with conditional logic:</p>

				<div class="mb-3">
					<h4 class="mb-2">Example: /r (Reports)</h4>
					<ol class="pa-list-ordered">
						<li>Type <code>/r</code> and press Space</li>
						<li>Select a report (e.g., "Product Sales")</li>
						<li>If report needs time range, " in " is auto-added</li>
						<li>Select or type a time range (e.g., "30 days")</li>
						<li>Press Enter to execute</li>
					</ol>
				</div>

				<div class="mb-3">
					<h4 class="mb-2">Example: /export</h4>
					<ol class="pa-list-ordered">
						<li>Type <code>/export</code> and press Space</li>
						<li>Select what to export (Products, Users, Orders)</li>
						<li>" as " is auto-added</li>
						<li>Select format (CSV, JSON, Excel)</li>
						<li>Press Enter to execute</li>
					</ol>
				</div>
			</Card>

			<!-- Keyboard Shortcuts -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Keyboard Shortcuts</h3>
				{/snippet}

				<Table class="pa-table--compact">
					<thead>
						<tr>
							<th>Key</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<kbd class="pa-command-palette__key">Ctrl+K</kbd> /
								<kbd class="pa-command-palette__key">Cmd+K</kbd>
							</td>
							<td>Open/close palette</td>
						</tr>
						<tr>
							<td>
								<kbd class="pa-command-palette__key">↑</kbd>
								<kbd class="pa-command-palette__key">↓</kbd>
							</td>
							<td>Navigate options</td>
						</tr>
						<tr>
							<td>
								<kbd class="pa-command-palette__key">Enter</kbd> /
								<kbd class="pa-command-palette__key">Tab</kbd>
							</td>
							<td>Select option</td>
						</tr>
						<tr>
							<td><kbd class="pa-command-palette__key">Esc</kbd></td>
							<td>Close and reset</td>
						</tr>
					</tbody>
				</Table>
			</Card>

			<!-- Try It -->
			<Card class="mb-4">
				{#snippet header()}
					<h3>Try These</h3>
				{/snippet}

				<p class="mb-3">Click to open palette with pre-filled text:</p>

				<div class="mb-3">
					<h4 class="mb-2">Commands</h4>
					<ButtonGroup class="mb-2">
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>/r</Button>
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>/export</Button>
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}
							>/settings</Button
						>
					</ButtonGroup>
				</div>

				<div class="mb-3">
					<h4 class="mb-2">Search</h4>
					<ButtonGroup class="mb-2">
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>:p mac</Button>
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}
							>:u john</Button
						>
					</ButtonGroup>
				</div>

				<div class="mb-3">
					<h4 class="mb-2">Global Search</h4>
					<ButtonGroup class="mb-2">
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>macbook</Button
						>
						<Button size="sm" variant="secondary" onclick={() => (showPalette = true)}>john</Button>
					</ButtonGroup>
				</div>
			</Card>
		</Column>
	</Grid>
</div>

<CommandPalette
	bind:show={showPalette}
	{commands}
	{contexts}
	{globalSearch}
	onGlobalSelect={handleGlobalSelect}
/>
