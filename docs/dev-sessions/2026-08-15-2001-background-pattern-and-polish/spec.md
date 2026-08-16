# Background Pattern and Visual Polish — Spec

## Overview

Add a subtle, theme-aware background pattern to the blog and fix four
visual-polish issues surfaced while designing it. The pattern is the
Commodore 64 one-liner maze:

```basic
10 PRINT CHR$(205.5+RND(1)); : GOTO 10
```

See <http://10print.org/>. `CHR$(205)` is `\` and `CHR$(206)` is `/` in PETSCII;
printing one at random per character cell fills the screen with a maze.

The pattern fills the page **outside** the `main` grid column. The text column
sits on an opaque "sheet" above it. This is the point of the feature, not
decoration: the site's grid reserves 3fr (25% of the viewport) of gutter on each
side for `.wide` / `.fullwidth` / `<aside>` / the sticky TOC, and those gutters
are empty on nearly every page. Making them a patterned field makes the default
empty state read as deliberate negative space, and makes breakout content
(images, code blocks, index thumbnails, marginalia) read as sitting *in the
margin* rather than merely in a wider column.

## Goals

1. Theme-aware background pattern, no new image or font assets.
2. Empty gutters look intentional; breakout content gains visual meaning.
3. Fix the dead light-theme CSS block that currently makes light-mode theme
   variables unreachable.
4. Four polish items: warm palette made explicit, mono metadata, thumbnail
   alignment, calmer link treatment.
5. Degrade cleanly with JS disabled and with `prefers-reduced-motion: reduce`.

## Non-goals

Deferred to a possible follow-up session ("open season" scope):

- Masthead / header redesign.
- Changing the body font away from Bitter.
- Reconsidering the wide multi-column grid premise. The grid stays: a narrow
  column for prose, wider columns so images and code samples can break out,
  and occasional marginalia to the sides.
- Building out the marginalia system (`.right`, `.left`, `.preside`), which is
  currently unused in every post. It becomes more tempting once it is visible
  against the pattern, but that is separate work.
- A no-JS fallback pattern (see "No-JS behaviour" below).

## Background: three bugs found while designing this

These were confirmed by measuring the live site in a real browser, not by
reading CSS.

### B1 — The `prefers-color-scheme: light` block is dead code

`content/public/index.css:16-26` never applies when JavaScript is enabled.
Measured on <https://blog.lmorchard.com/> at `prefers-color-scheme: light`:

| Variable | light block declares | actually renders |
|---|---|---|
| `--theme-background-color` | `rgba(238,238,238,1)` | `rgba(242,240,235,1)` |
| `--theme-link-color` | `#383` (green) | `rgba(0,0,255,0.8)` (blue) |
| `--theme-border-color` | `#000` | `#555` |

Every rendered value comes from `base-vars.css`, not the light block.

Cause: `theme-selector.js:71-78`. When the active scheme is light, the `"light"`
branch *deletes* `(prefers-color-scheme: light)` from the rule's media list and
appends the bogus medium `original-prefers-color-scheme`, which matches nothing.
The block therefore switches **off** exactly when it should be on.

The behaviour is asymmetric: the `"dark"` branch (lines 79-84) *appends* both
mediums instead of deleting, so the dark block works correctly.

Consequences:
- Light-mode links were specified as green and have never rendered as green.
- Any *new* rule using `@media (prefers-color-scheme: light)` would also be
  dead. This constrains how the pattern's theme-awareness is implemented.

### B2 — `white-space: no-wrap` is invalid

The property value is `nowrap`. Two occurrences, both silently dropped:

- `content/public/css/post-list.css:95` on `li.tag`. Visible effect: a tag's
  FontAwesome `::before` icon can wrap onto a different line from its label,
  leaving an orphaned icon at a line end.
- `content/public/css/header-footer.css:72` on `div.title`. Masked, because
  `header-footer.css:79` spells it correctly for the nested `h1`/`h2`.

### B3 — Thumbnails align to the summary, not the title

`post-list.css:130-136` places `.thumb` in the left gutter with
`grid-row: span 2` but no explicit start row. Grid's sparse auto-placement
cursor has already passed row 1 (occupied by `.title`), so the thumbnail lands
on row 2 and hangs below the title in an apparent gap.

