import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { LayoutServerLoad } from './$types';
import type { ThemeOption } from '@keenmate/svelte-pure-admin';
import { ensureTheme } from '$lib/server/theme-installer';
import { getThemesDir } from '$lib/server/paths';

// Per-request — must NOT be prerendered. The on-demand installer needs to run live.
export const prerender = false;

interface ThemeManifestVariant {
	id?: string;
	name?: string;
	file?: string;
}

interface ThemeManifest {
	id?: string;
	name?: string;
	colorVariants?: ThemeManifestVariant[];
}

// Resolve the actual CSS path on disk. The CLI's registry extraction puts files
// at css/<id>.css; some local-built theme sources use dist/<id>.css. Probe both
// before trusting the manifest, so heterogeneous sources work side-by-side.
function resolveCssRelative(themeDir: string, id: string, manifestFile: string | undefined): string | null {
	const candidates = [`css/${id}.css`, `dist/${id}.css`, manifestFile].filter((c): c is string => Boolean(c));
	for (const candidate of candidates) {
		if (existsSync(join(themeDir, candidate))) return candidate;
	}
	return null;
}

function readThemes(themesRoot: string): ThemeOption[] {
	if (!existsSync(themesRoot)) return [];

	const themes: ThemeOption[] = [];

	for (const entry of readdirSync(themesRoot)) {
		const themeDir = join(themesRoot, entry);
		if (!statSync(themeDir).isDirectory()) continue;

		const manifestPath = join(themeDir, 'theme.json');
		if (!existsSync(manifestPath)) continue;

		try {
			const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as ThemeManifest;
			const id = manifest.id ?? entry;
			const name = manifest.name ?? entry;
			const defaultVariant = manifest.colorVariants?.find((v) => !v.id) ?? manifest.colorVariants?.[0];
			const cssRelative = resolveCssRelative(themeDir, id, defaultVariant?.file);
			if (!cssRelative) continue; // No CSS on disk → skip rather than ship a 404
			themes.push({ id, name, cssPath: `/themes/${id}/${cssRelative}` });
		} catch {
			// Skip malformed manifests rather than failing the whole build
		}
	}

	themes.sort((a, b) => a.name.localeCompare(b.name));
	return themes;
}

export const load: LayoutServerLoad = async ({ url, cookies }) => {
	const themesRoot = getThemesDir();

	// If the request asked for a specific theme (?theme= or cookie), make sure it's
	// installed before reading the on-disk manifest list. This is what makes share
	// links like /alerts?theme=ayu work even when the running image only shipped a
	// subset of themes — the installer fetches the missing one from pureadmin.io
	// and then the SettingsPanel's ?theme handling sees it as a valid choice.
	const requestedTheme = url.searchParams.get('theme') ?? cookies.get('theme');
	if (requestedTheme) {
		await ensureTheme({ themesDir: themesRoot, slug: requestedTheme });
	}

	return { themes: readThemes(themesRoot) };
};
