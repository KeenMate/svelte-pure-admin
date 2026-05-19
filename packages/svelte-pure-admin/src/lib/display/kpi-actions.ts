/**
 * Pure Admin KPI behaviour — shared Svelte actions.
 *
 * Mirrors `demo/js/kpi-showcases.js` from @keenmate/pure-admin-core 2.7.1:
 *
 *   1. kpiPopover         — cursor-anchored hover detail popover (Floating UI).
 *   2. kpiSparklineDots   — SVG <circle> → CSS <span> endpoint dot conversion
 *                           so dots stay round under preserveAspectRatio="none".
 *
 * Both are per-host actions: attach to the tile / row / chart wrapper
 * element. Cleanup is scoped to the host so unmounting a KPI tile removes
 * its moved-to-<body> popover and event listeners.
 *
 * Requires Floating UI (@floating-ui/dom) loaded globally as
 * window.FloatingUIDOM — same convention as Tooltip / Popconfirm.
 * No-op when Floating UI is missing (popover only — sparkline conversion
 * has no FloatingUI dependency).
 */

import type { Action } from 'svelte/action';

/**
 * Cursor-following detail popover. Attach to the host tile/row that contains
 * a single direct-child `.pa-kpi-detail` element. The action moves that
 * detail to <body> on mount (to escape ancestor overflow:hidden), follows
 * the cursor inside the host via Floating UI's virtual element pattern,
 * and toggles `data-show` on mouseenter/leave.
 */
export const kpiPopover: Action<HTMLElement> = (node) => {
	const detail = node.querySelector<HTMLElement>(':scope > .pa-kpi-detail')
		?? node.querySelector<HTMLElement>('.pa-kpi-detail');
	if (!detail) return {};
	if (typeof window === 'undefined' || !window.FloatingUIDOM) {
		return {};
	}

	const { computePosition, flip, shift, offset } = window.FloatingUIDOM;

	const originalParent = detail.parentElement;
	document.body.appendChild(detail);

	let cursorX = 0;
	let cursorY = 0;
	const virtualEl = {
		getBoundingClientRect() {
			return {
				width: 0,
				height: 0,
				x: cursorX,
				y: cursorY,
				top: cursorY,
				left: cursorX,
				right: cursorX,
				bottom: cursorY,
				toJSON() { return this; }
			};
		}
	};

	const reposition = () => {
		computePosition(virtualEl, detail, {
			strategy: 'fixed',
			placement: 'top-start',
			middleware: [offset(14), flip(), shift({ padding: 8 })]
		}).then(({ x, y }) => {
			detail.style.left = `${x}px`;
			detail.style.top = `${y}px`;
		});
	};

	const onEnter = (e: MouseEvent) => {
		cursorX = e.clientX;
		cursorY = e.clientY;
		detail.setAttribute('data-show', '');
		reposition();
	};
	const onMove = (e: MouseEvent) => {
		cursorX = e.clientX;
		cursorY = e.clientY;
		reposition();
	};
	const onLeave = () => {
		detail.removeAttribute('data-show');
	};

	node.addEventListener('mouseenter', onEnter);
	node.addEventListener('mousemove', onMove);
	node.addEventListener('mouseleave', onLeave);

	return {
		destroy() {
			node.removeEventListener('mouseenter', onEnter);
			node.removeEventListener('mousemove', onMove);
			node.removeEventListener('mouseleave', onLeave);
			if (detail.parentElement === document.body) {
				if (originalParent && originalParent.isConnected) {
					originalParent.appendChild(detail);
				} else {
					detail.remove();
				}
			}
		}
	};
};

/**
 * SVG endpoint-dot conversion. Attach to the chart wrapper containing one
 * or more KPI sparkline SVGs. For every nested SVG that carries a
 * <circle>, the circle is removed and replaced with a CSS-pixel-sized
 * <span class="pa-kpi-spark-dot"> pinned at the same (x, y) — so the dot
 * stays circular even though the SVG uses preserveAspectRatio="none".
 *
 * If the SVG's parent isn't already `.pa-kpi-spark-wrap` and isn't a tight
 * positioned anchor (height within 4px of the SVG), the action inserts a
 * `<span class="pa-kpi-spark-wrap">` between parent and SVG to provide one.
 */
export const kpiSparklineDots: Action<HTMLElement> = (node) => {
	const svgs = node.matches('svg')
		? [node as unknown as SVGSVGElement]
		: Array.from(node.querySelectorAll<SVGSVGElement>('svg'));
	const wrappersCreated: HTMLElement[] = [];
	const dotsCreated: HTMLElement[] = [];

	for (const svg of svgs) {
		const circle = svg.querySelector('circle');
		if (!circle) continue;

		const cx = parseFloat(circle.getAttribute('cx') ?? '0');
		const cy = parseFloat(circle.getAttribute('cy') ?? '0');
		const vb = svg.viewBox.baseVal;
		const xPct = ((cx - vb.x) / vb.width) * 100;
		const yPct = ((cy - vb.y) / vb.height) * 100;

		let wrap = svg.parentElement;
		if (!wrap) continue;

		if (!wrap.classList.contains('pa-kpi-spark-wrap')) {
			const pos = getComputedStyle(wrap).position;
			const tightAnchor = pos !== 'static' && pos !== ''
				&& Math.abs(wrap.getBoundingClientRect().height - svg.getBoundingClientRect().height) < 4;
			if (!tightAnchor) {
				const newWrap = document.createElement('span');
				newWrap.className = 'pa-kpi-spark-wrap';
				wrap.insertBefore(newWrap, svg);
				newWrap.appendChild(svg);
				wrap = newWrap;
				wrappersCreated.push(newWrap);
			}
		}

		const dot = document.createElement('span');
		dot.className = 'pa-kpi-spark-dot';
		dot.style.left = `${xPct}%`;
		dot.style.top = `${yPct}%`;
		wrap.appendChild(dot);
		dotsCreated.push(dot);

		circle.remove();
	}

	return {
		destroy() {
			for (const dot of dotsCreated) dot.remove();
			for (const wrap of wrappersCreated) {
				const svg = wrap.querySelector('svg');
				if (svg && wrap.parentElement) {
					wrap.parentElement.insertBefore(svg, wrap);
				}
				wrap.remove();
			}
		}
	};
};
