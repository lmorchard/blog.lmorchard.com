# Standalone Pages - Spec

## Summary

Add a `content/pages/` directory for standalone markdown pages that render at top-level URLs but don't appear in post indexes, tag pages, or RSS feeds.

## Behavior

- Pages live in `content/pages/` as markdown files with YAML frontmatter
- `content/pages/colophon.md` → `/colophon/index.html`
- Pages use the same markdown rendering pipeline as posts
- Pages get the site layout (header, footer, nav) but not post-specific chrome (dates, prev/next, tags, Disqus)
- Pages do NOT appear in post indexes, tag archives, or RSS feeds
- Pages ARE indexed by Pagefind (searchable)
