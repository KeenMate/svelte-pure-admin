<script lang="ts">
	import Heading from '$lib/typography/Heading.svelte';
	import Paragraph from '$lib/typography/Paragraph.svelte';
	import {
		Badge,
		Label,
		BadgeGroup,
		CompositeBadge,
		CompositeBadgeGroup,
		Card,
		Grid,
		Column,
		Alert,
		Tooltip
	} from '$lib';

	// Badge data for interactive groups
	const projectTags = [
		{ variant: 'primary' as const, label: 'React' },
		{ variant: 'info' as const, label: 'TypeScript' },
		{ variant: 'success' as const, label: 'Node.js' },
		{ variant: 'warning' as const, label: 'Express' },
		{ variant: 'secondary' as const, label: 'PostgreSQL' },
		{ variant: 'primary' as const, label: 'Redux' },
		{ variant: 'info' as const, label: 'Sass' },
		{ variant: 'success' as const, label: 'Docker' },
		{ variant: 'warning' as const, label: 'AWS' },
		{ variant: 'danger' as const, label: 'Redis' },
		{ variant: 'secondary' as const, label: 'GraphQL' },
		{ variant: 'primary' as const, label: 'Jest' },
		{ variant: 'info' as const, label: 'Webpack' },
		{ variant: 'success' as const, label: 'ESLint' },
		{ variant: 'dark' as const, label: 'GitHub Actions' }
	];

	const userSkills = [
		{ variant: 'primary' as const, label: 'JavaScript', pill: true },
		{ variant: 'info' as const, label: 'Python', pill: true },
		{ variant: 'success' as const, label: 'Java', pill: true },
		{ variant: 'warning' as const, label: 'C++', pill: true },
		{ variant: 'secondary' as const, label: 'Ruby', pill: true },
		{ variant: 'primary' as const, label: 'Go', pill: true },
		{ variant: 'info' as const, label: 'Rust', pill: true }
	];

	const statusBadges = [
		{ variant: 'success' as const, label: 'Approved', size: 'sm' as const },
		{ variant: 'warning' as const, label: 'Pending', size: 'sm' as const },
		{ variant: 'danger' as const, label: 'Rejected', size: 'sm' as const },
		{ variant: 'info' as const, label: 'Review', size: 'sm' as const },
		{ variant: 'secondary' as const, label: 'Draft', size: 'sm' as const },
		{ variant: 'primary' as const, label: 'Published', size: 'sm' as const },
		{ variant: 'light' as const, label: 'Archived', size: 'sm' as const },
		{ variant: 'dark' as const, label: 'Deleted', size: 'sm' as const }
	];

	function handleLabelClick(label: string) {
		console.log('Label clicked:', label);
		alert(`Viewing details for: ${label}`);
	}

	function handleRemove(badgeId: string) {
		console.log('Remove clicked for:', badgeId);
		if (confirm('Remove this item?')) {
			const badge = document.getElementById(badgeId);
			if (badge) {
				badge.style.opacity = '0.5';
				badge.style.pointerEvents = 'none';
			}
		}
	}

	function handleEdit(badgeId: string) {
		console.log('Edit clicked for:', badgeId);
		alert('Opening edit dialog...');
	}

	function handleDownload(version: string) {
		console.log('Download clicked for:', version);
		alert(`Downloading ${version}...`);
	}

	// Example: Database/API response data (generic objects)
	interface Product {
		id: number;
		name: string;
		category: 'featured' | 'new' | 'sale' | 'bestseller';
		stock: number;
	}

	const products: Product[] = [
		{ id: 1, name: 'Premium Widget', category: 'featured', stock: 15 },
		{ id: 2, name: 'Deluxe Gadget', category: 'new', stock: 8 },
		{ id: 3, name: 'Standard Tool', category: 'sale', stock: 3 },
		{ id: 4, name: 'Pro Device', category: 'bestseller', stock: 25 },
		{ id: 5, name: 'Ultra Kit', category: 'featured', stock: 12 },
		{ id: 6, name: 'Basic Set', category: 'sale', stock: 5 },
		{ id: 7, name: 'Advanced System', category: 'new', stock: 18 }
	];

	// Map category to badge variant
	function getCategoryVariant(product: Product) {
		const map = {
			featured: 'primary' as const,
			new: 'success' as const,
			sale: 'danger' as const,
			bestseller: 'warning' as const
		};
		return map[product.category];
	}

	// Custom display with stock count
	function getProductDisplay(product: Product) {
		return `${product.name} (${product.stock} in stock)`;
	}

	// Handle product badge click
	function handleProductClick(product: Product, event: MouseEvent) {
		console.log('Product clicked:', product);
		alert(`Product: ${product.name}\nCategory: ${product.category}\nStock: ${product.stock}`);
	}

	// Example: Task/Issue data for composite badges
	interface Task {
		id: number;
		name: string;
		status: 'open' | 'in-progress' | 'completed' | 'blocked';
		commentCount: number;
	}

	const tasks: Task[] = [
		{ id: 1, name: 'Update documentation', status: 'open', commentCount: 3 },
		{ id: 2, name: 'Fix login bug', status: 'in-progress', commentCount: 7 },
		{ id: 3, name: 'Add dark mode', status: 'completed', commentCount: 12 },
		{ id: 4, name: 'Refactor API', status: 'blocked', commentCount: 5 },
		{ id: 5, name: 'Write tests', status: 'open', commentCount: 2 }
	];

	// Map status to badge variant
	function getTaskVariant(task: Task) {
		const map = {
			open: 'info' as const,
			'in-progress': 'warning' as const,
			completed: 'success' as const,
			blocked: 'danger' as const
		};
		return map[task.status];
	}

	// Handle task label click
	function handleTaskLabelClick(task: Task, event: MouseEvent) {
		console.log('Task label clicked:', task);
		alert(`Opening task: ${task.name}`);
	}

	// Handle task button click (view comments)
	function handleTaskButtonClick(task: Task, event: MouseEvent) {
		console.log('Task comments clicked:', task);
		alert(`Viewing ${task.commentCount} comments for: ${task.name}`);
	}