## Design

### 1. Theme plumbing

Do **not** patch `theme-selector.js`. That media-rule rewriting is load-bearing,
subtle, adapted from a StackOverflow answer, and the failure mode of getting it
wrong is worse than the bug.

Instead, make `:root` in `base-vars.css` *be* the light theme and delete the
dead light block. Dark remains the only `@media` override.

Correct in all four states:

| System | Forced | Dark `@media` block | Result |
|---|---|---|---|
| light | — | not matched | `:root` light ✓ |
| dark | — | matched | dark ✓ |
| light | dark | both mediums appended → matched | dark ✓ |
| dark | light | mediums deleted → not matched | `:root` light ✓ |

This also keeps theme-dependent custom properties on `:root` (i.e. `html`),
which is required because `html` paints the page background beneath the pattern
layer. No `<body>`-class mirroring is needed.

`--pattern-ink` lives with the other theme variables, in `:root` for light and
in the dark `@media` block, per the existing `HACK:` comment at
`index.css:14`.

### 2. Ink derived from text colour

```css
/* light */
--pattern-ink: color-mix(in srgb, var(--theme-text-color) 13%, transparent);
/* dark */
--pattern-ink: color-mix(in srgb, var(--theme-text-color) 9%, transparent);
```

Deriving ink from `--theme-text-color` means the pattern re-tints itself for any
future theme with no extra work. Dark uses a lower alpha because light ink on a
dark field reads stronger at equal alpha.

### 3. Grid width gets a single source of truth

The sheet must track the `main` column exactly. Hardcoded pixel widths would
silently desync if `--column-gap` or the `fr` ratios changed.

`main` spans 6 of 12 `fr`. At the `lg` grid (6 columns, 5 gaps):

```
main = (W - 5g)/2 + g  =  W/2 - 1.5g
```

At the `xl` grid (8 columns, 7 gaps): `main = W/2 - 2.5g`.

Introduce `--grid-width` in `base-vars.css`, set once per breakpoint:

| Breakpoint | `--grid-width` | `--sheet-width` |
|---|---|---|
| `< 1200px` | n/a (`.content-grid` is flex) | `min(70ch + var(--sheet-padding), 100%)` |
| `1200–1399px` | `var(--layout-max-width)` | `calc(var(--grid-width)/2 - 1.5*var(--column-gap) + var(--sheet-padding))` |
| `1400–1599px` | `var(--layout-width-lg)` | same formula |
| `>= 1600px` | `var(--layout-width-xl)` | `calc(var(--grid-width)/2 - 2.5*var(--column-gap) + var(--sheet-padding))` |

`--sheet-padding: 5em` gives the prose breathing room from the sheet edge. Half
of it sits on each side, so **half must clear anything positioned outside
`main`** — otherwise that content straddles the sheet's border.

The binding constraint is the heading anchor from `linkable-headings.js`, which
injects a `#` at `left: -1.25em` of the heading. On a 25.5px `h2` that is 32px
outside `main`. Measured at `3em` (half = 25.5px) the `#` began **7px outside**
the sheet's border and visibly straddled it. `5em` gives half = 42.5px, i.e.
~10px of clearance:

| viewport | half padding | `#` offset | clearance |
|---|---|---|---|
| 1250px | 42px | 32px | +11px |
| 1440px | 42px | 32px | +10px |
| 1700px | 42px | 32px | +10px |

Half-padding is a uniform ~42px at every breakpoint from 1200px up, because all
three bands derive `--sheet-width` from the grid. Getting that uniformity right
matters beyond this constraint: it is what allows a **single** margin rule to
position the index thumbnails correctly at every width (section 6c). An earlier
draft of the preview left the 1200–1399px band falling back to the
`min(70ch + padding, 100%)` measure-based value, which made the sheet 147px wider
than `main` there instead of 42px — a discrepancy invisible at a glance but which
would have needed per-breakpoint thumbnail offsets to paper over.

Below 1200px `--sheet-width` falls back to the measure-based
`min(70ch + padding, 100%)`, which is wider relative to the content than the
derived value, so no clearance constraint applies there.

