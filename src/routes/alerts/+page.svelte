<script lang="ts">
	import { Alert, Card, Button, Grid, Column } from '$lib';
</script>

<svelte:head>
	<title>Alerts - Pure Admin Svelte</title>
</svelte:head>

<h1>Alerts</h1>
<p>Contextual feedback messages for typical user actions with flexible alert messages.</p>

<!-- Basic Alerts -->
<Card>
	{#snippet header()}
		<h3>Basic Alerts</h3>
	{/snippet}

	<Alert variant="primary">
		<strong>Primary!</strong> This is a primary alert — check it out!
	</Alert>

	<Alert variant="secondary">
		<strong>Secondary!</strong> This is a secondary alert — check it out!
	</Alert>

	<Alert variant="success">
		<strong>Success!</strong> This is a success alert — your operation completed successfully.
	</Alert>

	<Alert variant="danger">
		<strong>Danger!</strong> This is a danger alert — something went wrong!
	</Alert>

	<Alert variant="warning">
		<strong>Warning!</strong> This is a warning alert — please review before proceeding.
	</Alert>

	<Alert variant="info">
		<strong>Info!</strong> This is an info alert — here's some useful information.
	</Alert>

	<Alert variant="light">
		<strong>Light!</strong> This is a light alert — subtle but important.
	</Alert>

	<Alert variant="dark">
		<strong>Dark!</strong> This is a dark alert — for high contrast messaging.
	</Alert>
</Card>

<!-- Alerts with Icons -->
<Card>
	{#snippet header()}
		<h3>Alerts with Icons</h3>
	{/snippet}

	<Alert variant="success">
		{#snippet icon()}✓{/snippet}
		<strong>Success!</strong> Your changes have been saved successfully.
	</Alert>

	<Alert variant="danger">
		{#snippet icon()}⚠{/snippet}
		<strong>Error!</strong> Unable to process your request. Please try again.
	</Alert>

	<Alert variant="warning">
		{#snippet icon()}!{/snippet}
		<strong>Warning!</strong> Your session will expire in 5 minutes.
	</Alert>

	<Alert variant="info">
		{#snippet icon()}ⓘ{/snippet}
		<strong>Information!</strong> New features are now available in your account.
	</Alert>
</Card>

<!-- Dismissible Alerts -->
<Card>
	{#snippet header()}
		<h3>Dismissible Alerts</h3>
	{/snippet}

	<Alert dismissible variant="success">
		<strong>Well done!</strong> You successfully read this important alert message.
	</Alert>

	<Alert dismissible variant="danger">
		<strong>Oh snap!</strong> Change a few things and try submitting again.
	</Alert>

	<Alert dismissible variant="warning">
		<strong>Warning!</strong> Better check yourself, you're not looking too good.
	</Alert>

	<Alert dismissible variant="info">
		<strong>Heads up!</strong> This alert needs your attention, but it's not super important.
	</Alert>
</Card>

<!-- Alerts with Additional Content -->
<Card>
	{#snippet header()}
		<h3>Alerts with Additional Content</h3>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2">
			<Alert variant="success" heading="Success!">
				<p>
					Aww yeah, you successfully read this important alert message. This example text is
					going to run a bit longer so that you can see how spacing within an alert works with
					this kind of content.
				</p>
				<hr />
				<p class="mb-0">
					Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
				</p>
			</Alert>
		</Column>

		<Column size="1" md="1-2">
			<Alert variant="info" heading="System Update">
				<p>A new version of the application is available. This update includes:</p>
				<ul class="pa-alert__list">
					<li>Performance improvements</li>
					<li>Bug fixes</li>
					<li>New dashboard features</li>
				</ul>
				<div class="pa-alert__actions">
					<Button variant="primary" size="sm">Update Now</Button>
					<Button variant="secondary" size="sm">Remind Me Later</Button>
				</div>
			</Alert>
		</Column>
	</Grid>
</Card>

<!-- Outline Alerts -->
<Card>
	{#snippet header()}
		<h3>Outline Alerts</h3>
	{/snippet}

	<Alert outline variant="primary">
		<strong>Primary Outline!</strong> This is a primary outline alert.
	</Alert>

	<Alert outline variant="success">
		<strong>Success Outline!</strong> This is a success outline alert.
	</Alert>

	<Alert outline variant="danger">
		<strong>Danger Outline!</strong> This is a danger outline alert.
	</Alert>

	<Alert outline variant="warning">
		<strong>Warning Outline!</strong> This is a warning outline alert.
	</Alert>

	<Alert outline variant="info">
		<strong>Info Outline!</strong> This is an info outline alert.
	</Alert>
</Card>

<!-- Compact Alerts Grid -->
<Card>
	{#snippet header()}
		<h3>Compact Alerts in Grid</h3>
	{/snippet}

	<Grid>
		<Column size="1" md="1-3">
			<Alert sm variant="success">
				<span class="pa-alert__icon">✓</span> Saved
			</Alert>
		</Column>
		<Column size="1" md="1-3">
			<Alert sm variant="warning">
				<span class="pa-alert__icon">!</span> Pending
			</Alert>
		</Column>
		<Column size="1" md="1-3">
			<Alert sm variant="danger">
				<span class="pa-alert__icon">×</span> Failed
			</Alert>
		</Column>
	</Grid>
</Card>