</script>

<svelte:head>
	<title>Badges - Pure Admin Svelte</title>
</svelte:head>

<Heading level={1}>Badges</Heading>

<!-- Basic Badges -->
<Card>
	{#snippet header()}
		<Heading level={3}>Basic Badges</Heading>
		<Paragraph>Simple badges for status indication and categorization</Paragraph>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2">
			<Heading level={4}>Default Badges</Heading>
			<div class="component-showcase">
				<Badge>Default</Badge>
				<Badge variant="primary">Primary</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="danger">Danger</Badge>
				<Badge variant="info">Info</Badge>
				<Badge variant="light">Light</Badge>
				<Badge variant="dark">Dark</Badge>
			</div>
		</Column>
		<Column size="1" md="1-2">
			<Heading level={4}>Small Badges</Heading>
			<div class="component-showcase">
				<Badge size="sm">Default</Badge>
				<Badge size="sm" variant="primary">Primary</Badge>
				<Badge size="sm" variant="secondary">Secondary</Badge>
				<Badge size="sm" variant="success">Success</Badge>
				<Badge size="sm" variant="warning">Warning</Badge>
				<Badge size="sm" variant="danger">Danger</Badge>
				<Badge size="sm" variant="info">Info</Badge>
				<Badge size="sm" variant="light">Light</Badge>
				<Badge size="sm" variant="dark">Dark</Badge>
			</div>
		</Column>
	</Grid>
</Card>

<!-- Pill Badges -->
<Card>
	{#snippet header()}
		<Heading level={3}>Pill Badges</Heading>
		<Paragraph>Rounded badges for a softer, modern appearance</Paragraph>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2">
			<Heading level={4}>Regular Pills</Heading>
			<div class="component-showcase">
				<Badge pill>Default</Badge>
				<Badge pill variant="primary">Primary</Badge>
				<Badge pill variant="secondary">Secondary</Badge>
				<Badge pill variant="success">Success</Badge>
				<Badge pill variant="warning">Warning</Badge>
				<Badge pill variant="danger">Danger</Badge>
				<Badge pill variant="info">Info</Badge>
			</div>
		</Column>
		<Column size="1" md="1-2">
			<Heading level={4}>Small Pills</Heading>
			<div class="component-showcase">
				<Badge pill size="sm">Default</Badge>
				<Badge pill size="sm" variant="primary">Primary</Badge>
				<Badge pill size="sm" variant="secondary">Secondary</Badge>
				<Badge pill size="sm" variant="success">Success</Badge>
				<Badge pill size="sm" variant="warning">Warning</Badge>
				<Badge pill size="sm" variant="danger">Danger</Badge>
				<Badge pill size="sm" variant="info">Info</Badge>
			</div>
		</Column>
	</Grid>
</Card>

<!-- Badges with Icons -->
<Card>
	{#snippet header()}
		<Heading level={3}>Badges with Icons</Heading>
		<Paragraph>Enhanced badges with icon indicators</Paragraph>
	{/snippet}

	<div class="component-showcase">
		<Badge variant="primary">
			{#snippet icon()}✓{/snippet}
			Completed
		</Badge>
		<Badge variant="warning">
			{#snippet icon()}!{/snippet}
			Warning
		</Badge>
		<Badge variant="danger">
			{#snippet icon()}✕{/snippet}
			Error
		</Badge>
		<Badge variant="info">
			{#snippet icon()}ℹ{/snippet}
			Info
		</Badge>
		<Badge variant="success">
			{#snippet icon()}★{/snippet}
			Featured
		</Badge>
		<Badge variant="secondary">
			{#snippet icon()}⏱{/snippet}
			Pending
		</Badge>
	</div>
</Card>

<!-- Labels -->
<Card>
	{#snippet header()}
		<Heading level={3}>Labels</Heading>
		<Paragraph>Text labels for categorization and tagging</Paragraph>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2">
			<Heading level={4}>Basic Labels</Heading>
			<div class="component-showcase">
				<Label>Frontend</Label>
				<Label variant="primary">React</Label>
				<Label variant="secondary">TypeScript</Label>
				<Label variant="success">Bug Fix</Label>
				<Label variant="warning">Enhancement</Label>
				<Label variant="danger">Breaking Change</Label>
				<Label variant="info">Documentation</Label>
			</div>
		</Column>
		<Column size="1" md="1-2">
			<Heading level={4}>Outlined Labels</Heading>
			<div class="component-showcase">
				<Label outline>Frontend</Label>
				<Label outline variant="primary">React</Label>
				<Label outline variant="secondary">TypeScript</Label>
				<Label outline variant="success">Bug Fix</Label>
				<Label outline variant="warning">Enhancement</Label>
				<Label outline variant="danger">Breaking Change</Label>
				<Label outline variant="info">Documentation</Label>
			</div>
		</Column>
	</Grid>
</Card>

<!-- Badge Groups with Limits -->
<Card>
	{#snippet header()}
		<Heading level={3}>Badge Groups with Limits</Heading>
		<Paragraph>
			Display many badges with automatic overflow handling - shows 5 badges and "... N more"
			indicator
		</Paragraph>
	{/snippet}
	<Grid>
		<Column size="1">
			<Heading level={4}>Legacy Mode: Project Tags (15 total)</Heading>
			<BadgeGroup badges={projectTags} limit={5} class="mb-3" />

			<Heading level={4}>Legacy Mode: User Skills (7 total, pill style)</Heading>
			<BadgeGroup badges={userSkills} limit={5} class="mb-3" />

			<Heading level={4}>Status Badges (8 total, small size)</Heading>
			<BadgeGroup badges={statusBadges} limit={5} />
		</Column>
	</Grid>

	<Alert variant="info">
		<small
			><strong>Interactive Badge Groups:</strong> Click "» N more" to expand all badges. Click "« Collapse" to return to limited view. The visible limit defaults to 5 badges but can be customized with the <code>limit</code> prop (e.g., <code>&lt;BadgeGroup limit={10}&gt;</code>).</small
		>
	</Alert>

	<Grid>
		<Column size="1" md="1-3">
			<Heading level={4}>Narrow Container Demo</Heading>
			<BadgeGroup badges={projectTags} limit={5} />
		</Column>
		<Column size="1" md="2-3">
			<Heading level={4}>Full Width Comparison</Heading>
			<BadgeGroup badges={projectTags} limit={5} />
		</Column>
	</Grid>

	<Grid>
		<Column size="1" md="1-6">
			<Heading level={4}>Wrapping Demo (Static)</Heading>
			<BadgeGroup showAll>
					<Badge size="sm" variant="primary">React</Badge>
					<Badge size="sm" variant="info">Vue</Badge>
					<Badge size="sm" variant="success">Angular</Badge>
					<Badge size="sm" variant="warning">Svelte</Badge>
					<Badge size="sm" variant="secondary">Solid</Badge>
					<Badge size="sm" variant="primary">TypeScript</Badge>
					<Badge size="sm" variant="info">JavaScript</Badge>
					<Badge size="sm" variant="success">Python</Badge>
					<Badge size="sm" variant="warning">Go</Badge>
					<Badge size="sm" variant="danger">Rust</Badge>
					<Badge size="sm" variant="secondary">Java</Badge>
					<Badge size="sm" variant="primary">C++</Badge>
					<Badge size="sm" variant="info">C#</Badge>
					<Badge size="sm" variant="success">Ruby</Badge>
					<Badge size="sm" variant="warning">PHP</Badge>
					<Badge size="sm" variant="danger">Swift</Badge>
					<Badge size="sm" variant="secondary">Kotlin</Badge>
					<Badge size="sm" variant="primary">Dart</Badge>
					<Badge size="sm" variant="info">Scala</Badge>
					<Badge size="sm" variant="success">Elixir</Badge>
					<Badge size="sm" variant="warning">Haskell</Badge>
					<Badge size="sm" variant="danger">Clojure</Badge>
					<Badge size="sm" variant="secondary">Elm</Badge>
					<Badge size="sm" variant="primary">F#</Badge>
					<Badge size="sm" variant="info">OCaml</Badge>
					<Badge size="sm" variant="success">Erlang</Badge>
					<Badge size="sm" variant="warning">Julia</Badge>
					<Badge size="sm" variant="danger">R</Badge>
					<Badge size="sm" variant="dark">MATLAB</Badge>
				</BadgeGroup>
			</Column>
		<Column size="1" md="5-6">
			<Heading level={4}>Full Width Comparison</Heading>
			<BadgeGroup showAll>
					<Badge size="sm" variant="primary">React</Badge>
					<Badge size="sm" variant="info">Vue</Badge>
					<Badge size="sm" variant="success">Angular</Badge>
					<Badge size="sm" variant="warning">Svelte</Badge>
					<Badge size="sm" variant="secondary">Solid</Badge>
					<Badge size="sm" variant="primary">TypeScript</Badge>
					<Badge size="sm" variant="info">JavaScript</Badge>
					<Badge size="sm" variant="success">Python</Badge>
					<Badge size="sm" variant="warning">Go</Badge>
					<Badge size="sm" variant="danger">Rust</Badge>
					<Badge size="sm" variant="secondary">Java</Badge>
					<Badge size="sm" variant="primary">C++</Badge>
					<Badge size="sm" variant="info">C#</Badge>
					<Badge size="sm" variant="success">Ruby</Badge>
					<Badge size="sm" variant="warning">PHP</Badge>
					<Badge size="sm" variant="danger">Swift</Badge>
					<Badge size="sm" variant="secondary">Kotlin</Badge>
					<Badge size="sm" variant="primary">Dart</Badge>
					<Badge size="sm" variant="info">Scala</Badge>
					<Badge size="sm" variant="success">Elixir</Badge>
					<Badge size="sm" variant="warning">Haskell</Badge>
					<Badge size="sm" variant="danger">Clojure</Badge>
					<Badge size="sm" variant="secondary">Elm</Badge>
					<Badge size="sm" variant="primary">F#</Badge>
					<Badge size="sm" variant="info">OCaml</Badge>
					<Badge size="sm" variant="success">Erlang</Badge>
					<Badge size="sm" variant="warning">Julia</Badge>
					<Badge size="sm" variant="danger">R</Badge>
					<Badge size="sm" variant="dark">MATLAB</Badge>
				</BadgeGroup>
			</Column>
		</Grid>
</Card>

<!-- Data-Driven Badge Groups (KeenMate Pattern) -->
<Card>
	{#snippet header()}
		<Heading level={3}>Data-Driven Badge Groups (KeenMate Pattern)</Heading>
		<Paragraph>
			Use generic data from database/API with member mappings - no need to transform data first!
		</Paragraph>
	{/snippet}

	<Grid>
		<Column size="1">
			<Heading level={4}>Simple Member Mapping (Non-clickable)</Heading>
			<Paragraph>Map properties from your data objects directly (category maps to variant colors)</Paragraph>
			<BadgeGroup
				data={products}
				displayValueMember="name"
				variantMember="category"
				idMember="id"
				limit={3}
				class="mb-3"
			/>

			<Heading level={4}>Custom Callbacks with Click Handling</Heading>
			<Paragraph>Click badges to see product details! Callbacks handle transformations and clicks.</Paragraph>
			<BadgeGroup
				data={products}
				getDisplayValueCallback={getProductDisplay}
				getVariantCallback={getCategoryVariant}
				onBadgeClick={handleProductClick}
				idMember="id"
				limit={4}
			/>
		</Column>
	</Grid>

	<Alert variant="success">
		<small
			><strong>KeenMate Pattern:</strong> Use <code>displayValueMember</code>,
			<code>variantMember</code>, <code>pillMember</code>, <code>sizeMember</code> to map
			properties, or use callbacks like <code>getDisplayValueCallback</code> for custom logic.
			Add <code>onBadgeClick</code> to handle clicks and get the full data item back! Works with
			any data structure from your API/database.</small
		>
	</Alert>
</Card>

<!-- Fixed-Width Badges with Ellipsis -->
<Card>
	{#snippet header()}
		<Heading level={3}>Fixed-Width Badges with Ellipsis</Heading>
		<Paragraph>
			Badges with constrained width show ellipsis for overflow text. Hover for tooltip with full
			text.
		</Paragraph>
	{/snippet}
		<Grid>
			<Column size="1" md="1-2">
				<Heading level={4}>Various Fixed Widths</Heading>
				<div class="component-showcase">
					<Tooltip text="Short" position="bottom">
						<Badge variant="primary" width="3x">Short</Badge>
					</Tooltip>
					<Tooltip text="This is medium text" position="bottom">
						<Badge variant="info" width="4x">This is medium text</Badge>
					</Tooltip>
					<Tooltip text="This is longer text that will be truncated" position="bottom">
						<Badge variant="success" width="5x">This is longer text that will be truncated</Badge>
					</Tooltip>
					<Tooltip text="Very long badge text that definitely needs ellipsis" position="bottom">
						<Badge variant="warning" width="6x"
							>Very long badge text that definitely needs ellipsis</Badge
						>
					</Tooltip>
					<Tooltip text="Super extremely long badge text example" position="bottom">
						<Badge variant="danger" width="7x">Super extremely long badge text example</Badge>
					</Tooltip>
				</div>
			</Column>
			<Column size="1" md="1-2">
				<Heading level={4}>Small Fixed-Width Badges</Heading>
				<div class="component-showcase">
					<Tooltip text="OK" position="bottom">
						<Badge size="sm" variant="primary" width="2x">OK</Badge>
					</Tooltip>
					<Tooltip text="Status" position="bottom">
						<Badge size="sm" variant="info" width="3x">Status</Badge>
					</Tooltip>
					<Tooltip text="Completed Task" position="bottom">
						<Badge size="sm" variant="success" width="4x">Completed Task</Badge>
					</Tooltip>
					<Tooltip text="Pending Review Process" position="bottom">
						<Badge size="sm" variant="warning" width="5x">Pending Review Process</Badge>
					</Tooltip>
					<Tooltip text="Critical Error in Production" position="bottom">
						<Badge size="sm" variant="danger" width="6x">Critical Error in Production</Badge>
					</Tooltip>
				</div>
			</Column>
		</Grid>

		<Grid style="margin-top: 1rem;">
			<Column size="1">
				<Heading level={4}>Practical Example: Tags with Consistent Width</Heading>
				<div class="component-showcase">
					<Tooltip text="JavaScript" position="bottom">
						<Badge pill variant="secondary" width="5x">JavaScript</Badge>
					</Tooltip>
					<Tooltip text="TypeScript" position="bottom">
						<Badge pill variant="secondary" width="5x">TypeScript</Badge>
					</Tooltip>
					<Tooltip text="React" position="bottom">
						<Badge pill variant="secondary" width="5x">React</Badge>
					</Tooltip>
					<Tooltip text="Node.js" position="bottom">
						<Badge pill variant="secondary" width="5x">Node.js</Badge>
					</Tooltip>
					<Tooltip text="PostgreSQL Database" position="bottom">
						<Badge pill variant="secondary" width="5x">PostgreSQL Database</Badge>
					</Tooltip>
					<Tooltip text="Express.js Framework" position="bottom">
						<Badge pill variant="secondary" width="5x">Express.js Framework</Badge>
					</Tooltip>
				</div>
			</Column>
		</Grid>

		<Grid style="margin-top: 1rem;">
			<Column size="1">
				<Heading level={4}>Left-Side Ellipsis (Path/Hierarchy Display)</Heading>
				<Paragraph style="font-size: 0.75rem; margin-bottom: 0.5rem;">
					When the important part is at the end (breadcrumbs, file paths, etc.)
				</Paragraph>
				<div class="component-showcase">
					<Tooltip
						text="Settings > User Preferences > Notifications > Email"
						position="bottom"
						multiline
					>
						<Badge variant="secondary" width="6x" ellipsisLeft
							>Settings > User Preferences > Notifications > Email</Badge
						>
					</Tooltip>
					<Tooltip
						text="/var/www/html/application/config/database.php"
						position="bottom"
						multiline
					>
						<Badge variant="info" width="7x" ellipsisLeft
							>/var/www/html/application/config/database.php</Badge
						>
					</Tooltip>
					<Tooltip
						text="Components > Forms > Inputs > TextArea.svelte"
						position="bottom"
						multiline
					>
						<Badge variant="primary" width="6x" ellipsisLeft
							>Components > Forms > Inputs > TextArea.svelte</Badge
						>
					</Tooltip>
					<Tooltip
						text="Europe > Germany > Berlin > Mitte > Alexanderplatz"
						position="bottom"
						multiline
					>
						<Badge variant="warning" width="5x" ellipsisLeft
							>Europe > Germany > Berlin > Mitte > Alexanderplatz</Badge
						>
					</Tooltip>
				</div>
			</Column>
		</Grid>

		<Alert variant="info" class="mt-3">
			<small
				><strong>Note:</strong> Custom tooltips show full text on hover. Width classes range from
				<code>pa-badge--w-1x</code>
				to <code>pa-badge--w-10x</code>. Use <code>pa-badge--ellipsis-left</code> to truncate from
				the left side instead.</small
			>
		</Alert>
</Card>

<!-- Composite Badge Groups (Data-Driven) -->
<Card>
	{#snippet header()}
		<Heading level={3}>Composite Badge Groups (Data-Driven)</Heading>
		<Paragraph>
			Display composite badges from database/API data with member mappings and click handlers
		</Paragraph>
	{/snippet}

	<Grid>
		<Column size="1">
			<Heading level={4}>Task List with Comment Counts</Heading>
			<Paragraph>Click task name to open, click comment count to view comments</Paragraph>
			<CompositeBadgeGroup
				data={tasks}
				labelMember="name"
				buttonTextMember="commentCount"
				getVariantCallback={getTaskVariant}
				interactiveMember="interactive"
				onLabelClick={handleTaskLabelClick}
				onButtonClick={handleTaskButtonClick}
				idMember="id"
			/>
		</Column>
	</Grid>

	<Alert variant="info">
		<small
			><strong>Composite Badges:</strong> Perfect for items with two parts - a label and a
			count/action. Use <code>onLabelClick</code> and <code>onButtonClick</code> to handle
			interactions separately. Works with any data structure!</small
		>
	</Alert>
</Card>

<!-- Usage Examples -->
<Card>
	{#snippet header()}
		<Heading level={3}>Usage Examples</Heading>
		<Paragraph>Real-world examples of badges and labels in context</Paragraph>
	{/snippet}
		<Grid>
			<Column size="1" md="1-2">
				<Heading level={4}>User Status</Heading>
				<div class="usage-example">
					<div class="user-item">
						<span class="user-name">John Doe</span>
						<Badge size="sm" variant="success">Online</Badge>
					</div>
					<div class="user-item">
						<span class="user-name">Jane Smith</span>
						<Badge size="sm" variant="warning">Away</Badge>
					</div>
					<div class="user-item">
						<span class="user-name">Mike Johnson</span>
						<Badge size="sm" variant="secondary">Offline</Badge>
					</div>
				</div>
			</Column>
			<Column size="1" md="1-2">
				<Heading level={4}>Project Tags</Heading>
				<div class="usage-example">
					<div class="project-item">
						<Heading level={5}>Website Redesign</Heading>
						<div class="project-tags">
							<Label size="sm" variant="primary">Frontend</Label>
							<Label size="sm" variant="info">Design</Label>
							<Label size="sm" variant="warning">High Priority</Label>
						</div>
					</div>
					<div class="project-item">
						<Heading level={5}>API Integration</Heading>
						<div class="project-tags">
							<Label size="sm" variant="secondary">Backend</Label>
							<Label size="sm" variant="success">REST API</Label>
							<Label size="sm" variant="danger">Critical</Label>
						</div>
					</div>
				</div>
			</Column>
		</Grid>
</Card>

<!-- Composite Badges -->
<Card>
	{#snippet header()}
		<Heading level={3}>Composite Badges</Heading>
		<Paragraph>Three-part badges with separate icon, label, and button sections</Paragraph>
	{/snippet}
		<Grid>
			<Column size="1" md="1-2">
				<Heading level={4}>Standard Color Variations</Heading>
				<div class="component-showcase">
					<CompositeBadge variant="primary" label="Primary" buttonText="×" interactive>
						{#snippet icon()}✓{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="secondary" label="Secondary" buttonText="×" interactive>
						{#snippet icon()}⚙{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="success" label="Success" buttonText="×" interactive>
						{#snippet icon()}★{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="danger" label="Danger" buttonText="×" interactive>
						{#snippet icon()}🔥{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="warning" label="Warning" buttonText="×" interactive>
						{#snippet icon()}⚠{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="info" label="Info" buttonText="×" interactive>
						{#snippet icon()}ℹ{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="light" label="Light" buttonText="×" interactive>
						{#snippet icon()}◇{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="dark" label="Dark" buttonText="×" interactive>
						{#snippet icon()}◆{/snippet}
					</CompositeBadge>
				</div>
			</Column>
			<Column size="1" md="1-2">
				<Heading level={4}>More Examples</Heading>
				<div class="component-showcase">
					<CompositeBadge variant="danger" label="Critical" buttonText="×" interactive>
						{#snippet icon()}🔥{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="light" label="Draft" buttonText="↗" interactive>
						{#snippet icon()}◇{/snippet}
					</CompositeBadge>

					<CompositeBadge variant="dark" label="Published" buttonText="⚙" interactive>
						{#snippet icon()}◆{/snippet}
					</CompositeBadge>
				</div>
			</Column>
		</Grid>

		<Grid style="margin-top: 1rem;">
			<Column size="1">
				<Heading level={4}>Advanced: Mixed Section Colors</Heading>
				<Paragraph style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
					For advanced customization, you can mix individual section colors using separate classes.
				</Paragraph>
				<div class="component-showcase">
					<CompositeBadge
						variant="primary"
						labelVariant="secondary"
						buttonVariant="danger"
						label="Project Alpha"
						buttonText="×"
						interactive
					>
						{#snippet icon()}📁{/snippet}
					</CompositeBadge>

					<CompositeBadge
						variant="success"
						labelVariant="light"
						buttonVariant="warning"
						label="Target Met"
						buttonText="⋯"
						interactive
					>
						{#snippet icon()}🎯{/snippet}
					</CompositeBadge>

					<CompositeBadge
						variant="dark"
						labelVariant="primary"
						buttonVariant="info"
						label="High Performance"
						buttonText="↑"
						interactive
					>
						{#snippet icon()}⚡{/snippet}
					</CompositeBadge>

					<CompositeBadge
						variant="secondary"
						labelVariant="warning"
						buttonVariant="success"
						label="Maintenance"
						buttonText="✓"
						interactive
					>
						{#snippet icon()}🔧{/snippet}
					</CompositeBadge>
				</div>
			</Column>
		</Grid>
</Card>

<!-- Interactive Examples -->
<Card>
	{#snippet header()}
		<Heading level={3}>Interactive Composite Badges</Heading>
		<Paragraph>Examples with click handlers and dynamic behavior</Paragraph>
	{/snippet}
		<div class="component-showcase">
			<CompositeBadge
				variant="info"
				label="Task #1234"
				buttonText="×"
				interactive
				onLabelClick={() => handleLabelClick('Task #1234')}
				onButtonClick={() => handleRemove('demo-badge-1')}
			>
				{#snippet icon()}📋{/snippet}
			</CompositeBadge>

			<CompositeBadge
				variant="success"
				label="John Doe"
				buttonText="✎"
				interactive
				onLabelClick={() => handleLabelClick('John Doe')}
				onButtonClick={() => handleEdit('demo-badge-2')}
			>
				{#snippet icon()}👤{/snippet}
			</CompositeBadge>

			<CompositeBadge
				variant="warning"
				label="v2.1.0"
				buttonText="↓"
				interactive
				onLabelClick={() => handleLabelClick('v2.1.0')}
				onButtonClick={() => handleDownload('v2.1.0')}
			>
				{#snippet icon()}🏷️{/snippet}
			</CompositeBadge>
		</div>

		<Alert variant="primary" style="margin-top: 1rem;">
			<small
				><strong>Demo Actions:</strong> Click labels to view details, click buttons for actions. Check
				browser console for event logs.</small
			>
		</Alert>
</Card>