If a future change makes headings larger, or moves the anchor further out, this
has to be rechecked — `--sheet-padding` and the anchor's `left` are coupled. The
alternative fix is pulling the anchor inward instead of widening the sheet; the
sheet was widened because it also improves the prose's breathing room from the
edge generally.

The `1.5` / `2.5` coefficients encode the assumption *"`main` spans 6 of 12
`fr`"* and MUST carry a comment saying so, since they silently break if
`--layout-grid-columns` changes.

The formula was verified against the live layout by measuring the rendered
width of `.post .summary` (which occupies `grid-column: main`):

| viewport | grid width | formula | measured |
|---|---|---|---|
| 1250px | 1208 | `1208/2 - 1.5 x 29.75` = 559.4 | 559 |
| 1440px | 1300 | `1300/2 - 1.5 x 29.75` = 605.4 | 605 |
| 1700px | 1500 | `1500/2 - 2.5 x 29.75` = 675.6 | 676 |

**Below 1200px** `.content-grid` drops to a flex column
(`content-grid.css:90-98`), so there are no grid gutters and `--sheet-width`
falls back to `min(70ch + var(--sheet-padding), 100%)` — a fixed 855px until the
viewport is narrower than that. Measured consequences:

| viewport | sheet | pattern strip each side |
|---|---|---|
| 700px | 700 | 0px — sheet fills the viewport |
| 900px | 855 | 22px |
| 1000px | 855 | 72px |
| 1199px | 855 | 172px |

So the pattern *is* visible between roughly 855px and 1200px, in margins that
widen as the viewport does. That is correct and desirable: at those widths the
prose is a centred 70ch column with real empty space either side, and patterning
it is the same argument that motivates the feature at desktop widths. Below
~855px the sheet fills the viewport and the pattern is genuinely hidden, which is
also right — there is no spare horizontal space to decorate.

(An earlier draft of this spec asserted the pattern was hidden everywhere below
1200px. That was wrong, and only surfaced when the breakpoint sweep was actually
measured.)

The 1400/1600px widths are currently duplicated across
`page-container.css:11-22`, `header-footer.css:35-49`, and
`content-grid.css:100-110`. Those three should reference `--grid-width` instead.
This continues the consolidation started in the
`2026-03-13-1800-layout-refactor` session, which introduced
`--layout-width-lg` / `--layout-width-xl` for the same reason.

### 4. The maze component

New: `content/public/js/components/maze-background.js`, defining a
`<maze-background>` custom element. Registered eagerly from
`content/public/js/components/index.js` alongside `theme-selector` and
`rotating-tagline` — **not** via `component-lazy-loader.js`, since the page
background is needed immediately and unconditionally.

Placed as the first child of `<body>` in `templates/layoutPage.js`:

```html
<maze-background cell="24" animation="type"></maze-background>
```

Attribute-driven configuration follows the `rotating-tagline` precedent
(`layoutPage.js:80-89`). The element is `position: fixed`, so despite `body`
being a flex container it contributes nothing to flex layout.

Implementation requirements:
- **No canvas, no animation, no per-frame work.** The type-in reveal was cut
  after seeing it, and removing it collapses this feature: the reveal was the
  only thing that needed a live canvas, per-frame state, or a scroll listener.
  What remains is one tile, built once, handed to CSS.

  History worth keeping, because two earlier drafts of this spec were wrong in
  instructive ways:

  1. First draft: canvas repainted per scroll, to keep the maze non-repeating.
     Rejected — a canvas repainted on scroll is **inherently one frame behind
     the compositor**, because the browser scrolls content on the compositor
     thread while the repaint happens on the main thread. Measured with a real
     wheel scroll: handler responded in 1.1ms median, yet the pattern trailed by
     p95 **120px** — exactly one frame of scroll distance. Not tunable; `scroll`
     is not emitted before the scroll is composited.
  2. Second draft: canvas rasterised a tile, `toDataURL`, CSS
     `background-image`. Correct behaviour but wasteful — profiled at 3ms to
     draw, **28ms to PNG-encode**, ~40ms for the browser to decode the resulting
     490KB base64, per page load.

