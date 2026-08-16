# 10 PRINT Background Pattern and Visual Polish — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Commodore 64 maze one-liner as a theme-aware background pattern behind a "sheet" that holds the text column, extend that surface language to the header/footer/prev-next/thumbnails, and fix three pre-existing CSS bugs found along the way.

**Architecture:** One tile is built at page load as an SVG data URI by a `<maze-background>` custom element, then handed to CSS as a repeating `mask-image` on `html::before` filled with `var(--pattern-ink)`. The browser composites that layer, so it scrolls with the document at zero cost. An opaque "sheet" (`body::after`) covers the `main` grid column, so the pattern shows only in the gutters. No canvas in the document, no animation, no scroll/resize/theme listeners.

**Tech Stack:** Vanilla ES modules + custom elements (no framework), plain CSS with `@import` (no preprocessor), Node build via `./index.js`. Verification is browser measurement via Playwright run from a scratch directory outside the repo.

**Spec:** `./spec.md` in this directory. Read it before starting — it contains the measurements behind every decision and five rejected alternatives.

**Reference:** `./reference/` holds the validated prototype. Read `./reference/README.md` first: two things in it are preview-only artifacts that must NOT be copied (the `html.polish` / `html.polish.dark` split, and inline `--pattern-ink`).

## Global Constraints

- **Never add a `@media (prefers-color-scheme: light)` block.** `theme-selector.js:71-78` disables it exactly when it should apply (spec B1). Light values go in `:root`; dark values go in the single existing dark `@media` block in `content/public/index.css`.
- **All theme-dependent custom properties live on `:root`**, never on `body`. `html` paints the page background beneath the pattern, and custom properties do not inherit upward.
- **`@import` must precede all other rules** in a stylesheet. New imports go in the existing block at the top of `content/public/index.css`.
- **No new dependencies**, no new webfonts, no new build artifacts. Mono is a system stack.
- **`--sheet-padding` is in `em` and resolves against `body`'s 17px**, not `html`'s 16px, because it is consumed by `body::after`. `5em` = 85px, half = 42.5px.
- **Do not commit `yarn.lock`** — it was already modified before this work started.
- Branch: `background-pattern-and-polish`. Commit after every task.

## File Structure

| File | Responsibility | Action |
|---|---|---|
| `content/public/css/base-vars.css` | all custom properties: light theme, grid widths, sheet geometry, mono stack | modify |
| `content/public/index.css` | import block + the single dark `@media` block | modify |
| `content/public/css/background-pattern.css` | pattern layer, sheet, surface treatment | **create** |
| `content/public/js/components/maze-background.js` | tile builder + `<maze-background>` element | **create** |
| `content/public/js/components/index.js` | eager component registration | modify |
| `templates/layoutPage.js` | place `<maze-background>` with the build seed | modify |
| `config.js` | expose `site.buildSeed` | modify |
| `content/public/css/page-container.css` | use `--grid-width` | modify |
| `content/public/css/header-footer.css` | use `--grid-width`; fix `no-wrap` | modify |
| `content/public/css/content-grid.css` | use `--grid-width` | modify |
| `content/public/css/post-list.css` | thumb row + shift; fix `no-wrap`; mono; links | modify |
| `content/public/css/article.css` | mono for `time`/tags; `.posts-nav` padding | modify |
| `content/pages/colophon.md` | note the pattern's origin | modify |

---

## Task 0: Measurement harness

Every later task verifies by measuring a real browser. This sets that up once, **outside the repo** so it adds no dependency to the project.

**Files:**
- Create: `~/.cache/blog-preview-pw/` (scratch, not in the repo)

- [ ] **Step 1: Install Playwright in a scratch directory**

```bash
mkdir -p ~/.cache/blog-preview-pw && cd ~/.cache/blog-preview-pw
npm init -y >/dev/null && npm install playwright@latest
npx playwright install chromium
```

- [ ] **Step 2: Write the reusable probe**

Create `~/.cache/blog-preview-pw/probe.js`:

```js
// Usage: node probe.js <path> <width> [--dark] [--nojs]
// Prints layout/theme measurements as JSON.
const { chromium } = require("playwright");
const [path, width, ...flags] = process.argv.slice(2);
const dark = flags.includes("--dark");
const nojs = flags.includes("--nojs");

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: Number(width) || 1440, height: 1050 },
    colorScheme: dark ? "dark" : "light",
    javaScriptEnabled: !nojs,
  });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  await page.goto("http://127.0.0.1:9980" + path, { waitUntil: "load" });
  await page.waitForTimeout(1500);

  const out = await page.evaluate(() => {
    const cs = getComputedStyle(document.documentElement);
    const g = (n) => cs.getPropertyValue(n).trim();
    const rect = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), top: Math.round(r.top) };
    };
    const before = getComputedStyle(document.documentElement, "::before");
    const sheetW = parseFloat(getComputedStyle(document.body, "::after").width) || null;
    return {
      themeBg: g("--theme-background-color"),
      themeText: g("--theme-text-color"),
      themeLink: g("--theme-link-color"),
      bodyClass: [...document.body.classList].join(" ") || "(none)",
      htmlBgUsed: getComputedStyle(document.documentElement).backgroundColor,
      mazeReady: document.documentElement.classList.contains("maze-ready"),
      patternHeight: before.height,
      docHeight: document.documentElement.scrollHeight,
      sheetWidth: sheetW ? Math.round(sheetW) : null,
      header: rect("body > header"),
      contentGrid: rect(".content-grid"),
      summary: rect(".post-list .post .summary"),
      title: rect(".post-list .post .title"),
      thumbImg: rect(".post-list .post .thumb img"),
      postsNav: rect(".posts-nav"),
      canvasInDom: !!document.querySelector("body > canvas"),
    };
  });

  out.pageErrors = errs.filter((e) => !/pagefind/i.test(e));
  console.log(JSON.stringify(out, null, 2));
  await browser.close();
})().catch((e) => {
  console.error("ERR", e.message.split("\n")[0]);
  process.exit(1);
});
```

- [ ] **Step 3: Verify the harness runs against a dev build**

```bash
cd /home/lmorchard/devel/blog.lmorchard.com && npm run build:dev
npx http-server -d true -i true -p 9980 -c-1 build --silent &
sleep 3
node ~/.cache/blog-preview-pw/probe.js / 1440
```

Expected: JSON with `themeBg: "rgba(242, 240, 235, 1)"`, `mazeReady: false`, `sheetWidth: null`, `contentGrid.width: 1300`.

**`-c-1` is required.** `http-server` defaults to `max-age=3600`; without it, edits to CSS are invisible behind the browser cache. This wasted a debugging cycle during design.

- [ ] **Step 4: Record the pre-change baseline**

```bash
for w in 1100 1250 1440 1700; do
  echo "=== $w ==="
  node ~/.cache/blog-preview-pw/probe.js / $w | python3 -c "import json,sys; d=json.load(sys.stdin); print({k:d[k] for k in ['header','contentGrid','summary','thumbImg']})"
done | tee ~/.cache/blog-preview-pw/baseline.txt
```

Task 4 compares against this file to prove the `--grid-width` refactor changes no geometry.

- [ ] **Step 5: No commit** — nothing in the repo changed.

---

# Stage 1 — Foundation and bug fixes

Independently valuable, and touches the files the feature also touches. No pattern yet.

## Task 1: Fix invalid `white-space: no-wrap` (spec B2)

The property value is `nowrap`; `no-wrap` is invalid and silently dropped. Visible effect: a tag's FontAwesome `::before` icon wraps onto a different line from its label, orphaning the icon.

**Files:**
- Modify: `content/public/css/post-list.css` (in `li.tag`)
- Modify: `content/public/css/header-footer.css` (in `div.title`)

**Interfaces:**
- Consumes: nothing
- Produces: nothing

- [ ] **Step 1: Confirm both occurrences and that they are the only ones**

```bash
cd /home/lmorchard/devel/blog.lmorchard.com
grep -rn "no-wrap" content/public/css/
```

Expected exactly two hits: `post-list.css` and `header-footer.css`.

- [ ] **Step 2: Fix both**

In `content/public/css/post-list.css`, inside the `li.tag` rule:

```css
  white-space: nowrap;
```

In `content/public/css/header-footer.css`, inside the `div.title` rule:

```css
  white-space: nowrap;
```

- [ ] **Step 3: Verify no occurrences remain**

