# Svelte Pure Admin - Documentation Site Dockerfile
# Multi-stage build for optimized production image
#
# NOTE: Build from parent directory to include pure-admin dependencies:
#   docker build -f svelte-pure-admin/Dockerfile -t svelte-pure-admin:production .

# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy pure-admin packages (needed as file dependencies)
COPY pure-admin/packages/core/ ./pure-admin/packages/core/
COPY pure-admin/packages/theme-audi/ ./pure-admin/packages/theme-audi/

# Copy svelte-pure-admin workspace files
COPY svelte-pure-admin/package.json svelte-pure-admin/package-lock.json ./svelte-pure-admin/
COPY svelte-pure-admin/packages/svelte-pure-admin/package.json ./svelte-pure-admin/packages/svelte-pure-admin/
COPY svelte-pure-admin/docs/package.json ./svelte-pure-admin/docs/

WORKDIR /app/svelte-pure-admin

# Install all workspace dependencies
RUN npm ci

# Copy library source
COPY svelte-pure-admin/packages/svelte-pure-admin/ ./packages/svelte-pure-admin/

# Copy docs source
COPY svelte-pure-admin/docs/ ./docs/

# Build the library first (needed for docs)
RUN npm run build -w @keenmate/svelte-pure-admin

# Build the documentation site
RUN npm run build -w docs

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY svelte-pure-admin/nginx.conf /etc/nginx/nginx.conf

# Copy built documentation from builder stage
COPY --from=builder /app/svelte-pure-admin/docs/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