- **Build the tile as an SVG data URI and hand it to CSS as a repeating
  `mask-image`.** The visible colour comes from `background: var(--pattern-ink)`
  in CSS; the mask contributes only alpha. Consequences:

  | | value |
  |---|---|
  | build cost (64 cells) | **4ms** (string concat; no raster encode) |
  | tile URI size | 76KB of text, never sent over the network |
  | theming | free — colour is a CSS variable, tile never regenerates |
  | scroll cost | zero; the browser composites the layer |
  | listeners needed | none (no scroll, resize, or `themechange`) |

  This is the technique the reference site uses, which an early draft dismissed
  on the grounds that `RND(1)` rules out a tile. That conflated "the pattern must
  be random" with "the pattern must be generated per frame at runtime."
  Randomness only has to happen *once*.

- **Tiling is seamless by construction.** Every cell is a diagonal between
  opposite corners, so tile edges always meet corner-to-corner at any tile size.
  There is no seam artifact — only a repetition period of `tileCells × cell`,
  1536px at the default 64 cells × 24px. Verified exact: with page content
  hidden, the background at scroll 0, 1536 and 3072 is byte-identical.

- **`html` MUST be `position: relative`.** This is not cosmetic. `html::before`
  is absolutely positioned; with `html` static there is no positioned ancestor,
  so `inset: 0` resolves against the **initial containing block, whose height is
  the viewport**. The pattern then stops after the first screenful — measured as
  a 1050px layer on a 5411px document, with everything below unpatterned.
  Making `html` positioned resolves `inset` against its padding box, i.e. the
  full document height (verified: 5411.28px layer on a 5411px document).

  Grep for absolutely-positioned descendants before shipping this: making `html`
  a containing block changes what `bottom`/`height: 100%` resolve against for
  any absolutely positioned element that previously used the ICB. In this
  codebase the only such rule is `article > nav.table-of-contents li::before`,
  which resolves against `li` (`article.css` sets `position: relative` on it),
  so nothing is affected.

- **`position: absolute`, not `fixed`.** Absolute makes the browser scroll the
  layer with the document. Fixed pins it to the viewport, which reads as broken
  — content slides over a stationary texture. (The reference site pins its
  pattern; that works there because a regular hexagon lattice has almost no
  detectable local structure. A maze does, so a static one is obvious.)

- **Cell values from a pure hash of `(col, row, seed)`,** not `Math.random()`
  memoised in a `Map`. Position → value is a pure function, so the tile is
  reproducible from the seed alone and nothing can reshuffle.

- **The seed is injected by the build,** e.g.
  `<maze-background seed="${site.buildSeed}">` in `layoutPage.js`. A per-load
  `Math.random()` seed reshuffles the background on every navigation, which reads
  as instability rather than charm. A build-injected seed keeps the maze
  identical across every page of a build and changes when the site is published.

- **Sets `html.maze-ready`,** which gates both the pattern layer and the sheet
  (see section 5).

- `pointer-events: none` on the layer. No `aria-hidden` needed — a
  `::before` pseudo-element is not in the accessibility tree.

- **`prefers-reduced-motion` is now irrelevant** to this feature, since nothing
  animates. If an animated mode is ever added, only modes that translate pixels
  should be gated: a progressive draw that moves nothing is closer to an opacity
  fade and does not need suppressing. (Noted because the site author has
  reduce-motion enabled system-wide, so a blanket gate makes any animation here
  invisible to him and to a meaningful share of readers.)

Deliberately not implemented: a continuous-scroll animation. It is the most
faithful reading of `GOTO 10`, but it means a permanently animating background
behind body text and a `requestAnimationFrame` loop for the life of the page. It
is also the one mode that genuinely translates pixels, so it would have to yield
to `prefers-reduced-motion`.

Also considered and rejected: generating the tile as a **build-time asset**
(10.8KB gzipped SVG, cached site-wide, zero JS, works with JS disabled). It is
arguably the better engineering choice and measurably cheaper, but it adds a
generator and an artifact to the build for a saving of ~4ms. Runtime generation
was chosen deliberately to keep the build simple. If the 4ms or the JS
dependency ever matters, this is the upgrade path and it needs no design work —
the tile-building function is already pure and seed-driven, so it can be lifted
into the build as-is.

### 5. The sheet, and the no-JS gate

New: `content/public/css/background-pattern.css`, imported from `index.css`.
Note that `@import` must precede all other rules in a stylesheet, so it belongs
in the existing import block at the top, not appended.

