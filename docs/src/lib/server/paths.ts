import { resolve } from 'node:path';

/**
 * Absolute path to the themes directory used by both the on-demand installer
 * (theme-installer.ts) and the layout server load (+layout.server.ts).
 *
 * Resolution order:
 *   1. PA_THEMES_DIR env var (absolute or relative-to-cwd) — used in containers
 *      and when running the prod Node server from a different cwd
 *   2. <cwd>/static/themes — matches Vite dev (cwd = docs/) and mirrors the
 *      CLI default for `themesDir` in pureadmin.json
 */
export function getThemesDir(): string {
	const fromEnv = process.env.PA_THEMES_DIR;
	if (fromEnv) return resolve(fromEnv);
	return resolve(process.cwd(), 'static', 'themes');
}
