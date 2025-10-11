<script lang="ts">
	import { Card, Timeline, TimelineItem, Button } from '$lib';
</script>

<svelte:head>
	<title>Simple Timeline - Pure Admin Svelte</title>
</svelte:head>

<h1>Simple Timeline</h1>
<p>Vertical timeline with dots and connecting lines - perfect for activity logs and event histories.</p>

<!-- Color-coded Events -->
<Card>
	{#snippet header()}
		<h3>Color-coded Events</h3>
	{/snippet}

	<Timeline variant="simple">
		<TimelineItem time="09:00 AM" variant="primary">
			System startup initialized
		</TimelineItem>
		<TimelineItem time="09:15 AM" variant="success">
			Database connection established successfully
		</TimelineItem>
		<TimelineItem time="09:30 AM" variant="info">
			Running scheduled maintenance tasks
		</TimelineItem>
		<TimelineItem time="10:00 AM" variant="warning">
			High memory usage detected (85%)
		</TimelineItem>
		<TimelineItem time="10:15 AM" variant="danger">
			Critical error in payment processor - investigation required
		</TimelineItem>
		<TimelineItem time="10:30 AM" variant="success">
			Payment processor issue resolved
		</TimelineItem>
		<TimelineItem time="11:00 AM" variant="secondary">
			System backup completed
		</TimelineItem>
		<TimelineItem time="11:30 AM" variant="primary">
			New deployment scheduled for 2:00 PM
		</TimelineItem>
	</Timeline>
</Card>

<!-- Filled Bullets -->
<Card>
	{#snippet header()}
		<h3>Filled Bullets</h3>
	{/snippet}

	<Timeline variant="simple">
		<TimelineItem time="Jan 2025" variant="primary" filled>
			Project kickoff meeting with stakeholders
		</TimelineItem>
		<TimelineItem time="Feb 2025" variant="success" filled>
			Phase 1 development completed
		</TimelineItem>
		<TimelineItem time="Mar 2025" variant="info" filled>
			User acceptance testing in progress
		</TimelineItem>
		<TimelineItem time="Apr 2025" variant="warning" filled>
			Performance optimization required before launch
		</TimelineItem>
		<TimelineItem time="May 2025" variant="secondary" filled>
			Production deployment scheduled
		</TimelineItem>
	</Timeline>
</Card>

<!-- Load More Example -->
<Card>
	{#snippet header()}
		<h3>Timeline with Load More</h3>
	{/snippet}

	<Timeline variant="simple">
		<TimelineItem time="2 hours ago" variant="success">
			User Sarah Johnson completed onboarding process
		</TimelineItem>
		<TimelineItem time="3 hours ago" variant="primary">
			New feature request submitted: Dark mode toggle
		</TimelineItem>
		<TimelineItem time="5 hours ago" variant="info">
			System update v2.3.1 deployed successfully
		</TimelineItem>
		<TimelineItem time="1 day ago" variant="warning">
			Storage usage approaching 80% capacity
		</TimelineItem>
		<TimelineItem time="2 days ago" variant="success">
			Monthly billing cycle completed
		</TimelineItem>
	</Timeline>

	<div style="margin-top: 1rem; text-align: center;">
		<Button variant="secondary" size="sm">
			Load more events
		</Button>
	</div>
</Card>

<!-- Virtual Scroll Example -->
<Card>
	{#snippet header()}
		<h3>Virtual Scroll (Large Dataset)</h3>
	{/snippet}

	<p class="mb-4">For very large timelines with hundreds or thousands of events, virtual scrolling can improve performance.</p>

	<!-- NOTE: Virtual scroll requires pa-virtual-scroll component which doesn't exist yet -->
	<!-- Using regular timeline for now with note -->
	<div style="max-height: 400px; overflow-y: auto; border: 1px solid #e5e7eb; border-radius: 0.375rem; padding: 1rem;">
		<Timeline variant="simple">
			{#each Array.from({ length: 50 }, (_, i) => i) as index}
				<TimelineItem
					time={`Event ${index + 1}`}
					variant={['primary', 'secondary', 'success', 'info', 'warning', 'danger'][index % 6]}
				>
					Activity log entry #{index + 1} - {['User login', 'File uploaded', 'Settings changed', 'Report generated', 'Email sent', 'Task completed'][index % 6]}
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

	<h4>Basic Timeline</h4>
	<pre class="mb-4"><code>&lt;Timeline variant="simple"&gt;
  &lt;TimelineItem time="09:00 AM" variant="primary"&gt;
    Event description
  &lt;/TimelineItem&gt;
  &lt;TimelineItem time="10:00 AM" variant="success"&gt;
    Another event
  &lt;/TimelineItem&gt;
&lt;/Timeline&gt;</code></pre>

	<h4>Filled Bullets</h4>
	<pre class="mb-4"><code>&lt;TimelineItem time="Jan 2025" variant="primary" filled&gt;
  Milestone completed
&lt;/TimelineItem&gt;</code></pre>

	<h4>Available Variants</h4>
	<ul>
		<li><code>variant="primary"</code> - Blue (default system events)</li>
		<li><code>variant="secondary"</code> - Gray (routine events)</li>
		<li><code>variant="success"</code> - Green (successful operations)</li>
		<li><code>variant="info"</code> - Cyan (informational messages)</li>
		<li><code>variant="warning"</code> - Orange (warnings)</li>
		<li><code>variant="danger"</code> - Red (errors/critical events)</li>
	</ul>
</Card>