```css
html { background-color: var(--theme-background-color); }
body { background-color: transparent; }   /* so the pattern layer is visible */

/* position: relative is REQUIRED — see section 4. Without it the pattern
   covers only the first viewport-height of the document. */
html.maze-ready { position: relative; }

html.maze-ready::before {                  /* the pattern */
  content: "";
  position: absolute;                      /* absolute, NOT fixed: the browser
                                              then scrolls it with the document */
  inset: 0;
  z-index: -2;                             /* below the sheet, above html's bg */
  pointer-events: none;
  background: var(--pattern-ink);          /* colour stays in CSS -> free theming */
  mask-image: var(--maze-mask);            /* SVG data URI, built by the component */
  mask-repeat: repeat;
  mask-size: var(--maze-tile) var(--maze-tile);
  mask-position: 0 0;
}

html.maze-ready body::after {              /* the sheet */
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  width: var(--sheet-width);
  margin-inline: auto;
  background-color: var(--theme-background-color);
  border-inline: 1px solid var(--sheet-edge);
}
```

The sheet stays `fixed` while the pattern is `absolute`. That asymmetry is
deliberate and safe: the sheet is a solid vertical band of uniform colour, so
fixed and scrolling are visually indistinguishable, and fixed avoids having to
size it to the document.

The page background moves to `html` because negative-`z-index` descendants of
`body` paint *before* `body`'s own background (CSS painting order: root
background, then negative z-index, then in-flow block backgrounds). An opaque
`body` background would hide the pattern entirely.

**The `html.maze-ready` gate is a correctness requirement, not an optimisation.**
Without it, a visitor with JS disabled gets no maze but still gets the sheet: a
solid band in the same colour as the page background, invisible except for its
hairline edges, which would render as two unexplained vertical lines down the
page. Gating the sheet and its edge on `maze-ready` makes the no-JS case
degrade to exactly the current design.

**Edge treatment:** a hairline
`color-mix(in srgb, var(--theme-border-color) 18%, transparent)`. Without an
edge the sheet boundary is perceived as a lighting shift rather than an edge,
because the sheet and the pattern field share the same background colour.

### 6. The other surfaces on the field

Once the sheet exists, every other element that used to sit on a flat background
is now floating on a pattern, and looks unfinished. Header, footer, the article
prev/next nav, and index thumbnails all get the sheet's vocabulary: **opaque
background + hairline edge + soft shadow**, reusing `--sheet-edge` and
`--sheet-shadow` so retuning the sheet retunes everything with it.

| surface | treatment |
|---|---|
| `body > header` | opaque, shadow, side borders at `>=1200px` |
| `body > footer` | opaque, shadow, side borders at `>=1200px` |
| `.posts-nav` | opaque, shadow, border all round — a discrete card |
| index thumbnails | background mat, hairline, shadow on the `img` |

Three non-obvious requirements, each learned by getting it wrong first:

**(a) Draw each surface with a negatively-inset pseudo-element, not with
borders/padding on the element.**

```css
inset: 0 calc(-1 * var(--surface-bleed));   /* 1.25em wider on each side */
```

The header's nav is aligned to grid line `full-end`, which lines up with
`.content-grid` below. A border on the header box therefore lands directly
against "colophon". Padding would open the gap but shift the grid and break that
alignment. The footer and `.posts-nav` are `.page-container`
(`box-sizing: border-box`, zero horizontal padding at `>=1400px`), so padding
there would *shrink* their content boxes and misalign them the other way. A
negatively-inset pseudo-element extends the surface past the content while
touching no layout at all — verified: header edge stays at 1370px, identical to
`.content-grid`, with 20px clearance to the nav.

Use `position: absolute` on it: header, footer and `.posts-nav` are all flex
containers, so an in-flow pseudo-element would become a flex item.

**(b) Each surface needs `z-index: 0` (a stacking context).** The sheet is
`body::after` at `z-index: -1`. A surface pseudo-element also at `-1`, on an
element with no stacking context of its own, competes in the **root** stacking
context — where `body::after` comes later in tree order and therefore paints on
top, drawing the sheet's hairlines *across* the surface and slicing it into three
segments at the sheet's edges. Confirmed by forcing the sheet's borders red: with
`z-index: auto` they run through the card, with `z-index: 0` they stop at its
edge.

