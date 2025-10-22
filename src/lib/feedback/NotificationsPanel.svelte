<script lang="ts">
	/**
	 * Pure Admin NotificationsPanel Component (Svelte 5)
	 * Dropdown panel for displaying notifications
	 */

	import Heading from '../typography/Heading.svelte';
	import Paragraph from '../typography/Paragraph.svelte';

	interface Props {
		/** Show/hide panel */
		show?: boolean;
		/** Additional CSS classes */
		class?: string;
	}

	let { show = $bindable(false), class: className = '' }: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-notifications__panel'];
		if (show) base.push('is-open');
		if (className) base.push(className);
		return base.join(' ');
	});

	function markAllRead() {
		// This would typically update notification state
		console.log('Mark all as read');
	}
</script>

<div class={classes()}>
	<div class="pa-notifications__header">
		<Heading level={3}>Notifications</Heading>
		<button class="pa-notifications__mark-read" onclick={markAllRead}>Mark all as read</button>
	</div>
	<ul class="pa-notifications__list">
		<li class="pa-notifications__item pa-notifications__item--unread">
			<div class="pa-notifications__icon-wrapper pa-notifications__icon-wrapper--primary">📝</div>
			<div class="pa-notifications__content">
				<Heading level={4}>New task assigned</Heading>
				<Paragraph>Review the Q4 report by end of week</Paragraph>
				<span class="pa-notifications__time">2 minutes ago</span>
			</div>
		</li>
		<li class="pa-notifications__item pa-notifications__item--unread">
			<div class="pa-notifications__icon-wrapper pa-notifications__icon-wrapper--success">✓</div>
			<div class="pa-notifications__content">
				<Heading level={4}>Build completed</Heading>
				<Paragraph>Production deployment finished successfully</Paragraph>
				<span class="pa-notifications__time">15 minutes ago</span>
			</div>
		</li>
		<li class="pa-notifications__item pa-notifications__item--unread">
			<div class="pa-notifications__icon-wrapper pa-notifications__icon-wrapper--warning">⚠️</div>
			<div class="pa-notifications__content">
				<Heading level={4}>Server maintenance</Heading>
				<Paragraph>Scheduled downtime tonight at 11 PM</Paragraph>
				<span class="pa-notifications__time">1 hour ago</span>
			</div>
		</li>
		<li class="pa-notifications__item">
			<div class="pa-notifications__icon-wrapper pa-notifications__icon-wrapper--secondary">💬</div>
			<div class="pa-notifications__content">
				<Heading level={4}>New comment</Heading>
				<Paragraph>Sarah replied to your comment on Issue #432</Paragraph>
				<span class="pa-notifications__time">3 hours ago</span>
			</div>
		</li>
	</ul>
	<div class="pa-notifications__footer">
		<a href="#all-notifications">View all notifications</a>
	</div>
</div>
