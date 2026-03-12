# Reading Progress Bar - Spec

## Summary

A thin horizontal progress bar fixed at the very top of the viewport that grows as the reader scrolls through an article. Provides a visual indicator of reading progress through the post content.

## Scope

- New file: `content/public/js/reading-progress.js` (IIFE, similar pattern to `toc.js`)
- New CSS styles (either inline in the JS or in `article.css`)
- Import the new module in `content/public/index.js`
- No changes to templates or post content

## Behavior

### Positioning
- `position: fixed; top: 0; left: 0` — always at the very top of the browser window
- Sits above the sticky site header on all viewport sizes
- Full viewport width, 3-4px tall
- High `z-index` to stay above everything

### Progress tracking
- Tracks scroll position relative to the **article content only** (not the full page)
- Does **not** count the article `<header>` — progress starts from the first content below the header
- 0% = article content has not been scrolled into yet
- 100% = bottom of the article element has reached the viewport
- Does not track footer, comments, or post navigation below the article

### Visibility
- Only appears on posts where article content is taller than `window.innerHeight` (checked once on page load)
- Fades in when the user starts scrolling (progress > 0%)
- Fades out when scrolled back to top (progress returns to 0%)

### Styling
- Solid fill using `--theme-link-color`
- 3-4px height
- Opacity transition for fade in/out
- Width driven by scroll progress (0% to 100%)

## Technical approach

- New IIFE in `content/public/js/reading-progress.js`
- Find the `article.post` element and its `header` child
- Measure content start (bottom of article header) and content end (bottom of article)
- If content height <= `window.innerHeight`, bail out — don't create the bar
- Create a `<div>` element, style it, append to `document.body`
- Listen on `scroll` (debounced or rAF) to update width and opacity
- Calculate progress: `(scrollY - contentStart) / (contentEnd - contentStart - viewportHeight)`
- Clamp to 0–1, set bar width as percentage
- Fade in/out via opacity based on whether progress > 0
