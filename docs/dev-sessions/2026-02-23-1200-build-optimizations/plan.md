# Build Performance Optimizations — Plan

**Branch:** `build-optimizations`
**Date:** 2026-02-23

---

## Problem Statement

The static site generator has no incremental build logic for full builds, and the
watch mode incremental build is incomplete. With ~1,300+ posts:

- **Full builds** re-parse every markdown file from scratch on every run, even if
  nothing changed.
- **Watch mode** (`build-posts-watch`) already avoids re-parsing unchanged posts,
  but then unconditionally rebuilds **all** index pages (~1,000+ file writes) after
  every single edit — even a one-character body change.
- **Image optimization** re-processes every image on every build, even if the source
  hasn't changed.

---

## Dependency Graph

The build pipeline is a shallow two-level graph:

```
markdown files  →  parsePost()  →  post HTML/JSON  (per-post output)
                        ↓
               post metadata   →  year indexes
               (title, date,   →  month indexes
                tags, summary) →  tag indexes
                               →  root index / RSS / sitemaps
```

There is no deep nesting. This is important: it means a full red-green incremental
framework (like Salsa) would be over-engineered here. The same wins are achievable
with simple mtime checks and a metadata diff.

---

## Optimization Opportunities

### 1. Parallel post building (Trivial, High impact)

`buildAllPosts()` in `lib/posts.js:297` is a sequential `for...await` loop.
Each `buildPost()` call is independent — no shared state, no ordering constraints
(prev/next links are already computed before this loop).

Unbounded `Promise.all()` over 1,300 posts would spawn too many concurrent FS
operations and likely hurt performance. Use `p-limit` with a concurrency cap
(suggest 20–50) to keep parallelism high without overwhelming the OS. `p-queue`
would be overkill here — we don't need priority ordering, just a concurrency cap.

`p-limit` is a new dependency (`npm install p-limit`).

**Change:** Replace sequential loop with `p-limit`-capped parallel map.
**Risk:** Very low. Each post writes to a distinct directory.
**Gain:** Significant for full builds; moderate benefit when many posts change.

---

### 2. Parallel index building (Trivial, Medium impact)

`buildAllIndexes()` in `lib/indexes.js:18` builds year, month, and tag indexes
in sequential `for...of` loops. Each `buildIndex()` call is independent.
Parallelizing these three loops reduces index build time substantially.

**Change:** Collect index build calls and `Promise.all()` them.
**Risk:** Very low. Each index writes to a distinct path.
**Gain:** Moderate for full and watch-mode builds.

---

### 3. Mtime-based post skipping in full builds (Medium complexity, Very high impact)

`loadAllPosts()` always re-parses every markdown file. The built `index.json` at
`build/YYYY/MM/DD/slug/index.json` already contains all parsed post data — exactly
what `loadCachedPostMetadata()` in `incrementalBuild.js` loads for watch mode.

