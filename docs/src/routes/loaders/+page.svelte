<script lang="ts">
	import {
		Heading,
		Paragraph,
		Card,
		Grid,
		Column,
		Spinner,
		Loader,
		CodeBlock
	} from '@keenmate/svelte-pure-admin';
</script>

<!-- Spinner Sizes -->
<Card title="Spinner Sizes" class="mb-6">

	<Grid>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner size="xs" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--xs<br />0.75rem</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner size="sm" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--sm<br />1rem (default)</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner size="md" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--md<br />1.5rem</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner size="lg" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--lg<br />2rem</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner size="xl" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--xl<br />3rem</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner size="2xl" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--2xl<br />4rem</Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Spinner Colors -->
<Card title="Spinner Colors" class="mb-6">

	<Grid>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="primary" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--primary</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="secondary" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--secondary</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="success" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--success</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="danger" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--danger</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="warning" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--warning</Paragraph>
		</Column>
		<Column size="100" md="1-4" class="text-center mb-4">
			<Spinner size="lg" variant="info" />
			<Paragraph class="mt-2 text-secondary">.pa-spinner--info</Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Inline Spinners -->
<Card title="Inline Spinners" class="mb-6">

	<Paragraph class="mb-4">
		<Spinner size="xs" variant="primary" class="d-inline-block mr-2" />
		Loading inline content...
	</Paragraph>
	<Paragraph class="mb-4">
		<Spinner size="sm" variant="success" class="d-inline-block mr-2" />
		Processing your request...
	</Paragraph>
	<Paragraph>
		<Spinner size="sm" variant="info" class="d-inline-block mr-2" />
		Fetching data from server...
	</Paragraph>
</Card>

<!-- Centered Loaders -->
<Card title="Centered Loaders" class="mb-6">

	<div class="h-20x position-relative border border-dashed rounded">
		<div class="pa-loader-overlay">
			<Spinner size="xl" variant="primary" />
		</div>
	</div>
</Card>

<!-- Loader with Text -->
<Card title="Loaders with Text" class="mb-6">

	<Grid>
		<Column size="100" md="1-2" class="mb-4">
			<div class="pa-loader-center h-15x border border-dashed rounded">
				<Spinner size="lg" variant="primary" />
				<Paragraph class="mt-4 text-secondary">Loading data...</Paragraph>
			</div>
		</Column>
		<Column size="100" md="1-2" class="mb-4">
			<div class="pa-loader-center h-15x border border-dashed rounded">
				<Spinner size="lg" variant="success" />
				<Paragraph class="mt-4 text-secondary">Processing...</Paragraph>
			</div>
		</Column>
	</Grid>
</Card>

