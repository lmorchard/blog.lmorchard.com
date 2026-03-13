# Layout Refactor - Plan

## Overview

The refactor separates two concerns currently tangled in `content-grid`:

1. **Page container** — width, centering, padding at each breakpoint
2. **Content grid** — the columnar article layout with named grid lines

We'll use CSS custom properties for shared width values so the header, footer, posts-nav, content-grid, and any future containers all agree on widths without duplicating magic numbers.

## Current `content-grid` usage

| Template | Element | Needs grid columns? | Should use page-container? |
|----------|---------|--------------------|-----------------------------|
| `post.js` | `<article>` | Yes — main, wide, sidebar, etc. | No (grid handles width) |
| `page.js` | `<article>` | Yes — same as post | No |
| `layoutPage.js` | `<footer>` | Yes — 3-column layout with image | Needs both (grid for layout, container for width) |
| `postList.js` | `<li class="date-header">` | Yes — `.date` child uses `grid-column: main` | No |
| `postList.js` | `<li>` (post items) | Yes — grid columns for layout | No |
| `archives.js` | `<section>` | Minimal — uses `medium` column | Maybe simplify later |

Elements already decoupled:
- **Header** — own grid, no `content-grid` class
- **Posts-nav** — own flex layout, no `content-grid` class

## Steps

### Step 1: Create shared width custom properties

Create a new file `content/public/css/layout-vars.css` with CSS custom properties for the shared widths. These will be used by both `content-grid` and `page-container`, as well as the header and posts-nav.

### Prompt

Create `content/public/css/layout-vars.css` with:

```css
:root {
  --layout-padding: 1.25em;
  --layout-max-width: calc(100vw - (var(--layout-padding) * 2));
  --layout-width-lg: 1300px;
  --layout-width-xl: 1500px;
}
```

Import this file in `content/public/index.css` before other layout CSS files.

---

### Step 2: Create `page-container` class

A simple utility class that handles width/centering/padding at each breakpoint. No grid, no columns — just a centered box.

### Prompt

Add to `content/public/css/layout-vars.css` (or a new `page-container.css`):

```css
.page-container {
  max-width: var(--layout-max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--layout-padding);
  padding-right: var(--layout-padding);
  box-sizing: border-box;
}

@media (min-width: 1400px) {
  .page-container {
    width: var(--layout-width-lg);
    padding-left: 0;
    padding-right: 0;
  }
}

@media (min-width: 1600px) {
  .page-container {
    width: var(--layout-width-xl);
  }
}
```

This class will be used by elements that need page-level centering without the grid system.

---

### Step 3: Refactor `content-grid` to use shared properties

Update `content-grid.css` to:
- Remove the page-container responsibilities (centering, padding, max-width) from the base rule
- At below 1200px: `content-grid` is a flex column with `max-width: 70ch` centered (for article readability)
- At 1200px+: the grid layout, using shared width vars at 1400px+ and 1600px+
- The key insight: `content-grid` at narrow widths should center itself for readability, but this is an *article content* concern, not a page-level one

### Prompt

Rewrite `content/public/css/content-grid.css`:

- Base rule: `display: flex; flex-direction: column; max-width: 70ch; margin: 0 auto; padding: 0 var(--layout-padding); box-sizing: border-box;`
- 600px+: `max-width: min(70ch, var(--layout-max-width));`
- 1200px+: `display: grid; max-width: none; padding: 0; margin: 0 auto;` + grid columns (unchanged)
- 1400px+: `width: var(--layout-width-lg);`
- 1600px+: `width: var(--layout-width-xl);` + wider grid columns (unchanged)

The grid column definitions and child column assignments (`>*`, `>.wide`, `>aside`, etc.) remain exactly as they are.

---

### Step 4: Migrate footer to use `page-container`

The footer currently uses `content-grid` which gives it the article grid layout. The footer's 3-column layout (copyright left, image center, links right) should use its own approach.

### Prompt

In `layoutPage.js`, change footer from `class="content-grid"` to `class="page-container"`.

Update `header-footer.css` footer rules:
- Remove the `padding-top: 3em !important` (no longer fighting content-grid)
- Set proper padding: `padding: 3em var(--layout-padding) 1.5em`
- Add `display: flex; flex-direction: row; justify-content: space-between; align-items: flex-start;` for the 3-column layout
- At narrow widths, switch to `flex-direction: column; align-items: center;`
- The `#growup` image needs a `max-width` constraint

Remove footer-specific grid-column rules from the CSS (`.left`, `.right` grid-column assignments that won't apply anymore).

---

### Step 5: Migrate `section.main` to use `page-container`

`section.main` wraps all page content. Currently has its own CSS (`width: 100%; display: flex; flex-direction: column; align-items: center;`). It should use `page-container` for consistent width, and the `align-items: center` should be removed (it was causing child elements to shrink).

### Prompt

In `layoutPage.js`, add `page-container` class to `section.main`:
```html
<section class="main page-container">${content}</section>
```

In `content.css`, simplify `section.main`:
```css
section.main {
  display: flex;
  flex-direction: column;
}
```

Remove `width: 100%` and `align-items: center` — the `page-container` class handles width/centering, and articles inside handle their own content centering via `content-grid`.

---

### Step 6: Refactor header to use shared width properties

The header already has its own grid columns. Update it to use the shared width vars instead of hardcoded values.

### Prompt

In `header-footer.css`, update the header breakpoints:
- Replace `width: 1300px` with `width: var(--layout-width-lg)` at 1400px+
- Replace `width: 1500px` with `width: var(--layout-width-xl)` at 1600px+
- Replace padding values with `var(--layout-padding)` where applicable
- Replace `max-width: calc(100vw - (1.25em * 2))` with `max-width: var(--layout-max-width)`

---

### Step 7: Refactor posts-nav to use shared width properties

Same as header — update hardcoded values to use shared vars.

### Prompt

In `article.css`, update `.posts-nav`:
- Replace `padding: 1.5em 1.25em 0 1.25em` with `padding: 1.5em var(--layout-padding) 0`
- Replace `width: calc(100% - 2.5em)` with `width: calc(100% - var(--layout-padding) * 2)`
- Replace `max-width: calc(100vw - 2.5em)` with `max-width: var(--layout-max-width)`
- Replace `width: 1300px` with `width: var(--layout-width-lg)` at 1400px+
- Replace `width: 1500px` with `width: var(--layout-width-xl)` at 1600px+

---

### Step 8: Clean up and verify

### Prompt

1. Remove any remaining `!important` overrides that were fighting content-grid
2. Verify at key breakpoints using Playwright:
   - 400px (mobile)
   - 900px (header grid activates)
   - 1100px (between breakpoints)
   - 1200px (content-grid activates)
   - 1400px (fixed width)
   - 1700px (wider fixed width)
3. Check that:
   - Header, posts-nav, footer all have matching widths
   - Article content-grid still works (wide images, code blocks, sidebar content)
   - Text content is readable and centered at narrow widths
   - No visual break at 1200px boundary
4. Clean rebuild + pagefind
