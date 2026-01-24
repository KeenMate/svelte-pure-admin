#  ██████╗ ██╗   ██╗██╗██╗     ██████╗
#  ██╔══██╗██║   ██║██║██║     ██╔══██╗
#  ██████╔╝██║   ██║██║██║     ██║  ██║
#  ██╔══██╗██║   ██║██║██║     ██║  ██║
#  ██████╔╝╚██████╔╝██║███████╗██████╔╝
#  ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝

FROM node:lts-alpine AS build

WORKDIR /app

# Copy pure-admin packages (dependency)
COPY pure-admin/packages/core/package.json ./pure-admin/packages/core/
COPY pure-admin/packages/theme-audi/package.json ./pure-admin/packages/theme-audi/
COPY pure-admin/packages/theme-corporate/package.json ./pure-admin/packages/theme-corporate/
COPY pure-admin/packages/theme-dark/package.json ./pure-admin/packages/theme-dark/
COPY pure-admin/packages/theme-express/package.json ./pure-admin/packages/theme-express/
COPY pure-admin/packages/theme-minimal/package.json ./pure-admin/packages/theme-minimal/
COPY pure-admin/package.json pure-admin/package-lock.json ./pure-admin/

# Copy svelte-pure-admin workspace package files
COPY svelte-pure-admin/package.json svelte-pure-admin/package-lock.json ./svelte-pure-admin/
COPY svelte-pure-admin/packages/svelte-pure-admin/package.json ./svelte-pure-admin/packages/svelte-pure-admin/
COPY svelte-pure-admin/docs/package.json ./svelte-pure-admin/docs/

# Install pure-admin dependencies and build
WORKDIR /app/pure-admin
RUN npm ci
COPY pure-admin/packages/ ./packages/
RUN npm run build -w @keenmate/pure-admin-core && \
    npm run build -w @keenmate/pure-admin-theme-audi && \
    npm run build -w @keenmate/pure-admin-theme-corporate && \
    npm run build -w @keenmate/pure-admin-theme-dark && \
    npm run build -w @keenmate/pure-admin-theme-express && \
    npm run build -w @keenmate/pure-admin-theme-minimal

# Install svelte-pure-admin dependencies
WORKDIR /app/svelte-pure-admin
RUN npm ci

# Copy svelte-pure-admin source files
COPY svelte-pure-admin/packages/ ./packages/
COPY svelte-pure-admin/docs/ ./docs/

# Build the library first, then the docs
RUN npm run build && npm run build:docs

#  ██████╗ ██╗   ██╗███╗   ██╗████████╗██╗███╗   ███╗███████╗
#  ██╔══██╗██║   ██║████╗  ██║╚══██╔══╝██║████╗ ████║██╔════╝
#  ██████╔╝██║   ██║██╔██╗ ██║   ██║   ██║██╔██╗██║█████╗
#  ██╔══██╗██║   ██║██║╚██╗██║   ██║   ██║██║╚██╗██║██╔══╝
#  ██║  ██║╚██████╔╝██║ ╚████║   ██║   ██║██║ ╚████║███████╗
#  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝╚═╝  ╚═══╝╚══════╝

FROM caddy:alpine AS runtime

# Copy built static files
COPY --from=build /app/svelte-pure-admin/docs/build /srv

# Copy Caddyfile
COPY svelte-pure-admin/Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
