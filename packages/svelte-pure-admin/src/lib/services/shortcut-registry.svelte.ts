/**
 * Shortcut Registry Service
 *
 * A centralized registry for keyboard shortcuts using Svelte 5 runes.
 * Components register their shortcuts here instead of managing their own listeners.
 */

import { get } from 'svelte/store';
import { _ } from '../i18n';
import type {
	Shortcut,
	ShortcutRegistration,
	ShortcutRegistry,
	ShortcutModifiers
} from './shortcut-registry-types';

/**
 * Helper to get translation value
 */
function t(key: string): string {
	return get(_)(key);
}

/**
 * Create a shortcut registry instance
 */
function createShortcutRegistry(): ShortcutRegistry {
	let shortcuts = $state<Map<string, Shortcut>>(new Map());

	/**
	 * Generate a key string for matching shortcuts
	 */
	function getShortcutKey(key: string, modifiers?: ShortcutModifiers): string {
		const parts: string[] = [];
		if (modifiers?.ctrl) parts.push('ctrl');
		if (modifiers?.shift) parts.push('shift');
		if (modifiers?.alt) parts.push('alt');
		if (modifiers?.meta) parts.push('meta');
		parts.push(key.toLowerCase());
		return parts.join('+');
	}

	/**
	 * Check if event matches a shortcut's modifiers
	 */
	function modifiersMatch(event: KeyboardEvent, modifiers?: ShortcutModifiers): boolean {
		const ctrl = modifiers?.ctrl ?? false;
		const shift = modifiers?.shift ?? false;
		const alt = modifiers?.alt ?? false;
		const meta = modifiers?.meta ?? false;

		return (
			event.ctrlKey === ctrl &&
			event.shiftKey === shift &&
			event.altKey === alt &&
			event.metaKey === meta
		);
	}

	/**
	 * Check if the event target is an input element
	 */
	function isInputElement(target: EventTarget | null): boolean {
		if (!target || !(target instanceof HTMLElement)) return false;
		const tagName = target.tagName.toLowerCase();
		return (
			tagName === 'input' ||
			tagName === 'textarea' ||
			tagName === 'select' ||
			target.isContentEditable
		);
	}

	/**
	 * Register a new shortcut
	 */
	function register(registration: ShortcutRegistration): () => void {
		const shortcut: Shortcut = {
			...registration,
			enabled: registration.enabled ?? true,
			scope: registration.scope ?? 'global',
			priority: registration.priority ?? 0
		};

		// Check for conflicts
		const existingKey = getShortcutKey(shortcut.key, shortcut.modifiers);
		for (const [id, existing] of shortcuts) {
			if (id === shortcut.id) continue;
			const key = getShortcutKey(existing.key, existing.modifiers);
			if (key === existingKey && existing.scope === shortcut.scope) {
				console.warn(
					`[ShortcutRegistry] Conflict: "${shortcut.id}" has same shortcut as "${id}" (${existingKey})`
				);
			}
		}

		shortcuts.set(shortcut.id, shortcut);

		// Return unregister function
		return () => unregister(shortcut.id);
	}

	/**
	 * Unregister a shortcut by ID
	 */
	function unregister(id: string): void {
		shortcuts.delete(id);
	}

	/**
	 * Enable a shortcut by ID
	 */
	function enable(id: string): void {
		const shortcut = shortcuts.get(id);
		if (shortcut) {
			shortcuts.set(id, { ...shortcut, enabled: true });
		}
	}

	/**
	 * Disable a shortcut by ID
	 */
	function disable(id: string): void {
		const shortcut = shortcuts.get(id);
		if (shortcut) {
			shortcuts.set(id, { ...shortcut, enabled: false });
		}
	}

	/**
	 * Get all registered shortcuts
	 */
	function getAll(): Shortcut[] {
		return Array.from(shortcuts.values());
	}

	/**
	 * Get shortcuts grouped by category
	 */
	function getByCategory(): Map<string, Shortcut[]> {
		const grouped = new Map<string, Shortcut[]>();

		for (const shortcut of shortcuts.values()) {
			const category = shortcut.category ?? t('shortcuts.generalCategory');
			const list = grouped.get(category) ?? [];
			list.push(shortcut);
			grouped.set(category, list);
		}

		// Sort shortcuts within each category by description
		for (const [category, list] of grouped) {
			grouped.set(
				category,
				list.sort((a, b) => a.description.localeCompare(b.description))
			);
		}

		return grouped;
	}

	/**
	 * Check if a shortcut with the given ID exists
	 */
	function has(id: string): boolean {
		return shortcuts.has(id);
	}

	/**
	 * Handle a keydown event - find and execute matching shortcut
	 */
	function handleKeyDown(event: KeyboardEvent): void {
		const isInput = isInputElement(event.target);

		// Get all enabled shortcuts that match the key
		const matching: Shortcut[] = [];

		for (const shortcut of shortcuts.values()) {
			if (!shortcut.enabled) continue;

			// Check scope
			if (shortcut.scope === 'global' && isInput) {
				// Global shortcuts don't fire in inputs (except for special keys like Escape)
				if (event.key !== 'Escape') continue;
			}

			// Check key match (case-insensitive)
			if (event.key.toLowerCase() !== shortcut.key.toLowerCase()) continue;

			// Check modifiers
			if (!modifiersMatch(event, shortcut.modifiers)) continue;

			matching.push(shortcut);
		}

		if (matching.length === 0) return;

		// Sort by priority (higher first)
		matching.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

		// Execute the highest priority shortcut
		const shortcut = matching[0];
		event.preventDefault();
		shortcut.action();
	}

	return {
		register,
		unregister,
		enable,
		disable,
		getAll,
		getByCategory,
		handleKeyDown,
		has,
		// Reactive getters for Svelte 5 components
		get all() {
			return Array.from(shortcuts.values());
		},
		get byCategory() {
			const grouped = new Map<string, Shortcut[]>();

			for (const shortcut of shortcuts.values()) {
				const category = shortcut.category ?? t('shortcuts.generalCategory');
				const list = grouped.get(category) ?? [];
				list.push(shortcut);
				grouped.set(category, list);
			}

			// Sort shortcuts within each category by description
			for (const [category, list] of grouped) {
				grouped.set(
					category,
					list.sort((a, b) => a.description.localeCompare(b.description))
				);
			}

			return grouped;
		},
		get count() {
			return shortcuts.size;
		}
	};
}

/**
 * Singleton shortcut registry instance
 */
export const shortcutRegistry = createShortcutRegistry();

/**
 * Format a shortcut for display (e.g., "Ctrl + K")
 */
export function formatShortcut(shortcut: Shortcut): string {
	const parts: string[] = [];

	if (shortcut.modifiers?.ctrl) parts.push('Ctrl');
	if (shortcut.modifiers?.shift) parts.push('Shift');
	if (shortcut.modifiers?.alt) parts.push('Alt');
	if (shortcut.modifiers?.meta) parts.push('Cmd');

	// Format special keys nicely
	let key = shortcut.key;
	if (key === ' ') key = 'Space';
	else if (key === 'ArrowUp') key = '↑';
	else if (key === 'ArrowDown') key = '↓';
	else if (key === 'ArrowLeft') key = '←';
	else if (key === 'ArrowRight') key = '→';
	else if (key === 'Escape') key = 'Esc';
	else if (key === 'Enter') key = '↵';
	else if (key.length === 1) key = key.toUpperCase();

	parts.push(key);

	return parts.join(' + ');
}
