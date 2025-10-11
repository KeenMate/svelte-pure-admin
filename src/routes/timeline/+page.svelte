<script lang="ts">
	import { Card, Timeline, TimelineItem, Button } from '$lib';
</script>

<svelte:head>
	<title>Timeline Feed - Pure Admin Svelte</title>
</svelte:head>

<h1>Timeline Feed</h1>
<p>Activity feed timeline with avatars and user actions - perfect for social feeds, notifications, and audit logs.</p>

<!-- Activity Feed -->
<Card>
	{#snippet header()}
		<h3>Activity Feed</h3>
	{/snippet}

	<Timeline variant="feed">
		<TimelineItem
			avatar="https://ui-avatars.com/api/?name=Luna+Bonifacio&background=3b82f6&color=fff"
			variant="primary"
		>
			{#snippet content()}
				<div>
					<strong>Luna Bonifacio</strong> changed 2 attributes
				</div>
				<div class="text-secondary" style="font-size: 0.875rem; margin-top: 0.25rem;">
					Jan 21, 2021
				</div>
			{/snippet}
		</TimelineItem>

		<TimelineItem
			avatar="https://ui-avatars.com/api/?name=Yoan+Almedia&background=10b981&color=fff"
			variant="success"
		>
			{#snippet content()}
				<div>
					<strong>Yoan Almedia</strong> moved Eric Lubin to "Technical Test"
				</div>
				<div class="text-secondary" style="font-size: 0.875rem; margin-top: 0.25rem;">
					Jan 20, 2021
				</div>
			{/snippet}
		</TimelineItem>

		<TimelineItem
			avatar="https://ui-avatars.com/api/?name=Yoan+Almedia&background=10b981&color=fff"
			variant="info"
		>
			{#snippet content()}
				<div>
					<strong>Yoan Almedia</strong> commented on an assignment
				</div>
				<div class="text-secondary" style="font-size: 0.875rem; margin-top: 0.25rem;">
					Jan 20, 2021
				</div>
				<div
					style="margin-top: 0.75rem; padding: 0.75rem; background-color: #f9fafb; border-left: 3px solid #3b82f6; border-radius: 0.25rem;"
				>
					<p style="margin: 0; font-size: 0.875rem; color: #4b5563;">
						"I've reviewed the candidate's technical test submission. The code quality is excellent and demonstrates strong understanding of React patterns. I recommend moving forward with the next interview stage."
					</p>
				</div>
			{/snippet}
		</TimelineItem>

		<TimelineItem
			avatar="https://ui-avatars.com/api/?name=Sarah+Chen&background=f59e0b&color=fff"
			variant="warning"
		>
			{#snippet content()}
				<div>
					<strong>Sarah Chen</strong> attached 3 files to project
				</div>
				<div class="text-secondary" style="font-size: 0.875rem; margin-top: 0.25rem;">
					Jan 19, 2021
				</div>
				<div style="margin-top: 0.75rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
					<span class="pa-badge pa-badge--secondary">
						<i class="fa-solid fa-file-pdf" style="margin-right: 0.25rem;"></i>
						design-specs.pdf
					</span>
					<span class="pa-badge pa-badge--secondary">
						<i class="fa-solid fa-file-image" style="margin-right: 0.25rem;"></i>
						mockup-v2.png
					</span>
					<span class="pa-badge pa-badge--secondary">
						<i class="fa-solid fa-file-code" style="margin-right: 0.25rem;"></i>
						components.zip
					</span>
				</div>
			{/snippet}
		</TimelineItem>

		<TimelineItem
			avatar="https://ui-avatars.com/api/?name=Mike+Johnson&background=8b5cf6&color=fff"
			variant="success"
		>
			{#snippet content()}
				<div>
					<strong>Mike Johnson</strong> completed "Design Review" task
				</div>
				<div class="text-secondary" style="font-size: 0.875rem; margin-top: 0.25rem;">
					Jan 18, 2021
				</div>
			{/snippet}
		</TimelineItem>

		<TimelineItem
			avatar="https://ui-avatars.com/api/?name=Emma+Davis&background=ec4899&color=fff"
			variant="danger"
		>
			{#snippet content()}
				<div>
					<strong>Emma Davis</strong> reported a critical bug
				</div>
				<div class="text-secondary" style="font-size: 0.875rem; margin-top: 0.25rem;">
					Jan 17, 2021
				</div>
				<div
					style="margin-top: 0.75rem; padding: 0.75rem; background-color: #fef2f2; border-left: 3px solid #dc2626; border-radius: 0.25rem;"
				>
					<p style="margin: 0; font-size: 0.875rem; color: #4b5563;">
						<strong style="color: #dc2626;">URGENT:</strong> Payment processing fails when cart total exceeds $1000. Multiple customers affected. Needs immediate attention.
					</p>
				</div>
			{/snippet}
		</TimelineItem>

		<TimelineItem
			avatar="https://ui-avatars.com/api/?name=Alex+Rodriguez&background=06b6d4&color=fff"
			variant="info"
		>
			{#snippet content()}
				<div>
					<strong>Alex Rodriguez</strong> created new branch "feature/user-profiles"
				</div>
				<div class="text-secondary" style="font-size: 0.875rem; margin-top: 0.25rem;">
					Jan 16, 2021
				</div>
			{/snippet}
		</TimelineItem>
	</Timeline>
</Card>

<!-- Team Collaboration Feed -->
<Card>
	{#snippet header()}
		<h3>Team Collaboration Feed</h3>
	{/snippet}

	<Timeline variant="feed">
		<TimelineItem
			avatar="https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff"
			variant="primary"
		>
			{#snippet content()}
				<div>
					<strong>John Doe</strong> started a new project
				</div>
				<div class="text-secondary" style="font-size: 0.875rem; margin-top: 0.25rem;">
					2 hours ago
				</div>
			{/snippet}
		</TimelineItem>

		<TimelineItem
			avatar="https://ui-avatars.com/api/?name=Jane+Smith&background=10b981&color=fff"
			variant="success"
		>
			{#snippet content()}
				<div>
					<strong>Jane Smith</strong> merged pull request #142
				</div>
				<div class="text-secondary" style="font-size: 0.875rem; margin-top: 0.25rem;">
					5 hours ago
				</div>
			{/snippet}
		</TimelineItem>

		<TimelineItem
			avatar="https://ui-avatars.com/api/?name=Bob+Wilson&background=f59e0b&color=fff"
			variant="warning"
		>
			{#snippet content()}
				<div>
					<strong>Bob Wilson</strong> requested code review
				</div>
				<div class="text-secondary" style="font-size: 0.875rem; margin-top: 0.25rem;">
					1 day ago
				</div>
			{/snippet}
		</TimelineItem>
	</Timeline>

	<div style="margin-top: 1rem; text-align: center;">
		<Button variant="secondary" size="sm">
			Load more activity
		</Button>
	</div>
</Card>

<!-- Usage Examples -->
<Card>
	{#snippet header()}
		<h3>Usage Examples</h3>
	{/snippet}

	<h4>Basic Feed Timeline</h4>
	<pre class="mb-4"><code>&lt;Timeline variant="feed"&gt;
  &lt;TimelineItem
    avatar="https://ui-avatars.com/api/?name=User+Name"
    variant="primary"
  &gt;
    {#snippet content()}
      &lt;div&gt;
        &lt;strong&gt;User Name&lt;/strong&gt; performed an action
      &lt;/div&gt;
      &lt;div class="text-secondary"&gt;2 hours ago&lt;/div&gt;
    {/snippet}
  &lt;/TimelineItem&gt;
&lt;/Timeline&gt;</code></pre>

	<h4>With Comment/Additional Content</h4>
	<pre class="mb-4"><code>&lt;TimelineItem avatar="..." variant="info"&gt;
  {#snippet content()}
    &lt;div&gt;&lt;strong&gt;User&lt;/strong&gt; commented&lt;/div&gt;
    &lt;div class="text-secondary"&gt;1 hour ago&lt;/div&gt;
    &lt;div style="margin-top: 0.75rem; padding: 0.75rem; background: #f9fafb;"&gt;
      Comment text here
    &lt;/div&gt;
  {/snippet}
&lt;/TimelineItem&gt;</code></pre>

	<h4>UI Avatars Integration</h4>
	<p>Generate avatars dynamically using UI Avatars API:</p>
	<pre class="mb-4"><code>https://ui-avatars.com/api/?name=First+Last&background=3b82f6&color=fff</code></pre>

	<h4>Best Practices</h4>
	<ul>
		<li>Use <code>variant="feed"</code> for social activity feeds and audit logs</li>
		<li>Include user avatars for better visual identification</li>
		<li>Show relative timestamps (2 hours ago, 1 day ago) for recent activity</li>
		<li>Use color variants to indicate action types (success for completions, warning for reviews, danger for errors)</li>
		<li>Add metadata badges for file attachments or additional context</li>
		<li>Include "Load more" button for pagination</li>
	</ul>
</Card>
