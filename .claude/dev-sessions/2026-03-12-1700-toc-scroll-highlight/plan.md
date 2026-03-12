# ToC Scroll Highlight - Plan

## Overview

Three steps, each building on the previous:

1. **CSS foundation** — Add the `.active` styles and transitions to `article.css`
2. **IntersectionObserver setup** — Add scroll tracking to `toc.js` that toggles `.active` on ToC `<li>` elements
3. **Manual testing & tuning** — Verify behavior, adjust rootMargin/thresholds/timing

---

## Step 1: CSS for the active ToC item

### Context

The ToC styles live in `content/public/css/article.css`, lines 73-139. The ToC is structured as:

```html
<nav class="table-of-contents">
  <p class="title">Page Title</p>
  <ol>
    <li><a href="#section-id">Section Heading</a></li>
    ...
  </ol>
</nav>
```

The `<li>` elements currently have `margin: 0 0 0.25em 0` and no explicit `line-height`.

### Prompt

Add CSS rules to `content/public/css/article.css` immediately after the existing `article>nav.table-of-contents li` rule (line 92). The new rules should:

1. On `article>nav.table-of-contents li`:
   - Set an explicit `line-height` (e.g., `1.4`) to prevent vertical shift when bold is applied
   - Set `position: relative` (needed to anchor the `::before` chevron)
   - Add `transition` for `font-weight` and `color`, duration `200ms ease`
   - Add a `border-left: 3px solid transparent` as a baseline so the border transition doesn't cause layout shift

2. Add a new rule for `article>nav.table-of-contents li.active`:
   - `font-weight: bold`
   - `border-left-color` using the existing theme's accent or link color (check for a CSS custom property like `--theme-link-color` or similar in the codebase)

3. Add a new rule for `article>nav.table-of-contents li.active::before`:
   - `content: "▸"` (or `"›"` — a right-pointing chevron)
   - `position: absolute`
   - Position it to the left of the text, outside the `<li>` content area (e.g., `left: -1.25em`)
   - `transition: opacity 200ms ease`

4. Add a matching rule for `article>nav.table-of-contents li::before` (non-active state):
   - `content: "▸"`
   - `position: absolute`
   - Same positioning
   - `opacity: 0` (hidden by default, fades in when `.active` is applied)

Keep transitions at 200ms. Do not change any existing rules beyond adding `line-height`, `position: relative`, `border-left`, and `transition` to the `li` base rule.

---

## Step 2: IntersectionObserver in toc.js

### Context

`content/public/js/toc.js` is an IIFE that:
- Finds `article.post nav.table-of-contents`
- Queries `h2` elements from the parent article
- Builds an `<ol>` with `<li><a href="#h2id">` for each h2
- The `<li>` elements are created in the loop at lines 28-36

After the loop, we need to:
1. Build a map from heading IDs to their `<li>` elements
2. Set up an IntersectionObserver on the `h2` elements
3. On intersection callbacks, determine the current section and toggle `.active`

### Prompt

Modify `content/public/js/toc.js` to add scroll-based highlighting. After the existing `for` loop that builds the `<ol>` (after line 36, before the closing braces), add the following logic:

1. **Build a heading-to-li map**: Create a `Map` that maps each `h2` element to its corresponding `<li>` element. You can build this during the existing loop by collecting entries, or iterate the `h2s` NodeList and the `list.children` in parallel after the loop.

2. **Track state**: Keep a variable for the currently active `<li>` (initially `null` — nothing highlighted at page top).

3. **Create an IntersectionObserver**:
   - `rootMargin`: Use a negative bottom margin to create a thin detection zone near the top of the viewport. Something like `"0px 0px -90% 0px"` — this means "trigger when a heading enters/exits the top 10% of the viewport."
   - `threshold: 0` (trigger as soon as any part crosses the boundary)

4. **In the observer callback**:
   - The callback receives an array of `IntersectionObserverEntry` objects. For each entry:
     - If `entry.isIntersecting` is true, the heading just entered the top zone
     - If false, it just left
   - To determine the "most recently scrolled past" heading: when a heading becomes non-intersecting and its `boundingClientRect.top` is negative (it scrolled above the viewport top), that heading's section is now active.
   - Alternatively, a simpler approach: on each callback, iterate all `h2` elements in document order and find the last one whose `getBoundingClientRect().top` is less than or equal to a small offset (e.g., 100px from viewport top). This is more reliable than tracking enter/exit states.
   - Remove `.active` from the previously active `<li>` (if any)
   - Add `.active` to the new active `<li>` (if any — could be `null` if we're above all headings)

5. **Observe all h2 elements**: Loop through `h2s` and call `observer.observe(h2)` for each.

**Important implementation notes:**
- The simpler "iterate all h2s on each callback" approach (4, alternative) is more robust than tracking individual enter/exit states. The observer callback is just the trigger to re-evaluate; the actual logic scans all headings. This avoids edge cases with fast scrolling or page jumps.
- Keep the existing IIFE structure. All new code goes inside the `if (h2s.length)` block, after the existing loop.
- Use `const`/`let` instead of `var` for new code (the existing code uses `var` but no need to refactor that).

---

## Step 3: Manual testing & tuning

### Context

After steps 1 and 2 are implemented, we need to verify the behavior on a real post with a ToC. A good test post would be the one we just published: `content/posts/2026/2026-03-11-grief-and-the-ai-split/index.md` which has 6 h2 sections.

### Prompt

Run the dev server and manually test the ToC scroll highlight on a post with multiple sections. Check:

1. **Initial state**: Page load, no section highlighted
2. **Scrolling down**: As each h2 scrolls past the top, its ToC item becomes active
3. **Scrolling up**: Active item correctly moves back to previous sections
4. **Fast scrolling**: Jumping quickly through multiple sections lands on the right one
5. **Page bottom**: Last section stays highlighted when scrolled to end of page
6. **Narrow viewport** (below 1400px): ToC is inline, not sticky — highlight should still work but verify it doesn't look broken
7. **Transitions**: Bold/chevron/border transitions are smooth, not jarring

Adjust as needed:
- `rootMargin` value if detection zone is too sensitive or not sensitive enough
- Transition duration if it feels too slow or too fast
- Chevron character or positioning if it doesn't look right
- Border color if it doesn't match the theme
