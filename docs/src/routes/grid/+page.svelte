<script lang="ts">
	import { Heading, Paragraph, Card, Grid, Column, Alert, Table, Code, CodeBlock } from '@keenmate/svelte-pure-admin';
</script>

<!-- Overview -->
<Card title="Overview">
	<Paragraph class="pa-text--secondary mb-4">
		Pure Admin uses a custom flexbox grid system with intuitive naming. Columns use <Code>pa-col-&#123;size&#125;</Code> for percentages
		and <Code>pa-col-&#123;x&#125;-&#123;y&#125;</Code> for fractions.
	</Paragraph>

	<Grid>
		<Column size="100" md="50">
			<h4>Key Features</h4>
			<ul style="line-height: 1.8;">
				<li><strong>Gutter:</strong> 0.8rem (8px) per side, 1.6rem (16px) total gap</li>
				<li><strong>Percentage columns:</strong> 5% increments (5, 10, 15... 100)</li>
				<li><strong>Fraction columns:</strong> Halves, thirds, quarters, fifths, sixths, twelfths</li>
				<li><strong>Responsive:</strong> All columns have breakpoint variants</li>
				<li><strong>Offsets:</strong> Left margin in 5% increments</li>
			</ul>
		</Column>
		<Column size="100" md="50">
			<h4>Breakpoints</h4>
			<Table striped>
				<thead>
					<tr>
						<th>Prefix</th>
						<th>Min Width</th>
						<th>Example</th>
					</tr>
				</thead>
				<tbody>
					<tr><td><Code>sm</Code></td><td>576px</td><td><Code>pa-col-sm-50</Code></td></tr>
					<tr><td><Code>md</Code></td><td>768px</td><td><Code>pa-col-md-50</Code></td></tr>
					<tr><td><Code>lg</Code></td><td>992px</td><td><Code>pa-col-lg-50</Code></td></tr>
					<tr><td><Code>xl</Code></td><td>1200px</td><td><Code>pa-col-xl-50</Code></td></tr>
				</tbody>
			</Table>
		</Column>
	</Grid>
</Card>

<!-- Basic Usage -->
<Card title="Basic Usage" subtitle="Auto-equal width columns with .pa-col">
	<h4>Two Equal Columns</h4>
	<Grid class="mb-4">
		<div class="pa-col">
			<Alert variant="primary">.pa-col</Alert>
		</div>
		<div class="pa-col">
			<Alert variant="primary">.pa-col</Alert>
		</div>
	</Grid>

	<h4>Three Equal Columns</h4>
	<Grid class="mb-4">
		<div class="pa-col">
			<Alert variant="primary">.pa-col</Alert>
		</div>
		<div class="pa-col">
			<Alert variant="primary">.pa-col</Alert>
		</div>
		<div class="pa-col">
			<Alert variant="primary">.pa-col</Alert>
		</div>
	</Grid>

	<h4>Four Equal Columns</h4>
	<Grid class="mb-4">
		<div class="pa-col">
			<Alert variant="primary">.pa-col</Alert>
		</div>
		<div class="pa-col">
			<Alert variant="primary">.pa-col</Alert>
		</div>
		<div class="pa-col">
			<Alert variant="primary">.pa-col</Alert>
		</div>
		<div class="pa-col">
			<Alert variant="primary">.pa-col</Alert>
		</div>
	</Grid>

	<h4>Auto Width Column</h4>
	<Grid>
		<div class="pa-col">
			<Alert variant="primary">.pa-col (fills remaining)</Alert>
		</div>
		<Column size="auto">
			<Alert variant="primary">.pa-col-auto (content width)</Alert>
		</Column>
	</Grid>
</Card>

