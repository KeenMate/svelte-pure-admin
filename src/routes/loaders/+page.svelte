<script lang="ts">
	import { Card, Grid, Column, Spinner } from '$lib';
</script>

<svelte:head>
	<title>Loaders - Pure Admin Svelte</title>
</svelte:head>

<h1>Loaders</h1>
<p>Loading spinners and animations for asynchronous content.</p>

<!-- NOTE: Some loader types use raw HTML as components don't exist yet -->

<!-- Spinner Sizes -->
<Card class="mb-6">
	{#snippet header()}
		<h3>Spinner Sizes</h3>
	{/snippet}

	<Grid>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="xs" />
			<p class="mt-2 text-secondary">.pa-spinner--xs<br />0.75rem</p>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="sm" />
			<p class="mt-2 text-secondary">.pa-spinner--sm<br />1rem (default)</p>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="md" />
			<p class="mt-2 text-secondary">.pa-spinner--md<br />1.5rem</p>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="lg" />
			<p class="mt-2 text-secondary">.pa-spinner--lg<br />2rem</p>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="xl" />
			<p class="mt-2 text-secondary">.pa-spinner--xl<br />3rem</p>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="2xl" />
			<p class="mt-2 text-secondary">.pa-spinner--2xl<br />4rem</p>
		</Column>
	</Grid>
</Card>

<!-- Spinner Colors -->
<Card class="mb-6">
	{#snippet header()}
		<h3>Spinner Colors</h3>
	{/snippet}

	<Grid>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="primary" />
			<p class="mt-2 text-secondary">.pa-spinner--primary</p>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="secondary" />
			<p class="mt-2 text-secondary">.pa-spinner--secondary</p>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="success" />
			<p class="mt-2 text-secondary">.pa-spinner--success</p>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="danger" />
			<p class="mt-2 text-secondary">.pa-spinner--danger</p>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="warning" />
			<p class="mt-2 text-secondary">.pa-spinner--warning</p>
		</Column>
		<Column size="1" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="info" />
			<p class="mt-2 text-secondary">.pa-spinner--info</p>
		</Column>
	</Grid>
</Card>

<!-- Inline Spinners -->
<Card class="mb-6">
	{#snippet header()}
		<h3>Inline Spinners</h3>
	{/snippet}

	<p class="mb-4">
		<span
			class="pa-spinner pa-spinner--xs pa-spinner--primary"
			style="display: inline-block; vertical-align: middle; margin-right: 0.5rem;"
		></span>
		Loading inline content...
	</p>
	<p class="mb-4">
		<span
			class="pa-spinner pa-spinner--sm pa-spinner--success"
			style="display: inline-block; vertical-align: middle; margin-right: 0.5rem;"
		></span>
		Processing your request...
	</p>
	<p>
		<span
			class="pa-spinner pa-spinner--sm pa-spinner--info"
			style="display: inline-block; vertical-align: middle; margin-right: 0.5rem;"
		></span>
		Fetching data from server...
	</p>
</Card>

<!-- Centered Loaders -->
<Card class="mb-6">
	{#snippet header()}
		<h3>Centered Loaders</h3>
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
		<h3>Loaders with Text</h3>
	{/snippet}

	<Grid>
		<Column size="1" md="1-2" class="mb-4">
			<div
				class="pa-loader-center"
				style="height: 150px; border: 1px dashed #ddd; border-radius: 4px;"
			>
				<Spinner size="lg" variant="primary" />
				<p class="mt-4 text-secondary">Loading data...</p>
			</div>
		</Column>
		<Column size="1" md="1-2" class="mb-4">
			<div
				class="pa-loader-center"
				style="height: 150px; border: 1px dashed #ddd; border-radius: 4px;"
			>
				<Spinner size="lg" variant="success" />
				<p class="mt-4 text-secondary">Processing...</p>
			</div>
		</Column>
	</Grid>
</Card>

<!-- Card Loading State -->
<Card class="mb-6">
	{#snippet header()}
		<h3>Card Loading States</h3>
	{/snippet}

	<Grid>
		<Column size="1" md="1-3" class="mb-4">
			<Card>
				{#snippet header()}
					<h4>Loading Card</h4>
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
					<h4>Loading with Text</h4>
				{/snippet}
				<div class="pa-card__body pa-loader-center" style="height: 150px;">
					<Spinner size="lg" variant="info" />
					<p class="mt-4 text-secondary">Fetching data...</p>
				</div>
			</Card>
		</Column>
		<Column size="1" md="1-3" class="mb-4">
			<Card>
				{#snippet header()}
					<h4>Loaded Content</h4>
				{/snippet}
				<p>Content has loaded successfully!</p>
				<p class="mt-2">This is what appears after the loader completes.</p>
			</Card>
		</Column>
	</Grid>
</Card>

<!-- Loader Types -->
<!-- NOTE: Using raw HTML for loader variants not yet componentized -->
<Card class="mb-6">
	{#snippet header()}
		<h3>Loader Types</h3>
	{/snippet}

	<Grid>
		<!-- Dots Loader -->
		<Column size="1" md="1-3" class="text-center mb-6">
			<div class="pa-loader-dots pa-loader-dots--lg" style="color: #007bff;">
				<span></span>
				<span></span>
				<span></span>
			</div>
			<p class="mt-2 text-secondary"><strong>Dots Loader</strong></p>
			<p class="mt-2"><code>.pa-loader-dots</code></p>
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
			<p class="mt-2 text-secondary"><strong>Bars Loader</strong></p>
			<p class="mt-2"><code>.pa-loader-bars</code></p>
		</Column>

		<!-- Pulse Loader -->
		<Column size="1" md="1-3" class="text-center mb-6">
			<div class="pa-loader-pulse pa-loader-pulse--lg" style="color: #dc3545;"></div>
			<p class="mt-2 text-secondary"><strong>Pulse Loader</strong></p>
			<p class="mt-2"><code>.pa-loader-pulse</code></p>
		</Column>

		<!-- Ring Loader -->
		<Column size="1" md="1-3" class="text-center mb-4">
			<div class="pa-loader-ring pa-loader-ring--lg" style="color: #ffc107;"></div>
			<p class="mt-2 text-secondary"><strong>Ring Loader</strong></p>
			<p class="mt-2"><code>.pa-loader-ring</code></p>
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
			<p class="mt-2 text-secondary"><strong>Wave Loader</strong></p>
			<p class="mt-2"><code>.pa-loader-wave</code></p>
		</Column>

		<!-- Spinner (existing) -->
		<Column size="1" md="1-3" class="text-center mb-4">
			<Spinner size="xl" class="text-secondary" />
			<p class="mt-2 text-secondary"><strong>Spinner (Default)</strong></p>
			<p class="mt-2"><code>.pa-spinner</code></p>
		</Column>
	</Grid>
</Card>

<!-- Usage Examples -->
<Card>
	{#snippet header()}
		<h3>Usage Examples</h3>
	{/snippet}

	<h4 class="mb-2">Basic Spinner</h4>
	<pre class="mb-4"><code>&lt;div class="pa-spinner"&gt;&lt;/div&gt;</code></pre>

	<h4 class="mb-2">Sized Spinner</h4>
	<pre class="mb-4"><code>&lt;div class="pa-spinner pa-spinner--lg"&gt;&lt;/div&gt;</code></pre>

	<h4 class="mb-2">Colored Spinner</h4>
	<pre class="mb-4"><code>&lt;div class="pa-spinner pa-spinner--lg pa-spinner--primary"&gt;&lt;/div&gt;</code></pre>

	<h4 class="mb-2">Centered Loader with Overlay</h4>
	<pre class="mb-4"><code>&lt;div class="pa-loader-overlay"&gt;
  &lt;div class="pa-spinner pa-spinner--xl"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>

	<h4 class="mb-2">Centered Loader with Text</h4>
	<pre class="mb-4"><code>&lt;div class="pa-loader-center"&gt;
  &lt;div class="pa-spinner pa-spinner--lg"&gt;&lt;/div&gt;
  &lt;p class="mt-4"&gt;Loading...&lt;/p&gt;
&lt;/div&gt;</code></pre>

	<h4 class="mb-2">Dots Loader</h4>
	<pre class="mb-4"><code>&lt;div class="pa-loader-dots"&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;</code></pre>

	<h4 class="mb-2">Bars Loader</h4>
	<pre class="mb-4"><code>&lt;div class="pa-loader-bars"&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;</code></pre>

	<h4 class="mb-2">Pulse Loader</h4>
	<pre class="mb-4"><code>&lt;div class="pa-loader-pulse"&gt;&lt;/div&gt;</code></pre>

	<h4 class="mb-2">Ring Loader</h4>
	<pre class="mb-4"><code>&lt;div class="pa-loader-ring"&gt;&lt;/div&gt;</code></pre>

	<h4 class="mb-2">Wave Loader</h4>
	<pre><code>&lt;div class="pa-loader-wave"&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;</code></pre>
</Card>
