<script lang="ts">
	/**
	 * AppHeader — the app-identity block (`.pc-app-header`) for a `Navbar` zone
	 * (typically START). Renders your `children` (usually an `<h1>` with the wordmark
	 * / version, often composed as `FitSlot` / `FitStep`); with no children it falls
	 * back to the brand from `PureAdminProvider` config (logo + app name).
	 */
	import { usePureAdminConfig } from '../config/hooks';
	import Heading from '../typography/Heading.svelte';

	interface Props {
		/** Additional CSS classes */
		class?: string;
		/** Brand content (overrides the config fallback) */
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();

	const config = usePureAdminConfig();

	const classes = $derived(() => {
		const base = ['pc-app-header'];
		if (className) base.push(className);
		return base.join(' ');
	});
</script>

<div class={classes()}>
	{#if children}
		{@render children()}
	{:else if config().app.logo || config().app.name}
		<!-- Default brand from config. Core's `.pc-app-header` styles only its
		     `<h1>` wordmark + `__version` — it has no logo-image slot (no `__logo`
		     class, no `img` rule), so the logo renders as a bare `<img>` (consumer
		     sizes it). See the core follow-up to bless a `pc-app-header__logo`. -->
		{#if config().app.logo}
			<img src={config().app.logo} alt={config().app.name} />
		{/if}
		{#if config().app.name}
			<Heading level={1}>{config().app.name}</Heading>
		{/if}
	{/if}
</div>
