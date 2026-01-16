<script lang="ts">
	import { Heading, Paragraph, Button, Alert, Card, Input, Select, FormLabel, Grid, Column } from '@keenmate/svelte-pure-admin';
	import ConfigDisplay from './ConfigDisplay.svelte';
</script>

<ConfigDisplay />

<!-- Configuration -->
<Card title="Configuration System">

	<Paragraph>
		This demo uses <code>PureAdminProvider</code> to set custom configuration values. All child
		components can access the config using <code>usePureAdminConfig()</code>.
	</Paragraph>

	<Paragraph>See the fixed panel in the top-right corner showing current config values.</Paragraph>

	<Heading level={4} class="mt-4">Usage Example:</Heading>
	<pre class="pa-code"><code>{`<script>
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

	<div class="d-flex gap-sm flex-wrap">
		<Button variant="primary">Primary</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="success">Success</Button>
		<Button variant="danger">Danger</Button>
		<Button variant="warning">Warning</Button>
		<Button variant="info">Info</Button>
	</div>

	<Heading level={4} class="mt-4">Sizes</Heading>
	<div class="d-flex gap-sm align-items-center">
		<Button variant="primary" size="xs">Extra Small</Button>
		<Button variant="primary" size="sm">Small</Button>
		<Button variant="primary">Default</Button>
		<Button variant="primary" size="lg">Large</Button>
		<Button variant="primary" size="xl">Extra Large</Button>
	</div>

	<Heading level={4} class="mt-4">Outline</Heading>
	<div class="d-flex gap-sm">
		<Button variant="primary" outline>Primary</Button>
		<Button variant="success" outline>Success</Button>
		<Button variant="danger" outline>Danger</Button>
	</div>

	<Heading level={4} class="mt-4">Block</Heading>
	<Button variant="primary" block>Full Width Button</Button>
</Card>

<!-- Alerts -->
<div class="mt-8">
	<Card title="Alerts">

		<Alert variant="success">
			<strong>Success!</strong> This is a success alert.
		</Alert>

		<Alert variant="danger" class="mt-4">
			<strong>Danger!</strong> This is a danger alert.
		</Alert>

		<Alert variant="warning" class="mt-4">
			<strong>Warning!</strong> This is a warning alert.
		</Alert>

		<Alert variant="info" dismissible class="mt-4">
			<strong>Info!</strong> This alert is dismissible (click the X).
		</Alert>

		<Heading level={4} class="mt-4">Outline</Heading>
		<Alert variant="success" outline>
			<strong>Outline!</strong> This is an outline alert.
		</Alert>
	</Card>
</div>

<!-- Cards -->
<div class="mt-8">
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
						<div class="d-flex gap-sm">
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
<div class="mt-8">
	<Card title="Horizontal Form Example">

		<form>
			<!-- Line 1: First Name, Last Name, Email (equal widths) -->
			<Grid class="mb-4">
				<!-- First Name -->
				<Column size="100" md="1-3">
					<Grid>
						<Column size="100" sm="1-3">
							<FormLabel for="firstName" class="pt-2">First Name</FormLabel>
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
							<FormLabel for="lastName" class="pt-2">Last Name</FormLabel>
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
							<FormLabel for="email" class="pt-2">Email</FormLabel>
						</Column>
						<Column size="100" sm="2-3">
							<Input id="email" type="email" placeholder="john.doe@company.com" />
						</Column>
					</Grid>
				</Column>
			</Grid>

			<!-- Line 2: Phone (smaller), Department (larger), Job Title (medium) -->
			<Grid class="mb-4">
				<!-- Phone -->
				<Column size="100" md="1-4">
					<Grid>
						<Column size="100" sm="1-3">
							<FormLabel for="phone" class="pt-2">Phone</FormLabel>
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
							<FormLabel for="department" class="pt-2">Department</FormLabel>
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
							<FormLabel for="jobTitle" class="pt-2">Job Title</FormLabel>
						</Column>
						<Column size="100" sm="2-3">
							<Input id="jobTitle" placeholder="Senior Developer" />
						</Column>
					</Grid>
				</Column>
			</Grid>

			<!-- Line 3: Address (larger), City (medium), Zip (small) -->
			<Grid class="mb-4">
				<!-- Address -->
				<Column size="100" md="1-2">
					<Grid>
						<Column size="100" sm="1-4">
							<FormLabel for="address" class="pt-2">Address</FormLabel>
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
							<FormLabel for="city" class="pt-2">City</FormLabel>
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
							<FormLabel for="zip" class="pt-2">Zip</FormLabel>
						</Column>
						<Column size="100" sm="3-5">
							<Input id="zip" placeholder="94102" />
						</Column>
					</Grid>
				</Column>
			</Grid>

			<!-- Submit Button -->
			<Grid>
				<Column size="100" class="text-right">
					<Button variant="secondary" class="mr-2">Cancel</Button>
					<Button variant="primary" type="submit">Submit</Button>
				</Column>
			</Grid>
		</form>

		{#snippet footer()}
			<Paragraph class="mb-0 text-secondary text-sm">
				<strong>Form Layout:</strong> Line 1 has equal widths. Line 2 has varying sizes (1/4 + 5/12 + 1/3).
				Line 3 has very different sizes (1/2 + 1/3 + 1/6).
			</Paragraph>
		{/snippet}
	</Card>
</div>
