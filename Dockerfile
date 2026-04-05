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

# Install dependencies
RUN npm ci --ignore-scripts

# Download themes via PureAdmin CLI
RUN npx @keenmate/pureadmin themes audi dark express corporate minimal cafeindustrial \
      --dir docs/static/themes

# Copy source files
COPY ai/ ./ai/
COPY packages/ ./packages/
COPY docs/ ./docs/
COPY README.md ./

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
