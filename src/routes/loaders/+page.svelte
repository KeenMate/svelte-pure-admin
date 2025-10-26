<script lang="ts">
	import Heading from '$lib/typography/Heading.svelte';
	import Paragraph from '$lib/typography/Paragraph.svelte';
	import { Card, Grid, Column, Spinner } from '$lib';
</script>

<svelte:head>
	<title>Loaders - Pure Admin Svelte</title>
</svelte:head>

<Heading level={1}>Loaders</Heading>
<Paragraph>Loading spinners and animations for asynchronous content.</Paragraph>

<!-- NOTE: Some loader types use raw HTML as components don't exist yet -->

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
		<span
			class="pa-spinner pa-spinner--xs pa-spinner--primary"
			style="display: inline-block; vertical-align: middle; margin-right: 0.5rem;"
		></span>
		Loading inline content...
	</Paragraph>
	<Paragraph class="mb-4">
		<span
			class="pa-spinner pa-spinner--sm pa-spinner--success"
			style="display: inline-block; vertical-align: middle; margin-right: 0.5rem;"
		></span>
		Processing your request...
	</Paragraph>
	<Paragraph>
		<span
			class="pa-spinner pa-spinner--sm pa-spinner--info"
			style="display: inline-block; vertical-align: middle; margin-right: 0.5rem;"
		></span>
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
		<div class="pa-loader-overlay">
			<Spinner size="xl" variant="primary" />
		</div>
	</div>
</Card>

<!-- Loader with Text -->
<Card class="mb-6">
	{#snippet header()}
		<Heading level={3}>Loaders with Text</Heading>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2" class="mb-4">
			<div
				class="pa-loader-center"
				style="height: 150px; border: 1px dashed #ddd; border-radius: 4px;"
			>
				<Spinner size="lg" variant="primary" />
				<Paragraph class="mt-4 text-secondary">Loading data...</Paragraph>
			</div>
		</Column>
		<Column size="1" md="1-2" class="mb-4">
			<div
				class="pa-loader-center"
				style="height: 150px; border: 1px dashed #ddd; border-radius: 4px;"
			>
				<Spinner size="lg" variant="success" />
				<Paragraph class="mt-4 text-secondary">Processing...</Paragraph>
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
					<div class="pa-loader-overlay">
						<Spinner size="lg" variant="primary" />
					</div>
				</div>
			</Card>
		</Column>
		<Column size="1" md="1-3" class="mb-4">
			<Card>
				{#snippet header()}
					<Heading level={4}>Loading with Text</Heading>
				{/snippet}
				<div class="pa-card__body pa-loader-center" style="height: 150px;">
					<Spinner size="lg" variant="info" />
					<Paragraph class="mt-4 text-secondary">Fetching data...</Paragraph>
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
<!-- NOTE: Using raw HTML for loader variants not yet componentized -->
<Card class="mb-6">
	{#snippet header()}
		<Heading level={3}>Loader Types</Heading>
	{/snippet}

	<Grid>
		<!-- Dots Loader -->
		<Column size="1" md="1-3" class="text-center mb-6">
			<div class="pa-loader-dots pa-loader-dots--lg" style="color: #007bff;">
				<span></span>
				<span></span>
				<span></span>
			</div>
			<Paragraph class="mt-2 text-secondary"><strong>Dots Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-dots</code></Paragraph>
		</Column>

		<!-- Bars Loader -->
		<Column size="1" md="1-3" class="text-center mb-6">
			<div class="pa-loader-bars pa-loader-bars--lg" style="color: #28a745;">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<Paragraph class="mt-2 text-secondary"><strong>Bars Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-bars</code></Paragraph>
		</Column>

		<!-- Pulse Loader -->
		<Column size="1" md="1-3" class="text-center mb-6">
			<div class="pa-loader-pulse pa-loader-pulse--lg" style="color: #dc3545;"></div>
			<Paragraph class="mt-2 text-secondary"><strong>Pulse Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-pulse</code></Paragraph>
		</Column>

		<!-- Ring Loader -->
		<Column size="1" md="1-3" class="text-center mb-4">
			<div class="pa-loader-ring pa-loader-ring--lg" style="color: #ffc107;"></div>
			<Paragraph class="mt-2 text-secondary"><strong>Ring Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-ring</code></Paragraph>
		</Column>

		<!-- Wave Loader -->
		<Column size="1" md="1-3" class="text-center mb-4">
			<div class="pa-loader-wave pa-loader-wave--lg" style="color: #17a2b8;">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<Paragraph class="mt-2 text-secondary"><strong>Wave Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-wave</code></Paragraph>
		</Column>

		<!-- Spinner (existing) -->
		<Column size="1" md="1-3" class="text-center mb-4">
			<Spinner size="xl" class="text-secondary" />
			<Paragraph class="mt-2 text-secondary"><strong>Spinner (Default)</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-spinner</code></Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Usage Examples -->
<Card>
	{#snippet header()}
		<Heading level={3}>Usage Examples</Heading>
	{/snippet}

	<Heading level={4} class="mb-2">Basic Spinner</Heading>
	<pre class="mb-4"><code>&lt;div class="pa-spinner"&gt;&lt;/div&gt;</code></pre>

	<Heading level={4} class="mb-2">Sized Spinner</Heading>
	<pre class="mb-4"><code>&lt;div class="pa-spinner pa-spinner--lg"&gt;&lt;/div&gt;</code></pre>

	<Heading level={4} class="mb-2">Colored Spinner</Heading>
	<pre class="mb-4"><code>&lt;div class="pa-spinner pa-spinner--lg pa-spinner--primary"&gt;&lt;/div&gt;</code></pre>

	<Heading level={4} class="mb-2">Centered Loader with Overlay</Heading>
	<pre class="mb-4"><code>&lt;div class="pa-loader-overlay"&gt;
  &lt;div class="pa-spinner pa-spinner--xl"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>

	<Heading level={4} class="mb-2">Centered Loader with Text</Heading>
	<pre class="mb-4"><code>&lt;div class="pa-loader-center"&gt;
  &lt;div class="pa-spinner pa-spinner--lg"&gt;&lt;/div&gt;
  &lt;p class="mt-4"&gt;Loading...&lt;/p&gt;
&lt;/div&gt;</code></pre>

	<Heading level={4} class="mb-2">Dots Loader</Heading>
	<pre class="mb-4"><code>&lt;div class="pa-loader-dots"&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;</code></pre>

	<Heading level={4} class="mb-2">Bars Loader</Heading>
	<pre class="mb-4"><code>&lt;div class="pa-loader-bars"&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;</code></pre>

	<Heading level={4} class="mb-2">Pulse Loader</Heading>
	<pre class="mb-4"><code>&lt;div class="pa-loader-pulse"&gt;&lt;/div&gt;</code></pre>

	<Heading level={4} class="mb-2">Ring Loader</Heading>
	<pre class="mb-4"><code>&lt;div class="pa-loader-ring"&gt;&lt;/div&gt;</code></pre>

	<Heading level={4} class="mb-2">Wave Loader</Heading>
	<pre><code>&lt;div class="pa-loader-wave"&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;</code></pre>
</Card>