<!-- Percentage Columns -->
<Card title="Percentage Columns" subtitle="Fixed widths in 5% increments: .pa-col-5 through .pa-col-100">
	<Grid class="mb-2">
		<Column size="25"><Alert variant="primary">.pa-col-25</Alert></Column>
		<Column size="75"><Alert variant="primary">.pa-col-75</Alert></Column>
	</Grid>
	<Grid class="mb-2">
		<Column size="1-3"><Alert variant="primary">.pa-col-1-3</Alert></Column>
		<Column size="2-3"><Alert variant="primary">.pa-col-2-3</Alert></Column>
	</Grid>
	<Grid class="mb-2">
		<Column size="50"><Alert variant="primary">.pa-col-50</Alert></Column>
		<Column size="50"><Alert variant="primary">.pa-col-50</Alert></Column>
	</Grid>
	<Grid class="mb-2">
		<Column size="40"><Alert variant="primary">.pa-col-40</Alert></Column>
		<Column size="60"><Alert variant="primary">.pa-col-60</Alert></Column>
	</Grid>
	<Grid class="mb-2">
		<Column size="20"><Alert variant="primary">20</Alert></Column>
		<Column size="20"><Alert variant="primary">20</Alert></Column>
		<Column size="20"><Alert variant="primary">20</Alert></Column>
		<Column size="20"><Alert variant="primary">20</Alert></Column>
		<Column size="20"><Alert variant="primary">20</Alert></Column>
	</Grid>
	<Grid>
		<Column size="100"><Alert variant="primary">.pa-col-100 (full width)</Alert></Column>
	</Grid>

	<Alert variant="info" class="mt-4">
		<strong>Available percentages:</strong> 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100
	</Alert>
</Card>

<!-- Fraction Columns -->
<Card title="Fraction Columns" subtitle="Intuitive naming for common layouts: .pa-col-1-3, .pa-col-2-3, etc.">
	<h4>Halves (1/2)</h4>
	<Grid class="mb-4">
		<Column size="1-2"><Alert variant="primary">.pa-col-1-2 (50%)</Alert></Column>
		<Column size="1-2"><Alert variant="primary">.pa-col-1-2 (50%)</Alert></Column>
	</Grid>

	<h4>Thirds (1/3, 2/3)</h4>
	<Grid class="mb-2">
		<Column size="1-3"><Alert variant="primary">.pa-col-1-3 (33.3%)</Alert></Column>
		<Column size="2-3"><Alert variant="primary">.pa-col-2-3 (66.7%)</Alert></Column>
	</Grid>
	<Grid class="mb-4">
		<Column size="1-3"><Alert variant="primary">1/3</Alert></Column>
		<Column size="1-3"><Alert variant="primary">1/3</Alert></Column>
		<Column size="1-3"><Alert variant="primary">1/3</Alert></Column>
	</Grid>

	<h4>Quarters (1/4, 3/4)</h4>
	<Grid class="mb-2">
		<Column size="1-4"><Alert variant="primary">.pa-col-1-4 (25%)</Alert></Column>
		<Column size="3-4"><Alert variant="primary">.pa-col-3-4 (75%)</Alert></Column>
	</Grid>
	<Grid class="mb-4">
		<Column size="1-4"><Alert variant="primary">1/4</Alert></Column>
		<Column size="1-4"><Alert variant="primary">1/4</Alert></Column>
		<Column size="1-4"><Alert variant="primary">1/4</Alert></Column>
		<Column size="1-4"><Alert variant="primary">1/4</Alert></Column>
	</Grid>

	<h4>Fifths (1/5, 2/5, 3/5, 4/5)</h4>
	<Grid class="mb-2">
		<Column size="1-5"><Alert variant="primary">1/5</Alert></Column>
		<Column size="4-5"><Alert variant="primary">4/5</Alert></Column>
	</Grid>
	<Grid class="mb-4">
		<Column size="2-5"><Alert variant="primary">2/5</Alert></Column>
		<Column size="3-5"><Alert variant="primary">3/5</Alert></Column>
	</Grid>

	<h4>Sixths (1/6, 5/6)</h4>
	<Grid class="mb-2">
		<Column size="1-6"><Alert variant="primary">1/6</Alert></Column>
		<Column size="5-6"><Alert variant="primary">5/6</Alert></Column>
	</Grid>
	<Grid class="mb-4">
		<Column size="1-6"><Alert variant="primary">1/6</Alert></Column>
		<Column size="1-6"><Alert variant="primary">1/6</Alert></Column>
		<Column size="1-6"><Alert variant="primary">1/6</Alert></Column>
		<Column size="1-6"><Alert variant="primary">1/6</Alert></Column>
		<Column size="1-6"><Alert variant="primary">1/6</Alert></Column>
		<Column size="1-6"><Alert variant="primary">1/6</Alert></Column>
	</Grid>

	<h4>Twelfths (1/12, 5/12, 7/12, 11/12)</h4>
	<Grid class="mb-2">
		<Column size="1-12"><Alert variant="primary">1/12</Alert></Column>
		<Column size="11-12"><Alert variant="primary">11/12</Alert></Column>
	</Grid>
	<Grid>
		<Column size="5-12"><Alert variant="primary">5/12</Alert></Column>
		<Column size="7-12"><Alert variant="primary">7/12</Alert></Column>
	</Grid>
