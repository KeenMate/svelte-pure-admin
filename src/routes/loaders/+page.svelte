<script lang="ts">
	import Heading from '$lib/typography/Heading.svelte';
	import Paragraph from '$lib/typography/Paragraph.svelte';
	import {
		Card,
		Grid,
		Column,
		Spinner,
		LoaderDots,
		LoaderBars,
		LoaderPulse,
		LoaderRing,
		LoaderWave,
		LoaderCenter,
		LoaderOverlay
	} from '$lib';
</script>

<svelte:head>
	<title>Loaders - Pure Admin Svelte</title>
</svelte:head>

<Heading level={1}>Loaders</Heading>
<Paragraph>Loading spinners and animations for asynchronous content.</Paragraph>

<!-- Spinner Sizes -->
<Card class="mb-6">
	{#snippet header()}
		<Heading level={3}>Spinner Sizes</Heading>
	{/snippet}

	<Grid>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="xs" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--xs<br />0.75rem</Paragraph>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="sm" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--sm<br />1rem (default)</Paragraph>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="md" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--md<br />1.5rem</Paragraph>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="lg" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--lg<br />2rem</Paragraph>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="xl" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--xl<br />3rem</Paragraph>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="2xl" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--2xl<br />4rem</Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Spinner Colors -->
<Card class="mb-6">
	{#snippet header()}
		<Heading level={3}>Spinner Colors</Heading>
	{/snippet}

	<Grid>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="primary" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--primary</Paragraph>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="secondary" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--secondary</Paragraph>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="success" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--success</Paragraph>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="danger" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--danger</Paragraph>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="warning" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--warning</Paragraph>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="info" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--info</Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Inline Spinners -->
<Card class="mb-6">
	{#snippet header()}
		<Heading level={3}>Inline Spinners</Heading>
	{/snippet}

	<Paragraph class="mb-4">
		<Spinner size="xs" variant="primary" class="inline-block align-middle mr-2" />
		Loading inline content...
	</Paragraph>
	<Paragraph class="mb-4">
		<Spinner size="sm" variant="success" class="inline-block align-middle mr-2" />
		Processing your request...
	</Paragraph>
	<Paragraph>
		<Spinner size="sm" variant="info" class="inline-block align-middle mr-2" />
		Fetching data from server...
	</Paragraph>
</Card>

<!-- Centered Loaders -->
<Card class="mb-6">
	{#snippet header()}
		<Heading level={3}>Centered Loaders</Heading>
	{/snippet}

	<div
		style="height: 200px; position: relative; border: 1px dashed #ddd; border-radius: 4px;"
	>
		<LoaderOverlay>
			<Spinner size="xl" variant="primary" />
		</LoaderOverlay>
	</div>
</Card>

<!-- Loader with Text -->
<Card class="mb-6">
	{#snippet header()}
		<Heading level={3}>Loaders with Text</Heading>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2" class="mb-4">
			<div style="height: 150px; border: 1px dashed #ddd; border-radius: 4px;">
				<LoaderCenter>
					<Spinner size="lg" variant="primary" />
					<Paragraph class="mt-4 text-secondary">Loading data...</Paragraph>
				</LoaderCenter>
			</div>
		</Column>
		<Column size="1" md="1-2" class="mb-4">
			<div style="height: 150px; border: 1px dashed #ddd; border-radius: 4px;">
				<LoaderCenter>
					<Spinner size="lg" variant="success" />
					<Paragraph class="mt-4 text-secondary">Processing...</Paragraph>
				</LoaderCenter>
			</div>
		</Column>
	</Grid>
</Card>

<!-- Card Loading State -->
<Card class="mb-6">
	{#snippet header()}
		<Heading level={3}>Card Loading States</Heading>
	{/snippet}

	<Grid>
		<Column size="1" md="1-3" class="mb-4">
			<Card>
				{#snippet header()}
					<Heading level={4}>Loading Card</Heading>
				{/snippet}
				<div class="pa-card__body" style="height: 150px; position: relative;">
					<LoaderOverlay>
						<Spinner size="lg" variant="primary" />
					</LoaderOverlay>
				</div>
			</Card>
		</Column>
		<Column size="1" md="1-3" class="mb-4">
			<Card>
				{#snippet header()}
					<Heading level={4}>Loading with Text</Heading>
				{/snippet}
				<div class="pa-card__body" style="height: 150px;">
					<LoaderCenter>
						<Spinner size="lg" variant="info" />
						<Paragraph class="mt-4 text-secondary">Fetching data...</Paragraph>
					</LoaderCenter>
				</div>
			</Card>
		</Column>
		<Column size="1" md="1-3" class="mb-4">
			<Card>
				{#snippet header()}
					<Heading level={4}>Loaded Content</Heading>
				{/snippet}
				<Paragraph>Content has loaded successfully!</Paragraph>
				<Paragraph class="mt-2">This is what appears after the loader completes.</Paragraph>
			</Card>
		</Column>
	</Grid>
</Card>

<!-- Loader Types -->
<Card class="mb-6">
	{#snippet header()}
		<Heading level={3}>Loader Types</Heading>
	{/snippet}

	<Grid>
		<!-- Dots Loader -->
		<Column size="1" md="1-3" class="text-center mb-6">
			<LoaderDots size="lg" class="text-primary" />
			<Paragraph class="mt-2 text-secondary"><strong>Dots Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>&lt;LoaderDots /&gt;</code></Paragraph>
		</Column>

		<!-- Bars Loader -->
		<Column size="1" md="1-3" class="text-center mb-6">
			<LoaderBars size="lg" class="text-success" />
			<Paragraph class="mt-2 text-secondary"><strong>Bars Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>&lt;LoaderBars /&gt;</code></Paragraph>
		</Column>

		<!-- Pulse Loader -->
		<Column size="1" md="1-3" class="text-center mb-6">
			<LoaderPulse size="lg" class="text-danger" />
			<Paragraph class="mt-2 text-secondary"><strong>Pulse Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>&lt;LoaderPulse /&gt;</code></Paragraph>
		</Column>

		<!-- Ring Loader -->
		<Column size="1" md="1-3" class="text-center mb-4">
			<LoaderRing size="lg" class="text-warning" />
			<Paragraph class="mt-2 text-secondary"><strong>Ring Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>&lt;LoaderRing /&gt;</code></Paragraph>
		</Column>

		<!-- Wave Loader -->
		<Column size="1" md="1-3" class="text-center mb-4">
			<LoaderWave size="lg" class="text-info" />
			<Paragraph class="mt-2 text-secondary"><strong>Wave Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>&lt;LoaderWave /&gt;</code></Paragraph>
		</Column>

		<!-- Spinner (existing) -->
		<Column size="1" md="1-3" class="text-center mb-4">
			<Spinner size="xl" class="text-secondary" />
			<Paragraph class="mt-2 text-secondary"><strong>Spinner (Default)</strong></Paragraph>
			<Paragraph class="mt-2"><code>&lt;Spinner /&gt;</code></Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Usage Examples -->
<Card>
	{#snippet header()}
		<Heading level={3}>Usage Examples</Heading>
	{/snippet}

	<Heading level={4} class="mb-2">Basic Spinner</Heading>
	<pre class="mb-4"><code>&lt;Spinner /&gt;</code></pre>

	<Heading level={4} class="mb-2">Sized Spinner</Heading>
	<pre class="mb-4"><code>&lt;Spinner size="lg" /&gt;</code></pre>

	<Heading level={4} class="mb-2">Colored Spinner</Heading>
	<pre class="mb-4"><code>&lt;Spinner size="lg" variant="primary" /&gt;</code></pre>

	<Heading level={4} class="mb-2">Centered Loader with Overlay</Heading>
	<pre class="mb-4"><code>&lt;LoaderOverlay&gt;
  &lt;Spinner size="xl" /&gt;
&lt;/LoaderOverlay&gt;</code></pre>

	<Heading level={4} class="mb-2">Centered Loader with Text</Heading>
	<pre class="mb-4"><code>&lt;LoaderCenter&gt;
  &lt;Spinner size="lg" /&gt;
  &lt;Paragraph class="mt-4"&gt;Loading...&lt;/Paragraph&gt;
&lt;/LoaderCenter&gt;</code></pre>

	<Heading level={4} class="mb-2">Dots Loader</Heading>
	<pre class="mb-4"><code>&lt;LoaderDots /&gt;</code></pre>

	<Heading level={4} class="mb-2">Bars Loader</Heading>
	<pre class="mb-4"><code>&lt;LoaderBars /&gt;</code></pre>

	<Heading level={4} class="mb-2">Pulse Loader</Heading>
	<pre class="mb-4"><code>&lt;LoaderPulse /&gt;</code></pre>

	<Heading level={4} class="mb-2">Ring Loader</Heading>
	<pre class="mb-4"><code>&lt;LoaderRing /&gt;</code></pre>

	<Heading level={4} class="mb-2">Wave Loader</Heading>
	<pre><code>&lt;LoaderWave /&gt;</code></pre>
</Card>
