<script lang="ts">
	import Heading from '$lib/typography/Heading.svelte';
	import Paragraph from '$lib/typography/Paragraph.svelte';
	import { Card, Table } from '$lib';
</script>

<svelte:head>
	<title>Table Sizing - Pure Admin Svelte</title>
</svelte:head>

<Heading level={1}>Table Sizing</Heading>
<Paragraph>Different table density options for various use cases - from compact data grids to spacious presentation tables.</Paragraph>

<!-- Default (Compact) Table -->
<Card>
	{#snippet header()}
		<Heading level={3}>Default (Compact) - ~31px rows</Heading>
	{/snippet}

	<Paragraph>Best for data-heavy tables where you need to scan hundreds of rows efficiently.</Paragraph>
	<div class="pa-table-container">
		<Table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Position</th>
					<th>Office</th>
					<th>Age</th>
					<th>Start date</th>
					<th>Salary</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Tiger Nixon</td>
					<td>System Architect</td>
					<td>Edinburgh</td>
					<td>61</td>
					<td>2011-04-25</td>
					<td>$320,800</td>
				</tr>
				<tr>
					<td>Garrett Winters</td>
					<td>Accountant</td>
					<td>Tokyo</td>
					<td>63</td>
					<td>2011-07-25</td>
					<td>$170,750</td>
				</tr>
				<tr>
					<td>Ashton Cox</td>
					<td>Junior Technical Author</td>
					<td>San Francisco</td>
					<td>66</td>
					<td>2009-01-12</td>
					<td>$86,000</td>
				</tr>
				<tr>
					<td>Cedric Kelly</td>
					<td>Senior Javascript Developer</td>
					<td>Edinburgh</td>
					<td>22</td>
					<td>2012-03-29</td>
					<td>$433,060</td>
				</tr>
				<tr>
					<td>Airi Satou</td>
					<td>Accountant</td>
					<td>Tokyo</td>
					<td>33</td>
					<td>2008-11-28</td>
					<td>$162,700</td>
				</tr>
			</tbody>
		</Table>
	</div>
</Card>

<!-- 2x Spacing Table -->
<Card>
	{#snippet header()}
		<Heading level={3}>2x Spacing - ~62px rows</Heading>
	{/snippet}

	<Paragraph>Balanced spacing for better readability when you have moderate amounts of data.</Paragraph>
	<div class="pa-table-container">
		<Table spacing="2x">
			<thead>
				<tr>
					<th>Name</th>
					<th>Position</th>
					<th>Office</th>
					<th>Age</th>
					<th>Start date</th>
					<th>Salary</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Tiger Nixon</td>
					<td>System Architect</td>
					<td>Edinburgh</td>
					<td>61</td>
					<td>2011-04-25</td>
					<td>$320,800</td>
				</tr>
				<tr>
					<td>Garrett Winters</td>
					<td>Accountant</td>
					<td>Tokyo</td>
					<td>63</td>
					<td>2011-07-25</td>
					<td>$170,750</td>
				</tr>
				<tr>
					<td>Ashton Cox</td>
					<td>Junior Technical Author</td>
					<td>San Francisco</td>
					<td>66</td>
					<td>2009-01-12</td>
					<td>$86,000</td>
				</tr>
			</tbody>
		</Table>
	</div>
</Card>

<!-- 3x Spacing Table -->
<Card>
	{#snippet header()}
		<Heading level={3}>3x Spacing - ~93px rows</Heading>
	{/snippet}

	<Paragraph>Spacious layout for presentation tables or when emphasis and clarity are priorities.</Paragraph>
	<div class="pa-table-container">
		<Table spacing="3x">
			<thead>
				<tr>
					<th>Name</th>
					<th>Position</th>
					<th>Office</th>
					<th>Age</th>
					<th>Start date</th>
					<th>Salary</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Tiger Nixon</td>
					<td>System Architect</td>
					<td>Edinburgh</td>
					<td>61</td>
					<td>2011-04-25</td>
					<td>$320,800</td>
				</tr>
				<tr>
					<td>Garrett Winters</td>
					<td>Accountant</td>
					<td>Tokyo</td>
					<td>63</td>
					<td>2011-07-25</td>
					<td>$170,750</td>
				</tr>
				<tr>
					<td>Ashton Cox</td>
					<td>Junior Technical Author</td>
					<td>San Francisco</td>
					<td>66</td>
					<td>2009-01-12</td>
					<td>$86,000</td>
				</tr>
			</tbody>
		</Table>
	</div>
</Card>

<!-- Usage Guide -->
<Card>
	{#snippet header()}
		<Heading level={3}>Usage Guide</Heading>
	{/snippet}

	<Heading level={4}>Default (Compact)</Heading>
	<pre><code>&lt;table class="pa-table"&gt;
  ...
&lt;/table&gt;</code></pre>

	<Heading level={4}>2x Spacing</Heading>
	<pre><code>&lt;table class="pa-table pa-table--2x"&gt;
  ...
&lt;/table&gt;</code></pre>

	<Heading level={4}>3x Spacing</Heading>
	<pre><code>&lt;table class="pa-table pa-table--3x"&gt;
  ...
&lt;/table&gt;</code></pre>

	<Heading level={4}>When to use each size:</Heading>
	<ul>
		<li><strong>Default (Compact):</strong> Data grids, logs, transaction lists, any table with 50+ rows</li>
		<li><strong>2x Spacing:</strong> Reports, dashboards, summary tables with 10-50 rows</li>
		<li><strong>3x Spacing:</strong> Feature comparisons, pricing tables, highlighted data with &lt;10 rows</li>
	</ul>
</Card>
