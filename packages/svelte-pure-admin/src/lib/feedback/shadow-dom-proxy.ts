/**
 * Shadow DOM Proxy for Floating UI
 *
 * When a trigger element lives inside Shadow DOM (e.g. a toolbar button from <web-grid>),
 * Floating UI's computePosition() can't resolve its position from the light DOM context.
 * This utility creates a light-DOM proxy element at the same coordinates as the real trigger,
 * so Floating UI can position correctly.
 *
 * Usage:
 *   const proxy = createShadowDOMProxy();
 *   const target = proxy.getTarget(trigger);  // returns trigger or proxy element
 *   proxy.destroy();                           // cleanup
 */

export interface ShadowDOMProxy {
	/** Returns the trigger itself if in light DOM, or a proxy element if in Shadow DOM */
	getTarget(trigger: HTMLElement): HTMLElement;
	/** Removes the proxy element from the DOM */
	destroy(): void;
}

export function createShadowDOMProxy(): ShadowDOMProxy {
	let proxyEl: HTMLElement | null = null;

	function getTarget(trigger: HTMLElement): HTMLElement {
		if (trigger.getRootNode() instanceof ShadowRoot) {
			// Trigger is inside Shadow DOM — Floating UI can't reach it.
			// Use a light-DOM proxy at the same coordinates.
			if (!proxyEl) {
				proxyEl = document.createElement('span');
				proxyEl.style.cssText = 'position: fixed; pointer-events: none; visibility: hidden;';
				document.body.appendChild(proxyEl);
			}
			const rect = trigger.getBoundingClientRect();
			proxyEl.style.left = `${rect.left}px`;
			proxyEl.style.top = `${rect.top}px`;
			proxyEl.style.width = `${rect.width}px`;
			proxyEl.style.height = `${rect.height}px`;
			return proxyEl;
		}
		return trigger;
	}

	function destroy() {
		proxyEl?.remove();
		proxyEl = null;
	}

	return { getTarget, destroy };
}
