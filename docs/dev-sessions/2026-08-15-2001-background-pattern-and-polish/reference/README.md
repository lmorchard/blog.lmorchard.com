# Validated preview code

Snapshot of the prototype that produced every measurement in `../spec.md`. It ran
against the real built site from `build/preview/`, which is **gitignored and
wiped by `npm run build -- --clean`** — hence this copy.

This is reference, not the implementation. It layers on top of the existing CSS
without editing it (that is what the `html.polish` / `html.surfaces` class gates
are for), so it carries two mechanisms the shipped version does not need. Do not
copy it verbatim.

## Mapping to the shipped files

| reference file | ships as | notes |
|---|---|---|
| `maze-background.js` | `content/public/js/components/maze-background.js` | closest to final. Needs wrapping as a `<maze-background>` custom element and the `seed` read from an attribute rather than defaulted to `Math.random()`. |
| `mask-tile.css` | part of `content/public/css/background-pattern.css` | the pattern layer. `html { position: relative }` is load-bearing — see spec §4. |
| `preview.css` | split between `base-vars.css` and `background-pattern.css` | holds the sheet geometry: `--sheet-padding: 5em`, the per-breakpoint `--sheet-width`, `--sheet-edge`, `--sheet-shadow`. The hardcoded `605px` / `675px` must become the `--grid-width` formula from spec §3. |
| `polish.css` | spread across `base-vars.css`, `index.css`, `post-list.css`, `article.css` | the four polish items. **Its `html.polish` / `html.polish.dark` pair does NOT ship** — that split exists only because the preview cannot edit `base-vars.css`, and it caused a real bug (see below). |
| `surfaces.css` | part of `background-pattern.css` + `article.css` | header/footer/prev-next/thumbnail treatment. The `z-index: 0` and negative `inset` are both load-bearing — see spec §6. |

## Two things in here that are preview-only artifacts

1. **`html.polish` vs `html.polish.dark`** requires JS to mirror `body.theme-dark`
   onto `<html>`. Forgetting that mirror is not a no-op: `html.polish` (0,1,1)
   outranks `:root` inside `@media (prefers-color-scheme: dark)` (0,1,0), so the
   light palette wins in dark mode. This actually happened during development.
   The shipped version puts the palette directly in `base-vars.css :root` plus
   the dark `@media` block — one mechanism, no mirror, no specificity contest.

2. **Inline `--pattern-ink` on `documentElement`**, set by the preview panel's ink
   slider. Ships as a static value in `base-vars.css` / the dark block instead.

## Regenerating the preview

Everything is served from `build/preview/` with `build/index.css` `@import`ing the
CSS files and `build/index.js` importing `preview-panel.js` (the control harness,
not copied here — it is pure scaffolding).

Screenshot tooling lived in `~/.cache/blog-preview-pw/` (`shots.js`,
`verify-*.js`, `diag-*.js`) with output in `~/.cache/blog-preview-shots/`.
Serve with caching **off** — `http-server -c-1` — or edits to these files are
invisible behind `max-age=3600`, which wasted a debugging cycle.
