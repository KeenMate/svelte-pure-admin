<script lang="ts">
	import Heading from '$lib/typography/Heading.svelte';
	import Paragraph from '$lib/typography/Paragraph.svelte';
	import { Button, Alert, Card, Input, Select, FormLabel, Grid, Column } from '$lib';
	import ConfigDisplay from './ConfigDisplay.svelte';
</script>

<svelte:head>
	<title>Pure Admin Svelte - Component Demo</title>
</svelte:head>

<ConfigDisplay />

<Heading level={1}>@pure-admin/svelte</Heading>
<Paragraph>Svelte 5 component library for Pure Admin</Paragraph>

<!-- Configuration -->
<Card title="Configuration System">

	<Paragraph>
		This demo uses <code>PureAdminProvider</code> to set custom configuration values. All child
		components can access the config using <code>usePureAdminConfig()</code>.
	</Paragraph>

	<Paragraph>See the fixed panel in the top-right corner showing current config values.</Paragraph>

	<Heading level={4} style="margin-top: 1rem;">Usage Example:</Heading>
	<pre
		style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>{`< script>
  import { PureAdminProvider } from '@pure-admin/svelte';

  const config = {
    app: { name: 'My App', copyright: '© 2025 My Company' },
    defaults: { pageSize: 50, connectionTimeout: 60000 },
    ui: { theme: 'light', animations: true }
  };
</script>

<PureAdminProvider config={config}>
  <!-- Your app components -->
</PureAdminProvider>`}</code></pre>
</Card>

<!-- Buttons -->
<Card title="Buttons">

	<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
		<Button variant="primary">Primary</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="success">Success</Button>
		<Button variant="danger">Danger</Button>
		<Button variant="warning">Warning</Button>
		<Button variant="info">Info</Button>
	</div>

	<Heading level={4} style="margin-top: 1rem;">Sizes</Heading>
	<div style="display: flex; gap: 0.5rem; align-items: center;">
		<Button variant="primary" size="xs">Extra Small</Button>
		<Button variant="primary" size="sm">Small</Button>
		<Button variant="primary">Default</Button>
		<Button variant="primary" size="lg">Large</Button>
		<Button variant="primary" size="xl">Extra Large</Button>
	</div>

	<Heading level={4} style="margin-top: 1rem;">Outline</Heading>
	<div style="display: flex; gap: 0.5rem;">
		<Button variant="primary" outline>Primary</Button>
		<Button variant="success" outline>Success</Button>
		<Button variant="danger" outline>Danger</Button>
	</div>

	<Heading level={4} style="margin-top: 1rem;">Block</Heading>
	<Button variant="primary" block>Full Width Button</Button>
</Card>

<!-- Alerts -->
<div style="margin-top: 2rem;">
	<Card title="Alerts">

		<Alert variant="success">
			<strong>Success!</strong> This is a success alert.
		</Alert>

		<Alert variant="danger" style="margin-top: 1rem;">
			<strong>Danger!</strong> This is a danger alert.
		</Alert>

		<Alert variant="warning" style="margin-top: 1rem;">
			<strong>Warning!</strong> This is a warning alert.
		</Alert>

		<Alert variant="info" dismissible style="margin-top: 1rem;">
			<strong>Info!</strong> This alert is dismissible (click the X).
		</Alert>

		<Heading level={4} style="margin-top: 1rem;">Outline</Heading>
		<Alert variant="success" outline>
			<strong>Outline!</strong> This is an outline alert.
		</Alert>
	</Card>
</div>

