#  ██████╗ ██╗   ██╗██╗██╗     ██████╗
#  ██╔══██╗██║   ██║██║██║     ██╔══██╗
#  ██████╔╝██║   ██║██║██║     ██║  ██║
#  ██╔══██╗██║   ██║██║██║     ██║  ██║
#  ██████╔╝╚██████╔╝██║███████╗██████╔╝
#  ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝

FROM node:lts-alpine AS build

# Theme source URL (override with --build-arg)
ARG THEMES_URL=https://pureadmin.io/api/bundle

WORKDIR /app

# Copy workspace package files
COPY package.json package-lock.json ./
COPY packages/svelte-pure-admin/package.json ./packages/svelte-pure-admin/
COPY docs/package.json ./docs/

# Install dependencies
RUN npm ci --ignore-scripts

# Download and extract theme bundle from pureadmin.io
RUN apk add --no-cache curl unzip && \
    curl -fsSL -o /tmp/themes.zip "${THEMES_URL}" && \
    mkdir -p themes && \
    unzip -o /tmp/themes.zip -d themes/ && \
    rm /tmp/themes.zip

# Copy source files
COPY ai/ ./ai/
COPY packages/ ./packages/
COPY docs/ ./docs/
COPY README.md ./

# Copy themes runs via the script (picks up themes/ directory)
RUN node docs/scripts/copy-themes.js

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
COPY --from=build /app/docs/build /srv

# Copy Caddyfile
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