<!-- Card Loading State -->
<Card title="Card Loading States" class="mb-6">

	<Grid>
		<Column size="100" md="1-3" class="mb-4">
			<Card>
				{#snippet header()}
					<Heading level={4}>Loading Card</Heading>
				{/snippet}
				<div class="pa-card__body h-15x position-relative">
					<div class="pa-loader-overlay">
						<Spinner size="lg" variant="primary" />
					</div>
				</div>
			</Card>
		</Column>
		<Column size="100" md="1-3" class="mb-4">
			<Card>
				{#snippet header()}
					<Heading level={4}>Loading with Text</Heading>
				{/snippet}
				<div class="pa-card__body pa-loader-center h-15x">
					<Spinner size="lg" variant="info" />
					<Paragraph class="mt-4 text-secondary">Fetching data...</Paragraph>
				</div>
			</Card>
		</Column>
		<Column size="100" md="1-3" class="mb-4">
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
<Card title="Loader Types" class="mb-6">

	<Grid>
		<!-- Dots Loader -->
		<Column size="100" md="1-3" class="text-center mb-6">
			<Loader type="dots" size="lg" color="primary" />
			<Paragraph class="mt-2 text-secondary"><strong>Dots Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-dots</code></Paragraph>
		</Column>

		<!-- Bars Loader -->
		<Column size="100" md="1-3" class="text-center mb-6">
			<Loader type="bars" size="lg" color="success" />
			<Paragraph class="mt-2 text-secondary"><strong>Bars Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-bars</code></Paragraph>
		</Column>

		<!-- Pulse Loader -->
		<Column size="100" md="1-3" class="text-center mb-6">
			<Loader type="pulse" size="lg" color="danger" />
			<Paragraph class="mt-2 text-secondary"><strong>Pulse Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-pulse</code></Paragraph>
		</Column>

		<!-- Ring Loader -->
		<Column size="100" md="1-3" class="text-center mb-4">
			<Loader type="ring" size="lg" color="warning" />
			<Paragraph class="mt-2 text-secondary"><strong>Ring Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-ring</code></Paragraph>
		</Column>

		<!-- Wave Loader -->
		<Column size="100" md="1-3" class="text-center mb-4">
			<Loader type="wave" size="lg" color="info" />
			<Paragraph class="mt-2 text-secondary"><strong>Wave Loader</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-loader-wave</code></Paragraph>
		</Column>

		<!-- Spinner (existing) -->
		<Column size="100" md="1-3" class="text-center mb-4">
			<Spinner size="xl" class="text-secondary" />
			<Paragraph class="mt-2 text-secondary"><strong>Spinner (Default)</strong></Paragraph>
			<Paragraph class="mt-2"><code>.pa-spinner</code></Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Usage Examples -->
<Card title="Usage Examples">

	<Heading level={4} class="mb-2">Basic Spinner</Heading>
	<CodeBlock language="html" class="mb-4">&lt;div class="pa-spinner"&gt;&lt;/div&gt;</CodeBlock>

	<Heading level={4} class="mb-2">Sized Spinner</Heading>
	<CodeBlock language="html" class="mb-4">&lt;div class="pa-spinner pa-spinner--lg"&gt;&lt;/div&gt;</CodeBlock>

	<Heading level={4} class="mb-2">Colored Spinner</Heading>
	<CodeBlock language="html" class="mb-4">&lt;div class="pa-spinner pa-spinner--lg pa-spinner--primary"&gt;&lt;/div&gt;</CodeBlock>

	<Heading level={4} class="mb-2">Centered Loader with Overlay</Heading>
	<CodeBlock language="html" class="mb-4">&lt;div class="pa-loader-overlay"&gt;
  &lt;div class="pa-spinner pa-spinner--xl"&gt;&lt;/div&gt;
&lt;/div&gt;</CodeBlock>

	<Heading level={4} class="mb-2">Centered Loader with Text</Heading>
	<CodeBlock language="html" class="mb-4">&lt;div class="pa-loader-center"&gt;
  &lt;div class="pa-spinner pa-spinner--lg"&gt;&lt;/div&gt;
  &lt;p class="mt-4"&gt;Loading...&lt;/p&gt;
&lt;/div&gt;</CodeBlock>

	<Heading level={4} class="mb-2">Dots Loader</Heading>
	<CodeBlock language="html" class="mb-4">&lt;div class="pa-loader-dots"&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;</CodeBlock>

	<Heading level={4} class="mb-2">Bars Loader</Heading>
	<CodeBlock language="html" class="mb-4">&lt;div class="pa-loader-bars"&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;</CodeBlock>

	<Heading level={4} class="mb-2">Pulse Loader</Heading>
	<CodeBlock language="html" class="mb-4">&lt;div class="pa-loader-pulse"&gt;&lt;/div&gt;</CodeBlock>

	<Heading level={4} class="mb-2">Ring Loader</Heading>
	<CodeBlock language="html" class="mb-4">&lt;div class="pa-loader-ring"&gt;&lt;/div&gt;</CodeBlock>

	<Heading level={4} class="mb-2">Wave Loader</Heading>
	<CodeBlock language="html">&lt;div class="pa-loader-wave"&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
  &lt;span&gt;&lt;/span&gt;
&lt;/div&gt;</CodeBlock>
</Card>
