/**
 * Shortcut Registry Types
 *
 * Type definitions for the global keyboard shortcut registry.
 */

/**
 * Modifier keys for a shortcut
 */
export interface ShortcutModifiers {
	/** Ctrl key (Windows/Linux) */
	ctrl?: boolean;
	/** Shift key */
	shift?: boolean;
	/** Alt key (Windows/Linux) / Option key (macOS) */
	alt?: boolean;
	/** Meta key (Cmd on macOS, Win key on Windows) */
	meta?: boolean;
}

/**
 * A registered keyboard shortcut
 */
export interface Shortcut {
	/** Unique identifier for this shortcut */
	id: string;

	/** The key to press (e.g., 'k', 'Escape', '?', 'ArrowUp') */
	key: string;

	/** Modifier keys required */
	modifiers?: ShortcutModifiers;

	/** Human-readable description (shown in help dialog) */
	description: string;

	/** Category for grouping in help dialog (e.g., 'Navigation', 'Dialogs') */
	category?: string;

	/** Action to execute when shortcut is triggered */
	action: () => void;

	/** Whether the shortcut is currently enabled (default: true) */
	enabled?: boolean;

	/** Scope for the shortcut (default: 'global') */
	scope?: ShortcutScope;

	/** Priority for conflict resolution (higher = handled first, default: 0) */
	priority?: number;
}

/**
 * Shortcut scope - determines when the shortcut is active
 */
export type ShortcutScope =
	| 'global' // Always active (except in inputs)
	| 'modal' // Only active when a modal is open
	| 'input' // Only active when focused in an input
	| string; // Custom scope

/**
 * Options for registering a shortcut
 */
export type ShortcutRegistration = Omit<Shortcut, 'enabled'> & {
	enabled?: boolean;
};

/**
 * Shortcut registry interface
 */
export interface ShortcutRegistry {
	/** Register a new shortcut, returns unregister function */
	register(shortcut: ShortcutRegistration): () => void;

	/** Unregister a shortcut by ID */
	unregister(id: string): void;

	/** Enable a shortcut by ID */
	enable(id: string): void;

	/** Disable a shortcut by ID */
	disable(id: string): void;

	/** Get all registered shortcuts */
	getAll(): Shortcut[];

	/** Get shortcuts grouped by category */
	getByCategory(): Map<string, Shortcut[]>;

	/** Handle a keydown event */
	handleKeyDown(event: KeyboardEvent): void;

	/** Check if a shortcut with the given ID exists */
	has(id: string): boolean;

	/** Reactive getter: all registered shortcuts */
	readonly all: Shortcut[];

	/** Reactive getter: shortcuts grouped by category */
	readonly byCategory: Map<string, Shortcut[]>;

	/** Reactive getter: number of registered shortcuts */
	readonly count: number;
}
