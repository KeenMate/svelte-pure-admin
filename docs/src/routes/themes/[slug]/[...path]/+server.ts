/**
 * GET /themes/:slug/* — serve theme files (CSS, fonts, manifest, assets).
 *
 * Runs ensureTheme() on miss so that linking with ?theme=foo for a theme not
 * yet installed in this build will trigger an on-demand fetch from pureadmin.io.
 *
 * Mirrors the pattern from pure-admin's Express server and keen-pure-admin's
 * Phoenix ThemePlug.
 */

import { existsSync, statSync, readFileSync } from 'node:fs';
import { extname, join, normalize, sep } from 'node:path';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ensureTheme } from '$lib/server/theme-installer';
import { getThemesDir } from '$lib/server/paths';

const MIME_TYPES: Record<string, string> = {
	'.css': 'text/css; charset=utf-8',
	'.woff2': 'font/woff2',
	'.woff': 'font/woff',
	'.ttf': 'font/ttf',
	'.eot': 'application/vnd.ms-fontobject',
	'.svg': 'image/svg+xml',
	'.json': 'application/json',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.scss': 'text/plain; charset=utf-8',
	'.md': 'text/markdown; charset=utf-8'
};

export const GET: RequestHandler = async ({ params }) => {
	const { slug, path } = params;
	if (!slug || !path) error(404, 'Not found');

	const themesDir = getThemesDir();

	// Make sure the theme is installed (no-op if it already is)
	const installed = await ensureTheme({ themesDir, slug });
	if (!installed) error(404, `Theme "${slug}" not available`);

	const themeDir = join(themesDir, slug);

	// Path-traversal guard: resolve the requested file and verify it stays inside themeDir.
	// adm-zip / fs operations are themselves safe but the URL is user-controlled, so
	// belt-and-braces this before touching the filesystem.
	const safeRel = normalize(path).replace(/^([\\/]|\.\.([\\/]|$))+/, '');
	const filePath = join(themeDir, safeRel);
	if (!filePath.startsWith(themeDir + sep) && filePath !== themeDir) {
		error(400, 'Bad path');
	}

	if (!existsSync(filePath) || !statSync(filePath).isFile()) {
		error(404, 'File not found');
	}

	const body = readFileSync(filePath);
	const mimeType = MIME_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream';

	return new Response(body, {
		headers: {
			'content-type': mimeType,
			// 1 year for CSS/fonts (immutable per theme version); manifests revalidate per-request
			'cache-control': filePath.endsWith('theme.json') ? 'no-cache' : 'public, max-age=31536000, immutable'
		}
	});
};
