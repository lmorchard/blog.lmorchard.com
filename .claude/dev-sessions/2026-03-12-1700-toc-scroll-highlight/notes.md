# ToC Scroll Highlight - Notes

## Progress

### Step 1 & 2: CSS + JS implementation (complete)
- Added `.active` styles to `article.css`: bold, left border with `--theme-link-color`, chevron via `::before` with opacity transition
- Set explicit `line-height: 1.4` and `border-left: 3px solid transparent` on base `li` to prevent layout shift
- Added `padding-left: 0.5em` to base `li` to accommodate the border without looking cramped
- Augmented `toc.js` with IntersectionObserver that triggers `updateActiveHeading()`
- `updateActiveHeading()` scans all h2s on each callback, finds last one with `top <= 100px`, toggles `.active` class
- Observer uses `rootMargin: '0px 0px -90% 0px'` to detect headings near viewport top
- Built `headingToItem` Map during the existing loop to avoid a second pass

### Step 3: Manual testing
- Pending — need to run dev server and test on a post with multiple h2 sections

## Future considerations
- Deeper ToC levels (h3, h4) — currently only h2 is tracked, matching what the ToC lists. If we ever expand the ToC to show sub-sections, the scroll tracking should follow.
- Smooth scrolling on ToC link click — a natural complement to the highlight transitions, deferred for now.
- Alternative scroll-tracking strategies to try if "most recently scrolled past" doesn't feel right:
  1. First heading still visible (nearest to but hasn't scrolled past top)
  2. Closest heading in either direction (nearest to top regardless of above/below)
- The chevron/arrowhead indicator is exploratory — may simplify to just bold + left border if it doesn't look right.
