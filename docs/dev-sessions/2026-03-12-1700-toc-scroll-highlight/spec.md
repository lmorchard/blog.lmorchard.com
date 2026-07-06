# ToC Scroll Highlight - Spec

## Summary

Augment the existing `toc.js` script to highlight the current section in the table of contents as the user scrolls. The ToC is a sticky sidebar nav on wider viewports, and the highlight provides a "you are here" indicator.

## Scope

- Modify `content/public/js/toc.js` (existing IIFE that builds the ToC)
- Add CSS styles to `content/public/css/article.css` (where ToC styles already live)
- No changes to blog post content or templates

## Behavior

### Scroll tracking
- Use `IntersectionObserver` to detect when `h2` elements cross near the top of the viewport
- Track only `h2` elements (matching the existing ToC, which only lists h2s)
- Highlight the **most recently scrolled-past** heading — i.e., the last `h2` whose top has crossed above the viewport top. This represents "the section you are currently reading."
- **Before any `h2` has been scrolled past** (top of page), highlight nothing

### Highlight style
- Apply a CSS class (e.g., `.active`) to the `<li>` in the ToC corresponding to the current section
- Visual treatment:
  - **Bold** the active link text
  - **Left border** on the active `<li>`
  - **Chevron/arrowhead indicator** via `::before` pseudo-element, positioned with `position: absolute` so it doesn't affect layout
- **No vertical layout shift** — `line-height` should be explicit/consistent so bolding doesn't cause height changes. Horizontal width changes from bolding are acceptable.

### Transitions
- Smooth CSS transitions when the active section changes:
  - Old section gradually un-bolds
  - New section gradually emboldens
  - Chevron/pointer transitions to new position (opacity or transform)
- Keep transitions short enough to feel responsive (e.g., 150-250ms)

## Technical approach

- `IntersectionObserver` with a `rootMargin` configured to trigger when headings cross near the top of the viewport
- After `toc.js` builds the `<ol>`, set up the observer on all `h2` elements in the article
- Maintain a mapping from heading IDs to their corresponding `<li>` elements in the ToC
- On intersection changes, determine which heading is the current one and toggle the `.active` class

## Future directions (out of scope for now)
- Consider deeper ToC levels (h3, h4) for posts with more detailed structure
- Smooth-scroll when clicking ToC links
- Alternative highlight strategies: "first visible heading" or "closest heading in either direction" — may want to try these if "most recently scrolled past" doesn't feel right during manual testing