</Card>

<!-- Responsive Grid -->
<Card title="Responsive Grid" subtitle="Stack on mobile, columns on larger screens. Resize your browser to see the effect.">
	<h4>Mobile-First Pattern</h4>
	<Paragraph class="pa-text--secondary mb-2">Full width on mobile, 50% on medium screens and up:</Paragraph>
	<Grid class="mb-4">
		<Column size="100" md="50"><Alert variant="primary">.pa-col-100 .pa-col-md-50</Alert></Column>
		<Column size="100" md="50"><Alert variant="primary">.pa-col-100 .pa-col-md-50</Alert></Column>
	</Grid>

	<h4>Progressive Columns</h4>
	<Paragraph class="pa-text--secondary mb-2">Different layouts at each breakpoint:</Paragraph>
	<Grid class="mb-4">
		<Column size="100" sm="50" lg="25">
			<Alert variant="primary">100% → 50% → 25%</Alert>
		</Column>
		<Column size="100" sm="50" lg="25">
			<Alert variant="primary">100% → 50% → 25%</Alert>
		</Column>
		<Column size="100" sm="50" lg="25">
			<Alert variant="primary">100% → 50% → 25%</Alert>
		</Column>
		<Column size="100" sm="50" lg="25">
			<Alert variant="primary">100% → 50% → 25%</Alert>
		</Column>
	</Grid>

	<h4>Responsive Fractions</h4>
	<Paragraph class="pa-text--secondary mb-2">Fractions also support breakpoints:</Paragraph>
	<Grid>
		<Column size="100" md="1-3"><Alert variant="primary">.pa-col-100 .pa-col-md-1-3</Alert></Column>
		<Column size="100" md="2-3"><Alert variant="primary">.pa-col-100 .pa-col-md-2-3</Alert></Column>
	</Grid>
</Card>

<!-- Offsets -->
<Card title="Offsets" subtitle={`Push columns with left margin: .pa-offset-{size}`}>
	<h4>Centering with Offsets</h4>
	<Grid class="mb-2">
		<Column size="50" offset="25"><Alert variant="primary">.pa-col-50 .pa-offset-25</Alert></Column>
	</Grid>
	<Grid class="mb-4">
		<Column size="1-3" class="pa-offset-33"><Alert variant="primary">.pa-col-1-3 .pa-offset-33</Alert></Column>
	</Grid>

	<h4>Asymmetric Layouts</h4>
	<Grid class="mb-2">
		<Column size="30" offset="10"><Alert variant="primary">.pa-col-30 .pa-offset-10</Alert></Column>
		<Column size="40" offset="10"><Alert variant="primary">.pa-col-40 .pa-offset-10</Alert></Column>
	</Grid>

	<h4>Responsive Offsets</h4>
	<Grid>
		<Column size="100" md="50" offsetMd="25">
			<Alert variant="primary">.pa-col-100 .pa-col-md-50 .pa-offset-md-25<br><small>Full width mobile, centered on desktop</small></Alert>
		</Column>
	</Grid>
</Card>