Note the header already declares `z-index: 100` but that was inert — **`z-index`
is ignored on `static` elements**, and the header is only positioned when sticky
at `>=1200px`. Preserve the 100 so the sticky stacking is unchanged.

**(c) Thumbnails must be shifted clear of the sheet's left border.** `.thumb`
spans `wide-start -> main-start` right-aligned, so its right edge lands one
column-gap (29.75px) short of `main`. Half of `--sheet-padding` is 42.5px, which
is *larger*, so the thumbnail overlapped into the sheet by the ~13px difference
and straddled the border. Required shift:

```css
@media (min-width: 1200px) {
  .post-list ul.posts .post .thumb {
    margin-right: calc(var(--sheet-padding) / 2 - var(--column-gap) + 0.75em);
  }
}
```

Gated at `>=1200px` because below that `.thumb` is centred in normal flow, not in
a gutter. Verified: 13px clearance at 1250 / 1440 / 1700px, no viewport clipping,
and the title-row alignment from B3 preserved.

This is the same failure mode as the heading anchor in section 3, and the same
general lesson: **introducing a visible boundary turns every previously
invisible negative offset into a potential defect.** Both the `#` and the
thumbnail had always sat outside `main`; it only mattered once something was
drawn at that boundary. Anything else positioned outside `main` needs the same
check.

**Consequence for existing translucency.** `body > header` currently uses
`color-mix(bg 90%, transparent)` and `body > footer`
`--theme-background-color-transparent` (0.7 alpha). Both go **fully opaque**:
letting the maze show through a sticky band that content scrolls under reads as
muddy rather than layered.

`article > header` (`article.css:12`) and `figure` (`article.css:114`) keep their
0.7 alpha — they sit *inside* the sheet where there is no pattern behind them, so
the translucency is harmless there and the layered effect on breakout figures is
desirable.

### 7. Polish items

**Palette.** Make the warm light values explicit in `:root`, and warm the dark
theme to match rather than leaving it neutral:

| Variable | light | dark |
|---|---|---|
| `--theme-background-color` | `rgba(242,240,235,1)` | `rgba(26,24,22,1)` |
| `--theme-text-color` | `#26221c` | `#e6e1d8` |
| `--theme-border-color` | `#6b6355` | `rgba(230,225,216,0.55)` |
| `--theme-link-color` | `#0c5a72` | `#7fc3d6` |

The light background is unchanged from what renders today. The dead `#383` green
is dropped in favour of teal/ink blue, decided during design.

**Mono metadata.** A new `--theme-font-family-mono` using a **system stack**
(`ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "DejaVu Sans Mono",
monospace`) — no new webfont, no added page weight. Applied to `.post .meta`,
`.word-count`, `article > header > time`, tag lists, and `.date-header .date`
(with slight letter-spacing). Metadata recedes, gains texture, and suits the C64
motif.

**Thumbnail alignment.** `grid-row: 1 / span 2` on `.thumb` inside the
`min-width: 1200px` block, fixing B3.

**Calmer links.** Post titles (1.6em, currently permanently underlined and
saturated) lose the underline, gaining it on `:hover` and `:focus-visible` with
`text-underline-offset: 3px`. Meta links get a dotted `border-bottom` that goes
solid on hover. Inline body links keep their underline.

**Bug fixes.** B1 per section 1; B2 by correcting both `no-wrap` occurrences.

## Files touched

