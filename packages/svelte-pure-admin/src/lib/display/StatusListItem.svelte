<script lang="ts">
	/**
	 * Pure Admin StatusListItem Component (Svelte 5)
	 * Individual status item with indicator dot, label, and value
	 */

	type StatusType = 'success' | 'warning' | 'danger' | 'info';

	interface Props {
		/** Label text */
		labelText: string;
		/** Value/status text */
		valueText: string;
		/** Status type for indicator color */
		status: StatusType;
		/** Additional CSS classes */
		class?: string;
	}

	let { labelText, valueText, status, class: className = '' }: Props = $props();

	const classes = $derived(() => {
		const base = ['pa-status-list__item'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	<div class="pa-status-list__indicator pa-status-list__indicator--{status}"></div>
	<div class="pa-status-list__label">{labelText}</div>
	<div class="pa-status-list__value">{valueText}</div>
</div>
