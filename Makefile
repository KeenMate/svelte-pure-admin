# Makefile for @keenmate/svelte-pure-admin Monorepo

.PHONY: help setup install dev dev-lib build build-docs build-all package check check-lib check-docs publish publish-dry clean sync-snippets sync-snippets-update verify docker-build docker-run docker-stop docker-restart docker-logs docker-clean docker-deploy docker-push

# === Shell Configuration (cross-platform) ===
# Use sh on Unix, cmd on Windows
ifeq ($(OS),Windows_NT)
    SHELL := cmd.exe
    RM_RF := rmdir /s /q
    NULL := nul
else
    SHELL := /bin/sh
    RM_RF := rm -rf
    NULL := /dev/null
endif

# === Configuration ===
DOCKER_IMAGE_NAME = svelte-pure-admin
DOCKER_REGISTRY = registry.km8.es
DOCKER_TAG = production
DOCKER_CONTAINER_NAME = svelte-pure-admin
DOCKER_PORT = 8081

# NPM publish tag
TAG ?=
NPM_TAG = $(if $(TAG),--tag $(TAG),)

# Default target
help:
	@echo "Pure Admin Svelte Monorepo - Available targets:"
	@echo ""
	@echo "  Setup:"
	@echo "    make setup                - Initial project setup (install dependencies)"
	@echo "    make install              - Install all workspace dependencies"
	@echo ""
	@echo "  Development:"
	@echo "    make dev                  - Start docs dev server (port 5173)"
	@echo "    make dev-lib              - Start library dev server"
	@echo "    make build                - Build library package"
	@echo "    make build-docs           - Build docs site"
	@echo "    make build-all            - Build library + docs"
	@echo "    make package              - Package library for publishing"
	@echo "    make check                - Run type checking (all workspaces)"
	@echo "    make check-lib            - Run type checking (library only)"
	@echo "    make check-docs           - Run type checking (docs only)"
	@echo "    make clean                - Remove build artifacts"
	@echo ""
	@echo "  Snippets:"
	@echo "    make sync-snippets        - Check for snippet changes"
	@echo "    make sync-snippets-update - Update snippet manifest"
	@echo ""
	@echo "  Package:"
	@echo "    make verify               - Clean, build, and verify package"
	@echo "    make publish TAG=rc       - Publish to npm (TAG required for prereleases)"
	@echo "    make publish-dry TAG=rc   - Dry run publish"
	@echo ""
	@echo "  Docker (docs site):"
	@echo "    make docker-build         - Build Docker image"
	@echo "    make docker-run           - Run Docker container"
	@echo "    make docker-stop          - Stop Docker container"
	@echo "    make docker-restart       - Restart Docker container"
	@echo "    make docker-logs          - Show Docker container logs"
	@echo "    make docker-clean         - Remove Docker container and image"
	@echo "    make docker-deploy        - Build and run Docker container"
	@echo "    make docker-push          - Tag and push image to registry"
	@echo ""

# Initial project setup
setup:
	npm install

# Install dependencies
install:
	npm install

# Start docs development server (main dev workflow)
dev:
	npm run dev

# Start library dev server (for library-only development)
dev-lib:
	npm run dev:lib

# Build library
build:
	npm run build

# Build docs
build-docs:
	npm run build:docs

# Build all
build-all:
	npm run build:all

# Package library only
package:
	npm run package

# Type check all
check:
	npm run check

# Type check library
check-lib:
	npm run check:lib

# Type check docs
check-docs:
	npm run check:docs

# Check for snippet changes
sync-snippets:
	npm run sync:snippets

# Update snippet manifest
sync-snippets-update:
	npm run sync:snippets:update

# Verify package (clean + build + pack)
verify: clean build
	@echo "Creating package tarball for verification..."
	npm pack -w @keenmate/svelte-pure-admin
	@echo "Package verified and ready!"

# Publish to npm
publish: clean build
	@echo "Publishing @keenmate/svelte-pure-admin to npm..."
	npm publish -w @keenmate/svelte-pure-admin --access public $(NPM_TAG)

# Dry run publish
publish-dry: clean build
	@echo "Running dry-run publish test..."
	npm publish -w @keenmate/svelte-pure-admin --dry-run --access public $(NPM_TAG)

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	npm run clean
ifeq ($(OS),Windows_NT)
	@if exist node_modules\.cache rmdir /s /q node_modules\.cache
else
	rm -rf node_modules/.cache
endif
	@echo "Clean complete!"

# === Docker Commands (for docs site) ===

docker-build:
	@echo "Building Docker image: $(DOCKER_IMAGE_NAME):$(DOCKER_TAG)"
	@echo "Note: Building from parent directory to include pure-admin dependencies"
	cd .. && docker build -f svelte-pure-admin/Dockerfile -t $(DOCKER_IMAGE_NAME):$(DOCKER_TAG) .
	@echo "Docker image built successfully!"

docker-run:
	@echo "Starting Docker container on port $(DOCKER_PORT)"
	@if [ $$(docker ps -q -f name=$(DOCKER_CONTAINER_NAME)) ]; then \
		echo "Container is already running at http://localhost:$(DOCKER_PORT)"; \
	elif [ $$(docker ps -aq -f name=$(DOCKER_CONTAINER_NAME)) ]; then \
		echo "Starting existing container"; \
		docker start $(DOCKER_CONTAINER_NAME); \
		echo "Application is running at: http://localhost:$(DOCKER_PORT)"; \
	else \
		echo "Creating and starting new container"; \
		docker run -d --name $(DOCKER_CONTAINER_NAME) -p $(DOCKER_PORT):80 $(DOCKER_IMAGE_NAME):$(DOCKER_TAG); \
		echo "Application is running at: http://localhost:$(DOCKER_PORT)"; \
	fi

docker-stop:
	@echo "Stopping Docker container"
	@if [ $$(docker ps -q -f name=$(DOCKER_CONTAINER_NAME)) ]; then \
		docker stop $(DOCKER_CONTAINER_NAME); \
		echo "Container stopped successfully"; \
	else \
		echo "Container is not running"; \
	fi

docker-restart: docker-stop docker-run

docker-logs:
	@if [ $$(docker ps -aq -f name=$(DOCKER_CONTAINER_NAME)) ]; then \
		docker logs -f $(DOCKER_CONTAINER_NAME); \
	else \
		echo "Container does not exist"; \
	fi

docker-clean: docker-stop
	@echo "Cleaning up Docker resources"
	@if [ $$(docker ps -aq -f name=$(DOCKER_CONTAINER_NAME)) ]; then \
		docker rm $(DOCKER_CONTAINER_NAME); \
		echo "Container removed"; \
	fi
	@if [ $$(docker images -q $(DOCKER_IMAGE_NAME):$(DOCKER_TAG)) ]; then \
		docker rmi $(DOCKER_IMAGE_NAME):$(DOCKER_TAG); \
		echo "Image removed"; \
	fi

docker-deploy: docker-build docker-run

docker-push:
	@echo "Tagging and pushing image to $(DOCKER_REGISTRY)"
	docker tag $(DOCKER_IMAGE_NAME):$(DOCKER_TAG) $(DOCKER_REGISTRY)/$(DOCKER_IMAGE_NAME):$(DOCKER_TAG)
	docker push $(DOCKER_REGISTRY)/$(DOCKER_IMAGE_NAME):$(DOCKER_TAG)
	@echo "Image pushed to $(DOCKER_REGISTRY)/$(DOCKER_IMAGE_NAME):$(DOCKER_TAG)"
