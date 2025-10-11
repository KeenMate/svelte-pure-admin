<script lang="ts">
	import {
		Badge,
		Label,
		BadgeGroup,
		CompositeBadge,
		Card,
		Grid,
		Column,
		Alert,
		Tooltip
	} from '$lib';

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
</script>

<svelte:head>
	<title>Badges - Pure Admin Svelte</title>
</svelte:head>

<h1>Badges</h1>

<!-- Basic Badges -->
<Card>
	{#snippet header()}
		<h3>Basic Badges</h3>
		<p>Simple badges for status indication and categorization</p>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2">
			<h4>Default Badges</h4>
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
			<h4>Small Badges</h4>
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
		<h3>Pill Badges</h3>
		<p>Rounded badges for a softer, modern appearance</p>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2">
			<h4>Regular Pills</h4>
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
			<h4>Small Pills</h4>
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
		<h3>Badges with Icons</h3>
		<p>Enhanced badges with icon indicators</p>
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
		<h3>Labels</h3>
		<p>Text labels for categorization and tagging</p>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2">
			<h4>Basic Labels</h4>
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
			<h4>Outlined Labels</h4>
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
		<h3>Badge Groups with Limits</h3>
		<p>
			Display many badges with automatic overflow handling - shows 5 badges and "... N more"
			indicator
		</p>
	{/snippet}
		<Grid>
			<Column size="1">
				<h4>Project Tags (15 total, showing 5)</h4>
				<BadgeGroup class="mb-3">
					<Badge variant="primary">React</Badge>
					<Badge variant="info">TypeScript</Badge>
					<Badge variant="success">Node.js</Badge>
					<Badge variant="warning">Express</Badge>
					<Badge variant="secondary">PostgreSQL</Badge>
					<Badge variant="primary">Redux</Badge>
					<Badge variant="info">Sass</Badge>
					<Badge variant="success">Docker</Badge>
					<Badge variant="warning">AWS</Badge>
					<Badge variant="danger">Redis</Badge>
					<Badge variant="secondary">GraphQL</Badge>
					<Badge variant="primary">Jest</Badge>
					<Badge variant="info">Webpack</Badge>
					<Badge variant="success">ESLint</Badge>
					<Badge variant="dark">GitHub Actions</Badge>
					<Badge variant="secondary">
						{#snippet icon()}»{/snippet}
						10 more
					</Badge>
				</BadgeGroup>

				<h4>User Skills (34 total, showing 5)</h4>
				<BadgeGroup class="mb-3">
					<Badge pill variant="primary">JavaScript</Badge>
					<Badge pill variant="info">Python</Badge>
					<Badge pill variant="success">Java</Badge>
					<Badge pill variant="warning">C++</Badge>
					<Badge pill variant="secondary">Ruby</Badge>
					<Badge pill variant="primary">Go</Badge>
					<Badge pill variant="info">Rust</Badge>
					<Badge pill variant="secondary">
						{#snippet icon()}»{/snippet}
						29 more
					</Badge>
				</BadgeGroup>

				<h4>Small Badges (8 total, showing 5)</h4>
				<BadgeGroup>
					<Badge size="sm" variant="success">Approved</Badge>
					<Badge size="sm" variant="warning">Pending</Badge>
					<Badge size="sm" variant="danger">Rejected</Badge>
					<Badge size="sm" variant="info">Review</Badge>
					<Badge size="sm" variant="secondary">Draft</Badge>
					<Badge size="sm" variant="primary">Published</Badge>
					<Badge size="sm" variant="light">Archived</Badge>
					<Badge size="sm" variant="dark">Deleted</Badge>
					<Badge size="sm" variant="secondary">
						{#snippet icon()}»{/snippet}
						3 more
					</Badge>
				</BadgeGroup>
			</Column>
		</Grid>

		<Alert variant="info" style="margin-top: 1rem;">
			<small
				><strong>Note:</strong> The visible limit is controlled by
				<code>$badge-group-visible-limit</code>
				SCSS variable (default: 5). Future Svelte component will make this configurable per instance.</small
			>
		</Alert>

		<Grid style="margin-top: 1.5rem;">
			<Column size="1" md="1-6">
				<h4>Wrapping Demo</h4>
				<p style="font-size: 0.75rem; margin-bottom: 0.5rem;">29 badges in narrow container</p>
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
				<h4>Full Width Comparison</h4>
				<p style="font-size: 0.75rem; margin-bottom: 0.5rem;">Same 29 badges with full width</p>
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

<!-- Fixed-Width Badges with Ellipsis -->
<Card>
	{#snippet header()}
		<h3>Fixed-Width Badges with Ellipsis</h3>
		<p>
			Badges with constrained width show ellipsis for overflow text. Hover for tooltip with full
			text.
		</p>
	{/snippet}
		<Grid>
			<Column size="1" md="1-2">
				<h4>Various Fixed Widths</h4>
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
				<h4>Small Fixed-Width Badges</h4>
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
				<h4>Practical Example: Tags with Consistent Width</h4>
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
				<h4>Left-Side Ellipsis (Path/Hierarchy Display)</h4>
				<p style="font-size: 0.75rem; margin-bottom: 0.5rem;">
					When the important part is at the end (breadcrumbs, file paths, etc.)
				</p>
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

<!-- Usage Examples -->
<Card>
	{#snippet header()}
		<h3>Usage Examples</h3>
		<p>Real-world examples of badges and labels in context</p>
	{/snippet}
		<Grid>
			<Column size="1" md="1-2">
				<h4>User Status</h4>
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
				<h4>Project Tags</h4>
				<div class="usage-example">
					<div class="project-item">
						<h5>Website Redesign</h5>
						<div class="project-tags">
							<Label size="sm" variant="primary">Frontend</Label>
							<Label size="sm" variant="info">Design</Label>
							<Label size="sm" variant="warning">High Priority</Label>
						</div>
					</div>
					<div class="project-item">
						<h5>API Integration</h5>
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
		<h3>Composite Badges</h3>
		<p>Three-part badges with separate icon, label, and button sections</p>
	{/snippet}
		<Grid>
			<Column size="1" md="1-2">
				<h4>Standard Color Variations</h4>
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
				<h4>More Examples</h4>
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
				<h4>Advanced: Mixed Section Colors</h4>
				<p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
					For advanced customization, you can mix individual section colors using separate classes.
				</p>
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
		<h3>Interactive Composite Badges</h3>
		<p>Examples with click handlers and dynamic behavior</p>
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
