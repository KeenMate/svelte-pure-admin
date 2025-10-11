<script lang="ts">
	import { Card, Timeline, TimelineItem, Button } from '$lib';
</script>

<svelte:head>
	<title>Timeline Block - Pure Admin Svelte</title>
</svelte:head>

<h1>Timeline Block</h1>
<p>Alternating block timeline with centered date labels - perfect for project milestones and roadmaps.</p>

<!-- Centered Alternating Layout -->
<Card>
	{#snippet header()}
		<h3>Centered Alternating Layout</h3>
	{/snippet}

	<Timeline variant="alternating">
		<TimelineItem time="15 Dec" variant="primary">
			{#snippet content()}
				<h4>🏠 Project Started</h4>
				<p>New project initialized with core team members and initial planning phase completed.</p>
			{/snippet}
		</TimelineItem>

		<TimelineItem time="22 Oct" variant="success">
			{#snippet content()}
				<h4>🎁 First Release</h4>
				<p>Version 1.0 deployed to production with all major features implemented and tested.</p>
			{/snippet}
		</TimelineItem>

		<TimelineItem time="10 Jul" variant="info">
			{#snippet content()}
				<h4>👤 Team Expansion</h4>
				<p>Added three new developers to the team to accelerate development timeline.</p>
			{/snippet}
		</TimelineItem>

		<TimelineItem time="18 May" variant="warning">
			{#snippet content()}
				<h4>🏃 Sprint Milestone</h4>
				<p>Major refactoring completed, improving code quality and maintainability significantly.</p>
			{/snippet}
		</TimelineItem>

		<TimelineItem time="10 Feb" variant="secondary">
			{#snippet content()}
				<h4>⚙️ System Upgrade</h4>
				<p>Infrastructure migration to cloud platform completed with zero downtime.</p>
			{/snippet}
		</TimelineItem>

		<TimelineItem time="01 Jan" variant="danger">
			{#snippet content()}
				<h4>🏆 Award Recognition</h4>
				<p>Received "Best Admin Framework" award at the Annual Developer Conference.</p>
			{/snippet}
		</TimelineItem>
	</Timeline>
</Card>

<!-- Future Planning -->
<Card>
	{#snippet header()}
		<h3>Future Planning</h3>
	{/snippet}

	<Timeline variant="alternating">
		<TimelineItem time="Q1 2024" variant="primary" filled>
			{#snippet content()}
				<h4>📋 Planning Phase</h4>
				<p>Strategic planning and roadmap definition with stakeholder alignment.</p>
			{/snippet}
		</TimelineItem>

		<TimelineItem time="Q2 2024" variant="info" filled>
			{#snippet content()}
				<h4>🚀 Launch Preparation</h4>
				<p>Final testing, deployment preparation, and go-to-market strategy execution.</p>
			{/snippet}
		</TimelineItem>

		<TimelineItem time="Q3 2024" variant="success" filled>
			{#snippet content()}
				<h4>📈 Growth Period</h4>
				<p>User acquisition campaigns and feature expansion based on feedback.</p>
			{/snippet}
		</TimelineItem>

		<TimelineItem time="Q4 2024" variant="warning" filled>
			{#snippet content()}
				<h4>🎯 Optimization</h4>
				<p>Performance improvements and infrastructure scaling for increased load.</p>
			{/snippet}
		</TimelineItem>
	</Timeline>
</Card>

<!-- Load More Example -->
<Card>
	{#snippet header()}
		<h3>Timeline with Load More</h3>
	{/snippet}

	<Timeline variant="alternating">
		<TimelineItem time="Jan 1" variant="success">
			{#snippet content()}
				<h4>🎉 New Year Launch</h4>
				<p>Kicked off the year with ambitious goals and a clear vision for the project.</p>
			{/snippet}
		</TimelineItem>

		<TimelineItem time="Jan 15" variant="primary">
			{#snippet content()}
				<h4>💡 Innovation Workshop</h4>
				<p>Conducted brainstorming session that generated 20+ innovative feature ideas.</p>
			{/snippet}
		</TimelineItem>

		<TimelineItem time="Feb 1" variant="info">
			{#snippet content()}
				<h4>🔧 Infrastructure Update</h4>
				<p>Migrated to containerized deployment with Docker and Kubernetes orchestration.</p>
			{/snippet}
		</TimelineItem>
	</Timeline>

	<div style="margin-top: 1rem; text-align: center;">
		<Button variant="secondary" size="sm">
			Load more milestones
		</Button>
	</div>
</Card>

<!-- Virtual Scroll Example -->
<Card>
	{#snippet header()}
		<h3>Virtual Scroll (Large Dataset)</h3>
	{/snippet}

	<p class="mb-4">For project timelines with many milestones, virtual scrolling optimizes rendering performance.</p>

	<!-- NOTE: Virtual scroll requires pa-virtual-scroll component which doesn't exist yet -->
	<div style="max-height: 500px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 0.375rem; padding: 1rem;">
		<Timeline variant="alternating">
			<TimelineItem time="Week 1" variant="primary">
				{#snippet content()}
					<h4>📝 Requirements Gathering</h4>
					<p>Conducted stakeholder meetings to define project scope and objectives.</p>
				{/snippet}
			</TimelineItem>

			<TimelineItem time="Week 2" variant="info">
				{#snippet content()}
					<h4>🎨 Design Phase</h4>
					<p>Created wireframes, mockups, and design system documentation.</p>
				{/snippet}
			</TimelineItem>

			<TimelineItem time="Week 3" variant="success">
				{#snippet content()}
					<h4>⚡ Prototype Development</h4>
					<p>Built interactive prototype for user testing and feedback collection.</p>
				{/snippet}
			</TimelineItem>

			{#each Array.from({ length: 20 }, (_, i) => i) as index}
				<TimelineItem
					time={`Week ${index + 4}`}
					variant={['primary', 'secondary', 'success', 'info', 'warning'][index % 5]}
				>
					{#snippet content()}
						<h4>Sprint #{index + 1}</h4>
						<p>Development sprint completed with feature implementation and testing.</p>
					{/snippet}
				</TimelineItem>
			{/each}
		</Timeline>
	</div>

	<p class="mt-4 text-secondary" style="font-size: 0.875rem;">
		<strong>Note:</strong> True virtual scrolling with <code>pa-virtual-scroll</code> component is not yet implemented.
		This example uses regular scrolling with overflow.
	</p>
</Card>

<!-- Usage Examples -->
<Card>
	{#snippet header()}
		<h3>Usage Examples</h3>
	{/snippet}

	<h4>Basic Alternating Timeline</h4>
	<pre class="mb-4"><code>&lt;Timeline variant="alternating"&gt;
  &lt;TimelineItem time="15 Dec" variant="primary"&gt;
    {#snippet content()}
      &lt;h4&gt;Project Started&lt;/h4&gt;
      &lt;p&gt;Description here&lt;/p&gt;
    {/snippet}
  &lt;/TimelineItem&gt;
&lt;/Timeline&gt;</code></pre>

	<h4>Filled Markers</h4>
	<pre class="mb-4"><code>&lt;TimelineItem time="Q1 2024" variant="primary" filled&gt;
  {#snippet content()}
    &lt;h4&gt;Milestone&lt;/h4&gt;
    &lt;p&gt;Details&lt;/p&gt;
  {/snippet}
&lt;/TimelineItem&gt;</code></pre>

	<h4>Best Practices</h4>
	<ul>
		<li>Use <code>variant="alternating"</code> for project roadmaps and milestone timelines</li>
		<li>Add emojis or icons to timeline headers for visual interest</li>
		<li>Use filled markers for future/planned events vs. regular markers for completed events</li>
		<li>Keep descriptions concise - one or two sentences maximum</li>
		<li>Use consistent time formats (dates, quarters, weeks, etc.)</li>
	</ul>
</Card>