<!-- Row Alignment -->
<Card title="Row Alignment" subtitle="Control horizontal and vertical alignment of columns">
	<h4>Horizontal Alignment</h4>

	<Paragraph class="pa-text--secondary mb-2"><Code>.pa-row--center</Code></Paragraph>
	<Grid justify="center" class="mb-2" style="background: var(--base-primary-bg);">
		<Column size="30"><Alert variant="primary">Centered</Alert></Column>
	</Grid>

	<Paragraph class="pa-text--secondary mb-2"><Code>.pa-row--end</Code></Paragraph>
	<Grid justify="end" class="mb-2" style="background: var(--base-primary-bg);">
		<Column size="30"><Alert variant="primary">Right aligned</Alert></Column>
	</Grid>

	<Paragraph class="pa-text--secondary mb-2"><Code>.pa-row--between</Code></Paragraph>
	<Grid justify="between" class="mb-2" style="background: var(--base-primary-bg);">
		<Column size="20"><Alert variant="primary">Left</Alert></Column>
		<Column size="20"><Alert variant="primary">Right</Alert></Column>
	</Grid>

	<Paragraph class="pa-text--secondary mb-2"><Code>.pa-row--around</Code></Paragraph>
	<Grid justify="around" class="mb-4" style="background: var(--base-primary-bg);">
		<Column size="20"><Alert variant="primary">A</Alert></Column>
		<Column size="20"><Alert variant="primary">B</Alert></Column>
		<Column size="20"><Alert variant="primary">C</Alert></Column>
	</Grid>

	<h4>Vertical Alignment</h4>
	<Grid>
		<Column size="100" md="1-3">
			<Paragraph class="pa-text--secondary mb-2"><Code>.pa-row--top</Code></Paragraph>
			<Grid align="top" style="background: var(--base-primary-bg); min-height: 100px;">
				<div class="pa-col"><Alert variant="primary">Top</Alert></div>
				<div class="pa-col"><Alert variant="primary">Top</Alert></div>
			</Grid>
		</Column>
		<Column size="100" md="1-3">
			<Paragraph class="pa-text--secondary mb-2"><Code>.pa-row--middle</Code></Paragraph>
			<Grid align="middle" style="background: var(--base-primary-bg); min-height: 100px;">
				<div class="pa-col"><Alert variant="primary">Middle</Alert></div>
				<div class="pa-col"><Alert variant="primary">Middle</Alert></div>
			</Grid>
		</Column>
		<Column size="100" md="1-3">
			<Paragraph class="pa-text--secondary mb-2"><Code>.pa-row--bottom</Code></Paragraph>
			<Grid align="bottom" style="background: var(--base-primary-bg); min-height: 100px;">
				<div class="pa-col"><Alert variant="primary">Bottom</Alert></div>
				<div class="pa-col"><Alert variant="primary">Bottom</Alert></div>
			</Grid>
		</Column>
	</Grid>
</Card>

<!-- No Gutter -->
<Card title="No Gutter" subtitle="Remove spacing between columns with .pa-row--no-gutter">
	<h4>Default (with gutter)</h4>
	<Grid class="mb-4">
		<Column size="1-3"><Alert variant="primary">1/3</Alert></Column>
		<Column size="1-3"><Alert variant="primary">1/3</Alert></Column>
		<Column size="1-3"><Alert variant="primary">1/3</Alert></Column>
	</Grid>

	<h4>No Gutter</h4>
	<Grid noGutter>
		<Column size="1-3"><Alert variant="primary">1/3</Alert></Column>
		<Column size="1-3"><Alert variant="primary">1/3</Alert></Column>
		<Column size="1-3"><Alert variant="primary">1/3</Alert></Column>
	</Grid>
</Card>

<!-- Visibility Utilities -->
<Card title="Visibility Utilities" subtitle="Show/hide elements at different breakpoints">
	<Table striped class="mb-4">
		<thead>
			<tr>
				<th>Class</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr><td><Code>.pa-hide</Code></td><td>Always hidden</td></tr>
			<tr><td><Code>.pa-show</Code></td><td>Always visible</td></tr>
			<tr><td><Code>.pa-hide-&#123;bp&#125;</Code></td><td>Hidden at breakpoint and up</td></tr>
			<tr><td><Code>.pa-show-&#123;bp&#125;</Code></td><td>Visible at breakpoint and up</td></tr>
			<tr><td><Code>.pa-hide-below-&#123;bp&#125;</Code></td><td>Hidden below breakpoint</td></tr>
			<tr><td><Code>.pa-show-below-&#123;bp&#125;</Code></td><td>Visible below breakpoint</td></tr>
		</tbody>
	</Table>

	<h4>Live Demo (resize browser)</h4>
	<Grid>
		<div class="pa-col">
			<Alert variant="danger" class="pa-hide-md">
				<strong>Mobile Only</strong><br>.pa-hide-md
			</Alert>
			<Alert variant="success" class="pa-hide-below-md">
				<strong>Desktop Only</strong><br>.pa-hide-below-md
			</Alert>
		</div>
	</Grid>
</Card>