**Approach:** In `loadAllPosts`, for each source `.md` file:
1. Derive the expected build path (derivable from filename convention).
2. Compare source file mtime against `index.json` mtime.
3. If `index.json` is newer: load from JSON and skip `buildPost()` for that post.
4. If not (or doesn't exist): parse markdown and build as usual.

This makes a full `build-posts` run behave like a smart incremental build —
only re-parsing and re-writing posts that actually changed.

**Template/code changes:** Template and lib changes are rare enough that they
warrant a manual full rebuild (`./index.js build --clean`) rather than adding
template mtime tracking to every incremental check. The existing `watch:code`
npm script already handles this during development by triggering a full
`build-posts` run when `lib/` or `templates/` change — with our optimization,
that run will still re-parse unchanged posts from JSON (fast) but because we're
skipping `buildPost()` for unchanged posts, it will NOT re-render their HTML from
updated templates. This is an acceptable trade-off: if you change a template
while in watch mode, run a clean build.

**Note:** The post object needs `sourcePath` stored on it (currently `filename` is
passed to `parsePost()` but not retained). A small addition to `parsePost()`.

**`loadAllPosts` / `buildAllPosts` interface:** `loadAllPosts` and `buildAllPosts`
are currently clean separate steps. With mtime-based skipping, we need to signal
which posts need building without collapsing these two phases. Chosen approach:
`loadAllPosts` attaches a `needsBuild: true/false` flag to each returned post.
The call site filters on this flag before passing to `buildAllPosts`. This keeps
the API shape intact and composes cleanly with the `p-limit` parallelism in item 1.

**Multipart post complication:** A single `.md` file can produce multiple post
objects (split on `8<---`). The mtime check must key off the **source file**, not
the individual post. The logic is: if the source `.md` file is older than *all*
of its corresponding `index.json` outputs, skip the whole file. If any output is
missing or stale, re-parse the whole file (multipart posts can't be partially
re-parsed). This means the check happens at the file level in `loadAllPosts`, not
inside `parsePost`.

**Prev/next link invalidation:** After `linkPosts()` runs, posts adjacent to any
added or date-changed post will have updated `prevPostPath`/`nextPostPath` values
in memory — but if we skipped `buildPost()` for those adjacent posts, their HTML
on disk will have stale navigation links. Fix: after `linkPosts()`, compare each
skipped post's new prev/next values against those stored in its cached `index.json`,
and force a rebuild for any post where they differ (`needsBuild = true`). This is a
correctness requirement, not just a nice-to-have.

**Risk:** Low-medium. Multipart handling, build-path derivation, `needsBuild`
flagging, and prev/next invalidation all need care.
**Gain:** 80–90% faster full builds when most posts are unchanged.

---

### 4. Watch mode: fix prev/next ordering + backdate body-only edits (Medium complexity, High impact)

**Pre-existing bug fix (free win while we're here):** In `buildChangedPosts`
(`incrementalBuild.js:91`), `buildPost(updatedPost)` is called inside the changed-
files loop, *before* `sortPosts` and `linkPosts` run. This means the rebuilt post's
HTML always has no prev/next navigation links — the freshly-parsed post object has
none, and they haven't been computed yet. Fix: collect the changed posts, then call
`sortPosts` → `linkPosts` on the full array, *then* call `buildPost` for each
changed post. This is a simple reorder but a meaningful correctness fix.

**Save old post before overwriting:** `buildChangedPosts` replaces the cached post
in the `posts` array with the freshly-parsed one immediately. For the backdate
comparison to work, `const oldPost = posts[existingIndex]` must be captured before
`posts[existingIndex] = updatedPost`. Easy to miss.

**Backdating (the "red-green" insight):** After re-parsing a changed post and
computing new prev/next links, compare the new post's metadata against the cached
version in `index.json`:

```
metadata fields that indexes depend on:
  title, date, tags, slug, summary, thumbnail, type, draft
```

Compare using serialized values, not object references — `date` is a `moment`
object and `===` will always return false between two instances representing the
same timestamp. Use `post.date.toISOString()` for comparison.

If none of these changed (only the body changed), **skip index rebuilding entirely**.
This is the most common editing scenario: writing or revising post content.

If metadata *did* change, continue to rebuild — but selectively (see item 5).

**Risk:** Low. The post HTML is always rebuilt; the only question is whether indexes
need updating.
**Gain:** Near-instant watch-mode rebuilds for body edits (the common case). Index
rebuild goes from ~1,000 file writes to zero. Prev/next links are also now correct.

---

### 5. Watch mode: selective index rebuilding (Medium complexity, High impact)

When a changed post's metadata *does* change, instead of calling `buildAllIndexes()`
which regenerates everything, rebuild only the indexes needed to preview the post:

- **Root index** (always, since it shows recent posts by date)
- **Year index** for the post's year
- **Month index** for the post's year/month
- **Tag indexes** for each of the post's tags (both old tags and new tags, in case
  tags were added or removed)

**Deliberately omitted from incremental builds:**
- `all.html` and `archives.html` — full post listings; not needed to preview a
  single post. Run a full build to refresh these.
- All sitemaps — only relevant for production/deployment. Left out of incremental
  builds entirely.

This requires refactoring `buildAllIndexes()` to expose the ability to build a
subset of indexes, or extracting `buildIndex()` calls so they can be invoked
selectively.

**Root index split:** `buildAllIndexes` currently writes `.nojekyll`, `index.html`,
`index.json`, `index.rss`, `all.html`, and `archives.html` in a single `writeFiles`
call. Selective rebuild needs to write the first four but skip the last two.
Extract a `buildRootIndex()` helper that writes only the incremental subset;
`all.html` and `archives.html` remain full-build-only.

**Aggregate across batched changes:** The debouncer collects multiple file changes
and passes them as an array to `buildChangedPosts`. Affected indexes must be
**unioned across all changed posts** before rebuilding — not computed and rebuilt
per-post. Accumulate `affectedYears`, `affectedMonths`, `affectedTags` sets across
the whole changed-files loop, then do a single selective rebuild at the end. If
rebuilt per-post, indexes will be rebuilt redundantly and the union of all affected
indexes won't be correct.

**Caveat:** If post date changes significantly (different year/month), the old
year/month indexes also need rebuilding. The old values can be read from the cached
pre-edit post object (`oldPost`).

**Risk:** Medium. Requires care around tag add/remove, date changes, and
cross-post aggregation.
**Gain:** When metadata changes, ~10–20 file writes instead of ~1,000.

---

### 6. Skip image re-optimization for unchanged images (Low complexity, Variable impact)

`copyWithOptimization()` in `lib/copyWithOptimization.js` always copies and
re-optimizes images via `recursive-copy` with `overwrite: true`. The goal is to
reduce total operations, not just skip the Sharp step after already doing the copy.

**Approach:** Replace `recursive-copy` with a custom copy loop that does an mtime
check per file before deciding whether to copy at all:

1. For each source file, stat both source and dest.
2. If dest exists and `dest.mtime >= source.mtime`: skip entirely (no copy, no optimize).
3. If dest is missing or stale: copy the file, then optimize if it's an image.

This eliminates both the unnecessary copy I/O *and* the Sharp processing in one
check. The custom loop also makes the filter logic more transparent than the
`recursive-copy` filter array approach.

**Note:** `recursive-copy` can stay for non-optimization paths (e.g. `build-assets`
for JS/CSS), since those files don't need the mtime-aware logic. The change is
scoped to `copyWithOptimization`.

**Risk:** Low-medium. Need to handle the filter patterns that `recursive-copy`
currently handles (the `.copyfilter` per-directory exclude lists).
**Gain:** Eliminates redundant copy I/O and Sharp processing for unchanged images.

---

## Implementation Order

Ordered by impact-to-risk ratio. Section numbers refer to the items above.

| Order | Section | Optimization | Effort | Risk | Impact |
|---|---|---|---|---|---|
| 1 | §1 | Parallel post building | Trivial | Very low | High |
| 2 | §2 | Parallel index building | Trivial | Very low | Medium |
| 3 | §4 | Watch mode: fix prev/next + backdate body edits | Low | Low | Very high |
| 4 | §5 | Watch mode: selective index rebuild | Medium | Medium | High |
| 5 | §3 | Mtime-based skipping in full builds | Medium | Low-medium | Very high |
| 6 | §6 | Skip image re-optimization | Medium | Low-medium | Variable |

Items §1–§2 are safe to ship immediately. Items §4–§5 together cover the most
impactful watch-mode improvements. Item §3 makes full builds smart. Item §6 is
a bonus that helps when posts have lots of images.

---

## What We Are NOT Doing

- **Full red-green/Salsa framework**: Over-engineered for a two-level dependency
  graph. The same benefits come from simple mtime checks and a metadata diff.
- **Content hashing**: File mtime comparisons are sufficient and much simpler.
  Hash-based invalidation adds complexity without meaningful benefit here.
- **Persistent build cache file**: A `.buildcache.json` tracking all processed
  files would add complexity. The existing `index.json` files already serve as
  the build cache.
- **Template mtime tracking**: Template and lib changes are rare; they warrant a
  manual `build --clean` rather than complicating every incremental check. Known
  limitation: if you change a template while `build-posts-watch` is running, the
  incremental build will not re-render post HTML from the updated template. Run a
  full rebuild after template changes.
- **`all.html`, `archives.html`, and sitemaps in watch mode**: These are not needed
  to preview a post in development. Watch mode deliberately skips them to stay fast.
  A full `build-posts` run will rebuild everything.
