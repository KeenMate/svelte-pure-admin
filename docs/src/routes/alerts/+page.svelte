<script lang="ts">
	import { Heading, Paragraph, Alert, Card, Button, Grid, Column, BasicList } from '@keenmate/svelte-pure-admin';
		</script>

<Paragraph>Contextual feedback messages for typical user actions with flexible alert messages.</Paragraph>

<!-- Basic Alerts -->
<Card titleText="Basic Alerts">
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
<Card titleText="Alerts with Icons">
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
<Card titleText="Dismissible Alerts">
	<Alert isDismissible variant="success">
		<strong>Well done!</strong> You successfully read this important alert message.
	</Alert>

	<Alert isDismissible variant="danger">
		<strong>Oh snap!</strong> Change a few things and try submitting again.
	</Alert>

	<Alert isDismissible variant="warning">
		<strong>Warning!</strong> Better check yourself, you're not looking too good.
	</Alert>

	<Alert isDismissible variant="info">
		<strong>Heads up!</strong> This alert needs your attention, but it's not super important.
	</Alert>
</Card>

<!-- Alerts with Additional Content -->
<Card titleText="Alerts with Additional Content">
	<Grid>
		<Column size="100" md="1-2">
			<Alert variant="success" headingText="Success!">
				<Paragraph>
					Aww yeah, you successfully read this important alert message. This example text is
					going to run a bit longer so that you can see how spacing within an alert works with
					this kind of content.
				</Paragraph>
				<hr />
				<Paragraph class="mb-0">
					Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
				</Paragraph>
			</Alert>
		</Column>

		<Column size="100" md="1-2">
			<Alert variant="info" headingText="System Update">
				<Paragraph>A new version of the application is available. This update includes:</Paragraph>
				<BasicList class="pa-alert__list">
					<li>Performance improvements</li>
					<li>Bug fixes</li>
					<li>New dashboard features</li>
				</BasicList>
				<div class="pa-alert__actions">
					<Button variant="primary" size="sm">Update Now</Button>
					<Button variant="secondary" size="sm">Remind Me Later</Button>
				</div>
			</Alert>
		</Column>
	</Grid>
</Card>

<!-- Outline Alerts -->
<Card titleText="Outline Alerts">
	<Alert isOutline variant="primary">
		<strong>Primary Outline!</strong> This is a primary outline alert.
	</Alert>

	<Alert isOutline variant="success">
		<strong>Success Outline!</strong> This is a success outline alert.
	</Alert>

	<Alert isOutline variant="danger">
		<strong>Danger Outline!</strong> This is a danger outline alert.
	</Alert>

	<Alert isOutline variant="warning">
		<strong>Warning Outline!</strong> This is a warning outline alert.
	</Alert>

	<Alert isOutline variant="info">
		<strong>Info Outline!</strong> This is an info outline alert.
	</Alert>
</Card>

<!-- Theme Color Slot Alerts -->
<Card titleText="Theme Color Slot Alerts" subtitleText="Alerts using custom theme color slots (1-9). Colors are defined by the active theme — invisible in base theme.">
	<Grid>
		<Column size="100" md="1-3">
			<Alert themeColor={1}>
				<strong>Color 1</strong> — Theme slot alert
			</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert themeColor={2}>
				<strong>Color 2</strong> — Theme slot alert
			</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert themeColor={3}>
				<strong>Color 3</strong> — Theme slot alert
			</Alert>
		</Column>
	</Grid>
	<Grid>
		<Column size="100" md="1-3">
			<Alert themeColor={4}>
				<strong>Color 4</strong> — Theme slot alert
			</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert themeColor={5}>
				<strong>Color 5</strong> — Theme slot alert
			</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert themeColor={6}>
				<strong>Color 6</strong> — Theme slot alert
			</Alert>
		</Column>
	</Grid>
</Card>

<!-- Outline Theme Color Slot Alerts -->
<Card titleText="Outline Theme Color Slot Alerts">
	<Grid>
		<Column size="100" md="1-3">
			<Alert themeColor={1} isOutline>
				<strong>Color 1 Outline</strong>
			</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert themeColor={2} isOutline>
				<strong>Color 2 Outline</strong>
			</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert themeColor={3} isOutline>
				<strong>Color 3 Outline</strong>
			</Alert>
		</Column>
	</Grid>
</Card>

<!-- Compact Alerts Grid -->
<Card titleText="Compact Alerts in Grid">
	<Grid>
		<Column size="100" md="1-3">
			<Alert size="sm" variant="success">
				<span class="pa-alert__icon">✓</span> Saved
			</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert size="sm" variant="warning">
				<span class="pa-alert__icon">!</span> Pending
			</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert size="sm" variant="danger">
				<span class="pa-alert__icon">×</span> Failed
			</Alert>
		</Column>
	</Grid>
</Card>
