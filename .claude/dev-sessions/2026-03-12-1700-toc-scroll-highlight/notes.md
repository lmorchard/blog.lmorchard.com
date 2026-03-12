# ToC Scroll Highlight - Notes

## Progress

### Step 1 & 2: CSS + JS implementation (complete)
- Added `.active` styles to `article.css`: bold, chevron via `::before` with opacity transition
- Set explicit `line-height: 1.4` on base `li` to prevent vertical layout shift
- Chevron positioned at `left: -2em` to clear list item numbers
- Dropped left border — chevron + bold is sufficient
- Augmented `toc.js` with IntersectionObserver + debounced scroll listener
- `updateActiveHeading()` finds h2 nearest to effective viewport top (accounting for sticky header)
- Article header competes with h2s — if header is closest, nothing is highlighted
- Added smooth scroll on ToC link clicks via `scrollIntoView({ behavior: 'smooth' })`
- Added `scroll-margin-top` on `h2` at the sticky header breakpoint to fix pre-existing bug where anchor jumps landed behind the header

### Step 3: Manual testing
- Chevron position tuned (moved from -1.25em to -2em)
- Switched from "most recently scrolled past" to "nearest to top" strategy
- Added scroll listener fallback for anchor jump edge cases
- Confirmed highlight clears when scrolled back to article header area

## Changes from original spec
- Tracking strategy changed from "most recently scrolled past" to "nearest heading to effective viewport top (either direction)" — felt more natural during testing
- Left border dropped — chevron + bold was enough visual signal
- Smooth scroll on ToC clicks added (was originally deferred as future work)
- `scroll-margin-top` fix for sticky header added (pre-existing bug, closely related)

## Future considerations
- Deeper ToC levels (h3, h4) — currently only h2 is tracked
- Alternative scroll-tracking strategies if current one doesn't hold up
