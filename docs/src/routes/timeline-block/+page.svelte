<script lang="ts">
			import { Heading, Paragraph, Card, Timeline, TimelineItem, Button, BasicList } from '@keenmate/svelte-pure-admin';
</script>

<!-- Centered Alternating Layout -->
<Card title="Centered Alternating Layout">

	<Timeline variant="alternating">
		<TimelineItem date="15 Dec" iconText="🏠">
			<Heading level={4}>Project Started</Heading>
			<Paragraph>New project initialized with core team members and initial planning phase completed.</Paragraph>
		</TimelineItem>

		<TimelineItem date="22 Oct" iconText="🎁">
			<Heading level={4}>First Release</Heading>
			<Paragraph>Version 1.0 deployed to production with all major features implemented and tested.</Paragraph>
		</TimelineItem>

		<TimelineItem date="10 Jul" iconText="👤">
			<Heading level={4}>Team Expansion</Heading>
			<Paragraph>Added three new developers to the team to accelerate development timeline.</Paragraph>
		</TimelineItem>

		<TimelineItem date="18 May" iconText="🏃">
			<Heading level={4}>Sprint Milestone</Heading>
			<Paragraph>Major refactoring completed, improving code quality and maintainability significantly.</Paragraph>
		</TimelineItem>

		<TimelineItem date="10 Feb" iconText="⚙️">
			<Heading level={4}>System Upgrade</Heading>
			<Paragraph>Infrastructure migration to cloud platform completed with zero downtime.</Paragraph>
		</TimelineItem>

		<TimelineItem date="01 Jan" iconText="🏆">
			<Heading level={4}>Award Recognition</Heading>
			<Paragraph>Received "Best Admin Framework" award at the Annual Developer Conference.</Paragraph>
		</TimelineItem>
	</Timeline>
</Card>

<!-- Future Planning -->
<Card title="Future Planning">

	<Timeline variant="alternating">
		<TimelineItem date="Q1 2024" iconText="📋">
			<Heading level={4}>Planning Phase</Heading>
			<Paragraph>Strategic planning and roadmap definition with stakeholder alignment.</Paragraph>
		</TimelineItem>

		<TimelineItem date="Q2 2024" iconText="🚀">
			<Heading level={4}>Launch Preparation</Heading>
			<Paragraph>Final testing, deployment preparation, and go-to-market strategy execution.</Paragraph>
		</TimelineItem>

		<TimelineItem date="Q3 2024" iconText="📈">
			<Heading level={4}>Growth Period</Heading>
			<Paragraph>User acquisition campaigns and feature expansion based on feedback.</Paragraph>
		</TimelineItem>

		<TimelineItem date="Q4 2024" iconText="🎯">
			<Heading level={4}>Optimization</Heading>
			<Paragraph>Performance improvements and infrastructure scaling for increased load.</Paragraph>
		</TimelineItem>
	</Timeline>
</Card>

<!-- Load More Example -->
<Card title="Timeline with Load More">

	<Timeline variant="alternating">
		<TimelineItem date="Jan 1" iconText="🎉">
			<Heading level={4}>New Year Launch</Heading>
			<Paragraph>Kicked off the year with ambitious goals and a clear vision for the project.</Paragraph>
		</TimelineItem>

		<TimelineItem date="Jan 15" iconText="💡">
			<Heading level={4}>Innovation Workshop</Heading>
			<Paragraph>Conducted brainstorming session that generated 20+ innovative feature ideas.</Paragraph>
		</TimelineItem>

		<TimelineItem date="Feb 1" iconText="🔧">
			<Heading level={4}>Infrastructure Update</Heading>
			<Paragraph>Migrated to containerized deployment with Docker and Kubernetes orchestration.</Paragraph>
		</TimelineItem>
	</Timeline>

	<div class="mt-4 text-center">
		<Button variant="secondary" size="sm">
			Load more milestones
		</Button>
	</div>
</Card>

<!-- Virtual Scroll Example -->
<Card title="Virtual Scroll (Large Dataset)">

	<Paragraph class="mb-4">For project timelines with many milestones, virtual scrolling optimizes rendering performance.</Paragraph>

	<!-- NOTE: Virtual scroll requires pa-virtual-scroll component which doesn't exist yet -->
	<div class="max-h-50x overflow-y-auto border rounded p-4">
		<Timeline variant="alternating">
			<TimelineItem date="Week 1" iconText="📝">
				<Heading level={4}>Requirements Gathering</Heading>
				<Paragraph>Conducted stakeholder meetings to define project scope and objectives.</Paragraph>
			</TimelineItem>

			<TimelineItem date="Week 2" iconText="🎨">
				<Heading level={4}>Design Phase</Heading>
				<Paragraph>Created wireframes, mockups, and design system documentation.</Paragraph>
			</TimelineItem>

			<TimelineItem date="Week 3" iconText="⚡">
				<Heading level={4}>Prototype Development</Heading>
				<Paragraph>Built interactive prototype for user testing and feedback collection.</Paragraph>
			</TimelineItem>

			{#each Array.from({ length: 20 }, (_, i) => i) as index}
				<TimelineItem
					date={`Week ${index + 4}`}
					iconText={['🚀', '💻', '✅', '📊', '⚠️'][index % 5]}
				>
					<Heading level={4}>Sprint #{index + 1}</Heading>
					<Paragraph>Development sprint completed with feature implementation and testing.</Paragraph>
				</TimelineItem>
			{/each}
		</Timeline>
	</div>

	<Paragraph class="mt-4 text-secondary text-sm">
		<strong>Note:</strong> True virtual scrolling with <code>pa-virtual-scroll</code> component is not yet implemented.
		This example uses regular scrolling with overflow.
	</Paragraph>
</Card>

<!-- Usage Examples -->
<Card title="Usage Examples">

	<Heading level={4}>Basic Alternating Timeline</Heading>
	<pre class="mb-4"><code>&lt;Timeline variant="alternating"&gt;
  &lt;TimelineItem date="15 Dec" iconText="🏠"&gt;
    &lt;h4&gt;Project Started&lt;/h4&gt;
    &lt;p&gt;Description here&lt;/p&gt;
  &lt;/TimelineItem&gt;
&lt;/Timeline&gt;</code></pre>

	<Heading level={4}>Filled Markers</Heading>
	<pre class="mb-4"><code>&lt;TimelineItem date="Q1 2024" iconText="📋" filled&gt;
  &lt;h4&gt;Milestone&lt;/h4&gt;
  &lt;p&gt;Details&lt;/p&gt;
&lt;/TimelineItem&gt;</code></pre>

	<Heading level={4}>Best Practices</Heading>
	<BasicList>
		<li>Use <code>variant="alternating"</code> for project roadmaps and milestone timelines</li>
		<li>Add emojis or icons to timeline headers for visual interest</li>
		<li>Use filled markers for future/planned events vs. regular markers for completed events</li>
		<li>Keep descriptions concise - one or two sentences maximum</li>
		<li>Use consistent time formats (dates, quarters, weeks, etc.)</li>
	</BasicList>
</Card>
