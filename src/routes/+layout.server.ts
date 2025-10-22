import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, cookies }) => {
	// Read settings from query params (priority) or cookies (fallback) or defaults
	const theme = url.searchParams.get('theme') || cookies.get('theme') || 'audi';
	const containerWidth = url.searchParams.get('containerWidth') || cookies.get('containerWidth') || 'fluid';
	const sidebarMode = url.searchParams.get('sidebarMode') !== null
		? url.searchParams.get('sidebarMode')
		: (cookies.get('sidebarMode') || '');

	// If query params were provided, update cookies
	if (url.searchParams.has('theme')) {
		cookies.set('theme', theme, { path: '/', maxAge: 31536000 }); // 1 year
	}
	if (url.searchParams.has('containerWidth')) {
		cookies.set('containerWidth', containerWidth, { path: '/', maxAge: 31536000 });
	}
	if (url.searchParams.has('sidebarMode')) {
		cookies.set('sidebarMode', sidebarMode || '', { path: '/', maxAge: 31536000 });
	}

	return {
		theme,
		containerWidth,
		sidebarMode
	};
};
