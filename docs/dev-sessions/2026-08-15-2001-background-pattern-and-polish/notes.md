# Background Pattern and Visual Polish — Notes

## What shipped

All eleven plan tasks, in ten commits on `background-pattern-and-polish`.

| Commit | Change |
|---|---|
| `95d8c74` | fix invalid `white-space: no-wrap` (B2) |
| `47926e7` | align index thumbnails to the title (B3) |
| `61d2945` | `:root` becomes the light theme; delete dead light block (B1) + warm palette |
| `1fea28b` | `--grid-width` consolidation + sheet geometry |
| `bca3dba` | mono metadata |
| `a64c0f7` | `<maze-background>` component + per-build seed |
| `99fa765` | pattern layer + sheet |
| `1ec8b08` | thumbnail mat + shift clear of the sheet |
| `b583fd0` | header / footer / prev-next surface treatment |
| `ff87824` | calmer link treatment |
| `c4b3feb` | colophon note |
| `1bc94b1` | fix sticky header broken by the surface treatment |

## Verification

Clean rebuild (`npm run build -- --clean`, 23s, pagefind indexed 1433 pages),
then the spec's ten checks. All pass.

- **Pattern spans the document** — layer 5411.28px on a 5411px document. This is
  the check that catches a missing `position: relative` on `html`, and it passes
  trivially at scroll 0 if you only look at the first screen.
- **Scroll anchoring** — pattern moves with content; background byte-identical at
  scroll 0 / 1536 / 3072 with page content hidden, so the tile period is exactly
  1536px. Zero JS runs on scroll.
- **Sheet tracks `main`** — uniform 42–43px half-padding at 1250 / 1399 / 1400 /
  1599 / 1600 / 1700px, i.e. across every breakpoint boundary.
- **Heading anchor clearance** — +11px at 1250 / 1440 / 1700px.
- **Thumbnails** — 13px overlap into the sheet before, 13px clearance after; title
  alignment preserved; unchanged below 1200px.
- **Header surface** — edge still at 1370px, identical to `.content-grid`, 20px
  nav clearance. Surfaces are not sliced by the sheet's hairlines (verified by
  forcing the sheet's borders red).
- **Sticky header** — sticky and opaque at 1440×900; correctly not sticky at
  1440×700 or 1100×900.
- **No JS** — neither pattern nor sheet renders; degrades to a flat background
  with no stray hairlines.
- **Theme toggle** — ink changes without the tile regenerating (colour lives in
  CSS), in all four system/forced combinations.
- **Breakout content** — `.wide` figures span 292–1148 against a 375–1065 sheet,
  so they sit on the pattern as intended.
- **Scroll performance** — 60fps, 10MB heap, on the tallest page.
- **Zero page errors** across 9 widths × 2 themes.

Reduced motion needed no check: nothing animates.

## Three things worth remembering

### 1. This build does not rebuild post pages when a template changes

`index.js:53`:

```js
const postsToBuild = navChanged ? posts : posts.filter(p => p.needsBuild);
```

`needsBuild` is set only when a post's source markdown is newer than its cached
`build/YYYY/MM/DD/slug/index.json`, or when its prev/next neighbours moved.
Editing `templates/layoutPage.js` invalidates nothing, so index pages picked up
`<maze-background>` while all 1,432 post pages silently did not.

Fast invalidation without a 600MB `--clean`:

```bash
find build -type f -name index.json -regextype posix-extended \
  -regex 'build/[0-9]{4}/[0-9]{2}/[0-9]{2}/[^/]+/index\.json' -delete
```

Related: `build:dev` is incremental enough that hand-edits inside `build/` survive
rebuilds. Preview `@import`s injected into `build/index.css` persisted across
several builds and quietly contaminated a baseline measurement.

This was caught only by verifying across *page types*. Checking the homepage alone
would have passed and shipped a pattern that appeared on indexes and vanished on
posts.

### 2. `position: relative` for a pseudo-element can defeat `position: sticky`

The surface treatment needs each surface positioned (containing block for
`::after`, stacking context for `z-index`). Applying `position: relative` to the
header overrode `header-footer.css`'s `position: sticky` — mine is both more
specific (`html.maze-ready body > header`, 0-1-3, vs `body>header`, 0-0-2) and
later in the import order. The header stopped sticking.

Sticky already satisfies both requirements, so the fix re-asserts it in the same
media query. **Keep that media query in sync with `header-footer.css`.**

### 3. Measured behaviour corrected the spec twice

- The spec claimed the pattern was hidden everywhere below 1200px. It is not:
  `--sheet-width` falls back to a fixed 855px there, so pattern shows in margins
  that widen from 0px at 700px to ~172px at 1199px. That turns out to be correct
  and desirable — at those widths the prose is a centred 70ch column with real
  empty space either side — so the spec was corrected rather than the code.
- The heading-anchor clearance table was measured before the 1200–1399px sheet
  band existed and reported +116px at 1250px. Actual value is +11px, uniform with
  the other breakpoints.

## Deferred

- **`content/pages/colophon.md`** has a `http://localhost:9980/` URL leaked into
  published content on the Mermaid diagrams line. One-line fix, unrelated to this
  work, deliberately not bundled.
- **Build-time tile asset** instead of runtime generation: 10.8KB gzipped, cached
  site-wide, zero JS, works with JS disabled, 0ms main thread. Measurably better
  but adds a generator and an artifact to the build. The tile builder is already a
  pure seed-driven function, so it lifts into the build unchanged if wanted.
- **Marginalia** (`.right`, `.left`, `.preside`) is still unused in every post, and
  more tempting now that the gutters are visible.
- **"Open season"** items from the spec's non-goals: masthead redesign, body font,
  reconsidering the wide grid.

## Prototype

`reference/` holds the validated prototype the measurements came from, with a
README mapping each file to where it shipped and flagging the two pieces that were
preview-only artifacts. The live preview harness lived in gitignored
`build/preview/` and is gone after the clean rebuild.
