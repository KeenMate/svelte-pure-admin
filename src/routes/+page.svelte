<script lang="ts">
	import { Button, Alert, Card, Input, Select, FormLabel } from '$lib';
	import ConfigDisplay from './ConfigDisplay.svelte';
</script>

<svelte:head>
	<title>Pure Admin Svelte - Component Demo</title>
</svelte:head>

<ConfigDisplay />

<h1>@pure-admin/svelte</h1>
<p>Svelte 5 component library for Pure Admin</p>

<!-- Configuration -->
<Card>
	{#snippet header()}
		<h3>Configuration System</h3>
	{/snippet}

	<p>
		This demo uses <code>PureAdminProvider</code> to set custom configuration values. All child
		components can access the config using <code>usePureAdminConfig()</code>.
	</p>

	<p>See the fixed panel in the top-right corner showing current config values.</p>

	<h4 style="margin-top: 1rem;">Usage Example:</h4>
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
<Card>
	{#snippet header()}
		<h3>Buttons</h3>
	{/snippet}

	<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
		<Button variant="primary">Primary</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="success">Success</Button>
		<Button variant="danger">Danger</Button>
		<Button variant="warning">Warning</Button>
		<Button variant="info">Info</Button>
	</div>

	<h4 style="margin-top: 1rem;">Sizes</h4>
	<div style="display: flex; gap: 0.5rem; align-items: center;">
		<Button variant="primary" size="xs">Extra Small</Button>
		<Button variant="primary" size="sm">Small</Button>
		<Button variant="primary">Default</Button>
		<Button variant="primary" size="lg">Large</Button>
		<Button variant="primary" size="xl">Extra Large</Button>
	</div>

	<h4 style="margin-top: 1rem;">Outline</h4>
	<div style="display: flex; gap: 0.5rem;">
		<Button variant="primary" outline>Primary</Button>
		<Button variant="success" outline>Success</Button>
		<Button variant="danger" outline>Danger</Button>
	</div>

	<h4 style="margin-top: 1rem;">Block</h4>
	<Button variant="primary" block>Full Width Button</Button>
</Card>

<!-- Alerts -->
<div style="margin-top: 2rem;">
	<Card>
		{#snippet header()}
			<h3>Alerts</h3>
		{/snippet}

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

		<h4 style="margin-top: 1rem;">Outline</h4>
		<Alert variant="success" outline>
			<strong>Outline!</strong> This is an outline alert.
		</Alert>
	</Card>
</div>

<!-- Cards -->
<div style="margin-top: 2rem;">
	<Card>
		{#snippet header()}
			<h3>Card Examples</h3>
		{/snippet}

		<div class="pure-g" style="margin: -1rem;">
			<div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" style="padding: 1rem;">
				<Card>
					{#snippet header()}
						<h4>Simple Card</h4>
					{/snippet}
					This is a simple card with a header.
				</Card>
			</div>

			<div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" style="padding: 1rem;">
				<Card>
					{#snippet header()}
						<h4>Card with Footer</h4>
					{/snippet}
					This card has header, body, and footer.
					{#snippet footer()}
						<Button variant="primary" size="sm">Action</Button>
					{/snippet}
				</Card>
			</div>

			<div class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3" style="padding: 1rem;">
				<Card>
					{#snippet header()}
						<h4>Another Card</h4>
					{/snippet}
					Cards can contain any content!
					{#snippet footer()}
						<div style="display: flex; gap: 0.5rem;">
							<Button variant="secondary" size="sm">Cancel</Button>
							<Button variant="success" size="sm">Save</Button>
						</div>
					{/snippet}
				</Card>
			</div>
		</div>
	</Card>
</div>

<!-- Forms -->
<div style="margin-top: 2rem;">
	<Card>
		{#snippet header()}
			<h3>Horizontal Form Example</h3>
		{/snippet}

		<form>
			<!-- Line 1: First Name, Last Name, Email (equal widths) -->
			<div class="pure-g" style="margin-bottom: 1rem;">
				<!-- First Name -->
				<div class="pure-u-1 pure-u-md-1-3" style="padding-right: 1rem;">
					<div class="pure-g">
						<div class="pure-u-1 pure-u-sm-1-3">
							<FormLabel for="firstName" style="padding-top: 0.5rem;">First Name</FormLabel>
						</div>
						<div class="pure-u-1 pure-u-sm-2-3">
							<Input id="firstName" placeholder="John" />
						</div>
					</div>
				</div>

				<!-- Last Name -->
				<div class="pure-u-1 pure-u-md-1-3" style="padding-right: 1rem;">
					<div class="pure-g">
						<div class="pure-u-1 pure-u-sm-1-3">
							<FormLabel for="lastName" style="padding-top: 0.5rem;">Last Name</FormLabel>
						</div>
						<div class="pure-u-1 pure-u-sm-2-3">
							<Input id="lastName" placeholder="Doe" />
						</div>
					</div>
				</div>

				<!-- Email -->
				<div class="pure-u-1 pure-u-md-1-3">
					<div class="pure-g">
						<div class="pure-u-1 pure-u-sm-1-3">
							<FormLabel for="email" style="padding-top: 0.5rem;">Email</FormLabel>
						</div>
						<div class="pure-u-1 pure-u-sm-2-3">
							<Input id="email" type="email" placeholder="john.doe@company.com" />
						</div>
					</div>
				</div>
			</div>

			<!-- Line 2: Phone (smaller), Department (larger), Job Title (medium) -->
			<div class="pure-g" style="margin-bottom: 1rem;">
				<!-- Phone -->
				<div class="pure-u-1 pure-u-md-1-4" style="padding-right: 1rem;">
					<div class="pure-g">
						<div class="pure-u-1 pure-u-sm-1-3">
							<FormLabel for="phone" style="padding-top: 0.5rem;">Phone</FormLabel>
						</div>
						<div class="pure-u-1 pure-u-sm-2-3">
							<Input id="phone" type="tel" placeholder="+1 555-0123" />
						</div>
					</div>
				</div>

				<!-- Department -->
				<div class="pure-u-1 pure-u-md-5-12" style="padding-right: 1rem;">
					<div class="pure-g">
						<div class="pure-u-1 pure-u-sm-2-5">
							<FormLabel for="department" style="padding-top: 0.5rem;">Department</FormLabel>
						</div>
						<div class="pure-u-1 pure-u-sm-3-5">
							<Select id="department">
								<option value="">Select department...</option>
								<option value="engineering">Engineering</option>
								<option value="marketing">Marketing</option>
								<option value="sales">Sales</option>
								<option value="hr">Human Resources</option>
							</Select>
						</div>
					</div>
				</div>

				<!-- Job Title -->
				<div class="pure-u-1 pure-u-md-1-3">
					<div class="pure-g">
						<div class="pure-u-1 pure-u-sm-1-3">
							<FormLabel for="jobTitle" style="padding-top: 0.5rem;">Job Title</FormLabel>
						</div>
						<div class="pure-u-1 pure-u-sm-2-3">
							<Input id="jobTitle" placeholder="Senior Developer" />
						</div>
					</div>
				</div>
			</div>

			<!-- Line 3: Address (larger), City (medium), Zip (small) -->
			<div class="pure-g" style="margin-bottom: 1rem;">
				<!-- Address -->
				<div class="pure-u-1 pure-u-md-1-2" style="padding-right: 1rem;">
					<div class="pure-g">
						<div class="pure-u-1 pure-u-sm-1-4">
							<FormLabel for="address" style="padding-top: 0.5rem;">Address</FormLabel>
						</div>
						<div class="pure-u-1 pure-u-sm-3-4">
							<Input id="address" placeholder="123 Main Street" />
						</div>
					</div>
				</div>

				<!-- City -->
				<div class="pure-u-1 pure-u-md-1-3" style="padding-right: 1rem;">
					<div class="pure-g">
						<div class="pure-u-1 pure-u-sm-1-4">
							<FormLabel for="city" style="padding-top: 0.5rem;">City</FormLabel>
						</div>
						<div class="pure-u-1 pure-u-sm-3-4">
							<Input id="city" placeholder="San Francisco" />
						</div>
					</div>
				</div>

				<!-- Zip Code -->
				<div class="pure-u-1 pure-u-md-1-6">
					<div class="pure-g">
						<div class="pure-u-1 pure-u-sm-2-5">
							<FormLabel for="zip" style="padding-top: 0.5rem;">Zip</FormLabel>
						</div>
						<div class="pure-u-1 pure-u-sm-3-5">
							<Input id="zip" placeholder="94102" />
						</div>
					</div>
				</div>
			</div>

			<!-- Submit Button -->
			<div class="pure-g">
				<div class="pure-u-1" style="text-align: right;">
					<Button variant="secondary" style="margin-right: 0.5rem;">Cancel</Button>
					<Button variant="primary" type="submit">Submit</Button>
				</div>
			</div>
		</form>

		{#snippet footer()}
			<p style="margin: 0; color: #666; font-size: 0.875rem;">
				<strong>Form Layout:</strong> Line 1 has equal widths. Line 2 has varying sizes (1/4 + 5/12 + 1/3).
				Line 3 has very different sizes (1/2 + 1/3 + 1/6).
			</p>
		{/snippet}
	</Card>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
