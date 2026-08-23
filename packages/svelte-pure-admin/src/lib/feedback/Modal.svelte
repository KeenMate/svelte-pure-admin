<script lang="ts">
	/**
	 * Pure Admin Modal Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/modals.html
	 */

	import { _ } from '../i18n';

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
		/** Banded variant — header AND footer wear the role colour as filled bands. Compose with `variant` for the colour (success/warning/danger/info). Since core v2.7.0. */
		isBanded?: boolean;
		/** Modal position */
		position?: ModalPosition;
		/** Scrollable body content */
		isScrollable?: boolean;
		/** Static modal - prevents closing via ESC key or backdrop click */
		isStatic?: boolean;
		/** Modal title text */
		titleText?: string;
		/** Show close button in header (default: true) */
		shouldShowClose?: boolean;
		/** Close on Escape key (default: true, ignored when isStatic is true) */
		shouldCloseOnEscape?: boolean;
		/** Called before close - return false to prevent closing */
		beforeCloseCallback?: () => boolean | void;
		/** Close callback (called after close) */
		onclose?: () => void;
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
		isBanded = false,
		position = 'center',
		isScrollable = false,
		isStatic = false,
		titleText,
		shouldShowClose = true,
		shouldCloseOnEscape = true,
		beforeCloseCallback,
		onclose,
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
		if (isBanded) base.push('pa-modal--banded');
		if (position === 'top') base.push('pa-modal--top');
		if (isStatic) base.push('pa-modal--static');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build class string for body
	const bodyClasses = $derived(() => {
		const base = ['pa-modal__body'];
		if (isScrollable) base.push('pa-modal__body--scrollable');
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

	// Close-button variant mirrors the core snippets: `--secondary` on a plain
	// header, `--light` when the header wears a role colour (variant / headerVariant
	// / banded band) so the × reads against the coloured fill. Never `--primary`
	// (a filled accent close button is visually far too heavy for a header control).
	const closeBtnClasses = $derived(
		`pa-btn pa-btn--sm pa-btn--icon-only pa-btn--${
			variant || headerVariant || isBanded ? 'light' : 'secondary'
		}`
	);

	// Track external show changes so that setting show=false via binding
	// goes through the same close flow (beforeCloseCallback / onclose)
	let wasOpen = false;
	let internalClose = false;

	$effect.pre(() => {
		if (wasOpen && !show && !internalClose) {
			// show was set to false externally (e.g., parent toggled bind:show)
			if (beforeCloseCallback && beforeCloseCallback() === false) {
				// Prevent close - restore show
				show = true;
				internalClose = false;
				return;
			}
			onclose?.();
		}
		wasOpen = show;
		internalClose = false;
	});

	function handleClose() {
		// Check if close should be prevented
		if (beforeCloseCallback && beforeCloseCallback() === false) {
			return;
		}
		internalClose = true;
		show = false;
		if (onclose) onclose();
	}

	function handleBackdropClick() {
		// Static modals don't close on backdrop click
		if (isStatic) return;
		handleClose();
	}

	function handleKeyDown(event: KeyboardEvent) {
		// Static modals don't close on ESC key
		if (isStatic) return;
		if (show && shouldCloseOnEscape && event.key === 'Escape') {
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
		{#if header || titleText}
			<div class={headerClasses()}>
				{#if header}
					{@render header()}
				{:else if titleText}
					<h3 class="pa-modal__title">{titleText}</h3>
				{/if}
				{#if shouldShowClose}<button class={closeBtnClasses} onclick={handleClose} aria-label={$_('pureAdmin.buttons.close')}><span class="pa-icon pa-icon--x" aria-hidden="true"></span></button>{/if}
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
