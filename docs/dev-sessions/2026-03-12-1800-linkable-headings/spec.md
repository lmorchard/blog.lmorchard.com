# Linkable Headings - Spec

## Summary

Add visible anchor link indicators to article headings (h2–h4) so readers can easily link to specific sections of a post.

## Scope

- New file: `content/public/js/linkable-headings.js` (IIFE)
- CSS styles (inline or in `article.css`)
- Import in `content/public/index.js`
- No changes to templates or post content

## Behavior

### Target elements
- All `h2`, `h3`, and `h4` elements inside `article.post` that have an `id` attribute

### Anchor indicator
- A `#` character rendered as an `<a href="#heading-id">` link
- Positioned **before** the heading text, in the left margin space (outside the content flow)
- Uses `position: absolute` so it doesn't shift the heading text
- Clicking the link navigates to the anchor (updates URL hash in the address bar)

### Visibility
- Visible at all times at low opacity (e.g., 0.2–0.3)
- Transitions to full opacity on hover of the heading or the anchor itself
- Smooth opacity transition (200ms or similar)

### Styling
- Inherits heading font size so it scales with the heading level
- No text-decoration (no underline)
- Color should be subtle — use theme text color or link color at reduced opacity

## Technical approach

- New IIFE in `content/public/js/linkable-headings.js`
- Query all `h2, h3, h4` within `article.post` that have an `id`
- For each heading, create an `<a>` element with `href="#id"` and text content `#`
- Style the anchor with `position: absolute` and negative `left` to place it in the margin
- Set the heading to `position: relative` to anchor the absolute positioning
- Apply low-opacity base style with CSS transition, full opacity on `:hover` of the heading

## Future enhancements (out of scope)
- Click-to-copy permalink URL to clipboard with brief "Copied!" tooltip
