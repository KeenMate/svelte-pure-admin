/**
 * On-demand theme installer.
 *
 * Ports the pattern used by the pure-admin demo (Express, server.js#ensureTheme)
 * and keen-pure-admin (Phoenix DemoWeb.ThemePlug):
 *
 *   - Per-request handler probes the local themes dir for the requested slug
 *   - On miss, fetches the ZIP from pureadmin.io and extracts it
 *   - Negative-cache failed downloads to prevent hot loops
 *   - Validate the slug against a strict regex before talking to the network
 *   - Idempotent: concurrent requests for the same theme deduplicate
 */

import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import AdmZip from 'adm-zip';

const PUREADMIN_API = process.env.PA_PUREADMIN_API ?? 'https://pureadmin.io';
const FAILED_THEME_TTL_MS = 10 * 60 * 1000; // 10 minutes
const SLUG_PATTERN = /^[a-z0-9-]+$/;

// Negative cache for failed downloads. Keyed by slug, value = timestamp of last failure.
const failedThemes = new Map<string, number>();

// Concurrency dedupe: if two requests ask for theme "foo" simultaneously,
// the second await joins the first promise instead of starting a parallel install.
const inflight = new Map<string, Promise<boolean>>();

export interface EnsureThemeOptions {
	/** Absolute path to the themes root (e.g. docs/static/themes). */
	themesDir: string;
	/** Theme slug (e.g. "audi"). Validated against SLUG_PATTERN before any I/O. */
	slug: string;
}

/**
 * Returns true if the theme is now available on disk.
 * Returns false on slug validation failure, recent download failure, or download error.
 *
 * Always idempotent — calling repeatedly with an already-installed theme is a no-op.
 */
export async function ensureTheme({ themesDir, slug }: EnsureThemeOptions): Promise<boolean> {
	if (!SLUG_PATTERN.test(slug)) return false;

	const themeDir = join(themesDir, slug);
	if (existsSync(themeDir)) return true;

	const failedAt = failedThemes.get(slug);
	if (failedAt && Date.now() - failedAt < FAILED_THEME_TTL_MS) return false;

	const existing = inflight.get(slug);
	if (existing) return existing;

	const promise = downloadAndExtract(themesDir, slug)
		.catch((err) => {
			console.error(`[theme-installer] Failed to install "${slug}":`, err);
			failedThemes.set(slug, Date.now());
			return false;
		})
		.finally(() => {
			inflight.delete(slug);
		});

	inflight.set(slug, promise);
	return promise;
}

async function downloadAndExtract(themesDir: string, slug: string): Promise<boolean> {
	console.log(`[theme-installer] "${slug}" not found locally, downloading from ${PUREADMIN_API}...`);

	const res = await fetch(`${PUREADMIN_API}/api/themes/${slug}/download`);
	if (!res.ok) {
		console.warn(`[theme-installer] Download failed for "${slug}": HTTP ${res.status}`);
		failedThemes.set(slug, Date.now());
		return false;
	}

	const themeDir = join(themesDir, slug);
	mkdirSync(themeDir, { recursive: true });

	const buffer = Buffer.from(await res.arrayBuffer());
	const zip = new AdmZip(buffer);
	zip.extractAllTo(themeDir, /* overwrite */ true);

	// Some published ZIPs unpack files into a top-level <slug>/ directory inside the
	// archive. Detect and unwrap so theme files end up directly under themeDir.
	const wrapped = join(themeDir, slug);
	if (existsSync(wrapped) && existsSync(join(wrapped, 'theme.json'))) {
		// Move contents of wrapped/ up one level
		const tmpRename = join(themesDir, `__${slug}__unwrap`);
		renameSync(themeDir, tmpRename);
		renameSync(join(tmpRename, slug), themeDir);
		// best-effort cleanup of the now-empty wrapper
		try {
			const { rmSync } = await import('node:fs');
			rmSync(tmpRename, { recursive: true, force: true });
		} catch {
			/* leave it; harmless */
		}
	}

	// If the manifest is missing, ask the API for it and write theme.json ourselves.
	// (Some theme ZIPs predate the manifest-in-zip convention.)
	const manifestPath = join(themeDir, 'theme.json');
	if (!existsSync(manifestPath)) {
		try {
			const metaRes = await fetch(`${PUREADMIN_API}/api/themes/${slug}`);
			if (metaRes.ok) {
				const body = (await metaRes.json()) as { theme?: unknown };
				if (body.theme) {
					writeFileSync(manifestPath, JSON.stringify(body.theme, null, 2));
				}
			}
		} catch (err) {
			console.warn(`[theme-installer] Could not fetch metadata for "${slug}":`, err);
		}
	}

	console.log(`[theme-installer] "${slug}" installed to ${themeDir}`);
	return true;
}

/** Return a cached manifest from disk, or null if the theme isn't installed. */
export function readThemeManifest(themesDir: string, slug: string): unknown | null {
	if (!SLUG_PATTERN.test(slug)) return null;
	const manifestPath = join(themesDir, slug, 'theme.json');
	if (!existsSync(manifestPath)) return null;
	try {
		return JSON.parse(readFileSync(manifestPath, 'utf-8'));
	} catch {
		return null;
	}
}