```bash
grep -rn "no-wrap" content/public/css/ ; echo "exit=$?"
```

Expected: no output, `exit=1`.

- [ ] **Step 4: Verify tags no longer orphan an icon**

```bash
npm run build:dev && node ~/.cache/blog-preview-pw/probe.js / 1440 | grep pageErrors -A3
```

Then visually: open `http://127.0.0.1:9980/` and find the post with 7 tags (`Cat Parole, Coding Sprints...`). Every tag icon must sit on the same line as its label.

- [ ] **Step 5: Commit**

```bash
git add content/public/css/post-list.css content/public/css/header-footer.css
git commit -m "Fix invalid white-space: no-wrap (should be nowrap)

Two occurrences, both silently dropped as invalid. The post-list one on
li.tag let a tag's FontAwesome ::before icon wrap onto a different line
from its label, leaving an orphaned icon at a line end."
```

---

## Task 2: Align index thumbnails to the title (spec B3)

`.thumb` is placed in the left gutter with `grid-row: span 2` but no explicit start row. Grid's sparse auto-placement cursor has already passed row 1 (occupied by `.title`), so the thumbnail lands on row 2 and hangs below the title.

**Files:**
- Modify: `content/public/css/post-list.css` (the `@media (min-width: 1200px)` block)

**Interfaces:**
- Consumes: nothing
- Produces: `.thumb` occupies rows 1-2, so Task 8's `margin-right` composes with a title-aligned thumbnail

- [ ] **Step 1: Measure the current misalignment**

```bash
node ~/.cache/blog-preview-pw/probe.js / 1440 | python3 -c "import json,sys; d=json.load(sys.stdin); print('title.top',d['title']['top'],'thumb.top',d['thumbImg']['top'])"
```

Expected: `thumbImg.top` is greater than `title.top` (thumbnail hangs below).

- [ ] **Step 2: Add the explicit start row**

In `content/public/css/post-list.css`, inside the existing `@media (min-width: 1200px)` block, add to the `.post-list ul.posts .post .thumb` rule:

```css
    /* Explicit start row. Without it, grid's sparse auto-placement cursor has
       already passed row 1 (taken by .title) and the thumbnail drops to row 2,
       hanging below the title in an apparent gap. */
    grid-row: 1 / span 2;
```

- [ ] **Step 3: Verify they now align**

```bash
npm run build:dev && node ~/.cache/blog-preview-pw/probe.js / 1440 | python3 -c "import json,sys; d=json.load(sys.stdin); t=d['title']['top']; h=d['thumbImg']['top']; print('title.top',t,'thumb.top',h,'ALIGNED' if abs(t-h)<=2 else 'STILL OFF')"
```

Expected: `ALIGNED`.

- [ ] **Step 4: Verify nothing changed below the grid breakpoint**

```bash
node ~/.cache/blog-preview-pw/probe.js / 1100 | python3 -c "import json,sys; d=json.load(sys.stdin); print('thumb',d['thumbImg'])"
```

Expected: full-width thumbnail as before (the rule is inside the `min-width: 1200px` block).

- [ ] **Step 5: Commit**

```bash
git add content/public/css/post-list.css
git commit -m "Align index thumbnails to the post title, not the summary

.thumb had grid-row: span 2 with no explicit start row, so grid's sparse
auto-placement put it on row 2 (the cursor had already passed row 1,
occupied by .title) and it hung below the title in an apparent gap."
```

---

## Task 3: Theme plumbing — retire the dead light block (spec B1, §1, §2, §7 palette)

`content/public/index.css`'s `@media (prefers-color-scheme: light)` block never applies when JS is enabled: `theme-selector.js:71-78` deletes `(prefers-color-scheme: light)` from the rule's media list and appends the bogus medium `original-prefers-color-scheme`, which matches nothing. Every rendered light value has always come from `base-vars.css`.

Fix by making `:root` in `base-vars.css` *be* the light theme and deleting the dead block. Do **not** patch `theme-selector.js` — that CSSOM rewriting is load-bearing and subtle, and the dark branch (which appends mediums rather than deleting) already works.

**Files:**
- Modify: `content/public/css/base-vars.css`
- Modify: `content/public/index.css`

**Interfaces:**
- Consumes: nothing
- Produces: `--pattern-ink`, `--theme-font-family-mono`, and a warm palette on `:root`; the dark `@media` block in `index.css` is the single place dark overrides live

- [ ] **Step 1: Prove the light block is dead before touching it**

```bash
node ~/.cache/blog-preview-pw/probe.js / 1440 | python3 -c "import json,sys; d=json.load(sys.stdin); print('bg',d['themeBg']); print('link',d['themeLink'])"
```

Expected: `bg rgba(242, 240, 235, 1)` and `link rgba(0, 0, 255, 0.8)` — i.e. the `base-vars.css` values, **not** the light block's `rgba(238,238,238,1)` / `#383`. That is the bug.

- [ ] **Step 2: Replace the colour block in `base-vars.css`**

In `content/public/css/base-vars.css`, replace these lines:

```css
  --theme-background-color: rgba(242, 240, 235, 1);
  --theme-background-color-transparent: rgba(242, 240, 235, 0.7);
  --theme-highlighted-bg-color: #dfdfdf;
  --theme-dialog-bg-color: rgba(192, 192, 192, 0.8);
  --theme-text-color: #111;
  --theme-border-color: #555;
  --theme-link-color: rgba(0, 0, 255, 0.8);
```

with:

```css
  /* :root IS the light theme. There is deliberately no
     @media (prefers-color-scheme: light) block anywhere — theme-selector.js
     disables such a block exactly when it should apply, so light values that
     live in one are unreachable. Dark overrides go in index.css's dark block,
     which works because its branch appends mediums rather than deleting them. */
  --theme-background-color: rgba(242, 240, 235, 1);
  --theme-background-color-transparent: rgba(242, 240, 235, 0.7);
  --theme-highlighted-bg-color: #e4e0d6;
  --theme-dialog-bg-color: rgba(192, 192, 192, 0.8);
  --theme-text-color: #26221c;
  --theme-border-color: #6b6355;
  --theme-link-color: #0c5a72;

  --theme-font-family-mono: ui-monospace, "SF Mono", SFMono-Regular, Menlo,
    Consolas, "DejaVu Sans Mono", monospace;

  /* Pattern ink derives from the text colour so it re-tints for any future
     theme with no extra work. Dark uses a lower alpha because light ink on a
     dark field reads stronger at equal alpha. */
  --pattern-ink: color-mix(in srgb, var(--theme-text-color) 13%, transparent);
```

- [ ] **Step 3: Delete the dead light block from `index.css`**

In `content/public/index.css`, delete this entire block:

```css
@media (prefers-color-scheme: light) {
  :root {
    --theme-background-color: rgba(238, 238, 238, 1);
    --theme-background-color-transparent: rgba(238, 238, 238, 0.7);
    --theme-highlighted-bg-color: #dfdfdf;
    --theme-dialog-bg-color: rgba(192, 192, 192, 0.8);
    --theme-text-color: #111;
    --theme-border-color: #000;
    --theme-link-color: #383;
  }
}
```

- [ ] **Step 4: Warm the dark block and add its `--pattern-ink`**

In `content/public/index.css`, in the `@media (prefers-color-scheme: dark)` block, replace the `:root` declarations with:

```css
  :root {
    --theme-background-color: rgba(26, 24, 22, 1);
    --theme-background-color-transparent: rgba(26, 24, 22, 0.7);
    --theme-highlighted-bg-color: #332f2a;
    --theme-dialog-bg-color: rgba(0, 0, 0, 0.8);
    --theme-text-color: #e6e1d8;
    --theme-border-color: rgba(230, 225, 216, 0.55);
    --theme-link-color: #7fc3d6;
    --pattern-ink: color-mix(in srgb, var(--theme-text-color) 9%, transparent);
  }
```

Leave the `body { --pagefind-ui-* }` rules in that block unchanged.

- [ ] **Step 5: Verify all four theme states**

```bash
npm run build:dev
echo "--- OS light ---"; node ~/.cache/blog-preview-pw/probe.js / 1440 | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['themeBg'], d['themeLink'], d['bodyClass'])"
echo "--- OS dark ---";  node ~/.cache/blog-preview-pw/probe.js / 1440 --dark | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['themeBg'], d['themeLink'], d['bodyClass'])"
```

