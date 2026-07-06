# Linkable Headings - Plan

## Overview

One step — this is a small, self-contained feature.

1. **Create the module, wire it up, test**

---

## Step 1: Create linkable-headings.js and wire up

### Context

Headings in `article.post` already have `id` attributes from the markdown renderer (that's how the ToC links to them). We need to prepend a `#` anchor link to each h2–h4, positioned in the left margin.

The heading styles live in the content grid layout. We need `position: relative` on headings to anchor the absolute-positioned `#` indicator. Check that this doesn't conflict with existing heading styles.

The `scroll-margin-top` we added for h2 in the ToC session should also be applied to h3 and h4 now that they're linkable.

### Prompt

1. **Create `content/public/js/linkable-headings.js`** as an IIFE:
   - Query all `h2, h3, h4` inside `article.post` that have an `id` attribute
   - For each heading:
     - Set `position: relative` on the heading (needed for absolute positioning of the anchor)
     - Create an `<a>` element:
       - `href` = `#${heading.id}`
       - `textContent` = `#`
       - `aria-label` = `Link to this section`
     - Style the anchor inline:
       - `position: absolute`
       - `left: -1.25em` (adjust as needed — place in the margin, clear of text)
       - `text-decoration: none`
       - `opacity: 0.25`
       - `transition: opacity 200ms ease`
       - `color: inherit`
     - Prepend the anchor as the first child of the heading
   - Add a `<style>` block to `document.head` for the hover rule (can't do `:hover` inline):
     - `article.post :is(h2, h3, h4):hover .heading-anchor { opacity: 1; }`
     - Give the anchor a class like `heading-anchor` for the CSS to target

2. **Add `import "./js/linkable-headings.js";`** to `content/public/index.js`, alongside the toc and reading-progress imports.

3. **Extend `scroll-margin-top`** in `content/public/css/article.css` to cover h3 and h4, not just h2, so clicking these new anchor links also clears the sticky header.

4. **Test** on a post with h2, h3, and h4 headings:
   - `#` indicators visible at low opacity in the left margin
   - Full opacity on hover
   - Clicking updates URL hash and scrolls to heading (below sticky header)
   - No layout shift on the heading text
   - Looks reasonable at different heading sizes
