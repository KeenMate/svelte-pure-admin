#  ██████╗ ██╗   ██╗██╗██╗     ██████╗
#  ██╔══██╗██║   ██║██║██║     ██╔══██╗
#  ██████╔╝██║   ██║██║██║     ██║  ██║
#  ██╔══██╗██║   ██║██║██║     ██║  ██║
#  ██████╔╝╚██████╔╝██║███████╗██████╔╝
#  ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝

FROM node:lts-alpine AS build

WORKDIR /app

# Copy workspace package files
COPY package.json package-lock.json ./
COPY packages/svelte-pure-admin/package.json ./packages/svelte-pure-admin/
COPY docs/package.json ./docs/

# Install dependencies (build + runtime)
RUN npm ci --ignore-scripts

# Theme config — pureadmin.json (declarations) + pureadmin.lock.json (resolutions).
# `themes ci` ignores .pureadmin.json overrides and writes nothing — purpose-built for CI/Docker.
COPY pureadmin.json pureadmin.lock.json ./

# Pre-install the declared themes so the dropdown is populated and the common
# themes don't need an on-demand fetch on first request. Themes not declared
# here can still be installed at runtime by the on-demand handler in
# docs/src/routes/themes/[slug]/[...path]/+server.ts.
RUN npx @keenmate/pureadmin themes ci

# Copy source files
COPY ai/ ./ai/
COPY packages/ ./packages/
COPY docs/ ./docs/
COPY README.md ./

# Build the library first, then the docs (SvelteKit Node adapter → docs/build/)
RUN npm run build && npm run build:docs

# Strip dev dependencies for the runtime image
RUN npm prune --omit=dev

#  ██████╗ ██╗   ██╗███╗   ██╗████████╗██╗███╗   ███╗███████╗
#  ██╔══██╗██║   ██║████╗  ██║╚══██╔══╝██║████╗ ████║██╔════╝
#  ██████╔╝██║   ██║██╔██╗ ██║   ██║   ██║██╔██╗██║█████╗
#  ██╔══██╗██║   ██║██║╚██╗██║   ██║   ██║██║╚██╗██║██╔══╝
#  ██║  ██║╚██████╔╝██║ ╚████║   ██║   ██║██║ ╚████║███████╗
#  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝╚═╝  ╚═══╝╚══════╝

FROM node:lts-alpine AS runtime

WORKDIR /app

# SvelteKit Node adapter outputs a self-contained server in build/.
# Pre-installed themes from the build stage live alongside it so the on-demand
# handler can write new ones to the same directory at runtime.
COPY --from=build /app/docs/build ./build
COPY --from=build /app/docs/static/themes ./static/themes
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

# Where the on-demand theme installer reads/writes. Mirrors the build-stage
# layout so themes installed via `themes ci` and themes installed at runtime
# end up in the same place.
ENV PA_THEMES_DIR=/app/static/themes
ENV NODE_ENV=production
ENV PORT=80
ENV HOST=0.0.0.0

EXPOSE 80

CMD ["node", "build/index.js"]