Expected:
- OS light: `rgba(242, 240, 235, 1) #0c5a72 theme-light`
- OS dark: `rgba(26, 24, 22, 1) #7fc3d6 theme-dark`

- [ ] **Step 6: Verify the toggle in both directions**

```bash
node -e "
const {chromium}=require('/home/lmorchard/.cache/blog-preview-pw/node_modules/playwright');
const probe=()=>({bg:getComputedStyle(document.documentElement).getPropertyValue('--theme-background-color').trim(),cls:[...document.body.classList].join(' ')});
(async()=>{
  const b=await chromium.launch();
  for (const os of ['light','dark']) {
    const c=await b.newContext({viewport:{width:1440,height:900},colorScheme:os});
    const p=await c.newPage();
    await p.goto('http://127.0.0.1:9980/',{waitUntil:'load'});
    await p.waitForTimeout(1200);
    const before=await p.evaluate(probe);
    await p.evaluate(()=>document.querySelector('theme-selector input[type=checkbox]').click());
    await p.waitForTimeout(700);
    const after=await p.evaluate(probe);
    console.log('OS='+os, JSON.stringify(before), '->', JSON.stringify(after));
    await c.close();
  }
  await b.close();
})();
"
```

Expected: light→dark and dark→light both flip `--theme-background-color` and the body class. All four states correct.

- [ ] **Step 7: Commit**

```bash
git add content/public/css/base-vars.css content/public/index.css
git commit -m "Make :root the light theme; delete dead light @media block

content/public/index.css's @media (prefers-color-scheme: light) block has
never applied with JS enabled. theme-selector.js deletes the light medium
and appends a bogus 'original-prefers-color-scheme' when light is active,
so the block switches off exactly when it should switch on. Every rendered
light value has always come from base-vars.css — including a blue link
colour, while the dead block specified green.

Rather than patch theme-selector's CSSOM rewriting (load-bearing and
subtle; its dark branch appends mediums instead of deleting and works
correctly), :root now IS the light theme and dark is the only override.
Correct in all four system/forced combinations.

Also warms the palette to match the off-white background that has always
actually rendered, settles on teal/ink-blue links, and adds --pattern-ink
and --theme-font-family-mono."
```

---

## Task 4: Consolidate grid width into `--grid-width` (spec §3)

The 1400/1600px widths are currently repeated in three files. The sheet must track the `main` column, and hardcoded pixel widths would silently desync if `--column-gap` or the `fr` ratios changed. This continues the consolidation started in the `2026-03-13-1800-layout-refactor` session.

**Files:**
- Modify: `content/public/css/base-vars.css`
- Modify: `content/public/css/page-container.css`
- Modify: `content/public/css/header-footer.css`
- Modify: `content/public/css/content-grid.css`

**Interfaces:**
- Consumes: `--layout-max-width`, `--layout-width-lg`, `--layout-width-xl`, `--column-gap` (all existing)
- Produces: `--grid-width` (the width `.content-grid` uses at the current breakpoint) and `--sheet-width` / `--sheet-padding` / `--sheet-edge` / `--sheet-shadow`, consumed by Task 6

- [ ] **Step 1: Add `--grid-width` and the sheet geometry to `base-vars.css`**

Append to `content/public/css/base-vars.css`, after the existing `:root` block:

```css
/* --- Grid width: single source of truth -------------------------------------
   The width .content-grid occupies at each breakpoint. page-container,
   header-footer and content-grid all reference this instead of repeating the
   two magic widths. Not a prefers-color-scheme query, so theme-selector.js
   leaves these rules alone. */
:root {
  --grid-width: var(--layout-max-width);
}
@media (min-width: 1400px) {
  :root { --grid-width: var(--layout-width-lg); }
}
@media (min-width: 1600px) {
  :root { --grid-width: var(--layout-width-xl); }
}

/* --- Sheet geometry ---------------------------------------------------------
   The sheet is the opaque column the prose sits on. It tracks `main` plus
   --sheet-padding of breathing room, split evenly either side.

   `main` spans 6 of 12 fr. At the lg grid (6 columns, 5 gaps):
       main = (W - 5g)/2 + g = W/2 - 1.5g
   At the xl grid (8 columns, 7 gaps): main = W/2 - 2.5g
   The 1.5 / 2.5 coefficients ENCODE "main spans 6 of 12 fr" and break silently
   if --layout-grid-columns changes.

   HALF of --sheet-padding must clear anything positioned outside `main`, or
   that content straddles the sheet's border. The binding constraint is the
   heading anchor from linkable-headings.js at left: -1.25em of a 25.5px
   heading = 32px. Half of 5em is 42.5px, giving ~10px clearance. --sheet-padding
   is consumed by body::after, so its em resolves against body's 17px, not
   html's 16px: 5em = 85px. */
:root {
  --sheet-padding: 5em;
  --sheet-edge: color-mix(in srgb, var(--theme-border-color) 18%, transparent);
  --sheet-shadow: 0 0 2.5em rgba(0, 0, 0, 0.07);
  --surface-bleed: 1.25em;

  /* Below 1200px .content-grid is a flex column with no gutters, so the sheet
     fills the viewport and the pattern is intentionally not visible. */
  --sheet-width: min(calc(70ch + var(--sheet-padding)), 100%);
}

@media (min-width: 1200px) {
  :root {
    --sheet-width: calc(
      var(--grid-width) / 2 - 1.5 * var(--column-gap) + var(--sheet-padding)
    );
  }
}
@media (min-width: 1600px) {
  :root {
    --sheet-width: calc(
      var(--grid-width) / 2 - 2.5 * var(--column-gap) + var(--sheet-padding)
    );
  }
}
```

- [ ] **Step 2: Add the dark shadow override to `index.css`**

In `content/public/index.css`, inside the `@media (prefers-color-scheme: dark)` `:root` block, add:

```css
    --sheet-shadow: 0 0 2.5em rgba(0, 0, 0, 0.35);
```

- [ ] **Step 3: Point `page-container.css` at `--grid-width`**

In `content/public/css/page-container.css`, replace:

```css
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

with:

```css
@media (min-width: 1400px) {
  .page-container {
    width: var(--grid-width);
    padding-left: 0;
    padding-right: 0;
  }
}
```

The 1600px block is now redundant — `--grid-width` already switches to `xl` there.

- [ ] **Step 4: Point `header-footer.css` at `--grid-width`**

In `content/public/css/header-footer.css`, in the `@media (min-width: 1400px)` block, replace `width: var(--layout-width-lg);` with:

```css
    width: var(--grid-width);
```

In the `@media (min-width: 1600px)` block, **delete** the `width: var(--layout-width-xl);` line but **keep** `grid-template-columns: var(--layout-grid-columns-xl);`.

- [ ] **Step 5: Point `content-grid.css` at `--grid-width`**

In `content/public/css/content-grid.css`, in the `@media (min-width: 1400px)` block, replace `width: var(--layout-width-lg);` with:

```css
    width: var(--grid-width);
```

In the `@media (min-width: 1600px)` block, **delete** the `width: var(--layout-width-xl);` line but **keep** `grid-template-columns: var(--layout-grid-columns-xl);`.

- [ ] **Step 6: Verify geometry is byte-identical to the baseline**

Compare **horizontal** geometry only. Vertical positions legitimately moved in
Task 2 (the thumbnail row fix), so `top` is excluded — otherwise the diff is
noisy for a reason unrelated to this task.

```bash
npm run build:dev
for w in 1100 1250 1440 1700; do
  echo "=== $w ==="
  node ~/.cache/blog-preview-pw/probe.js / $w | python3 -c "
import json,sys
d=json.load(sys.stdin)
for k in ['header','contentGrid','summary','thumbImg']:
    v=d[k] or {}
    print(k, {x:v.get(x) for x in ('left','right','width')})"
done > ~/.cache/blog-preview-pw/after-gridwidth.txt
cat ~/.cache/blog-preview-pw/after-gridwidth.txt
```

- [ ] **Step 6b: Re-run the same extraction against the pre-refactor commit**

```bash
git stash push content/public/css/base-vars.css content/public/index.css \
  content/public/css/page-container.css content/public/css/header-footer.css \
  content/public/css/content-grid.css
npm run build:dev
for w in 1100 1250 1440 1700; do
  echo "=== $w ==="
  node ~/.cache/blog-preview-pw/probe.js / $w | python3 -c "
