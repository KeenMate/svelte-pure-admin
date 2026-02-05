<script lang="ts">
	/**
	 * Configuration Display Component
	 * Shows current configuration values (demo purposes)
	 */
	import { usePureAdminConfig, Card, DefinitionList } from '@keenmate/svelte-pure-admin';

	const config = usePureAdminConfig();
</script>

<div style="position: fixed; top: 10px; right: 10px; z-index: 1000; max-width: 280px;">
	<Card titleText="Current Configuration">
		<DefinitionList isInline>
			<dt>App Name</dt>
			<dd>{config().app.name}</dd>
			<dt>Page Size</dt>
			<dd>{config().defaults.pageSize}</dd>
			<dt>Timeout</dt>
			<dd>{config().defaults.connectionTimeout}ms</dd>
			<dt>Date Format</dt>
			<dd>{config().defaults.dateFormat}</dd>
			<dt>Theme</dt>
			<dd>{config().ui.theme}</dd>
		</DefinitionList>
	</Card>
</div>
