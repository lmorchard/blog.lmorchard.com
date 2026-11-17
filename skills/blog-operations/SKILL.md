---
name: blog-operations
description: Operations, development workflows, commands, and publishing guide for blog.lmorchard.com using Easy-Blog Oven v2.0 (Go).
---

# Blog Operations (`blog.lmorchard.com`)

Operational guide and workflows for maintaining, developing, authoring, and deploying [blog.lmorchard.com](https://blog.lmorchard.com).

The site is built with **Easy-Blog Oven v2.0**, a bespoke, zero-dependency Go static site generator (`easy-blog-oven`, aliased as `blog-ssg`), replacing the legacy Node.js "Easy-Blog Oven v1" as of November 2026.

---

## Workspace Location

All blog files live in the workspace under:
`blog.lmorchard.com/`

When executing commands, always specify `cwd="blog.lmorchard.com"` in shell tool invocations (do not use chained `cd &&`).

---

## Core Workflows & Make Targets

All routine tasks are driven by the project `Makefile`:

```bash
# Start local dev server with file watching and SSE live reload (http://localhost:9980)
make dev

# Scaffold a new post bundle (creates content/posts/YYYY/YYYY-MM-DD-slug/index.md)
make new TITLE="My Post Title" TAGS="golang,webdev"

# Fast development build (includes drafts, skips search indexing)
make build-dev

# Full production build (with Pagefind search indexing)
make build

# Run unit tests across all Go packages
make test

# Inspect metadata, slug, and word count for a post or bundle
make info POST="content/posts/2026/2026-11-17-my-title"

# Diagnose post frontmatter, broken assets, and draft hygiene
make doctor

# Query Pagefind search index directly from the CLI
make search-test QUERY="tempest"

# Search for empty placeholder drafts (dry-run)
make clean-empty-drafts

# Permanently delete empty placeholder drafts
make clean-empty-drafts-force

# Preview static files without file watching
make serve
```

---

## Dev Server & Live Reload

- The dev server runs at **http://localhost:9980**.
- Built-in SSE (Server-Sent Events) live reload connects clients to `/__reload`.
- Changes to `content/` (posts, pages, static assets) or `templates/` trigger an in-memory rebuild and push an instant browser reload.
- Live reload scripts are injected dynamically into HTML responses by dev middleware and never pollute disk build artifacts.

---

## Post Creation & Content Conventions

### Post Scaffolding
Always prefer directory bundles over standalone `.md` files for modern posts:

```bash
make new TITLE="Replacing Linkding with a Static Site" TAGS="golang,homelab"
```

This creates:
`content/posts/YYYY/YYYY-MM-DD-replacing-linkding-with-a-static-site/index.md`

### Required Post Frontmatter & Editorial Format

```markdown
---
title: "Replacing Linkding with a Static Site"
date: 2026-11-17 12:00:00 -0800
tags:
  - golang
  - homelab
type: entry
draft: true
---

**TL;DR**: High-level summary paragraph placed immediately below frontmatter.

<!--more-->

Full post content starts here. Local images and co-located assets can be referenced 
directly using relative paths (e.g. `./hero-dithered.png`).
```

### Key Editorial Conventions
- **`**TL;DR**:`**: Summary paragraph placed before the fold.
- **`<!--more-->` Fold**: Required delimiter separating the excerpt from the full article body.
- **Image Co-location**: Co-locate hero images, diagrams, and attachments inside the post directory bundle.
- **Retro Dithering**: Apply Floyd-Steinberg dithering to photos using `./blog-ssg dither -input <path> -output <path>`.

---

## Architecture & Codebase Map

- **`cmd/blog-ssg/main.go`**: CLI entry point dispatching `build`, `watch`, `serve`, `new`, `clean-empty-drafts`, and `dither`.
- **`pkg/build/builder.go`**: Core orchestrator generating HTML, JSON, Markdown companion files, RSS feeds, and directory asset copying.
- **`pkg/feed/rss.go`**: Generates full-text RSS (`index.rss`) and excerpt RSS (`index-excerpts.rss`) for the site root and all tags.
- **`pkg/feed/sitemap.go`**: Consolidates post, tag, and archive URLs into `sitemap.xml`.
- **`pkg/template/jsonld.go`**: Generates schema.org JSON-LD structured data graph (`WebSite`, `Person`, `BlogPosting`).
- **`pkg/template/embedded/`**: Base templates embedded via `//go:embed`.
- **`templates/`**: Runtime disk template overrides (`base.html`, `post.html`, `archives.html`, etc.).
- **`pkg/watch/`**: File watcher with debouncing and SSE live-reload hub.
- **`pkg/imageutil/image.go`**: Pure-Go Floyd-Steinberg dithering and image optimization.

---

## Deployment & Production Releases

- **Repository:** `https://github.com/lmorchard/blog.lmorchard.com`
- **Default Branch:** `main` (do NOT use `master`).
- **Rollback Archive:** `archive/node-ssg` contains the legacy Node.js implementation.
- **CI/CD Pipeline:** `.github/workflows/prod.yml` runs automatically on push to `main`:
  1. Checks out repository with `actions/checkout@v4`.
  2. Sets up Go with `actions/setup-go@v5` (stable toolchain).
  3. Downloads standalone Pagefind binary.
  4. Runs `make test` and `make build`.
  5. Syncs `build/` output to Amazon S3 via `rclone`.
  6. Invalidates CloudFront cache.