import json,sys
d=json.load(sys.stdin)
for k in ['header','contentGrid','summary','thumbImg']:
    v=d[k] or {}
    print(k, {x:v.get(x) for x in ('left','right','width')})"
done > ~/.cache/blog-preview-pw/before-gridwidth.txt
git stash pop
npm run build:dev
diff ~/.cache/blog-preview-pw/before-gridwidth.txt ~/.cache/blog-preview-pw/after-gridwidth.txt \
  && echo "IDENTICAL — refactor changed no horizontal geometry"
```

Expected: `IDENTICAL`. This stashes only the five files this task touched, so the
comparison isolates the refactor from Tasks 1-3. If `diff` reports differences,
the `--grid-width` substitution is wrong somewhere — do not proceed.

- [ ] **Step 7: Verify the sheet formula matches `main`**

```bash
for w in 1250 1440 1700; do
  node ~/.cache/blog-preview-pw/probe.js / $w | python3 -c "
import json,sys
d=json.load(sys.stdin)
print('sheetWidth', d['sheetWidth'], '(no sheet element yet — expect null)')"
done
```

Expected: `null` at this stage — `body::after` does not exist until Task 6. The formula is verified in Task 6 Step 5.

- [ ] **Step 8: Commit**

```bash
git add content/public/css/base-vars.css content/public/index.css \
        content/public/css/page-container.css \
        content/public/css/header-footer.css \
        content/public/css/content-grid.css
git commit -m "Add --grid-width and sheet geometry custom properties

The 1400/1600px layout widths were repeated in page-container,
header-footer and content-grid. All three now reference --grid-width,
defined once per breakpoint, continuing the consolidation started in the
2026-03-13 layout-refactor session. Verified geometry is unchanged at
1100/1250/1440/1700px.

Also adds the sheet geometry the background pattern needs: --sheet-width
derived from --grid-width (main = W/2 - 1.5g at lg, W/2 - 2.5g at xl),
plus --sheet-padding, --sheet-edge, --sheet-shadow and --surface-bleed."
```

---

# Stage 2 — Pattern and sheet

## Task 5: The `<maze-background>` component (spec §4)

Builds one tile as an SVG data URI and publishes it to CSS as `--maze-mask` / `--maze-tile`. No canvas in the document, no animation, no listeners.

**Files:**
- Create: `content/public/js/components/maze-background.js`
- Modify: `content/public/js/components/index.js`
- Modify: `config.js`
- Modify: `templates/layoutPage.js`

**Interfaces:**
- Consumes: `site.buildSeed` (added here) from `config.js`
- Produces: custom element `<maze-background cell tile-cells seed>`; sets CSS custom properties `--maze-mask` (a `url("data:image/svg+xml;utf8,...")`) and `--maze-tile` (a px length) on `document.documentElement`, and adds class `maze-ready` to it. Task 6's CSS consumes all three.

- [ ] **Step 1: Create the component**

Create `content/public/js/components/maze-background.js`:

```js
// The 10 PRINT maze as a page background.
//
//   10 PRINT CHR$(205.5+RND(1)); : GOTO 10
//
// CHR$(205) is "\" and CHR$(206) is "/" in PETSCII; printing one at random per
// cell fills the screen with a maze.
//
// One tile is built as an SVG data URI and handed to CSS as a repeating
// mask-image. CSS fills the mask with var(--pattern-ink), so:
//
//   * the ink colour never leaves CSS -> themes for free, nothing to regenerate
//     on theme change, no probe element needed to resolve color-mix() for canvas
//   * no canvas and no raster encode: ~4ms to build the string, versus ~72ms for
//     draw + PNG encode + PNG decode
//   * the layer is positioned by CSS, so the BROWSER scrolls it -> zero lag and
//     zero per-frame cost. A canvas repainted on scroll is inherently one frame
//     behind the compositor (measured: p95 120px of trailing at 120px/frame).
//
// Tiling is safe because every cell is a diagonal between opposite corners, so
// tile edges always meet corner-to-corner: a maze tile is seamless at ANY size.
// The only artifact is the repetition period, tileCells * cell.

const DEFAULTS = {
  cell: 24, // px per PETSCII cell
  lineWidth: 1,
  tileCells: 64, // tile is tileCells square; period = tileCells * cell = 1536px
  seed: null, // build-injected integer; null falls back to per-load random
};

export class MazeBackground {
  constructor(options = {}) {
    this.opts = { ...DEFAULTS, ...options };
    this.seed =
      this.opts.seed == null || Number.isNaN(this.opts.seed)
        ? (Math.random() * 0xffffffff) | 0
        : this.opts.seed | 0;
  }

