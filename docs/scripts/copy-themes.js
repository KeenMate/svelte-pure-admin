import { cpSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsRoot = join(__dirname, '..');
const projectRoot = join(docsRoot, '..'); // svelte-pure-admin root
const outDir = join(docsRoot, 'static', 'themes');

mkdirSync(outDir, { recursive: true });

const themes = ['audi', 'corporate', 'dark', 'express', 'minimal', 'cafeindustrial'];

let copied = 0;

function copyThemeDir(themeRoot, theme) {
	const destDir = join(outDir, theme);

	// Copy css/ directory (contains the compiled CSS)
	const cssDir = join(themeRoot, 'dist');
	const cssFile = join(cssDir, `${theme}.css`);
	if (!existsSync(cssFile)) return false;

	const destCssDir = join(destDir, 'css');
	mkdirSync(destCssDir, { recursive: true });
	cpSync(cssFile, join(destCssDir, `${theme}.css`));
	console.log(`  Copied ${theme}/css/${theme}.css`);

	// Copy assets/ directory if it exists (fonts, etc.)
	const assetsDir = join(themeRoot, 'assets');
	if (existsSync(assetsDir)) {
		cpSync(assetsDir, join(destDir, 'assets'), { recursive: true });
		console.log(`  Copied ${theme}/assets/`);
	}

	return true;
}

// Try .themes.json first (local dev)
const themesJsonPath = join(projectRoot, '.themes.json');
if (existsSync(themesJsonPath)) {
	const config = JSON.parse(readFileSync(themesJsonPath, 'utf-8'));
	console.log('Loading themes from .themes.json');

	for (const theme of themes) {
		const themePath = config.themes?.[theme];
		if (!themePath) continue;

		const absPath = resolve(projectRoot, themePath);
		if (copyThemeDir(absPath, theme)) {
			copied++;
		} else {
			console.warn(`  Warning: CSS not found for ${theme} at ${absPath}`);
		}
	}
} else {
	// Try themes/ directory (downloaded bundle from pureadmin.io)
	const bundleDir = join(projectRoot, 'themes');
	if (existsSync(bundleDir)) {
		console.log('Loading themes from themes/ directory (bundle)');

		for (const theme of themes) {
			const themeDir = join(bundleDir, theme);
			if (existsSync(themeDir) && copyThemeDir(themeDir, theme)) {
				copied++;
			}
		}
	}
}

if (copied === 0) {
	console.warn('\nNo themes found. For local development, create .themes.json:');
	console.warn(JSON.stringify({
		themes: {
			audi: '../pure-admin-themes/audi',
			corporate: '../pure-admin-themes/corporate',
			dark: '../pure-admin-themes/dark',
			express: '../pure-admin-themes/express',
			minimal: '../pure-admin-themes/minimal',
			cafeindustrial: '../pure-admin-cafeindustrial-theme'
		}
	}, null, 2));
} else {
	console.log(`\n${copied} theme(s) copied to static/themes/`);
}
