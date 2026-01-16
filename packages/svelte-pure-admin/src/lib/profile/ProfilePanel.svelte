<script lang="ts">
	/**
	 * Pure Admin ProfilePanel Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/profile.html
	 */

	interface Props {
		/** Show panel */
		show?: boolean;
		/** User name */
		name: string;
		/** User email */
		email: string;
		/** User role */
		role?: string;
		/** Hide avatar - for corporate apps without user photos */
		noAvatar?: boolean;
		/** Avatar snippet */
		avatar?: import('svelte').Snippet;
		/** Tabs snippet - renders between header and body for tabbed interface */
		tabs?: import('svelte').Snippet;
		/** Navigation items snippet */
		nav?: import('svelte').Snippet;
		/** Actions snippet (inside body) - deprecated, use footer instead */
		actions?: import('svelte').Snippet;
		/** Footer snippet - fixed at bottom with action buttons (Sign Out, etc.) */
		footer?: import('svelte').Snippet;
		/** Full body content snippet - replaces nav+actions when using tabs */
		children?: import('svelte').Snippet;
		/** Close handler */
		onClose?: () => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		show = $bindable(false),
		name,
		email,
		role,
		noAvatar = false,
		avatar,
		tabs,
		nav,
		actions,
		footer,
		children,
		onClose,
		class: className = ''
	}: Props = $props();

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-profile-panel'];
		if (show) base.push('pa-profile-panel--open');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build header class string
	const headerClasses = $derived(() => {
		const base = ['pa-profile-panel__header'];
		if (noAvatar) base.push('pa-profile-panel__header--no-avatar');
		return base.join(' ');
	});

	function handleClose() {
		show = false;
		if (onClose) onClose();
	}

	function handleOverlayClick() {
		handleClose();
	}
</script>

<div class={classes()}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="pa-profile-panel__overlay" onclick={handleOverlayClick}></div>

	<div class="pa-profile-panel__content">
		<div class={headerClasses()}>
			<div class="pa-profile-panel__avatar">
				{#if avatar}
					{@render avatar()}
				{:else}
					<span class="pa-profile-panel__avatar-icon">👤</span>
				{/if}
			</div>

			<div class="pa-profile-panel__info">
				<h3 class="pa-profile-panel__name">{name}</h3>
				<p class="pa-profile-panel__email">{email}</p>
				{#if role}
					<span class="pa-profile-panel__role">{role}</span>
				{/if}
			</div>

			<button
				class="pa-profile-panel__close"
				onclick={handleClose}
				aria-label="Close Profile"
			>
				✕
			</button>
		</div>

		{#if tabs}
			<div class="pa-profile-panel__tabs">
				{@render tabs()}
			</div>
		{/if}

		<div class="pa-profile-panel__body">
			{#if children}
				{@render children()}
			{:else}
				{#if nav}
					<nav class="pa-profile-panel__nav">
						<ul>
							{@render nav()}
						</ul>
					</nav>
				{/if}

				{#if actions}
					<div class="pa-profile-panel__actions">
						{@render actions()}
					</div>
				{/if}
			{/if}
		</div>

		{#if footer}
			<div class="pa-profile-panel__footer">
				{@render footer()}
			</div>
		{/if}
	</div>
</div>
