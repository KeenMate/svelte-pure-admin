<script lang="ts">
	/**
	 * Configuration Display Component
	 * Shows current configuration values (demo purposes)
	 */
	import { usePureAdminConfig } from '$lib';

	const config = usePureAdminConfig();
</script>

<div class="config-display">
	<strong>Current Configuration:</strong><br />
	<div class="config-item">
		<span class="label">App Name:</span>
		<span class="value">{config().app.name}</span>
	</div>
	<div class="config-item">
		<span class="label">Page Size:</span>
		<span class="value">{config().defaults.pageSize}</span>
	</div>
	<div class="config-item">
		<span class="label">Timeout:</span>
		<span class="value">{config().defaults.connectionTimeout}ms</span>
	</div>
	<div class="config-item">
		<span class="label">Date Format:</span>
		<span class="value">{config().defaults.dateFormat}</span>
	</div>
	<div class="config-item">
		<span class="label">Theme:</span>
		<span class="value">{config().ui.theme}</span>
	</div>
</div>

<style>
	.config-display {
		position: fixed;
		top: 10px;
		right: 10px;
		background: white;
		padding: 12px;
		border: 1px solid #ddd;
		border-radius: 6px;
		font-size: 12px;
		max-width: 280px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}

	.config-item {
		display: flex;
		justify-content: space-between;
		margin-top: 6px;
		padding: 4px 0;
		border-bottom: 1px solid #f0f0f0;
	}

	.config-item:last-child {
		border-bottom: none;
	}

	.label {
		color: #666;
		font-weight: 500;
	}

	.value {
		color: #333;
		font-weight: 600;
	}
</style>