  // Pure function of position: no stored state, so nothing can reshuffle on
  // resize or scroll, and an arbitrarily long document costs nothing.
  cellAt(col, row) {
    let h =
      (Math.imul(col | 0, 0x1f1f1f1f) ^ Math.imul(row | 0, 0x27220a95)) ^ this.seed;
    h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d);
    h = Math.imul(h ^ (h >>> 12), 0x297a2d39);
    h ^= h >>> 15;
    return (h & 1) === 1;
  }

  buildTileUri() {
    const { cell, lineWidth, tileCells } = this.opts;
    const px = tileCells * cell;

    // One path with many subpaths: far smaller than one element per cell.
    const d = [];
    for (let row = 0; row < tileCells; row++) {
      for (let col = 0; col < tileCells; col++) {
        const x = col * cell;
        const y = row * cell;
        d.push(
          this.cellAt(col, row)
            ? `M${x} ${y}l${cell} ${cell}` // "\"
            : `M${x} ${y + cell}l${cell} -${cell}` // "/"
        );
      }
    }

    // stroke is #fff because this is used as a MASK: only alpha matters, and
    // the visible colour comes from CSS.
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}">` +
      `<path fill="none" stroke="#fff" stroke-width="${lineWidth}" d="${d.join("")}"/>` +
      `</svg>`;

    return { uri: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`, px };
  }

  install() {
    const { uri, px } = this.buildTileUri();
    const root = document.documentElement;
    root.style.setProperty("--maze-mask", `url("${uri}")`);
    root.style.setProperty("--maze-tile", `${px}px`);
    root.classList.add("maze-ready");
  }

  destroy() {
    const root = document.documentElement;
    root.style.removeProperty("--maze-mask");
    root.style.removeProperty("--maze-tile");
    root.classList.remove("maze-ready");
  }
}

class MazeBackgroundElement extends HTMLElement {
  connectedCallback() {
    const num = (name) => {
      const v = this.getAttribute(name);
      return v == null || v === "" ? undefined : Number(v);
    };
    this.maze = new MazeBackground({
      cell: num("cell") ?? DEFAULTS.cell,
      tileCells: num("tile-cells") ?? DEFAULTS.tileCells,
      seed: num("seed") ?? null,
    });
    this.maze.install();
  }

  disconnectedCallback() {
    this.maze?.destroy();
  }
}

customElements.define("maze-background", MazeBackgroundElement);
```

- [ ] **Step 2: Register it eagerly**

In `content/public/js/components/index.js`, add:

```js
import "./maze-background.js";
```

Eager, **not** via `component-lazy-loader.js` — the page background is needed immediately and unconditionally, and it has no DOM presence to observe with an IntersectionObserver.

- [ ] **Step 3: Add a per-build seed**

In `config.js`, inside the `site` object, add:

```js
    // New maze per build, identical across every page of a build. A per-load
    // Math.random() seed would reshuffle the background on every navigation,
    // which reads as instability rather than charm.
    buildSeed: (Math.random() * 0xffffffff) | 0,
```

- [ ] **Step 4: Place the element**

In `templates/layoutPage.js`, make `<maze-background>` the first child of `<body>`:

```js
      <body>
        <maze-background seed="${site.buildSeed}"></maze-background>
        <header>
```

- [ ] **Step 5: Verify the properties are published and the seed is stable across pages**

```bash
npm run build:dev
node -e "
const {chromium}=require('/home/lmorchard/.cache/blog-preview-pw/node_modules/playwright');
(async()=>{
  const b=await chromium.launch(); const c=await b.newContext({viewport:{width:1440,height:900}});
  for (const path of ['/','/archives.html','/2026/03/20/decafclaw/']) {
    const p=await c.newPage();
    await p.goto('http://127.0.0.1:9980'+path,{waitUntil:'load'});
    await p.waitForTimeout(1200);
    const r=await p.evaluate(()=>{
      const s=document.documentElement.style;
      const mask=s.getPropertyValue('--maze-mask');
      return {
        ready:document.documentElement.classList.contains('maze-ready'),
        tile:s.getPropertyValue('--maze-tile'),
        maskKB:Math.round(mask.length/1024),
        maskHash:mask.length,
        canvas:!!document.querySelector('body > canvas'),
        seedAttr:document.querySelector('maze-background')?.getAttribute('seed'),
      };
    });
    console.log(path, JSON.stringify(r));
    await p.close();
  }
  await b.close();
})();
"
```

Expected on all three pages: `ready: true`, `tile: "1536px"`, `canvas: false`, identical `seedAttr` and identical `maskHash` (same seed → same tile → same string length).

- [ ] **Step 6: Verify no pattern renders yet**

```bash
node ~/.cache/blog-preview-pw/probe.js / 1440 | python3 -c "import json,sys; d=json.load(sys.stdin); print('mazeReady',d['mazeReady'],'patternHeight',d['patternHeight'],'errors',d['pageErrors'])"
```

Expected: `mazeReady True`, `patternHeight` is `auto` or `0px` (no `::before` rule yet), no page errors. The pattern appears in Task 6.

- [ ] **Step 7: Commit**

```bash
git add content/public/js/components/maze-background.js \
        content/public/js/components/index.js config.js templates/layoutPage.js
git commit -m "Add <maze-background> component publishing a 10 PRINT tile to CSS

Builds one tile of the C64 maze one-liner as an SVG data URI and sets it
on :root as --maze-mask, with --maze-tile as the repeat period and a
maze-ready class to gate the CSS. Cell values come from a pure hash of
(col, row, seed) rather than memoised Math.random(), so the tile is
reproducible from the seed alone and costs no memory.

Handing a mask to CSS rather than rasterising a canvas keeps the ink
colour in CSS (theming is free, nothing regenerates on theme change) and
costs ~4ms of string building instead of ~72ms of draw + PNG encode +
decode.

The seed comes from config.js per build, so the maze is identical across
every page of a build and changes when the site is published."
```

---

## Task 6: The pattern layer and the sheet (spec §5)

**Files:**
- Create: `content/public/css/background-pattern.css`
- Modify: `content/public/index.css` (import)

**Interfaces:**
- Consumes: `--maze-mask`, `--maze-tile`, `maze-ready` (Task 5); `--sheet-width`, `--sheet-edge`, `--pattern-ink` (Tasks 3-4)
- Produces: the visible pattern and sheet; Task 7 layers surfaces above the sheet

- [ ] **Step 1: Create the stylesheet**

Create `content/public/css/background-pattern.css`:

```css
/* The 10 PRINT maze background and the "sheet" the prose sits on.
   The tile arrives as --maze-mask from maze-background.js; the colour comes
   from --pattern-ink here, so theming needs no JavaScript. */

/* The page background moves to <html> because negative-z-index descendants of
   body paint BEFORE body's own background (painting order: root background,
   then negative z-index, then in-flow block backgrounds). An opaque body
   background would hide the pattern entirely. */
html {
  background-color: var(--theme-background-color);
}

body {
  background-color: transparent;
}

/* REQUIRED. Without this html is static, so html::before has no positioned
   ancestor and resolves `inset: 0` against the INITIAL CONTAINING BLOCK, whose
   height is the VIEWPORT — leaving the document unpatterned below the first
   screenful (measured: a 1050px layer on a 5411px document). Making html
   positioned resolves inset against its padding box, i.e. the full document.

   Safe here: the only absolutely-positioned descendant that could have relied
   on the initial containing block is
   `article > nav.table-of-contents li::before`, which resolves against its
   `li` (article.css sets position: relative on it). */
html.maze-ready {
  position: relative;
}

html.maze-ready::before {
  content: "";
  /* absolute, NOT fixed: the browser then scrolls the layer with the document.
     Fixed would pin it to the viewport, so content slides over a stationary
     texture. */
  position: absolute;
  inset: 0;
  z-index: -2; /* below the sheet at -1, above html's background-color */
  pointer-events: none;

  background: var(--pattern-ink);

  -webkit-mask-image: var(--maze-mask);
  mask-image: var(--maze-mask);
  -webkit-mask-repeat: repeat;
  mask-repeat: repeat;
  -webkit-mask-size: var(--maze-tile) var(--maze-tile);
  mask-size: var(--maze-tile) var(--maze-tile);
  -webkit-mask-position: 0 0;
  mask-position: 0 0;
}

/* The sheet: an opaque centred column over the pattern, holding the prose.
   Gated on maze-ready, which is a CORRECTNESS requirement rather than an
   optimisation: without the gate a visitor with JS disabled gets no pattern but
   still gets the sheet — a solid band the same colour as the page background,
   invisible except for its hairline edges, which would render as two
   unexplained vertical lines down the page.

   Stays `fixed` while the pattern is `absolute`. That asymmetry is deliberate:
   the sheet is a solid band of uniform colour, so fixed and scrolling are
   visually indistinguishable, and fixed avoids sizing it to the document. */
html.maze-ready body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -1;
  width: var(--sheet-width);
  margin-left: auto;
  margin-right: auto;
  background-color: var(--theme-background-color);
  border-left: 1px solid var(--sheet-edge);
  border-right: 1px solid var(--sheet-edge);
}
```

- [ ] **Step 2: Import it**

In `content/public/index.css`, add to the existing `@import` block at the top, after `post-list.css`:

```css
@import url("./css/background-pattern.css");
```

`@import` must precede all other rules, so it goes in that block — not appended to the end of the file, where it would be silently ignored.

- [ ] **Step 3: Verify the pattern covers the whole document**

This is the single most important check, and the easiest to pass by accident at scroll 0.

```bash
npm run build:dev
node ~/.cache/blog-preview-pw/probe.js /archives.html 1440 | python3 -c "
import json,sys
d=json.load(sys.stdin)
raw=d['patternHeight']
dh=d['docHeight']
try:
    ph=float(raw.replace('px',''))
except ValueError:
    print('patternHeight is', repr(raw), '- FAIL: the ::before rule is not applying at all')
    sys.exit(1)
if abs(ph-dh)<2:
    print('patternHeight',ph,'docHeight',dh,'PASS')
elif abs(ph-1050)<2:
    print('patternHeight',ph,'docHeight',dh,'FAIL - viewport-height only: html is missing position: relative')
else:
    print('patternHeight',ph,'docHeight',dh,'FAIL - does not span the document')"
```

Expected: `PASS`.

- [ ] **Step 4: Verify it scrolls with the document and the period is exact**

```bash
node -e "
const {chromium}=require('/home/lmorchard/.cache/blog-preview-pw/node_modules/playwright');
(async()=>{
  const b=await chromium.launch();
  const c=await b.newContext({viewport:{width:1440,height:1050}});
  const p=await c.newPage();
  await p.goto('http://127.0.0.1:9980/archives.html',{waitUntil:'load'});
  await p.waitForTimeout(1500);
  // isolate the background: hide content and clip away the scrollbar, both of
  // which differ between scroll positions and cause false failures
  await p.evaluate(()=>{for(const el of document.body.children) el.style.visibility='hidden';});
  await p.waitForTimeout(300);
  const CLIP={x:0,y:0,width:1000,height:1000};
  const shot=async(y)=>{await p.evaluate(v=>window.scrollTo(0,v),y);await p.waitForTimeout(250);return p.screenshot({clip:CLIP});};
  const a=await shot(0), half=await shot(768), one=await shot(1536), two=await shot(3072);
  const eq=(x,y)=>Buffer.compare(x,y)===0;
  console.log('0 vs 768 :', eq(a,half)?'IDENTICAL (FAIL - pinned)':'different (PASS - scrolls)');
  console.log('0 vs 1536:', eq(a,one)?'IDENTICAL (PASS - exact period)':'different (FAIL - period off)');
  console.log('0 vs 3072:', eq(a,two)?'IDENTICAL (PASS - two periods)':'different (FAIL)');
  await b.close();
})();
"
```

Expected: all three PASS.

- [ ] **Step 5: Verify the sheet aligns with `main`**

```bash
for w in 1250 1440 1700; do
  node ~/.cache/blog-preview-pw/probe.js / $w | python3 -c "
import json,sys
d=json.load(sys.stdin)
sw=d['sheetWidth']; main=d['summary']
half=round((main['left']) - (${w}-sw)/2)
print('${w}px sheet',sw,'halfPad',half,'PASS' if 40<=half<=45 else 'FAIL')"
done
```

Expected: half-padding ~42px at all three, i.e. uniform. If 1250px reports ~147px instead, the `min-width: 1200px` band in `base-vars.css` is missing.

- [ ] **Step 6: Verify the no-JS case degrades cleanly**

```bash
node ~/.cache/blog-preview-pw/probe.js / 1440 --nojs | python3 -c "import json,sys; d=json.load(sys.stdin); print('mazeReady',d['mazeReady'],'sheetWidth',d['sheetWidth'],'PASS' if not d['mazeReady'] and d['sheetWidth'] is None else 'FAIL - sheet rendered without a pattern')"
```

Expected: `PASS` — no `maze-ready`, so neither the pattern nor the sheet renders, and the page looks exactly as it did before this work.

- [ ] **Step 7: Verify theming needs no regeneration**

```bash
node ~/.cache/blog-preview-pw/probe.js / 1440 --dark | python3 -c "import json,sys; d=json.load(sys.stdin); print('dark bg',d['htmlBgUsed'],'mazeReady',d['mazeReady'])"
```

Expected: dark background, `mazeReady: true`. Then toggle the theme in a browser at `http://127.0.0.1:9980/` and confirm the pattern re-tints immediately with no reload.

- [ ] **Step 8: Check the sticky header over the pattern**

Open `http://127.0.0.1:9980/2026/03/20/decafclaw/` at ≥1200px wide and ≥850px tall, scroll, and confirm text passing under the header stays legible. The header goes fully opaque in Task 7; note anything muddy here as the reason.

- [ ] **Step 9: Commit**

```bash
git add content/public/css/background-pattern.css content/public/index.css
git commit -m "Add the 10 PRINT pattern layer and the sheet

html::before carries the maze as a repeating mask-image filled with
--pattern-ink; body::after is the opaque sheet over the main column, so
the pattern shows only in the gutters.

Two load-bearing details:

html gets position: relative. Without it html::before has no positioned
ancestor and resolves inset: 0 against the initial containing block,
whose height is the VIEWPORT — leaving a 5411px document patterned only
for its first 1050px.

The sheet is gated on .maze-ready. Without the gate, a visitor with JS
disabled gets no pattern but still gets the sheet: a solid band the same
colour as the page, invisible except for hairline edges rendering as two
unexplained vertical lines."
```

---

# Stage 3 — Surfaces on the field

## Task 7: Header, footer and prev/next nav surfaces (spec §6)

Once the sheet exists, every other element that used to sit on a flat background is floating on a pattern and looks unfinished. They get the sheet's vocabulary: opaque background + hairline edge + soft shadow.

**Files:**
- Modify: `content/public/css/background-pattern.css`
- Modify: `content/public/css/article.css` (`.posts-nav` padding)

**Interfaces:**
- Consumes: `--surface-bleed`, `--sheet-edge`, `--sheet-shadow` (Task 4); the sheet at `z-index: -1` (Task 6)
- Produces: nothing consumed later

- [ ] **Step 1: Append the surface rules**

Append to `content/public/css/background-pattern.css`:

```css
/* --- Other surfaces on the patterned field --------------------------------- */

/* z-index: 0 is load-bearing. The sheet is body::after at z-index -1. A surface
   pseudo-element also at -1, on an element with no stacking context of its own,
   competes in the ROOT stacking context — where body::after comes later in tree
   order and therefore paints ON TOP, drawing the sheet's hairlines across the
   surface and slicing it into three segments at the sheet's edges. z-index: 0
   makes each surface a stacking context above the sheet.

   The header already declared z-index: 100, but that was inert: z-index is
   ignored on static elements, and the header is only positioned when sticky at
   >=1200px. Preserved below so the sticky stacking is unchanged. */
html.maze-ready body > header,
html.maze-ready body > footer,
html.maze-ready .posts-nav {
  position: relative;
  z-index: 0;
}

html.maze-ready body > header {
  z-index: 100;
  /* Fully opaque, replacing color-mix(bg 90%, transparent): the header is
     sticky at >=1200px, and letting the maze show through a band that content
     scrolls under reads as muddy rather than layered. */
  background-color: var(--theme-background-color);
}

/* The surface is drawn by a pseudo-element inset NEGATIVELY rather than by
   borders and padding on the element itself.

   The header's nav is aligned to grid line `full-end`, which lines up with
   .content-grid below, so a border on the header box lands directly against
   "colophon". Padding would open the gap but shift the grid and break that
   alignment. Footer and .posts-nav are .page-container (box-sizing:
   border-box, zero horizontal padding at >=1400px), so padding there would
   shrink their content boxes and misalign them the other way instead.

   position: absolute keeps it out of flow — header, footer and .posts-nav are
   all flex containers, so an in-flow pseudo-element would become a flex item. */
html.maze-ready body > header::after,
html.maze-ready body > footer::after,
html.maze-ready .posts-nav::after {
  content: "";
  position: absolute;
  inset: 0 calc(-1 * var(--surface-bleed));
  z-index: -1;
  pointer-events: none;
  background-color: var(--theme-background-color);
  box-shadow: var(--sheet-shadow);
}

html.maze-ready body > footer::after {
  background-color: var(--theme-background-color);
}

/* Vertical edges only where the element is inset from the viewport; below
   1200px these are full-bleed and the borders would sit against the window
   frame. */
@media (min-width: 1200px) {
  html.maze-ready body > header::after,
  html.maze-ready body > footer::after {
    border-left: 1px solid var(--sheet-edge);
    border-right: 1px solid var(--sheet-edge);
  }
}

/* The prev/next nav is a discrete card, so it gets an edge all the way round. */
html.maze-ready .posts-nav::after {
  border: 1px solid var(--sheet-edge);
}
```

- [ ] **Step 2: Give `.posts-nav` bottom padding so its card is not cramped**

In `content/public/css/article.css`, in the `.posts-nav` rule, add:

```css
  padding-bottom: 1.25em;
```

- [ ] **Step 3: Verify the header surface preserves alignment**

```bash
npm run build:dev
node -e "
const {chromium}=require('/home/lmorchard/.cache/blog-preview-pw/node_modules/playwright');
(async()=>{
  const b=await chromium.launch(); const c=await b.newContext({viewport:{width:1440,height:1050}});
  const p=await c.newPage();
  await p.goto('http://127.0.0.1:9980/',{waitUntil:'load'}); await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{
    const h=document.querySelector('body>header').getBoundingClientRect();
    const g=document.querySelector('.content-grid').getBoundingClientRect();
    const nav=document.querySelector('body>header nav ul li:last-child a').getBoundingClientRect();
    return {headerRight:Math.round(h.right),gridRight:Math.round(g.right),navRight:Math.round(nav.right)};
  });
  console.log(JSON.stringify(r));
  console.log('alignment preserved:', r.headerRight===r.gridRight?'PASS':'FAIL');
  console.log('nav clearance to surface edge:', (r.headerRight+20)-r.navRight, 'px (expect ~20)');
  await b.close();
})();
"
```

Expected: `PASS`, clearance ~20px.

- [ ] **Step 4: Verify the sheet does not slice the surfaces**

```bash
node -e "
const {chromium}=require('/home/lmorchard/.cache/blog-preview-pw/node_modules/playwright');
(async()=>{
  const b=await chromium.launch(); const c=await b.newContext({viewport:{width:1440,height:1050}});
  const p=await c.newPage();
  await p.goto('http://127.0.0.1:9980/2026/03/20/decafclaw/',{waitUntil:'load'});
  await p.waitForTimeout(1800);
  await p.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));
  await p.waitForTimeout(600);
  // force the sheet's borders red so their position is unambiguous
  await p.addStyleTag({content:'html.maze-ready body::after{border-left-color:red !important;border-right-color:red !important;border-left-width:3px !important;border-right-width:3px !important}'});
  await p.waitForTimeout(300);
  const box=await p.evaluate(()=>{const r=document.querySelector('.posts-nav').getBoundingClientRect();return {top:Math.round(r.top)};});
  await p.screenshot({path:'/tmp/postnav-redsheet.png',clip:{x:0,y:Math.max(0,box.top-30),width:1440,height:200}});
  console.log('wrote /tmp/postnav-redsheet.png — red lines must STOP at the card edges, not run through it');
  await b.close();
})();
"
```

Inspect `/tmp/postnav-redsheet.png`. Expected: red lines visible above and below the card, absent inside it. If they run through, `z-index: 0` is missing or overridden.

- [ ] **Step 5: Commit**

```bash
git add content/public/css/background-pattern.css content/public/css/article.css
git commit -m "Give header, footer and prev/next nav the sheet's surface treatment

Opaque background, hairline edge and soft shadow, reusing --sheet-edge and
--sheet-shadow so retuning the sheet retunes all of them.

Each surface is drawn by a negatively-inset pseudo-element rather than by
borders and padding on the element. The header's nav aligns to grid line
full-end, so a border on the header box lands against 'colophon'; padding
would open the gap but shift the grid. Footer and .posts-nav are
page-container with border-box sizing, where padding would shrink their
content boxes instead.

Each surface also needs z-index: 0. Without a stacking context of its own,
a surface pseudo-element at z-index -1 loses to body::after (the sheet) on
tree order, and the sheet's hairlines get painted across the surface,
slicing it into three segments.

The header goes fully opaque: it is sticky at >=1200px and letting the
maze show through a band that content scrolls under reads as muddy."
```

---

## Task 8: Index thumbnails on the field (spec §6c)

**Files:**
- Modify: `content/public/css/background-pattern.css`
- Modify: `content/public/css/post-list.css`

**Interfaces:**
- Consumes: `--sheet-padding`, `--column-gap`, `--sheet-edge`, `--sheet-shadow`; `.thumb` occupying rows 1-2 (Task 2)
- Produces: nothing consumed later

- [ ] **Step 1: Measure the current overlap**

```bash
for w in 1250 1440 1700; do
  node ~/.cache/blog-preview-pw/probe.js / $w | python3 -c "
import json,sys
d=json.load(sys.stdin)
sw=d['sheetWidth']; sheetLeft=(${w}-sw)/2; t=d['thumbImg']
print('${w}px thumbRight',t['right'],'sheetLeft',round(sheetLeft),'overlap',round(t['right']-sheetLeft))"
done
```

Expected: overlap ~+13px at every width — the thumbnail extends past the sheet's left border by half-padding (42.5px) minus the column gap (29.75px).

- [ ] **Step 2: Add the mat**

Append to `content/public/css/background-pattern.css`:

```css
/* A mat of background colour plus hairline and shadow, so the thumbnail reads
   as a print resting on the desk rather than an image floating in a gutter.
   Applied to the img, not .thumb: .thumb is a grid item with a fixed 128px
   height at >=1200px, and padding on it would break that. */
html.maze-ready .post-list ul.posts .post .thumb img {
  background-color: var(--theme-background-color);
  border: 1px solid var(--sheet-edge);
  box-shadow: var(--sheet-shadow);
  box-sizing: border-box;
}
```

- [ ] **Step 3: Shift the thumbnail clear of the sheet's border**

In `content/public/css/post-list.css`, inside the existing `@media (min-width: 1200px)` block, add to the `.post-list ul.posts .post .thumb` rule:

```css
    /* Shift clear of the sheet's left border. .thumb is right-aligned in
       wide-start -> main-start, so its right edge lands one column-gap
       (29.75px) short of `main`. The sheet extends half of --sheet-padding
       (42.5px) past `main` — larger — so the thumbnail overlapped into the
       sheet by the ~13px difference and straddled the border. Expressed as the
       relationship rather than a constant, so retuning either variable keeps
       this correct. */
    margin-right: calc(var(--sheet-padding) / 2 - var(--column-gap) + 0.75em);
```

- [ ] **Step 4: Verify clearance at every grid breakpoint**

```bash
npm run build:dev
for w in 1250 1440 1700; do
  node ~/.cache/blog-preview-pw/probe.js / $w | python3 -c "
import json,sys
d=json.load(sys.stdin)
sw=d['sheetWidth']; sheetLeft=(${w}-sw)/2; t=d['thumbImg']
gap=round(sheetLeft-t['right'])
print('${w}px gapToSheet',gap,'clipsViewport',t['left']<0,'PASS' if gap>=6 and t['left']>=0 else 'FAIL')"
done
```

Expected: `PASS` at all three, gap ~13px.

- [ ] **Step 5: Verify title alignment survived and nothing changed below 1200px**

```bash
node ~/.cache/blog-preview-pw/probe.js / 1440 | python3 -c "import json,sys; d=json.load(sys.stdin); print('titleTop',d['title']['top'],'thumbTop',d['thumbImg']['top'],'ALIGNED' if abs(d['title']['top']-d['thumbImg']['top'])<=2 else 'FAIL')"
node ~/.cache/blog-preview-pw/probe.js / 1100 | python3 -c "import json,sys; d=json.load(sys.stdin); print('1100px thumb',d['thumbImg'])"
```

Expected: `ALIGNED`; at 1100px the thumbnail is full-width and centred as before.

- [ ] **Step 6: Commit**

```bash
git add content/public/css/background-pattern.css content/public/css/post-list.css
git commit -m "Give index thumbnails a mat and shift them clear of the sheet

.thumb is right-aligned in wide-start -> main-start, so its right edge
lands one column-gap (29.75px) short of main. The sheet extends half of
--sheet-padding (42.5px) past main, which is larger, so the thumbnail
overlapped into the sheet by the ~13px difference and straddled its
border. The shift is expressed as that relationship rather than a
constant, so retuning either variable keeps it correct.

Also adds a background mat, hairline and shadow so the thumbnail reads as
a print resting on the patterned field. Applied to the img rather than
.thumb, which has a fixed 128px height at >=1200px that padding on it
would break."
```

---

# Stage 4 — Remaining polish and the colophon

## Task 9: Mono metadata and calmer links (spec §7)

**Files:**
- Modify: `content/public/css/post-list.css`
- Modify: `content/public/css/article.css`

**Interfaces:**
- Consumes: `--theme-font-family-mono` (Task 3)
- Produces: nothing consumed later

- [ ] **Step 1: Add mono metadata to `post-list.css`**

Append to `content/public/css/post-list.css`:

```css
/* Metadata in a system mono stack: it recedes, gains texture, and suits the
   C64 motif. No new webfont. */
.post-list ul.posts .post .meta,
.post-list ul.posts .post .word-count {
  font-family: var(--theme-font-family-mono);
  font-size: 0.78em;
}

.post-list ul.posts .post .meta ul.tags {
  font-family: var(--theme-font-family-mono);
}

.post-list ul.posts .date-header .date {
  font-family: var(--theme-font-family-mono);
  font-size: 0.95em;
  letter-spacing: 0.08em;
}

/* Post titles are 1.6em and were permanently underlined, which read as loud.
   Underline on interaction only; inline body links keep theirs. */
.post-list ul.posts .post .title a {
  text-decoration: none;
}
.post-list ul.posts .post .title a:hover,
.post-list ul.posts .post .title a:focus-visible {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
}

.post-list ul.posts .post .meta a {
  text-decoration: none;
  border-bottom: 1px dotted color-mix(in srgb, currentColor 45%, transparent);
}
.post-list ul.posts .post .meta a:hover {
  border-bottom-style: solid;
}
```

- [ ] **Step 2: Add mono metadata to `article.css`**

Append to `content/public/css/article.css`:

```css
/* Match the index's metadata treatment on article pages. */
article > header > time,
article > header > ul.tags {
  font-family: var(--theme-font-family-mono);
}

article > header > time {
  font-size: 0.85em;
}
```

- [ ] **Step 3: Verify the mono stack resolves and titles lose their underline**

```bash
npm run build:dev
node -e "
const {chromium}=require('/home/lmorchard/.cache/blog-preview-pw/node_modules/playwright');
(async()=>{
  const b=await chromium.launch(); const c=await b.newContext({viewport:{width:1440,height:1050}});
  const p=await c.newPage();
  await p.goto('http://127.0.0.1:9980/',{waitUntil:'load'}); await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>({
    metaFont:getComputedStyle(document.querySelector('.post-list .post .meta')).fontFamily,
    dateFont:getComputedStyle(document.querySelector('.post-list .date-header .date')).fontFamily,
    titleDecoration:getComputedStyle(document.querySelector('.post-list .post .title a')).textDecorationLine,
  }));
  console.log(JSON.stringify(r,null,2));
  console.log('mono applied:', /mono/i.test(r.metaFont)?'PASS':'FAIL');
  console.log('title underline removed:', r.titleDecoration==='none'?'PASS':'FAIL');
  await b.close();
})();
"
```

Expected: both `PASS`.

- [ ] **Step 4: Verify tags still do not orphan icons (Task 1 regression)**

Open `http://127.0.0.1:9980/` and check the 7-tag post: every tag icon on the same line as its label, now in mono.

- [ ] **Step 5: Commit**

```bash
git add content/public/css/post-list.css content/public/css/article.css
git commit -m "Set metadata in a system mono stack; calm the link treatment

Dates, times, tags and word counts move to a system mono stack (no new
webfont) so metadata recedes and gains texture against the serif body,
which also suits the C64 motif.

Post titles are 1.6em and were permanently underlined in a saturated
colour, which read as loud; they now underline on hover and focus-visible
only. Meta links get a dotted underline that goes solid on hover. Inline
body links are unchanged."
```

---

## Task 10: Note the pattern's origin in the colophon

**Files:**
- Modify: `content/pages/colophon.md`

**Interfaces:**
- Consumes: nothing
- Produces: nothing

- [ ] **Step 1: Add the note to the Typography & Design section**

The inserted text contains a fenced code block, so paste it with this command
rather than hand-copying a nested fence:

```bash
cd /home/lmorchard/devel/blog.lmorchard.com
python3 - <<'PYEOF'
p = "content/pages/colophon.md"
s = open(p).read()

anchor = "The site supports light and dark color schemes, following your system preference by default with a manual toggle in the header. The theme system uses CSS custom properties throughout.\n"
assert anchor in s, "anchor paragraph not found — check colophon.md"

note = '''
The background pattern is the [10 PRINT](https://10print.org/) maze — a single line of Commodore 64 BASIC that fills the screen with a labyrinth:

```basic
10 PRINT CHR$(205.5+RND(1)); : GOTO 10
```

`CHR$(205)` and `CHR$(206)` are the two diagonal PETSCII characters, `\\` and `/`. Printing one at random per character cell, forever, produces a maze — and `RND(1)` landing either side of `.5` is the whole of the randomness. There is [an entire book](https://10print.org/) about that one line, which is the sort of thing I find delightful.

Here it is generated in the browser as a single tiled SVG, drawn as a CSS mask so it takes its colour from the same custom property as everything else and follows the light/dark theme for free. Every cell is a diagonal between opposite corners, which means the tile is seamless at any size — the only tell is that it repeats every 1536 pixels. A new maze is generated each time the site is built, so it quietly changes whenever I publish. It only shows in the margins; the column you are reading sits on top of it.
'''

s = s.replace(anchor, anchor + note)
open(p, "w").write(s)
print("colophon note inserted")
PYEOF
```

- [ ] **Step 1b: Read the result back and check the fence survived**

```bash
sed -n '/^## Typography/,/^## Client-Side/p' content/pages/colophon.md
```

Expected: the BASIC line inside a ` ```basic ` fence, and the two backslash and
slash characters rendering as `\` and `/` in the prose.

- [ ] **Step 2: Verify it renders**

```bash
npm run build:dev
node -e "
const {chromium}=require('/home/lmorchard/.cache/blog-preview-pw/node_modules/playwright');
(async()=>{
  const b=await chromium.launch(); const c=await b.newContext({viewport:{width:1440,height:1050}});
  const p=await c.newPage();
  await p.goto('http://127.0.0.1:9980/colophon/',{waitUntil:'load'}); await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{
    const txt=document.querySelector('article').innerText;
    return {
      mentions10print: txt.includes('10 PRINT'),
      hasBasicLine: txt.includes('CHR\$(205.5+RND(1))'),
      codeBlocks: document.querySelectorAll('article pre').length,
      tocEntries: document.querySelectorAll('article nav.table-of-contents li').length,
    };
  });
  console.log(JSON.stringify(r,null,2));
  await b.close();
})();
"
```

Expected: `mentions10print: true`, `hasBasicLine: true`, at least one `pre`, TOC still populated.

Check the page URL — if `/colophon/` 404s, find the built path with
`find build -iname '*colophon*' -name index.html`.

- [ ] **Step 3: Commit**

```bash
git add content/pages/colophon.md
git commit -m "Note the 10 PRINT background's origin in the colophon"
```

---

## Task 11: Full verification sweep

Run the spec's complete checklist before opening a PR. Nothing to implement; this is the gate.

- [ ] **Step 1: Clean rebuild including search**

```bash
cd /home/lmorchard/devel/blog.lmorchard.com
npm run build -- --clean
```

This wipes `build/`, including any leftover `build/preview/` scaffolding. Confirm the site still builds and that `build/pagefind/` exists (the full `build` script runs `build-search`, unlike `build:dev`).

- [ ] **Step 2: Serve and run the matrix**

```bash
npx http-server -d true -i true -p 9980 -c-1 build --silent &
sleep 3
for w in 400 900 1199 1200 1399 1400 1599 1600 1700; do
  for flag in "" "--dark"; do
    echo "=== $w $flag ==="
    node ~/.cache/blog-preview-pw/probe.js / $w $flag | python3 -c "import json,sys; d=json.load(sys.stdin); print('bg',d['htmlBgUsed'],'sheet',d['sheetWidth'],'errors',d['pageErrors'])"
  done
