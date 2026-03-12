# Sitemap Generation Feature Spec

## Overview

Add XML sitemap generation to the blog's static site generator to improve search engine crawling and indexing. The sitemaps will follow Google's sitemap protocol specifications.

## Background

The blog currently has:
- ~1,351 blog posts spanning 2002-2026
- ~679 tag pages
- Year and month index pages
- Main pages (index, all, archives)
- RSS feeds limited to 15 items each

**Total URLs to include:** ~2,000+ URLs

## Problem Statement

While RSS feeds exist, they:
- Only include the 15 most recent items
- Are designed for content subscription, not crawling
- Don't cover all page types systematically
- Don't provide modification dates for crawl optimization

Search engines need comprehensive sitemaps to:
- Discover all pages efficiently
- Understand site structure
- Prioritize crawling based on modification dates
- Handle large sites with proper indexing

## Goals

1. Generate comprehensive XML sitemaps covering all published content
2. Split sitemaps logically to keep files manageable
3. Provide accurate last modification dates
4. Follow Google's sitemap protocol specifications
5. Integrate seamlessly with existing build process

## Non-Goals

- Dynamic sitemap generation (static files only)
- Image or video sitemaps (focus on HTML pages)
- Sitemap submission automation (manual submission to search consoles)

## Requirements

### Functional Requirements

1. **Sitemap Index** (`sitemap.xml`)
   - Main entry point listing all sub-sitemaps
   - Must be at domain root
   - Include lastmod dates for each sub-sitemap

2. **Post Sitemaps** (`sitemap-posts-YYYY.xml`)
   - One sitemap per year (2002-2026)
   - Include all published posts (exclude drafts)
   - Provide accurate lastmod dates
   - Include changefreq and priority hints

3. **Static Pages Sitemap** (`sitemap-pages.xml`)
   - Cover main pages: index, all, archives
   - Higher priority than individual posts

4. **Index Pages Sitemap** (`sitemap-indexes.xml`)
   - Year and month index pages
   - Medium priority

5. **Tag Pages Sitemap** (`sitemap-tags.xml`)
   - All tag index pages (~679 tags)
   - Lower priority than main indexes

### Technical Requirements

1. Generate during `build` and `build-indexes` commands
2. Use templating system consistent with existing RSS templates
3. Support draft exclusion (respect showDrafts flag)
4. Escape URLs properly
5. Include xmlns namespace declarations
6. Keep individual sitemaps under 50,000 URLs (well within limit)
7. Keep individual sitemap files under 50MB uncompressed

### Data Requirements

For each URL:
- `loc` (required): Full absolute URL
- `lastmod` (optional but recommended): ISO 8601 date
- `changefreq` (optional): suggested crawl frequency
- `priority` (optional): relative priority (0.0-1.0)

## Proposed Structure

```
build/
├── sitemap.xml                    # Sitemap index
├── sitemap-posts-2002.xml         # Posts from 2002
├── sitemap-posts-2003.xml         # Posts from 2003
├── ...
├── sitemap-posts-2026.xml         # Posts from 2026
├── sitemap-pages.xml              # Main pages
├── sitemap-indexes.xml            # Year/month indexes
└── sitemap-tags.xml               # Tag indexes
```

## Success Criteria

1. All published pages appear in appropriate sitemaps
2. Sitemap index validates against sitemap protocol
3. Individual sitemaps validate against sitemap protocol
4. Build process completes without errors
5. Sitemaps can be successfully submitted to Google Search Console
6. No performance degradation in build time

## References

- [Google Sitemap Build Guide](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [Google Sitemap Index Files](https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps)
