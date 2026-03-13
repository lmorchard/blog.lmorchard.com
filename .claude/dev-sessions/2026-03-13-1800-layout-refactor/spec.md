# Layout Refactor - Spec

## Problem

The `content-grid` class serves two conflicting purposes:
1. **Article layout** — columnar grid with named columns (main, wide, medium, full, sidebar) for rich blog post content
2. **Page-level container** — width constraining and centering for header, footer, posts-nav, index pages

This causes cascading CSS conflicts: elements that just need centering inherit grid rules, and elements that need the grid inherit centering rules. We've had to decouple the header and posts-nav with `!important` overrides and custom breakpoint rules.

## Goals

- Separate page-level width/centering from article-level columnar layout
- Header columns should align with the content-grid columns (title in left gutter, nav in right gutter, center reserved for sticky post title)
- Article content-grid remains the rich columnar system for post content at wide viewports
- All page-level containers (header, footer, posts-nav, section.main) share consistent widths at every breakpoint
- Clean responsive behavior with no `!important` overrides

## Approach

### New: `page-container` (or CSS custom properties for shared widths)

A simple class or set of shared width rules for page-level elements:
- Below 1200px: full width with horizontal padding
- 1200-1399px: full width with horizontal padding (no fixed width yet)
- 1400px+: 1300px centered
- 1600px+: 1500px centered

Used by: header, footer, posts-nav, section.main

### Existing: `content-grid`

Stays as the article-only columnar grid system:
- Below 1200px: flex column, constrained to ~70ch for readability, centered
- 1200px+: CSS grid with named columns (full, wide, medium, main, etc.)
- Only used on `<article>` elements and similar content containers

### Header grid alignment

The header defines its own grid that uses the same column proportions as content-grid:
- Masthead in left columns (matching full-start to main-start)
- Sticky title clone in center (matching main column)
- Nav in right columns (matching main-end to full-end)
- Activates at 900px+ (current behavior)
- Column definitions mirror content-grid but are owned by the header CSS

## Out of scope
- Changes to the article content-grid column definitions
- Changes to how posts use the columnar system (wide images, sidebars, etc.)
