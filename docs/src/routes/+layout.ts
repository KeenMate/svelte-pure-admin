import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';

function getCookie(name: string): string | null {
	if (!browser) return null;
	const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
	return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string) {
	if (!browser) return;
	document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000`;
}

export const load: LayoutLoad = async ({ url, data }) => {
	// Read settings from query params (priority) or cookies (fallback) or defaults
	const requestedTheme = url.searchParams.get('theme') || getCookie('theme') || 'audi';
	const containerWidth = url.searchParams.get('containerWidth') || getCookie('containerWidth') || 'fluid';
	const sidebarMode = url.searchParams.has('sidebarMode')
		? url.searchParams.get('sidebarMode')
		: (getCookie('sidebarMode') || '');

	// Validate theme against the actually-installed set (data.themes from +layout.server.ts).
	// Stops `?theme=foo` (or a poisoned cookie) from sticking around if the requested theme
	// isn't shipped in this build — important for Docker images that install a subset.
	// Falls back to first installed theme, or 'audi' if the list is somehow empty.
	const installedIds = new Set(data?.themes?.map((t) => t.id) ?? []);
	const fallbackTheme = data?.themes?.[0]?.id ?? 'audi';
	const theme = installedIds.has(requestedTheme) ? requestedTheme : fallbackTheme;

	// If query params were provided, update cookies (always with the validated value)
	if (browser) {
		if (url.searchParams.has('theme')) {
			setCookie('theme', theme);
		}
		if (url.searchParams.has('containerWidth')) {
			setCookie('containerWidth', containerWidth);
		}
		if (url.searchParams.has('sidebarMode')) {
			setCookie('sidebarMode', sidebarMode || '');
		}
	}

	// If the cookie held a now-invalid theme (e.g. installed set shrank between deploys),
	// rewrite it to the fallback so subsequent visits don't repeat the dance.
	if (browser && theme !== requestedTheme && getCookie('theme') === requestedTheme) {
		setCookie('theme', theme);
	}

	// Forward server-load data (themes derived from disk in +layout.server.ts)
	return {
		...data,
		theme,
		containerWidth,
		sidebarMode
	};
};
