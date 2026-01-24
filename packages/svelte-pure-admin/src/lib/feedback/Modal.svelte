<script lang="ts">
	/**
	 * Pure Admin Modal Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/modals.html
	 */

	type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fw';
	type ModalVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';
	type ModalPosition = 'center' | 'top';

	interface Props {
		/** Show modal */
		show?: boolean;
		/** Modal size */
		size?: ModalSize;
		/** Modal variant/theme (for full modal theming) */
		variant?: ModalVariant;
		/** Header variant (for header theming only) */
		headerVariant?: ModalVariant;
		/** Modal position */
		position?: ModalPosition;
		/** Scrollable body content */
		scrollable?: boolean;
		/** Static modal - prevents closing via ESC key or backdrop click */
		isStatic?: boolean;
		/** Modal title */
		title?: string;
		/** Show close button in header (default: true) */
		showClose?: boolean;
		/** Close on Escape key (default: true, ignored when isStatic is true) */
		closeOnEscape?: boolean;
		/** Called before close - return false to prevent closing */
		onBeforeClose?: () => boolean | void;
		/** Close handler (called after close) */
		onClose?: () => void;
		/** Additional CSS classes */
		class?: string;
		/** Additional CSS classes for body */
		bodyClass?: string;
		/** Additional CSS classes for footer */
		footerClass?: string;
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
		position = 'center',
		scrollable = false,
		isStatic = false,
		title,
		showClose = true,
		closeOnEscape = true,
		onBeforeClose,
		onClose,
		class: className = '',
		bodyClass = '',
		footerClass = '',
		header,
		children,
		footer
	}: Props = $props();

	// Build class string for modal
	const modalClasses = $derived(() => {
		const base = ['pa-modal'];
		if (show) base.push('pa-modal--show');
		if (variant) base.push(`pa-modal--${variant}`);
		if (position === 'top') base.push('pa-modal--top');
		if (isStatic) base.push('pa-modal--static');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build class string for body
	const bodyClasses = $derived(() => {
		const base = ['pa-modal__body'];
		if (scrollable) base.push('pa-modal__body--scrollable');
		if (bodyClass) base.push(bodyClass);
		return base.join(' ');
	});

	// Build class string for footer
	const footerClasses = $derived(() => {
		const base = ['pa-modal__footer'];
		if (footerClass) base.push(footerClass);
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
		// Check if close should be prevented
		if (onBeforeClose && onBeforeClose() === false) {
			return;
		}
		show = false;
		if (onClose) onClose();
	}

	function handleBackdropClick() {
		// Static modals don't close on backdrop click
		if (isStatic) return;
		handleClose();
	}

	function handleKeyDown(event: KeyboardEvent) {
		// Static modals don't close on ESC key
		if (isStatic) return;
		if (show && closeOnEscape && event.key === 'Escape') {
			handleClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

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
				{#if showClose}<button class="pa-btn pa-btn--primary pa-btn--icon-only pa-btn--sm" onclick={handleClose}>✕</button>{/if}
			</div>
		{/if}

		{#if children}
			<div class={bodyClasses()}>
				{@render children()}
			</div>
		{/if}

		{#if footer}
			<div class={footerClasses()}>
				{@render footer()}
			</div>
		{/if}
	</div>
</div>
