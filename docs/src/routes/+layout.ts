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

export const load: LayoutLoad = async ({ url }) => {
	// Read settings from query params (priority) or cookies (fallback) or defaults
	const theme = url.searchParams.get('theme') || getCookie('theme') || 'audi';
	const containerWidth = url.searchParams.get('containerWidth') || getCookie('containerWidth') || 'fluid';
	const sidebarMode = url.searchParams.has('sidebarMode')
		? url.searchParams.get('sidebarMode')
		: (getCookie('sidebarMode') || '');

	// If query params were provided, update cookies
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

	return {
		theme,
		containerWidth,
		sidebarMode
	};
};
