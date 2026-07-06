# Linkable Headings - Notes

## Progress

### Implementation (complete)
- Created `content/public/js/linkable-headings.js` as IIFE
- Targets h2, h3, h4 with `id` attributes inside `article.post`
- Prepends `#` anchor link positioned absolutely at `left: -1.25em`
- Base opacity 0.25, full opacity on heading hover or anchor focus
- Injected `<style>` for hover/focus rules (can't do `:hover` inline)
- Added `aria-label` for accessibility
- Imported in `content/public/index.js`
- Extended `scroll-margin-top` to h3 and h4 (was only h2 from ToC session)

## Future enhancements
- Click-to-copy permalink URL to clipboard with "Copied!" tooltip