<!-- Nested Grids -->
<Card title="Nested Grids" subtitle="Grids can be nested inside columns">
	<Grid>
		<Column size="1-3">
			<Alert variant="primary">1/3</Alert>
		</Column>
		<Column size="2-3">
			<Alert variant="info">
				<Paragraph class="pa-text--secondary mb-2">Nested grid inside 2/3 column:</Paragraph>
				<Grid>
					<Column size="1-2"><Alert variant="secondary">Nested 1/2</Alert></Column>
					<Column size="1-2"><Alert variant="secondary">Nested 1/2</Alert></Column>
				</Grid>
			</Alert>
		</Column>
	</Grid>
</Card>

<!-- Quick Reference -->
<Card title="Quick Reference">
	<Grid>
		<Column size="100" md="50">
			<h4>Percentage Classes</h4>
			<Paragraph class="pa-text--secondary">
				<Code>.pa-col-5</Code> <Code>.pa-col-10</Code> <Code>.pa-col-15</Code> <Code>.pa-col-20</Code> <Code>.pa-col-25</Code><br>
				<Code>.pa-col-30</Code> <Code>.pa-col-35</Code> <Code>.pa-col-40</Code> <Code>.pa-col-45</Code> <Code>.pa-col-50</Code><br>
				<Code>.pa-col-55</Code> <Code>.pa-col-60</Code> <Code>.pa-col-65</Code> <Code>.pa-col-70</Code> <Code>.pa-col-75</Code><br>
				<Code>.pa-col-80</Code> <Code>.pa-col-85</Code> <Code>.pa-col-90</Code> <Code>.pa-col-95</Code> <Code>.pa-col-100</Code>
			</Paragraph>
		</Column>
		<Column size="100" md="50">
			<h4>Fraction Classes</h4>
			<Paragraph class="pa-text--secondary">
				<Code>.pa-col-1-2</Code><br>
				<Code>.pa-col-1-3</Code> <Code>.pa-col-2-3</Code><br>
				<Code>.pa-col-1-4</Code> <Code>.pa-col-3-4</Code><br>
				<Code>.pa-col-1-5</Code> <Code>.pa-col-2-5</Code> <Code>.pa-col-3-5</Code> <Code>.pa-col-4-5</Code><br>
				<Code>.pa-col-1-6</Code> <Code>.pa-col-5-6</Code><br>
				<Code>.pa-col-1-12</Code> <Code>.pa-col-5-12</Code> <Code>.pa-col-7-12</Code> <Code>.pa-col-11-12</Code>
			</Paragraph>
		</Column>
	</Grid>
</Card>

<!-- Code Examples -->
<Card title="Code Examples">
	<Grid>
		<Column size="100" md="50">
			<h4 class="mb-2">Basic Grid</h4>
			<CodeBlock>{`<Grid>
  <Column size="50">Left half</Column>
  <Column size="50">Right half</Column>
</Grid>

<!-- Thirds -->
<Grid>
  <Column size="1-3">One third</Column>
  <Column size="2-3">Two thirds</Column>
</Grid>`}</CodeBlock>
		</Column>
		<Column size="100" md="50">
			<h4 class="mb-2">Responsive Grid</h4>
			<CodeBlock>{`<!-- Stack on mobile, columns on desktop -->
<Grid>
  <Column size="100" md="50">
    Full on mobile, half on desktop
  </Column>
  <Column size="100" md="50">
    Full on mobile, half on desktop
  </Column>
</Grid>

<!-- Progressive breakpoints -->
<Column size="100" sm="50" lg="25">
  100% → 50% → 25%
</Column>`}</CodeBlock>
		</Column>
	</Grid>

	<Grid class="mt-4">
		<Column size="100" md="50">
			<h4 class="mb-2">Grid Props</h4>
			<CodeBlock>{`<!-- Alignment -->
<Grid justify="center">...</Grid>
<Grid justify="between">...</Grid>
<Grid align="middle">...</Grid>

<!-- Same height columns -->
<Grid sameHeight>...</Grid>

<!-- No gutter -->
<Grid noGutter>...</Grid>`}</CodeBlock>
		</Column>
		<Column size="100" md="50">
			<h4 class="mb-2">Column Props</h4>
			<CodeBlock>{`<!-- Sizes (percentage or fraction) -->
<Column size="50">Half</Column>
<Column size="1-3">One third</Column>

<!-- Responsive -->
<Column size="100" md="50" lg="25">
  Mobile → Tablet → Desktop
</Column>

<!-- Offset -->
<Column size="50" offset="25">
  Centered 50%
</Column>`}</CodeBlock>
		</Column>
	</Grid>
</Card>
