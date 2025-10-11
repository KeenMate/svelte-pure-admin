<script lang="ts">
	import {
		Modal,
		Card,
		Grid,
		Column,
		Button,
		Alert,
		Table,
		Badge,
		FormGroup,
		FormLabel,
		Input,
		Textarea,
		Select,
		Checkbox
	} from '$lib';

	// Modal visibility state
	let showSmall = $state(false);
	let showMedium = $state(false);
	let showLarge = $state(false);
	let showXL = $state(false);
	let showXXL = $state(false);
	let showFullWidth = $state(false);
	let showSuccess = $state(false);
	let showWarning = $state(false);
	let showDanger = $state(false);
	let showForm = $state(false);
	let showLogin = $state(false);
	let showSettings = $state(false);
	let showConfirmDelete = $state(false);
	let showConfirmAction = $state(false);
	let showInfo = $state(false);
</script>

<svelte:head>
	<title>Modal Windows - Pure Admin Svelte</title>
</svelte:head>

<h1>Modal Windows</h1>
<p>Dialog boxes and overlays for focused user interactions.</p>

<!-- Basic Modal Examples -->
<Card>
	{#snippet header()}
		<h3>Basic Modals</h3>
		<p>Standard modal dialogs for user interactions</p>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2">
			<h4>Standard Sizes</h4>
			<div class="component-showcase">
				<Button variant="primary" onClick={() => (showSmall = true)}>Small Modal</Button>
				<Button variant="primary" onClick={() => (showMedium = true)}>Medium Modal</Button>
				<Button variant="primary" onClick={() => (showLarge = true)}>Large Modal</Button>
				<Button variant="primary" onClick={() => (showXL = true)}>XL Modal</Button>
				<Button variant="primary" onClick={() => (showXXL = true)}>XXL Modal</Button>
				<Button variant="dark" onClick={() => (showFullWidth = true)}>Full Width</Button>
			</div>
		</Column>
		<Column size="1" md="1-2">
			<h4>Modal Types</h4>
			<div class="component-showcase">
				<Button variant="success" onClick={() => (showSuccess = true)}>Success Modal</Button>
				<Button variant="warning" onClick={() => (showWarning = true)}>Warning Modal</Button>
				<Button variant="danger" onClick={() => (showDanger = true)}>Danger Modal</Button>
			</div>
		</Column>
	</Grid>
</Card>

<!-- Form Modals -->
<Card>
	{#snippet header()}
		<h3>Form Modals</h3>
		<p>Modals containing forms and interactive content</p>
	{/snippet}

	<div class="component-showcase">
		<Button variant="secondary" onClick={() => (showForm = true)}>Contact Form</Button>
		<Button variant="info" onClick={() => (showLogin = true)}>Login Form</Button>
		<Button variant="dark" onClick={() => (showSettings = true)}>Settings Modal</Button>
	</div>
</Card>

<!-- Confirmation Modals -->
<Card>
	{#snippet header()}
		<h3>Confirmation Modals</h3>
		<p>Action confirmation and decision dialogs</p>
	{/snippet}

	<div class="component-showcase">
		<Button variant="danger" outline onClick={() => (showConfirmDelete = true)}
			>Delete Confirmation</Button
		>
		<Button variant="warning" outline onClick={() => (showConfirmAction = true)}
			>Action Confirmation</Button
		>
		<Button variant="info" outline onClick={() => (showInfo = true)}>Information Dialog</Button>
	</div>
</Card>

<!-- Modal Definitions -->

<!-- Small Modal -->
<Modal bind:show={showSmall} size="sm" title="Small Modal">
	<p>This is a small modal dialog. Perfect for quick notifications or simple confirmations.</p>
	{#snippet footer()}
		<Button variant="secondary" onClick={() => (showSmall = false)}>Close</Button>
		<Button variant="primary">Save</Button>
	{/snippet}
</Modal>

<!-- Medium Modal -->
<Modal bind:show={showMedium} title="Medium Modal">
	<p>This is a medium-sized modal dialog. Great for forms and detailed content.</p>
	<p>You can include multiple paragraphs, lists, and other content here.</p>
	<ul>
		<li>Feature 1</li>
		<li>Feature 2</li>
		<li>Feature 3</li>
	</ul>
	{#snippet footer()}
		<Button variant="secondary" onClick={() => (showMedium = false)}>Cancel</Button>
		<Button variant="primary">Continue</Button>
	{/snippet}
</Modal>

<!-- Large Modal -->
<Modal bind:show={showLarge} size="lg" title="Large Modal">
	<Grid>
		<Column size="1" md="1-2">
			<h5>Column 1</h5>
			<p>Large modals are perfect for complex content layouts with multiple columns.</p>
			<p>You can use the PureCSS grid system inside modals to create sophisticated layouts.</p>
		</Column>
		<Column size="1" md="1-2">
			<h5>Column 2</h5>
			<p>This second column demonstrates how you can organize content in larger modal dialogs.</p>
			<Alert variant="info">
				<strong>Tip:</strong> Large modals work great for dashboards and detailed forms.
			</Alert>
		</Column>
	</Grid>
	{#snippet footer()}
		<Button variant="secondary" onClick={() => (showLarge = false)}>Cancel</Button>
		<Button variant="primary">Save Changes</Button>
	{/snippet}
</Modal>

<!-- Extra Large Modal -->
<Modal bind:show={showXL} size="xl" title="Extra Large Modal">
	<Grid>
		<Column size="1" md="1-3">
			<h5>Column 1</h5>
			<p>Extra large modals provide ample space for comprehensive content displays.</p>
			<p>Perfect for data tables, reports, and detailed analytics dashboards.</p>
		</Column>
		<Column size="1" md="1-3">
			<h5>Column 2</h5>
			<p>You can display complex data structures, charts, and visualizations.</p>
			<Alert variant="info">
				<strong>Note:</strong> XL modals are 70rem wide (1120px).
			</Alert>
		</Column>
		<Column size="1" md="1-3">
			<h5>Column 3</h5>
			<p>Three-column layouts work beautifully in extra large modals.</p>
			<p>Ideal for comparison views and side-by-side content.</p>
		</Column>
	</Grid>
	{#snippet footer()}
		<Button variant="secondary" onClick={() => (showXL = false)}>Close</Button>
		<Button variant="primary">Apply Changes</Button>
	{/snippet}
</Modal>

<!-- XXL Modal -->
<Modal bind:show={showXXL} size="xxl" title="XXL Modal - Maximum Size">
	<Grid>
		<Column size="1" md="1-4">
			<h5>Section 1</h5>
			<p>XXL modals are the largest available size at 90rem (1440px) wide.</p>
			<p>Perfect for full-featured application interfaces within a modal.</p>
		</Column>
		<Column size="1" md="1-4">
			<h5>Section 2</h5>
			<p>Ideal for complex workflows that require maximum screen real estate.</p>
			<Alert variant="success">
				<strong>Great for:</strong> Data grids, reporting tools, and analytics.
			</Alert>
		</Column>
		<Column size="1" md="1-4">
			<h5>Section 3</h5>
			<p>Four-column layouts provide exceptional flexibility for content organization.</p>
			<ul>
				<li>Dashboard views</li>
				<li>Complex forms</li>
				<li>Data comparisons</li>
			</ul>
		</Column>
		<Column size="1" md="1-4">
			<h5>Section 4</h5>
			<p>On smaller screens, these columns will stack responsively.</p>
			<Alert variant="warning">
				<strong>Note:</strong> Consider viewport size when using XXL modals.
			</Alert>
		</Column>
	</Grid>
	<Grid style="margin-top: 2rem;">
		<Column size="1">
			<h5>Full Width Content Area</h5>
			<p>
				You can also use the full width for single-column content when needed. This is
				particularly useful for wide tables, code editors, or visual design tools.
			</p>
			<Card style="margin-top: 1rem;">
				<p>
					Nested cards and components work seamlessly within XXL modals, allowing you to create
					rich, interactive interfaces.
				</p>
			</Card>
		</Column>
	</Grid>
	{#snippet footer()}
		<Button variant="secondary" onClick={() => (showXXL = false)}>Close</Button>
		<Button variant="info">Export</Button>
		<Button variant="primary">Save All Changes</Button>
	{/snippet}
</Modal>

<!-- Full Width Modal -->
<Modal bind:show={showFullWidth} size="fw" title="Full Width Modal - Maximum Screen Coverage">
	<Grid>
		<Column size="1">
			<Alert variant="info" style="margin-bottom: 1rem;">
				<strong>Full Width Mode:</strong> This modal takes up the entire viewport minus a small margin
				(1rem on all sides), providing maximum workspace while maintaining modal appearance.
			</Alert>
		</Column>
	</Grid>
	<Grid>
		<Column size="1" lg="1-5">
			<Card>
				{#snippet header()}
					<h5>Navigation</h5>
				{/snippet}
				<ul style="list-style: none; padding: 0;">
					<li style="padding: 0.5rem 0;">Dashboard</li>
					<li style="padding: 0.5rem 0;">Analytics</li>
					<li style="padding: 0.5rem 0;">Reports</li>
					<li style="padding: 0.5rem 0;">Settings</li>
				</ul>
			</Card>
		</Column>
		<Column size="1" lg="3-5">
			<Card>
				{#snippet header()}
					<h5>Main Content Area</h5>
				{/snippet}
				<p>
					Full-width modals are perfect for complex applications that need to run within a modal
					context. Examples include:
				</p>
				<ul>
					<li><strong>Code Editors:</strong> Full IDE-like experiences</li>
					<li><strong>Design Tools:</strong> Canvas-based applications</li>
					<li><strong>Data Analysis:</strong> Large spreadsheets or pivot tables</li>
					<li><strong>Media Galleries:</strong> Full-screen photo/video management</li>
					<li><strong>Document Viewers:</strong> PDF readers, document editors</li>
				</ul>
				<div style="margin-top: 1rem;">
					<Table striped>
						<thead>
							<tr>
								<th>Feature</th>
								<th>Description</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Responsive</td>
								<td>Adapts to all screen sizes</td>
								<td><Badge variant="success">Active</Badge></td>
							</tr>
							<tr>
								<td>Full Screen</td>
								<td>Maximizes available viewport</td>
								<td><Badge variant="success">Active</Badge></td>
							</tr>
							<tr>
								<td>Modal Border</td>
								<td>Maintains 1rem margin</td>
								<td><Badge variant="info">Configured</Badge></td>
							</tr>
						</tbody>
					</Table>
				</div>
			</Card>
		</Column>
		<Column size="1" lg="1-5">
			<Card>
				{#snippet header()}
					<h5>Properties</h5>
				{/snippet}
				<FormGroup>
					<FormLabel for="fw-width">Width</FormLabel>
					<Input id="fw-width" value="100vw - 2rem" readonly />
				</FormGroup>
				<FormGroup>
					<FormLabel for="fw-height">Height</FormLabel>
					<Input id="fw-height" value="100vh - 2rem" readonly />
				</FormGroup>
				<FormGroup>
					<FormLabel for="fw-margin">Margin</FormLabel>
					<Input id="fw-margin" value="1rem" readonly />
				</FormGroup>
			</Card>
		</Column>
	</Grid>
	{#snippet footer()}
		<Button variant="secondary" onClick={() => (showFullWidth = false)}>Close</Button>
		<Button variant="success">Save</Button>
		<Button variant="primary">Apply</Button>
	{/snippet}
</Modal>

<!-- Success Modal -->
<Modal bind:show={showSuccess} headerVariant="success">
	{#snippet header()}
		<h4>✓ Success!</h4>
	{/snippet}
	<p>Your action has been completed successfully!</p>
	<Alert variant="success">Operation completed without any errors.</Alert>
	{#snippet footer()}
		<Button variant="success" onClick={() => (showSuccess = false)}>Great!</Button>
	{/snippet}
</Modal>

<!-- Warning Modal -->
<Modal bind:show={showWarning} headerVariant="warning">
	{#snippet header()}
		<h4>⚠ Warning</h4>
	{/snippet}
	<p>Please review your action before proceeding.</p>
	<Alert variant="warning">
		This action may have consequences that cannot be undone.
	</Alert>
	{#snippet footer()}
		<Button variant="secondary" onClick={() => (showWarning = false)}>Cancel</Button>
		<Button variant="warning">Proceed</Button>
	{/snippet}
</Modal>

<!-- Danger Modal -->
<Modal bind:show={showDanger} headerVariant="danger">
	{#snippet header()}
		<h4>🔥 Danger Zone</h4>
	{/snippet}
	<p>This action is potentially destructive.</p>
	<Alert variant="danger">
		<strong>Warning:</strong> This action cannot be undone and may result in data loss.
	</Alert>
	{#snippet footer()}
		<Button variant="secondary" onClick={() => (showDanger = false)}>Cancel</Button>
		<Button variant="danger">Delete Forever</Button>
	{/snippet}
</Modal>

<!-- Contact Form Modal -->
<Modal bind:show={showForm} title="Contact Us">
	<form>
		<Grid>
			<Column size="1">
				<FormGroup>
					<FormLabel for="contact-name">Name</FormLabel>
					<Input type="text" id="contact-name" placeholder="Your name" />
				</FormGroup>
			</Column>
			<Column size="1">
				<FormGroup>
					<FormLabel for="contact-email">Email</FormLabel>
					<Input type="email" id="contact-email" placeholder="your@email.com" />
				</FormGroup>
			</Column>
			<Column size="1">
				<FormGroup>
					<FormLabel for="contact-message">Message</FormLabel>
					<Textarea id="contact-message" rows={4} placeholder="Your message" />
				</FormGroup>
			</Column>
		</Grid>
	</form>
	{#snippet footer()}
		<Button variant="secondary" onClick={() => (showForm = false)}>Cancel</Button>
		<Button variant="primary">Send Message</Button>
	{/snippet}
</Modal>

<!-- Login Form Modal -->
<Modal bind:show={showLogin} size="sm" title="Sign In">
	<form>
		<Grid>
			<Column size="1">
				<FormGroup>
					<FormLabel for="login-username">Username</FormLabel>
					<Input type="text" id="login-username" placeholder="Enter username" />
				</FormGroup>
			</Column>
			<Column size="1">
				<FormGroup>
					<FormLabel for="login-password">Password</FormLabel>
					<Input type="password" id="login-password" placeholder="Enter password" />
				</FormGroup>
			</Column>
			<Column size="1">
				<FormGroup>
					<Checkbox id="login-remember">Remember me</Checkbox>
				</FormGroup>
			</Column>
		</Grid>
	</form>
	{#snippet footer()}
		<Button variant="secondary" onClick={() => (showLogin = false)}>Cancel</Button>
		<Button variant="primary">Sign In</Button>
	{/snippet}
</Modal>

<!-- Settings Modal -->
<Modal bind:show={showSettings} size="lg" title="Settings">
	<Grid>
		<Column size="1" md="1-2">
			<h5>General Settings</h5>
			<form>
				<FormGroup>
					<FormLabel for="settings-theme">Theme</FormLabel>
					<Select id="settings-theme">
						<option>Default</option>
						<option>Dark</option>
						<option>Audi</option>
					</Select>
				</FormGroup>
				<FormGroup>
					<Checkbox id="settings-notifications" checked>Enable notifications</Checkbox>
				</FormGroup>
			</form>
		</Column>
		<Column size="1" md="1-2">
			<h5>Privacy Settings</h5>
			<form>
				<FormGroup>
					<Checkbox id="settings-analytics">Share analytics data</Checkbox>
				</FormGroup>
				<FormGroup>
					<Checkbox id="settings-email" checked>Email updates</Checkbox>
				</FormGroup>
			</form>
		</Column>
	</Grid>
	{#snippet footer()}
		<Button variant="secondary" onClick={() => (showSettings = false)}>Cancel</Button>
		<Button variant="primary">Save Settings</Button>
	{/snippet}
</Modal>

<!-- Delete Confirmation Modal -->
<Modal bind:show={showConfirmDelete} size="sm" headerVariant="danger" title="Confirm Delete">
	<p>Are you sure you want to delete this item?</p>
	<Alert variant="danger">
		<strong>This action cannot be undone.</strong>
	</Alert>
	{#snippet footer()}
		<Button variant="secondary" onClick={() => (showConfirmDelete = false)}>Cancel</Button>
		<Button variant="danger">Delete</Button>
	{/snippet}
</Modal>

<!-- Action Confirmation Modal -->
<Modal bind:show={showConfirmAction} size="sm" title="Confirm Action">
	<p>Do you want to proceed with this action?</p>
	<p>This will update your preferences and may affect other users.</p>
	{#snippet footer()}
		<Button variant="secondary" onClick={() => (showConfirmAction = false)}>Cancel</Button>
		<Button variant="warning">Confirm</Button>
	{/snippet}
</Modal>

<!-- Information Dialog -->
<Modal bind:show={showInfo} headerVariant="info" title="Information">
	<p>Here's some important information you should know:</p>
	<Alert variant="info">
		Your subscription will expire in 7 days. Consider renewing to continue enjoying all features.
	</Alert>
	<ul>
		<li>Feature access will be limited after expiration</li>
		<li>Your data will remain safe for 30 days</li>
		<li>You can renew at any time</li>
	</ul>
	{#snippet footer()}
		<Button variant="secondary" onClick={() => (showInfo = false)}>Later</Button>
		<Button variant="info">Renew Now</Button>
	{/snippet}
</Modal>
