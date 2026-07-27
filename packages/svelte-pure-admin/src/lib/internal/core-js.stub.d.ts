/**
 * Type stub for `@keenmate/pure-admin-core/js/*`.
 *
 * The `file:` core dependency is symlinked to its real source, so those
 * self-contained IIFEs resolve to `.js` files *outside* node_modules and, with
 * `checkJs` on, TS would type-check their internals. `tsconfig.json` maps the
 * `@keenmate/pure-admin-core/js/*` specifier to this stub instead — the modules
 * are imported only for their `window.Pa*` side-effects (see internal/core-js.ts),
 * and the actual APIs are typed on `Window` in global.d.ts.
 */
declare const mod: Record<string, unknown>;
export = mod;
