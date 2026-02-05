import { cpSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const outDir = join(__dirname, '..', 'static', 'themes');

mkdirSync(outDir, { recursive: true });

const themes = ['audi', 'corporate', 'dark', 'express', 'minimal'];

for (const theme of themes) {
	const pkg = `@keenmate/pure-admin-theme-${theme}`;
	try {
		// resolve() returns the main CSS file path (the package "." export)
		const cssPath = require.resolve(pkg);
		cpSync(cssPath, join(outDir, `${theme}.css`));
		console.log(`Copied ${pkg} → static/themes/${theme}.css`);
	} catch (e) {
		console.warn(`Warning: could not copy ${pkg}: ${e.message}`);
	}
}
