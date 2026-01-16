<script lang="ts">
	import { Heading, Paragraph, Card, Grid, Column, CodeBlock, Alert } from '@keenmate/svelte-pure-admin';
</script>

<!-- Full Width Layout -->
<Card title="Full Width Layout">
	<Grid>
		<Column size="100">
			<Alert variant="primary">Full width content block spanning the entire row</Alert>
		</Column>
	</Grid>
</Card>

<!-- Two Columns Layout -->
<Card title="Two Columns Layout (50/50)">
	<Grid>
		<Column size="100" md="50">
			<Alert variant="primary">Left Column</Alert>
		</Column>
		<Column size="100" md="50">
			<Alert variant="primary">Right Column</Alert>
		</Column>
	</Grid>
</Card>

<!-- Three Columns Layout -->
<Card title="Three Columns Layout (33/33/33)">
	<Grid>
		<Column size="100" md="1-3">
			<Alert variant="primary">Column 1</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert variant="primary">Column 2</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert variant="primary">Column 3</Alert>
		</Column>
	</Grid>
</Card>

<!-- Sidebar Layout -->
<Card title="Sidebar Layout (25/75)">
	<Grid>
		<Column size="100" md="25">
			<Alert variant="primary">Sidebar</Alert>
		</Column>
		<Column size="100" md="75">
			<Alert variant="primary">Main Content Area</Alert>
		</Column>
	</Grid>
</Card>

<!-- Asymmetric Layout -->
<Card title="Asymmetric Layout (67/33)">
	<Grid>
		<Column size="100" md="2-3">
			<Alert variant="primary">Main Content (2/3)</Alert>
		</Column>
		<Column size="100" md="1-3">
			<Alert variant="primary">Side Panel (1/3)</Alert>
		</Column>
	</Grid>
</Card>

<!-- Four Columns Layout -->
<Card title="Four Columns Layout (25/25/25/25)">
	<Grid>
		<Column size="100" md="25">
			<Alert variant="primary">Col 1</Alert>
		</Column>
		<Column size="100" md="25">
			<Alert variant="primary">Col 2</Alert>
		</Column>
		<Column size="100" md="25">
			<Alert variant="primary">Col 3</Alert>
		</Column>
		<Column size="100" md="25">
			<Alert variant="primary">Col 4</Alert>
		</Column>
	</Grid>
</Card>

<!-- Mixed Pattern -->
<Card title="Mixed Pattern (1-2-1-2-1)">
	<Grid>
		<Column size="100">
			<Alert variant="primary">Full Width Header</Alert>
		</Column>
		<Column size="100" md="50">
			<Alert variant="primary">Half Left</Alert>
		</Column>
		<Column size="100" md="50">
			<Alert variant="primary">Half Right</Alert>
		</Column>
		<Column size="100">
			<Alert variant="primary">Full Width Middle</Alert>
		</Column>
		<Column size="100" md="50">
			<Alert variant="primary">Half Left</Alert>
		</Column>
		<Column size="100" md="50">
			<Alert variant="primary">Half Right</Alert>
		</Column>
		<Column size="100">
			<Alert variant="primary">Full Width Footer</Alert>
		</Column>
	</Grid>
</Card>

<!-- Complex Nested Layout -->
<Card title="Complex Nested Layout">
	<Grid>
		<Column size="100" md="2-3">
			<Grid>
				<Column size="100" md="50">
					<Alert variant="primary">Nested 1</Alert>
				</Column>
				<Column size="100" md="50">
					<Alert variant="primary">Nested 2</Alert>
				</Column>
				<Column size="100">
					<Alert variant="primary">Nested Full</Alert>
				</Column>
			</Grid>
		</Column>
		<Column size="100" md="1-3">
			<Alert variant="primary">Sidebar Content</Alert>
		</Column>
	</Grid>
</Card>

<!-- Card Layout Demonstrations -->
<Heading level={3}>Card Layout Patterns</Heading>
<Paragraph>Various arrangements of cards using responsive grid layouts.</Paragraph>

<!-- Full Width Card -->
<Heading level={4}>Full Width Card</Heading>
<Grid>
	<Column size="100">
		<Card title="Full Width Card">
			<p>This card spans the entire width of the container.</p>
		</Card>
	</Column>
</Grid>

<!-- Two Column Cards -->
<Heading level={4}>Two Column Cards (50/50)</Heading>
<Grid sameHeight>
	<Column size="100" md="50">
		<Card title="Left Card">
			<p>Half width card on the left side.</p>
		</Card>
	</Column>
	<Column size="100" md="50">
		<Card title="Right Card">
			<p>Half width card on the right side.</p>
		</Card>
	</Column>