<!-- Cards -->
<div style="margin-top: 2rem;">
	<Card title="Card Examples">

		<Grid class="pa-row--same-height">
			<Column size="100" md="50" lg="1-3">
				<Card>
					{#snippet header()}
						<Heading level={4}>Simple Card</Heading>
					{/snippet}
					This is a simple card with a header.
				</Card>
			</Column>

			<Column size="100" md="50" lg="1-3">
				<Card>
					{#snippet header()}
						<Heading level={4}>Card with Footer</Heading>
					{/snippet}
					This card has header, body, and footer.
					{#snippet footer()}
						<Button variant="primary" size="sm">Action</Button>
					{/snippet}
				</Card>
			</Column>

			<Column size="100" md="50" lg="1-3">
				<Card>
					{#snippet header()}
						<Heading level={4}>Another Card</Heading>
					{/snippet}
					Cards can contain any content!
					{#snippet footer()}
						<div style="display: flex; gap: 0.5rem;">
							<Button variant="secondary" size="sm">Cancel</Button>
							<Button variant="success" size="sm">Save</Button>
						</div>
					{/snippet}
				</Card>
			</Column>
		</Grid>
	</Card>
</div>

<!-- Forms -->
<div style="margin-top: 2rem;">
	<Card title="Horizontal Form Example">

		<form>
			<!-- Line 1: First Name, Last Name, Email (equal widths) -->
			<Grid style="margin-bottom: 1rem;">
				<!-- First Name -->
				<Column size="100" md="1-3">
					<Grid>
						<Column size="100" sm="1-3">
							<FormLabel for="firstName" style="padding-top: 0.5rem;">First Name</FormLabel>
						</Column>
						<Column size="100" sm="2-3">
							<Input id="firstName" placeholder="John" />
						</Column>
					</Grid>
				</Column>

				<!-- Last Name -->
				<Column size="100" md="1-3">
					<Grid>
						<Column size="100" sm="1-3">
							<FormLabel for="lastName" style="padding-top: 0.5rem;">Last Name</FormLabel>
						</Column>
						<Column size="100" sm="2-3">
							<Input id="lastName" placeholder="Doe" />
						</Column>
					</Grid>
				</Column>

				<!-- Email -->
				<Column size="100" md="1-3">
					<Grid>
						<Column size="100" sm="1-3">
							<FormLabel for="email" style="padding-top: 0.5rem;">Email</FormLabel>
						</Column>
						<Column size="100" sm="2-3">
							<Input id="email" type="email" placeholder="john.doe@company.com" />
						</Column>
					</Grid>
				</Column>
			</Grid>

			<!-- Line 2: Phone (smaller), Department (larger), Job Title (medium) -->
			<Grid style="margin-bottom: 1rem;">
				<!-- Phone -->
				<Column size="100" md="1-4">
					<Grid>
						<Column size="100" sm="1-3">
							<FormLabel for="phone" style="padding-top: 0.5rem;">Phone</FormLabel>
						</Column>
						<Column size="100" sm="2-3">
							<Input id="phone" type="tel" placeholder="+1 555-0123" />
						</Column>
					</Grid>
				</Column>

				<!-- Department -->
				<Column size="100" md="5-12">
					<Grid>
						<Column size="100" sm="2-5">
							<FormLabel for="department" style="padding-top: 0.5rem;">Department</FormLabel>
						</Column>
						<Column size="100" sm="3-5">
							<Select id="department">
								<option value="">Select department...</option>
								<option value="engineering">Engineering</option>
								<option value="marketing">Marketing</option>
								<option value="sales">Sales</option>
								<option value="hr">Human Resources</option>
							</Select>
						</Column>
					</Grid>
				</Column>

				<!-- Job Title -->
				<Column size="100" md="1-3">
					<Grid>
						<Column size="100" sm="1-3">
							<FormLabel for="jobTitle" style="padding-top: 0.5rem;">Job Title</FormLabel>
						</Column>
						<Column size="100" sm="2-3">
							<Input id="jobTitle" placeholder="Senior Developer" />
						</Column>
					</Grid>
				</Column>
			</Grid>

			<!-- Line 3: Address (larger), City (medium), Zip (small) -->
			<Grid style="margin-bottom: 1rem;">
				<!-- Address -->
				<Column size="100" md="1-2">
					<Grid>
						<Column size="100" sm="1-4">
							<FormLabel for="address" style="padding-top: 0.5rem;">Address</FormLabel>
						</Column>
						<Column size="100" sm="3-4">
							<Input id="address" placeholder="123 Main Street" />
						</Column>
					</Grid>
				</Column>

				<!-- City -->
				<Column size="100" md="1-3">
					<Grid>
						<Column size="100" sm="1-4">
							<FormLabel for="city" style="padding-top: 0.5rem;">City</FormLabel>
						</Column>
						<Column size="100" sm="3-4">
							<Input id="city" placeholder="San Francisco" />
						</Column>
					</Grid>
				</Column>

				<!-- Zip Code -->
				<Column size="100" md="1-6">
					<Grid>
						<Column size="100" sm="2-5">
							<FormLabel for="zip" style="padding-top: 0.5rem;">Zip</FormLabel>
						</Column>
						<Column size="100" sm="3-5">
							<Input id="zip" placeholder="94102" />
						</Column>
					</Grid>
				</Column>
			</Grid>

			<!-- Submit Button -->
			<Grid>
				<Column size="100" style="text-align: right;">
					<Button variant="secondary" style="margin-right: 0.5rem;">Cancel</Button>
					<Button variant="primary" type="submit">Submit</Button>
				</Column>
			</Grid>
		</form>

		{#snippet footer()}
			<Paragraph style="margin: 0; color: #666; font-size: 0.875rem;">
				<strong>Form Layout:</strong> Line 1 has equal widths. Line 2 has varying sizes (1/4 + 5/12 + 1/3).
				Line 3 has very different sizes (1/2 + 1/3 + 1/6).
			</Paragraph>
		{/snippet}
	</Card>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