done
```

Expected: no page errors anywhere; sheet width present at every width; dark backgrounds under `--dark`.

- [ ] **Step 3: Work through the spec's numbered checks**

Open `./spec.md` and run its "Specific checks" list 1-10 in order. Every one has an explicit method. The three that have caught real bugs during design:

- **#2 pattern covers the whole document** — passes by accident at scroll 0
- **#3 scroll anchoring** — trailing is only visible during a *fast* wheel fling, not a scripted `scrollTo`
- **#6 heading anchor clearance** — measure, do not eyeball

- [ ] **Step 4: Confirm no-JS and reduced-motion**

```bash
node ~/.cache/blog-preview-pw/probe.js / 1440 --nojs | python3 -c "import json,sys; d=json.load(sys.stdin); print('nojs mazeReady',d['mazeReady'],'sheet',d['sheetWidth'])"
```

Expected: `False` and `None` — degrades to the pre-change design. Reduced motion needs no check: nothing animates.

- [ ] **Step 5: Write up the session notes**

Create `./notes.md` in this directory following the convention of the other
dev-session directories: what was implemented, what was verified, anything
deferred.

- [ ] **Step 6: Commit and open the PR**

```bash
git add docs/dev-sessions/2026-08-15-2001-background-pattern-and-polish/notes.md
git commit -m "Add session notes for the background pattern work"
git push -u origin background-pattern-and-polish
gh pr create --title "10 PRINT background pattern and visual polish" --body "$(cat <<'BODY'
Adds the Commodore 64 maze one-liner as a theme-aware background pattern, with
the text column sitting on an opaque "sheet" above it, and extends that surface
language to the header, footer, article prev/next nav and index thumbnails.

