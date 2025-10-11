<script lang="ts">
	/**
	 * Pure Admin Modal Component (Svelte 5)
	 * Based on @pure-admin/core snippets/modals.html
	 */

	type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fw';
	type ModalVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';

	interface Props {
		/** Show modal */
		show?: boolean;
		/** Modal size */
		size?: ModalSize;
		/** Modal variant/theme (for full modal theming) */
		variant?: ModalVariant;
		/** Header variant (for header theming only) */
		headerVariant?: ModalVariant;
		/** Modal title */
		title?: string;
		/** Close handler */
		onClose?: () => void;
		/** Additional CSS classes */
		class?: string;
		/** Header snippet */
		header?: import('svelte').Snippet;
		/** Body snippet */
		children?: import('svelte').Snippet;
		/** Footer snippet */
		footer?: import('svelte').Snippet;
	}

	let {
		show = $bindable(false),
		size = 'md',
		variant,
		headerVariant,
		title,
		onClose,
		class: className = '',
		header,
		children,
		footer
	}: Props = $props();

	// Build class string for modal
	const modalClasses = $derived(() => {
		const base = ['pa-modal'];
		if (show) base.push('pa-modal--show');
		if (variant) base.push(`pa-modal--${variant}`);
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build class string for container
	const containerClasses = $derived(() => {
		const base = ['pa-modal__container'];
		if (size !== 'md') base.push(`pa-modal__container--${size}`);
		return base.join(' ');
	});

	// Build class string for header
	const headerClasses = $derived(() => {
		const base = ['pa-modal__header'];
		if (headerVariant) base.push(`pa-modal__header--${headerVariant}`);
		return base.join(' ');
	});

	function handleClose() {
		show = false;
		if (onClose) onClose();
	}

	function handleBackdropClick() {
		handleClose();
	}
</script>

<div class={modalClasses()}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="pa-modal__backdrop" onclick={handleBackdropClick}></div>
	<div class={containerClasses()}>
		{#if header || title}
			<div class={headerClasses()}>
				{#if header}
					{@render header()}
				{:else if title}
					<h3 class="pa-modal__title">{title}</h3>
				{/if}
				<button class="pa-modal__close" onclick={handleClose}>✕</button>
			</div>
		{/if}

		{#if children}
			<div class="pa-modal__body">
				{@render children()}
			</div>
		{/if}

		{#if footer}
			<div class="pa-modal__footer">
				{@render footer()}
			</div>
		{/if}
	</div>
</div>
