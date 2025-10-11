<script lang="ts">
	import { Grid, Column, Card, Button, Alert, Badge, Input, Select } from '$lib';
</script>

<svelte:head>
	<title>Components - Pure Admin Svelte</title>
</svelte:head>

<div class="pa-layout-container">
	<h1 class="mb-4">Components</h1>
	<p class="mb-6">A comprehensive library of reusable components for building admin interfaces.</p>

	<!-- Component Categories Overview -->
	<Grid>
		<!-- Form Components -->
		<Column size="1" md="1-2" lg="1-3">
			<Card>
				{#snippet header()}
					<h3>Form Components</h3>
				{/snippet}
				<p class="mb-3">Input elements, selects, checkboxes, radio buttons, and form layouts.</p>
				<ul class="mb-4" style="list-style: disc; padding-left: 1.5rem;">
					<li>Form Groups</li>
					<li>Text Inputs</li>
					<li>Textareas</li>
					<li>Select Dropdowns</li>
					<li>Checkboxes</li>
					<li>Radio Buttons</li>
					<li>Input Groups</li>
				</ul>
				<Button variant="primary" size="sm" href="/forms">View Forms</Button>
			</Card>
		</Column>

		<!-- Button Components -->
		<Column size="1" md="1-2" lg="1-3">
			<Card>
				{#snippet header()}
					<h3>Buttons</h3>
				{/snippet}
				<p class="mb-3">Various button styles, sizes, and states for user interactions.</p>
				<ul class="mb-4" style="list-style: disc; padding-left: 1.5rem;">
					<li>8 Color Variants</li>
					<li>Multiple Sizes</li>
					<li>Outline Styles</li>
					<li>Button Groups</li>
					<li>Icon Buttons</li>
					<li>Loading States</li>
				</ul>
				<Button variant="primary" size="sm" href="/buttons">View Buttons</Button>
			</Card>
		</Column>

		<!-- Card Components -->
		<Column size="1" md="1-2" lg="1-3">
			<Card>
				{#snippet header()}
					<h3>Cards</h3>
				{/snippet}
				<p class="mb-3">Flexible content containers with headers, footers, and custom styling.</p>
				<ul class="mb-4" style="list-style: disc; padding-left: 1.5rem;">
					<li>Basic Cards</li>
					<li>Colored Cards</li>
					<li>Statistics Cards</li>
					<li>Interactive Cards</li>
					<li>Collapsible Cards</li>
					<li>Card with Tabs</li>
				</ul>
				<Button variant="primary" size="sm" href="/cards">View Cards</Button>
			</Card>
		</Column>

		<!-- Badge Components -->
		<Column size="1" md="1-2" lg="1-3">
			<Card>
				{#snippet header()}
					<h3>Badges & Labels</h3>
				{/snippet}
				<p class="mb-3">Small count and labeling components for UI indicators.</p>
				<ul class="mb-4" style="list-style: disc; padding-left: 1.5rem;">
					<li>8 Color Variants</li>
					<li>Pill Style</li>
					<li>Icon Badges</li>
					<li>Badge Groups</li>
					<li>Fixed Width</li>
					<li>Composite Badges</li>
				</ul>
				<Button variant="primary" size="sm" href="/badges">View Badges</Button>
			</Card>
		</Column>

		<!-- Alert Components -->
		<Column size="1" md="1-2" lg="1-3">
			<Card>
				{#snippet header()}
					<h3>Alerts</h3>
				{/snippet}
				<p class="mb-3">Contextual feedback messages for user actions and notifications.</p>
				<ul class="mb-4" style="list-style: disc; padding-left: 1.5rem;">
					<li>8 Alert Types</li>
					<li>With Icons</li>
					<li>Dismissible</li>
					<li>Outline Styles</li>
					<li>Rich Content</li>
					<li>Compact Mode</li>
				</ul>
				<Button variant="primary" size="sm" href="/alerts">View Alerts</Button>
			</Card>
		</Column>

		<!-- Tooltip Components -->
		<Column size="1" md="1-2" lg="1-3">
			<Card>
				{#snippet header()}
					<h3>Tooltips & Popovers</h3>
				{/snippet}
				<p class="mb-3">Hover tooltips and click popovers for contextual information.</p>
				<ul class="mb-4" style="list-style: disc; padding-left: 1.5rem;">
					<li>4 Positions</li>
					<li>5 Color Themes</li>
					<li>Multiline Support</li>
					<li>Popovers</li>
					<li>Rich Content</li>
					<li>Multiple Sizes</li>
				</ul>
				<Button variant="primary" size="sm" href="/tooltips">View Tooltips</Button>
			</Card>
		</Column>

		<!-- Modal Components -->
		<Column size="1" md="1-2" lg="1-3">
			<Card>
				{#snippet header()}
					<h3>Modal Windows</h3>
				{/snippet}
				<p class="mb-3">Dialog boxes and overlays for focused user interactions.</p>
				<ul class="mb-4" style="list-style: disc; padding-left: 1.5rem;">
					<li>Multiple Sizes</li>
					<li>Scrollable Content</li>
					<li>Custom Headers</li>
					<li>Form Modals</li>
					<li>Confirmation Dialogs</li>
				</ul>
				<Button variant="secondary" size="sm" disabled>Coming Soon</Button>
			</Card>
		</Column>

		<!-- Loader Components -->
		<Column size="1" md="1-2" lg="1-3">
			<Card>
				{#snippet header()}
					<h3>Loaders & Spinners</h3>
				{/snippet}
				<p class="mb-3">Loading indicators and progress animations.</p>
				<ul class="mb-4" style="list-style: disc; padding-left: 1.5rem;">
					<li>Spinner Animations</li>
					<li>Multiple Sizes</li>
					<li>Color Variants</li>
					<li>Overlay Loaders</li>
					<li>Progress Bars</li>
				</ul>
				<Button variant="secondary" size="sm" disabled>Coming Soon</Button>
			</Card>
		</Column>

		<!-- Table Components -->
		<Column size="1" md="1-2" lg="1-3">
			<Card>
				{#snippet header()}
					<h3>Tables</h3>
				{/snippet}
				<p class="mb-3">Data tables with sorting, filtering, and pagination.</p>
				<ul class="mb-4" style="list-style: disc; padding-left: 1.5rem;">
					<li>Basic Tables</li>
					<li>Striped Rows</li>
					<li>Bordered Tables</li>
					<li>Hover Effects</li>
					<li>Responsive Tables</li>
					<li>Lazy Loading</li>
				</ul>
				<Button variant="secondary" size="sm" disabled>Coming Soon</Button>
			</Card>
		</Column>
	</Grid>

	<!-- Quick Examples -->
	<h2 class="mt-6 mb-4">Quick Examples</h2>

	<Grid>
		<!-- Form Example -->
		<Column size="1" lg="1-2">
			<Card>
				{#snippet header()}
					<h3>Basic Form</h3>
				{/snippet}
				<form>
					<div class="pa-form-group mb-3">
						<label class="pa-form-label" for="example-email">Email address</label>
						<input
							type="email"
							class="pa-input"
							id="example-email"
							placeholder="Enter email"
						/>
						<small class="pa-small-text">We'll never share your email with anyone else.</small>
					</div>

					<div class="pa-form-group mb-3">
						<label class="pa-form-label" for="example-select">Select Option</label>
						<select class="pa-select" id="example-select">
							<option>Option 1</option>
							<option>Option 2</option>
							<option>Option 3</option>
						</select>
					</div>

					<div class="pa-form-group mb-3">
						<label class="pa-checkbox">
							<input type="checkbox" />
							Check me out
						</label>
					</div>

					<div class="pa-btn-group">
						<button type="submit" class="pa-btn pa-btn--primary">Submit</button>
						<button type="button" class="pa-btn pa-btn--secondary">Cancel</button>
					</div>
				</form>
			</Card>
		</Column>

		<!-- Alert Examples -->
		<Column size="1" lg="1-2">
			<Card>
				{#snippet header()}
					<h3>Alert Messages</h3>
				{/snippet}
				<div class="pa-alert pa-alert--success mb-3">
					<span class="pa-alert__icon">✓</span>
					<div class="pa-alert__content">
						<strong>Success!</strong> Your changes have been saved.
					</div>
				</div>

				<div class="pa-alert pa-alert--warning mb-3">
					<span class="pa-alert__icon">!</span>
					<div class="pa-alert__content">
						<strong>Warning!</strong> Please review before proceeding.
					</div>
				</div>

				<div class="pa-alert pa-alert--danger mb-3">
					<span class="pa-alert__icon">⚠</span>
					<div class="pa-alert__content">
						<strong>Error!</strong> Something went wrong.
					</div>
				</div>

				<div class="pa-alert pa-alert--info">
					<span class="pa-alert__icon">ⓘ</span>
					<div class="pa-alert__content">
						<strong>Info!</strong> Here's some useful information.
					</div>
				</div>
			</Card>
		</Column>
	</Grid>

	<!-- Component Showcase -->
	<h2 class="mt-6 mb-4">Component Showcase</h2>

	<Card>
		{#snippet header()}
			<h3>Buttons & Badges</h3>
		{/snippet}
		<Grid>
			<Column size="1" md="1-2">
				<h4 class="mb-3 text-sm">Button Variants</h4>
				<div class="mb-4" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
					<button class="pa-btn pa-btn--primary pa-btn--sm">Primary</button>
					<button class="pa-btn pa-btn--secondary pa-btn--sm">Secondary</button>
					<button class="pa-btn pa-btn--success pa-btn--sm">Success</button>
					<button class="pa-btn pa-btn--danger pa-btn--sm">Danger</button>
					<button class="pa-btn pa-btn--warning pa-btn--sm">Warning</button>
					<button class="pa-btn pa-btn--info pa-btn--sm">Info</button>
				</div>
			</Column>

			<Column size="1" md="1-2">
				<h4 class="mb-3 text-sm">Badge Variants</h4>
				<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
					<span class="pa-badge pa-badge--primary">Primary</span>
					<span class="pa-badge pa-badge--secondary">Secondary</span>
					<span class="pa-badge pa-badge--success">Success</span>
					<span class="pa-badge pa-badge--danger">Danger</span>
					<span class="pa-badge pa-badge--warning">Warning</span>
					<span class="pa-badge pa-badge--info">Info</span>
					<span class="pa-badge pa-badge--primary pa-badge--pill">Pill</span>
				</div>
			</Column>
		</Grid>
	</Card>
</div>