Also fixes three pre-existing CSS bugs found by measuring the live site:

- the `@media (prefers-color-scheme: light)` block was dead code, disabled by
  `theme-selector.js` exactly when it should apply — every rendered light value
  came from `base-vars.css`, including a blue link colour while the dead block
  specified green
- `white-space: no-wrap` (invalid; should be `nowrap`) in two places, which let
  tag icons orphan onto their own line
- index thumbnails aligned to the summary rather than the title

Design doc, measurements and rejected alternatives:
`docs/dev-sessions/2026-08-15-2001-background-pattern-and-polish/spec.md`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
BODY
)"
```

---

## Deferred / follow-up

Recorded so they are not lost, but explicitly out of scope:

- **`content/pages/colophon.md:39`** has a `http://localhost:9980/` URL leaked into published content (the Mermaid diagrams link). One-line fix, unrelated to this work — worth its own commit.
- **Build-time tile asset** instead of runtime generation: 10.8KB gzipped, cached site-wide, zero JS, works with JS disabled, 0ms main thread. Measurably better but adds a generator and an artifact to the build. The tile builder is already a pure seed-driven function, so it lifts into the build unchanged if wanted.
- **Marginalia system** (`.right`, `.left`, `.preside`) is unused in every post and becomes more tempting now that the gutters are visible.
- **"Open season" items** from the spec's non-goals: masthead redesign, body font, reconsidering the wide grid.
