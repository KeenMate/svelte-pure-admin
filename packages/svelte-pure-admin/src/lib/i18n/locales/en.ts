/**
 * English translations (default)
 */
import type { TranslationKeys } from '../types';

export const en: TranslationKeys = {
	dialog: {
		confirm: 'Confirm',
		cancel: 'Cancel',
		ok: 'OK',
		alert: 'Alert',
		input: 'Input',
		areYouSure: 'Are you sure?',
		enterValue: 'Enter value:',
		defaultTitle: 'Dialog',
		invalidInput: 'Invalid input'
	},

	popconfirm: {
		confirm: 'Confirm',
		cancel: 'Cancel'
	},

	shortcuts: {
		title: 'Keyboard Shortcuts',
		noShortcuts: 'No shortcuts registered.',
		generalCategory: 'General',
		showShortcuts: 'Show keyboard shortcuts'
	},

	commandPalette: {
		placeholder: 'Type / for commands, : for search, or just type...',
		loading: 'Loading...',
		commands: 'Commands',
		searchIn: 'Search In',
		search: 'Search',
		noMatchingCommands: 'No matching commands',
		typeToSearch: 'Type to search...',
		noMatchingContexts: 'No matching search contexts',
		noResults: 'No results found',
		idleMessage: 'Type / for commands, : for search contexts, or start typing to search...',
		preview: 'Preview:',
		navigate: 'Navigate',
		select: 'Select',
		complete: 'Complete',
		close: 'Close',
		searchFailed: 'Search failed. Please try again.',
		loadOptionsFailed: 'Failed to load options. Please try again.',
		openCommandPalette: 'Open command palette'
	},

	loadMore: {
		loadMore: 'Load More',
		loading: 'Loading...'
	}
};