| File | Change |
|---|---|
| `content/public/css/base-vars.css` | `:root` becomes the light theme; add `--pattern-ink`, `--theme-font-family-mono`, `--grid-width`, `--sheet-width`, `--sheet-padding`, `--sheet-edge` |
| `content/public/index.css` | delete dead light block; extend dark block with warm palette + `--pattern-ink`; add `background-pattern.css` to the import block |
| `content/public/css/background-pattern.css` | **new** — pattern layer + sheet, gated on `html.maze-ready` |
| `content/public/js/components/maze-background.js` | **new** — `<maze-background>` custom element |
| `content/public/js/components/index.js` | eagerly import the new component |
| `templates/layoutPage.js` | add `<maze-background seed="${site.buildSeed}">` as first child of `<body>` |
| `lib/` or `index.js` (build) | expose a per-build `site.buildSeed` integer |
| `content/public/css/page-container.css` | use `--grid-width` |
| `content/public/css/header-footer.css` | use `--grid-width`; fix `no-wrap` (B2) |
| `content/public/css/content-grid.css` | use `--grid-width` |
| `content/public/css/post-list.css` | thumb row (B3); `no-wrap` (B2); mono metadata; link treatment |
| `content/public/css/article.css` | mono for `time` and tags; `.posts-nav` surface |
| `content/public/css/background-pattern.css` | also: surface treatment for header/footer/posts-nav/thumbnails (section 6) |

## Verification

This repo has no frontend test harness — `test/` contains two Node tests for
`lib/` build-side code, and none of the existing browser components are tested.
No new harness will be invented for this work. Verification is manual, via
`yarn start` plus a Playwright screenshot sweep.

Matrix: light × dark, home × post, desktop × mobile.

Specific checks:

1. **No JS** — page renders as the current design. In particular no stray
   vertical hairlines from an ungated sheet.
2. **Pattern covers the WHOLE document, not just the first screenful** — the
   single most important check, and the one that is easiest to pass by accident
   at scroll 0. Assert the layer's computed height equals
   `documentElement.scrollHeight`, then scroll to the bottom of the tallest page
   and confirm the pattern is still there. This is what catches a missing
   `position: relative` on `html` (see section 4).
3. **Scroll anchoring** — scroll down and confirm the pattern moves with the
   content rather than sitting still behind it, and that it does not trail during
   a fast wheel/trackpad fling (a scripted `scrollTo` jumps and hides trailing
   entirely, which is how an earlier draft's one-frame lag went unnoticed).
   Confirm zero JS runs during scroll. Then verify the tile period is exact by
   comparing the background at scroll 0 against scroll `tileCells × cell`.

   **Isolate the background before comparing screenshots.** Hide page content and
   clip away the scrollbar; both differ between scroll positions for reasons
   unrelated to the pattern, and both produced false failures during development.
4. **Breakpoint boundaries** — 1199/1200px (flex → grid) and 1400/1600px, where
   the `--sheet-width` formula changes. The sheet edge must align with `main`;
   measure `.post .summary`'s rendered width and compare, as in section 3.
   Below 1200px the sheet is a fixed 855px, so confirm the pattern appears in
   margins that widen with the viewport (0px at 700px, ~172px at 1199px) rather
   than assuming it is hidden.
5. **Sticky header at scroll** (`>= 1200px` and `>= 850px` tall) — text passing
   under the header over the pattern must stay legible.
6. **Heading anchor clearance** — on a post with `h2`/`h3` headings, hover a
   heading and confirm the `#` sits inside the sheet rather than across its
   border. Measure it rather than eyeball it: `main`'s left edge minus `1.25em`
   of the heading's font size, compared against the sheet's left edge. Check at
   1400px and 1600px, where `--sheet-padding` is the binding constraint.
7. **Theme toggle** — maze re-inks via `themechange`, no reload needed, in both
   directions and with a `localStorage` override set.
8. **Post with breakout content** — `/2026/03/20/decafclaw/` has `.wide`
   figures; confirm they read as sitting on the pattern.
9. **Tag wrapping** — a post with many tags wraps without orphaning a tag icon
   (regression test for B2).
10. **Scroll performance** — measured on the prototype at 1440×1050: a full
   redraw averages **0.33ms** (max 1.3ms) against a 16ms frame budget, holding
   ~53fps while scrolling, with a 10MB JS heap. Redraw cost scales with viewport
   area, not document height, because the canvas stays viewport-sized — so long
   pages cost no more than short ones. Re-measure only if the cell size drops
   substantially (cost is inversely proportional to cell area).

## Prior art referenced

- <https://michaelharley.net/> — the `html::before` + `mask-image` +
  `color-mix` technique for a theme-aware pattern with no extra assets, and the
  "sheet of paper on a patterned desk" composition. Their motif is a hexagon
  lattice and is periodic, so it can stay pure CSS; ours cannot.
- <http://10print.org/> — the book about the one-liner.
