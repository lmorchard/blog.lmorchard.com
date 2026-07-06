# Reading Progress Bar - Plan

## Overview

Two steps:

1. **Create the reading progress bar module** — new IIFE with all logic and inline styles
2. **Wire it up and test** — import in `index.js`, manual testing, tuning

---

## Step 1: Create reading-progress.js

### Context

The new file follows the same pattern as `toc.js` — a self-executing IIFE that queries for `article.post`, does its work, and exits. It lives at `content/public/js/reading-progress.js`.

The article structure is:
```html
<article class="post">
  <header>
    <h1>Title</h1>
    <time>...</time>
    <ul class="tags">...</ul>
  </header>
  <nav class="table-of-contents">...</nav>
  <!-- article content (h2s, paragraphs, etc.) -->
</article>
```

Progress should track from below the article `<header>` to the bottom of the `<article>`.

### Prompt

Create a new file `content/public/js/reading-progress.js` as an IIFE with the following logic:

1. **Find the article**: Query for `article.post`. If not found, bail out.

2. **Find the article header**: Query for `header` within the article.

3. **Measure content boundaries** (using `offsetTop` and `offsetHeight` relative to the document):
   - `contentStart`: bottom of the article header (`articleHeader.offsetTop + articleHeader.offsetHeight`), or `article.offsetTop` if no header
   - `contentEnd`: bottom of the article (`article.offsetTop + article.offsetHeight`)
   - `contentHeight`: `contentEnd - contentStart`

4. **Check if content is long enough**: If `contentHeight <= window.innerHeight`, bail out — don't create the bar.

5. **Create the bar element**: A `<div>` appended to `document.body` with inline styles:
   - `position: fixed`
   - `top: 0`
   - `left: 0`
   - `width: 0%`
   - `height: 3px`
   - `background-color: var(--theme-link-color)`
   - `z-index: 9999` (above everything including sticky header)
   - `opacity: 0`
   - `transition: opacity 300ms ease`
   - `pointer-events: none` (don't interfere with clicks)

6. **Scroll handler** using `requestAnimationFrame` for smooth updates:
   - Calculate progress: `(window.scrollY - contentStart) / (contentEnd - contentStart - window.innerHeight)`
   - Clamp to 0–1
   - Set bar `width` to `${progress * 100}%`
   - Set `opacity: 1` when progress > 0, `opacity: 0` when progress is 0

7. **Attach the scroll listener**: `window.addEventListener('scroll', handler, { passive: true })`. Use a rAF guard (flag that prevents scheduling multiple rAF callbacks per frame) rather than debouncing, since we want smooth visual updates.

8. **Run once on load** to set initial state (in case the page loads mid-scroll via back button, etc.).

---

## Step 2: Wire up and test

### Context

`content/public/index.js` imports `toc.js` as a bare side-effect import on line 4. The reading progress bar should be imported the same way.

### Prompt

1. Add `import "./js/reading-progress.js";` to `content/public/index.js`, next to the existing `toc.js` import.

2. Manually test on a long post (e.g., the grief-and-the-ai-split post with 6 sections) and a short post. Verify:
   - Bar appears at top of viewport on long posts
   - Bar does not appear on short posts
   - Progress fills smoothly while scrolling
   - Bar sits above the sticky site header
   - Bar fades in when scrolling begins, fades out at top
   - Progress reaches 100% at end of article content, not at page bottom
   - Bar doesn't interfere with clicks or other UI

3. Tune as needed:
   - Bar height (3px vs 4px)
   - Fade transition duration
   - z-index if anything overlaps
   - Color/opacity
