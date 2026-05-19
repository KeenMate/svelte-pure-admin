# Translations (i18n)

`@keenmate/svelte-pure-admin` uses [svelte-i18n](https://github.com/kaisermann/svelte-i18n) under the hood. All internal component strings (close buttons, aria labels, dialog text, etc.) are translatable. Built-in locales: **English (`en`)** and **Czech (`cs`)** — both bundled and auto-registered on import.

## Zero-Config Usage

No setup required for defaults. Built-in translations load automatically when you import anything from the library.

```svelte
<script>
  import { _, Button, Modal } from '@keenmate/svelte-pure-admin';
</script>

<Modal titleText="Settings" bind:show={showSettings}>
  <p>Content here</p>
</Modal>

<p>{$_('pureAdmin.dialog.confirm')}</p>
<!-- Output: "Confirm" -->
```

> Always import `_`, `locale`, `locales`, `isLoading` from `@keenmate/svelte-pure-admin` (**not** from `svelte-i18n` directly) to ensure auto-initialization runs first.

## The i18n Service

Primary API for managing languages and locales — a Svelte 5 reactive singleton.

```ts
import { i18n } from '@keenmate/svelte-pure-admin';
```

### Reactive properties

| Property | Type | Description |
|----------|------|-------------|
| `i18n.currentLocale` | `string` | Current active locale code |
| `i18n.languages` | `Language[]` | Available languages list |
| `i18n.isLoading` | `boolean` | `true` while loading translations async |
| `i18n.fallbackLocale` | `string` | Fallback locale code |
| `i18n.loadedLocales` | `Set<string>` | Set of loaded locale codes |

### Methods

| Method | Description |
|--------|-------------|
| `i18n.init(options)` | Initialize with options |
| `i18n.setLocale(code)` | Switch locale (async, loads if needed) |
| `i18n.getLanguage(code)` | Get `Language` object by code |
| `i18n.isLocaleLoaded(code)` | Check if locale translations are loaded |
| `i18n.setLanguages(langs)` | Replace entire languages list |
| `i18n.addLanguage(lang)` | Add a language to available list |
| `i18n.removeLanguage(code)` | Remove a language from list |
| `i18n.addTranslations(code, obj)` | Add translations for a locale |
| `i18n.setTranslationLoader(fn)` | Set async loader function |

### Init options

```ts
interface I18nInitOptions {
  locale?: string;          // Initial locale (default: 'en')
  fallbackLocale?: string;  // Fallback (default: 'en')
  languages?: (string | Language)[];
  translations?: Record<string, Record<string, string>>;
  loadTranslations?: (locale: string) => Promise<Record<string, string>>;
}

interface Language {
  code: string;        // 'en', 'cs', 'de'
  name?: string;       // 'English', 'Czech'
  nativeName?: string; // 'English', 'Čeština'
}
```

## Local Locale Files

Flat keys only — no nested objects. Use the `pureAdmin.*` prefix when overriding library strings.

### Pattern A: Static TS/JS modules (bundled with app)

```ts
// src/lib/locales/en.ts
export const en: Record<string, string> = {
  'app.dashboard.title': 'Dashboard',
  'app.users.count': '{count} users',
  // override library defaults:
  'pureAdmin.dialog.confirm': 'Yes, do it!'
};

// src/lib/locales/cs.ts
export const cs: Record<string, string> = {
  'app.dashboard.title': 'Přehled',
  'app.users.count': '{count} uživatelů'
};
```

```ts
// src/lib/i18n-setup.ts
import { i18n } from '@keenmate/svelte-pure-admin';
import { en } from './locales/en';
import { cs } from './locales/cs';

export function setupI18n() {
  i18n.init({
    locale: 'en',
    fallbackLocale: 'en',
    languages: [
      { code: 'en', name: 'English' },
      { code: 'cs', name: 'Czech', nativeName: 'Čeština' }
    ],
    translations: { en, cs }
  });
}
```

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { setupI18n } from '$lib/i18n-setup';
  import '@keenmate/pure-admin-core/css';

  setupI18n();
</script>

<slot />
```

### Pattern B: Lazy-loaded JSON (fetched on demand)

Place files in `static/locales/` (SvelteKit serves from `/locales/*.json`):

```json
// static/locales/de.json
{
  "app.dashboard.title": "Übersicht",
  "pureAdmin.dialog.confirm": "Bestätigen"
}
```

```ts
i18n.init({
  locale: 'en',
  languages: [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' }
  ],
  translations: { en },
  loadTranslations: async (locale) => {
    const res = await fetch(`/locales/${locale}.json`);
    return res.json();
  }
});
```

### Pattern C: Bundled JSON via Vite dynamic import

```ts
loadTranslations: async (locale) => {
  const mod = await import(`./locales/${locale}.json`);
  return mod.default;
}
```

## Switching Locales at Runtime

```ts
import { i18n } from '@keenmate/svelte-pure-admin';

await i18n.setLocale('cs');  // instant if loaded
await i18n.setLocale('de');  // triggers loader if configured
```

Language picker:

```svelte
<script>
  import { i18n, _ } from '@keenmate/svelte-pure-admin';

  async function handleChange(event) {
    await i18n.setLocale(event.target.value);
  }
</script>

<select value={i18n.currentLocale} onchange={handleChange} disabled={i18n.isLoading}>
  {#each i18n.languages as lang}
    <option value={lang.code}>{lang.nativeName || lang.name || lang.code}</option>
  {/each}
</select>

{#if i18n.isLoading}
  <span>{$_('pureAdmin.loadMore.loading')}</span>
{/if}
```

## Adding a New Language

### At init time

```ts
i18n.init({
  locale: 'de',
  fallbackLocale: 'en',
  languages: [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'cs', name: 'Czech', nativeName: 'Čeština' }
  ],
  translations: {
    de: {
      'pureAdmin.dialog.confirm': 'Bestätigen',
      'pureAdmin.dialog.cancel': 'Abbrechen',
      'pureAdmin.buttons.close': 'Schließen',
      'app.dashboard.title': 'Übersicht',
      'app.users.count': '{count} Benutzer'
    }
  }
});
```

### After init

```ts
i18n.addLanguage({ code: 'fr', name: 'Français' });
i18n.addTranslations('fr', {
  'pureAdmin.dialog.confirm': 'Confirmer',
  'pureAdmin.buttons.close': 'Fermer',
  'app.dashboard.title': 'Tableau de bord'
});

await i18n.setLocale('fr');
```

## Overriding Library Translations

Three ways to customize built-in component strings:

```ts
// Method 1: via init translations
i18n.init({
  locale: 'en',
  translations: {
    en: {
      'pureAdmin.dialog.confirm': 'Yes, do it!',
      'pureAdmin.field.copied': 'Done!'
    }
  }
});

// Method 2: registerLibraryTranslations
import { registerLibraryTranslations } from '@keenmate/svelte-pure-admin';
registerLibraryTranslations('en', {
  'pureAdmin.dialog.confirm': 'Yes, do it!'
});

// Method 3: addMessages (svelte-i18n direct)
import { addMessages } from '@keenmate/svelte-pure-admin';
addMessages('en', {
  'pureAdmin.dialog.confirm': 'Confirm action'
});
```

## Translation Store (`$_`)

```svelte
<script>
  import { _ } from '@keenmate/svelte-pure-admin';
</script>

<p>{$_('pureAdmin.dialog.areYouSure')}</p>
<p>{$_('app.greeting', { values: { name: 'John' } })}</p>
<p>{$_('app.users.count', { values: { count: 5 } })}</p>
```

Interpolation uses svelte-i18n syntax: `{count}` in value, pass via `values` object.

## Locale Stores

Re-exported from svelte-i18n:

```ts
import { locale, locales, isLoading } from '@keenmate/svelte-pure-admin';

// $locale     — current locale code (writable store)
// $locales    — array of registered locale codes
// $isLoading  — true while async translations are loading
```

## Built-in Translation Keys

All keys use flat format with `pureAdmin.*` prefix.

### Dialog

| Key | English | Czech |
|-----|---------|-------|
| `pureAdmin.dialog.confirm` | Confirm | Potvrdit |
| `pureAdmin.dialog.alert` | Alert | Upozornění |
| `pureAdmin.dialog.input` | Input | Vstup |
| `pureAdmin.dialog.areYouSure` | Are you sure? | Jste si jisti? |
| `pureAdmin.dialog.enterValue` | Enter value: | Zadejte hodnotu: |
| `pureAdmin.dialog.defaultTitle` | Dialog | Dialog |
| `pureAdmin.dialog.invalidInput` | Invalid input | Neplatný vstup |

### Popconfirm

| Key | English | Czech |
|-----|---------|-------|
| `pureAdmin.popconfirm.confirm` | Confirm | Potvrdit |
| `pureAdmin.popconfirm.cancel` | Cancel | Zrušit |

### Shortcuts

| Key | English |
|-----|---------|
| `pureAdmin.shortcuts.title` | Keyboard Shortcuts |
| `pureAdmin.shortcuts.noShortcuts` | No shortcuts registered. |
| `pureAdmin.shortcuts.generalCategory` | General |
| `pureAdmin.shortcuts.showShortcuts` | Show keyboard shortcuts |

### Command Palette

| Key | English |
|-----|---------|
| `pureAdmin.commandPalette.placeholder` | Type / for commands, : for search... |
| `pureAdmin.commandPalette.loading` | Loading... |
| `pureAdmin.commandPalette.commands` | Commands |
| `pureAdmin.commandPalette.searchIn` | Search In |
| `pureAdmin.commandPalette.search` | Search |
| `pureAdmin.commandPalette.noMatchingCommands` | No matching commands |
| `pureAdmin.commandPalette.typeToSearch` | Type to search... |
| `pureAdmin.commandPalette.noResults` | No results found |
| `pureAdmin.commandPalette.close` | Close |
| `pureAdmin.commandPalette.openCommandPalette` | Open command palette |

### Load More / Field

| Key | English |
|-----|---------|
| `pureAdmin.loadMore.loadMore` | Load More |
| `pureAdmin.loadMore.loading` | Loading... |
| `pureAdmin.field.clickToCopy` | Click to copy |
| `pureAdmin.field.copied` | Copied! |

### Buttons

| Key | English |
|-----|---------|
| `pureAdmin.buttons.ok` | OK |
| `pureAdmin.buttons.cancel` | Cancel |
| `pureAdmin.buttons.confirm` | Confirm |
| `pureAdmin.buttons.close` | Close |
| `pureAdmin.buttons.clearAll` | Clear all |
| `pureAdmin.buttons.refresh` | Refresh |
| `pureAdmin.buttons.moreFilters` | More filters |
| `pureAdmin.buttons.hideFilters` | Hide filters |
| `pureAdmin.buttons.clearFilters` | Clear Filters |
| `pureAdmin.buttons.applyFilters` | Apply Filters |

### Accessibility Labels

| Key | English |
|-----|---------|
| `pureAdmin.a11y.closeProfile` | Close Profile |
| `pureAdmin.a11y.closeDetailPanel` | Close detail panel |
| `pureAdmin.a11y.scrollTabsLeft` | Scroll tabs left |
| `pureAdmin.a11y.scrollTabsRight` | Scroll tabs right |
| `pureAdmin.a11y.openSearch` | Open search (Ctrl+K) |
| `pureAdmin.a11y.toggleSidebar` | Toggle sidebar |
| `pureAdmin.a11y.removeFromFavorites` | Remove from favorites |
| `pureAdmin.a11y.dragToResizeSidebar` | Drag to resize sidebar |
| `pureAdmin.a11y.settings` | Settings |
| `pureAdmin.a11y.userProfile` | User Profile |

## Deprecated API (Backwards Compatible)

Still work, but prefer the `i18n` service:

```ts
import { initI18n, loadLocale, isLocaleLoaded } from '@keenmate/svelte-pure-admin';

initI18n({ locale: 'en' });   // use i18n.init()
await loadLocale('cs');        // use i18n.setLocale()
isLocaleLoaded('cs');          // use i18n.isLocaleLoaded()
```

## Critical Reminders

- Import `$_`, `locale`, `locales`, `isLoading` from `@keenmate/svelte-pure-admin` (**not** from `svelte-i18n` directly).
- Auto-initialization ensures translations work even without calling `i18n.init()`.
- Built-in `en` and `cs` locales are always registered automatically.
- All library keys use flat format: `'pureAdmin.dialog.confirm'` (not nested objects).
- The `i18n` service is a Svelte 5 reactive singleton (properties update automatically).
- The `$_` store returns a function: use `$_('key')` in templates.
- Translations merge additively — `addTranslations` / `addMessages` never removes existing keys.
- When a key is missing, svelte-i18n falls back to `fallbackLocale` (default: `en`).

## See Also

- [AI reference: `ai/i18n.txt`](./ai/i18n.txt) — LLM-optimized quick reference
- [svelte-i18n documentation](https://github.com/kaisermann/svelte-i18n)
