# Makefile for @pure-admin/svelte
# Pure Admin Svelte 5 Component Library

.PHONY: help install dev build package check publish publish-dry clean sync-snippets sync-snippets-update

# Default target
help:
	@echo "Pure Admin Svelte - Available targets:"
	@echo ""
	@echo "  make install              - Install dependencies"
	@echo "  make dev                  - Start development server (port 5173)"
	@echo "  make build                - Build + package library"
	@echo "  make package              - Package library for publishing"
	@echo "  make check                - Run TypeScript type checking"
	@echo "  make check-watch          - Run type checking in watch mode"
	@echo "  make sync-snippets        - Check for snippet changes"
	@echo "  make sync-snippets-update - Update snippet manifest"
	@echo "  make publish              - Publish package to npm"
	@echo "  make publish-dry          - Dry run publish (test without publishing)"
	@echo "  make clean                - Remove build artifacts"
	@echo ""

# Install dependencies
install:
	npm install

# Start development server
dev:
	npm run dev

# Build and package
build:
	npm run build

# Package library only
package:
	npm run package

# Type check
check:
	npm run check

# Type check with watch
check-watch:
	npm run check:watch

# Check for snippet changes
sync-snippets:
	npm run sync:snippets

# Update snippet manifest
sync-snippets-update:
	npm run sync:snippets:update

# Publish to npm (requires npm login)
publish:
	@echo "Publishing @pure-admin/svelte to npm..."
	@echo "Make sure you are logged in (npm login)"
	npm publish --access public

# Dry run publish (test without actually publishing)
publish-dry:
	@echo "Running dry-run publish test..."
	npm publish --dry-run --access public

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist
	rm -rf .svelte-kit
	rm -rf node_modules/.cache
	@echo "Clean complete!"
