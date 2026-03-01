<script lang="ts">
	/**
	 * Pure Admin Popconfirm Component (Svelte 5)
	 * Based on @keenmate/pure-admin-core snippets/popconfirm.html
	 *
	 * Small confirmation dialogs anchored to trigger elements.
	 * Perfect for delete confirmations and quick yes/no decisions.
	 *
	 * Requires: Floating UI (FloatingUIDOM) loaded globally
	 */

	import { onMount } from 'svelte';
	import { _ } from '../i18n';
	import { createShadowDOMProxy } from './shadow-dom-proxy';

	type Position = 'top' | 'bottom' | 'left' | 'right';
	type IconVariant = 'danger' | 'warning' | 'info';

	interface Props {
		/** Show/hide popconfirm */
		show?: boolean;
		/** Message text to display */
		messageText: string;
		/** Position relative to trigger */
		position?: Position;
		/** Icon variant */
		icon?: IconVariant;
		/** Compact size */
		isCompact?: boolean;
		/** Confirm button text */
		confirmText?: string;
		/** Cancel button text */
		cancelText?: string;
		/** Confirm button variant */
		confirmVariant?: string;
		/** Trigger element (for positioning) */
		trigger?: HTMLElement | null;
		/** Confirm callback */
		onconfirm?: () => void;
		/** Cancel callback */
		oncancel?: () => void;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		show = $bindable(false),
		messageText,
		position = 'bottom',
		icon,
		isCompact = false,
		confirmText,
		cancelText,
		confirmVariant = 'primary',
		trigger = null,
		onconfirm,
		oncancel,
		class: className = ''
	}: Props = $props();

	// Use i18n defaults if props not provided
	const resolvedConfirmText = $derived(confirmText ?? $_('pureAdmin.popconfirm.confirm'));
	const resolvedCancelText = $derived(cancelText ?? $_('pureAdmin.popconfirm.cancel'));

	let popconfirmEl: HTMLDivElement;
	let actualPosition = $state<Position>('bottom');
	let isPositioned = $state(false);
	const shadowProxy = createShadowDOMProxy();

	// Sync actualPosition with position prop (before Floating UI adjusts it)
	$effect(() => {
		actualPosition = position;
	});

	// Build class string
	const classes = $derived(() => {
		const base = ['pa-popconfirm', `pa-popconfirm--${actualPosition}`];
		if (isCompact) base.push('pa-popconfirm--compact');
		if (show) base.push('is-open');
		if (className) base.push(className);
		return base.join(' ');
	});

	// Build message class string
	const messageClasses = $derived(() => {
		const base = ['pa-popconfirm__message'];
		if (icon) {
			base.push('pa-popconfirm__icon');
			base.push(`pa-popconfirm__icon--${icon}`);
		}
		return base.join(' ');
	});

	async function updatePosition() {
		if (!show || !trigger || !popconfirmEl || typeof window === 'undefined') return;

		// Check if Floating UI is available
		if (!window.FloatingUIDOM) {
			console.warn('Floating UI not loaded. Popconfirm positioning may be incorrect.');
			return;
		}

		const { computePosition, flip, shift, offset } = window.FloatingUIDOM;

		// Use proxy if trigger is inside Shadow DOM (Floating UI can't reach it directly)
		const positionTarget = shadowProxy.getTarget(trigger);

		try {
			const { x, y, placement } = await computePosition(positionTarget, popconfirmEl, {
				placement: position,
				middleware: [
					offset(8),
					flip(),
					shift({ padding: 10 })
				]
			});

			actualPosition = placement.split('-')[0] as Position;

			Object.assign(popconfirmEl.style, {
				left: `${x}px`,
				top: `${y}px`
			});

			isPositioned = true;
		} catch (error) {
			console.error('Error positioning popconfirm:', error);
		}
	}

	function handleConfirm() {
		if (onconfirm) onconfirm();
		show = false;
	}

	function handleCancel() {
		if (oncancel) oncancel();
		show = false;
	}

	function handleClickOutside(event: MouseEvent) {
		if (!show) return;

		const target = event.target as Node;
		if (
			popconfirmEl &&
			!popconfirmEl.contains(target) &&
			trigger &&
			!trigger.contains(target)
		) {
			show = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			shadowProxy.destroy();
		};
	});

	$effect(() => {
		if (show && trigger) {
			// Reset position state so the popconfirm is hidden until Floating UI calculates
			isPositioned = false;
			// Use setTimeout to ensure DOM is ready and trigger is positioned
			setTimeout(() => updatePosition(), 0);
		}
	});

	$effect(() => {
		if (!show) return;

		const handleScroll = () => updatePosition();
		const handleResize = () => updatePosition();

		window.addEventListener('scroll', handleScroll, true);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('scroll', handleScroll, true);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div bind:this={popconfirmEl} class={classes()} style:visibility={show && !isPositioned ? 'hidden' : undefined}>
	<div class="pa-popconfirm__arrow"></div>
	<div class="pa-popconfirm__content">
		<div class={messageClasses()}>
			<p>{messageText}</p>
		</div>
		<div class="pa-popconfirm__actions">
			<button class="pa-btn pa-btn--secondary" onclick={handleCancel}>
				{resolvedCancelText}
			</button>
			<button class={`pa-btn pa-btn--${confirmVariant}`} onclick={handleConfirm}>
				{resolvedConfirmText}
			</button>
		</div>
	</div>
</div>

<svelte:window />
