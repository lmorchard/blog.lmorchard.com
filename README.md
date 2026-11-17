# blog.lmorchard.com

Source code, content, templates, and static assets for [blog.lmorchard.com](https://blog.lmorchard.com) — powered by **Easy-Blog Oven v2.0**, a standalone, pure-Go static site generator (`easy-blog-oven`).

---

## Quick Start

```bash
# Start local development server with file watching and SSE live reload
make dev

# Scaffold a new post bundle (e.g. content/posts/2026/2026-11-17-my-title/index.md)
make new TITLE="My Post Title" TAGS="golang,webdev"

# Fast development build (includes drafts, skips search indexing)
make build-dev

# Full production build (with Pagefind search indexing)
make build

# Run unit tests
make test
```

The dev server runs on **http://localhost:9980** with live reload. Saving changes in `content/` or `templates/` triggers an immediate in-memory rebuild and reloads the browser over Server-Sent Events (SSE).

---

## Makefile Targets

| Target | Description |
|---|---|
| `make dev` / `make start` | Start local HTTP server on port 9980 with file watcher and live reload |
| `make build` | Full production build with Pagefind search indexer |
| `make build-dev` | Fast development build (includes drafts, skips search indexer) |
| `make serve` | Preview built static files without file watching |
| `make new TITLE="..."` | Scaffold a new post bundle with frontmatter, slug, and timestamp |
| `make info POST="..."` | Display parsed metadata and word count for a post or bundle |
| `make doctor` | Run diagnostics on post metadata, missing assets, and draft hygiene |
| `make search` | Run Pagefind search indexing on existing build |
| `make search-test QUERY="..."` | Query Pagefind search index directly from CLI |
| `make test` | Run all Go unit tests across `pkg/...` |
| `make clean-empty-drafts` | Scan for empty placeholder draft posts (dry-run) |
| `make clean-empty-drafts-force` | Permanently delete empty placeholder draft posts |
| `make clean` | Remove `build/` directory and compiled binary |

---

## Architecture & Features

- **Engine:** Pure Go binary (`easy-blog-oven`, aliased as `blog-ssg`) compiled with zero runtime dependencies. Eliminates `node_modules` churn and build dependencies.
- **Markdown & HTML:** CommonMark parsed via `goldmark` with GitHub Flavored Markdown (GFM) extensions, DOM manipulation via `goquery`.
- **Templates:** Go standard library `html/template` with defaults embedded via `//go:embed` and disk overrides in `./templates/`.
- **Dev Server & Live Reload:** Integrated HTTP server (`easy-blog-oven serve -w`) featuring an SSE hub on `/__reload` and middleware that injects the reload listener into HTML responses in-memory, keeping disk builds clean.
- **Search:** Client-side [Pagefind](https://pagefind.app/) search indexing integrated directly into production builds.
- **Feeds & Structured Data:** Full-text RSS (`index.rss`), excerpt RSS (`index-excerpts.rss`), per-tag feeds, unified XML sitemap (`sitemap.xml`), and schema.org JSON-LD structured data graph (`WebSite`, `Person`, `BlogPosting`).
- **Retro Dithering:** Pure-Go Floyd-Steinberg dithering and image optimization built into the CLI (`easy-blog-oven dither`).
- **Draft Management:** CLI helper to detect and purge placeholder draft posts (`easy-blog-oven clean-empty-drafts`).

---

## Content Organization

```text
content/
├── pages/          # Static stand-alone pages (e.g. colophon.md)
├── posts/          # Blog posts organized by year (e.g. content/posts/2026/)
│   ├── 2026/
│   │   ├── 2026-11-01-linkding-ssg/
│   │   │   ├── index.md
│   │   │   └── hero-dithered.png
│   │   └── 2026-01-08.md
├── public/         # Static assets, CSS, and pre-bundled vendor JS
└── uploads/        # Historical media uploads
templates/          # HTML template overrides (base, post, archives, etc.)
```

### Post Frontmatter Format

```markdown
---
title: "Post Title"
date: 2026-11-17 12:00:00 -0800
tags:
  - golang
  - static-sites
type: entry
draft: true
---

**TL;DR**: Brief summary of the post displayed before the fold.

<!--more-->

Full post content follows here...
```

---

## Deployment

Deployments are automated via GitHub Actions on push to `main` (`.github/workflows/prod.yml`):

1. Checks out the repository.
2. Sets up Go (`actions/setup-go@v5`) and installs standalone Pagefind.
3. Runs `make test` and `make build`.
4. Syncs the `build/` output to Amazon S3 via `rclone`.
5. Invalidates the CloudFront distribution cache.

A legacy snapshot of the original Node.js generator is archived on GitHub at the `archive/node-ssg` branch.