</Grid>

<!-- Three Column Cards -->
<Heading level={4}>Three Column Cards (33/33/33)</Heading>
<Grid sameHeight>
	<Column size="100" md="1-3">
		<Card title="Card 1">
			<p>First of three equal cards.</p>
		</Card>
	</Column>
	<Column size="100" md="1-3">
		<Card title="Card 2">
			<p>Second of three equal cards.</p>
		</Card>
	</Column>
	<Column size="100" md="1-3">
		<Card title="Card 3">
			<p>Third of three equal cards.</p>
		</Card>
	</Column>
</Grid>

<!-- Sidebar + Main Cards -->
<Heading level={4}>Sidebar + Main Cards (25/75)</Heading>
<Grid sameHeight>
	<Column size="100" md="25">
		<Card title="Sidebar Card">
			<p>Narrow sidebar card for navigation or quick info.</p>
		</Card>
	</Column>
	<Column size="100" md="75">
		<Card title="Main Content Card">
			<p>Wide main content card taking up most of the space.</p>
		</Card>
	</Column>
</Grid>

<!-- Four Column Cards -->
<Heading level={4}>Four Column Cards (25/25/25/25)</Heading>
<Grid sameHeight>
	<Column size="100" md="25">
		<Card title="Card A">
			<p>Quarter width card.</p>
		</Card>
	</Column>
	<Column size="100" md="25">
		<Card title="Card B">
			<p>Quarter width card.</p>
		</Card>
	</Column>
	<Column size="100" md="25">
		<Card title="Card C">
			<p>Quarter width card.</p>
		</Card>
	</Column>
	<Column size="100" md="25">
		<Card title="Card D">
			<p>Quarter width card.</p>
		</Card>
	</Column>
</Grid>

<!-- Asymmetric Cards -->
<Heading level={4}>Asymmetric Cards (67/33)</Heading>
<Grid sameHeight>
	<Column size="100" md="2-3">
		<Card title="Main Content Card">
			<p>Larger card taking up 2/3 of the space for main content.</p>
		</Card>
	</Column>
	<Column size="100" md="1-3">
		<Card title="Side Panel Card">
			<p>Smaller card for supplementary content.</p>
		</Card>
	</Column>
</Grid>

<!-- Code Examples -->
<Card title="Code Examples" class="mt-6">
	<Grid>
		<Column size="100" md="50">
			<h4 class="mb-2">Common Layout Patterns</h4>
			<CodeBlock>{`<!-- Two Column (50/50) -->
<Grid>
  <Column size="100" md="50">Left</Column>
  <Column size="100" md="50">Right</Column>
</Grid>

<!-- Three Column (33/33/33) -->
<Grid>
  <Column size="100" md="1-3">Col 1</Column>
  <Column size="100" md="1-3">Col 2</Column>
  <Column size="100" md="1-3">Col 3</Column>
</Grid>

<!-- Sidebar Layout (25/75) -->
<Grid>
  <Column size="100" md="25">Sidebar</Column>
  <Column size="100" md="75">Main</Column>
</Grid>`}</CodeBlock>
		</Column>
		<Column size="100" md="50">
			<h4 class="mb-2">Cards in Grid</h4>
			<CodeBlock>{`<!-- Same height cards in grid -->
<Grid sameHeight>
  <Column size="100" md="1-3">
    <Card title="Card 1">
      <p>Short content</p>
    </Card>
  </Column>
  <Column size="100" md="1-3">
    <Card title="Card 2">
      <p>Longer content stretches,
         and sibling cards match height.</p>
    </Card>
  </Column>
  <Column size="100" md="1-3">
    <Card title="Card 3">
      <p>Also matches height</p>
    </Card>
  </Column>
</Grid>`}</CodeBlock>
		</Column>
	</Grid>

	<h4 class="mb-2 mt-4">Nested Grids</h4>
	<CodeBlock>{`<!-- Nested layout with sidebar -->
<Grid>
  <Column size="100" md="2-3">
    <!-- Nested grid inside main area -->
    <Grid>
      <Column size="100" md="50">Nested Left</Column>
      <Column size="100" md="50">Nested Right</Column>
    </Grid>
  </Column>
  <Column size="100" md="1-3">
    <Card title="Sidebar">Content</Card>
  </Column>
</Grid>`}</CodeBlock>
</Card>
