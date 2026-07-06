# Spec: JSON-LD structured data for blog templates

## Goal

Add [JSON-LD](https://json-ld.org/) structured data to the blog's generated
HTML so crawlers, link-preview generators, and LLM crawlers can understand the
semantic structure of the site. Inspired by
<https://hawksley.dev/blog/json-ld-explained-for-personal-websites/>.

Scope (agreed): **posts + sitewide identity**.

- A sitewide `WebSite` + `Person` graph on every page.
- A `BlogPosting` node on each individual post page.

Out of scope for this session: `Blog` on the index, `CollectionPage` /
`BreadcrumbList` on archive and tag pages. (Can be a follow-up.)

## Architecture

The site is a custom static generator. `templates/layoutPage.js` is the
universal `<head>`/`<body>` wrapper that every page type flows through, and it
already accepts a `head` parameter. That's the injection point.

Post objects already carry every field a `BlogPosting` needs (`title`, `date`,
`summary`, `thumbnail`, `tags`, `path`). `config.js` `site` carries the identity
data for `WebSite`/`Person`.

### 1. Configuration — `config.js`

Make identity data configurable instead of hardcoded. Extend `site.author`:

```js
author: {
  full_name: "Les Orchard",
  short_name: "lmorchard",
  name: "l.m.orchard",
  email: "me@lmorchard.com",
  url: "https://lmorchard.com",
  job_title: "Software developer",
  description: "he / him; old adhd cat dad; tinkerer; serial enthusiast",
  sameAs: [
    "https://lmorchard.com",
    "https://masto.hackers.town/@lmorchard",
    "https://bsky.app/profile/lmorchard.com",
    "https://github.com/lmorchard",
    "https://twitch.tv/lmorchard",
    "https://www.youtube.com/@LesOrchard",
  ],
}
```

Notes:
- The Discord *invite* link is intentionally omitted from `sameAs` (it's an
  invite URL, not a stable profile). Easy to add later.
- `sameAs` URLs were sourced from <https://lmorchard.com> and
  <https://github.com/lmorchard/about-me/blob/main/content/bio.md>.

### 2. New module — `lib/jsonLd.js`

Pure node builders plus a safe renderer. No template/HTML coupling beyond the
final render helper.

- `websiteNode(site)` → `WebSite`
  - `@id`: `${site.absolute_baseurl}/#website`
  - `name`: `site.title`
  - `url`: `site.absolute_baseurl`
  - `description`: `site.subtitle`
  - `publisher`: `{ "@id": "${site.absolute_baseurl}/#person" }`
- `personNode(site)` → `Person`
  - `@id`: `${site.absolute_baseurl}/#person`
  - `name`: `site.author.full_name`
  - `url`: `site.author.url`
  - `image`: `site.avatar`
  - `jobTitle`: `site.author.job_title`
  - `description`: `site.author.description`
  - `sameAs`: `site.author.sameAs`
- `blogPostingNode(site, page)` → `BlogPosting`
  - `@id`: `${site.absolute_baseurl}/${page.path}/#article`
  - `mainEntityOfPage`: `${site.absolute_baseurl}/${page.path}/`
  - `headline`: `page.title`
  - `description`: `page.summary`
  - `image`: absolute URL of `page.thumbnail` (when present)
  - `datePublished`: ISO 8601 from `page.date`
  - `dateModified`: ISO 8601 from `page.modified || page.date`
  - `keywords`: `page.tags` (when present)
  - `author`: `{ "@id": "${site.absolute_baseurl}/#person" }`
  - `publisher`: `{ "@id": "${site.absolute_baseurl}/#person" }`
  - `isPartOf`: `{ "@id": "${site.absolute_baseurl}/#website" }`
- `renderJsonLd(nodes)` → returns an `unescaped(...)` html fragment function
  emitting a single:
  ```html
  <script type="application/ld+json">{ "@context": "https://schema.org", "@graph": [...] }</script>
  ```
  Serialized with `JSON.stringify(graph).replace(/</g, "\\u003c")`.

  **Why not the normal `html` helper:** `lib/html.js`'s `htmlValue` runs objects
  through `JSON.stringify` then `escapeHtml`, which turns `"` into `&quot;` and
  would corrupt the JSON inside a `<script>`. We must emit raw JSON. Replacing
  every `<` with the JSON unicode escape (`\\u003c`) keeps it valid JSON while
  preventing a `</script>` breakout.

Builders should omit keys whose source value is empty/undefined so we never emit
`null`/empty fields.

### 3. Injection — single merged graph per page

- `templates/layoutPage.js`: add a `jsonLd = []` parameter. Always build the
  base graph `[websiteNode(site), personNode(site)]`, concat the caller's extra
  nodes, and render one combined `@graph` via `renderJsonLd(...)` inside
  `<head>`. Result: every page (posts, pages, index, archives) gets
  `WebSite` + `Person`.
- `templates/post.js`: pass `jsonLd: [blogPostingNode(site, page)]`. Because the
  `BlogPosting` references `Person`/`WebSite` by `@id`, it merges cleanly into
  the one page graph.

Other templates (`page.js`, `indexRecent.js`, `indexAll.js`, `archives.js`)
need no change — they inherit the base graph through `layoutPage`.

## Data flow

```
config.site ─┐
             ├─► layoutPage(jsonLd=[]) ─► renderJsonLd([website, person, ...extra]) ─► <head>
post object ─┘        ▲
                      └── post.js passes jsonLd:[blogPostingNode(site,page)]
```

## Error handling / edge cases

- Missing optional fields (no `thumbnail`, no `tags`, no `summary`): builders
  omit those keys.
- `dateModified` falls back to `datePublished` when no `modified` frontmatter.
- Drafts: build as usual; no special handling.
- JSON safety: `<` escaped to `\\u003c` to avoid `</script>` breakout.

## Verification

The repo has no test framework (`npm test` is a stub). Verification plan:

1. `npm run build-posts-with-drafts` (and a full `npm run build:dev` for index).
2. Throwaway node check: extract every `application/ld+json` block from a couple
   of built `index.html` files and run `JSON.parse` to confirm validity.
3. Eyeball one post (`BlogPosting` + base graph) and the homepage (base graph
   only).
4. Manual follow-up (noted for Les, not blocking): paste output into the
   [schema.org validator](https://validator.schema.org/) and
   [Google Rich Results test](https://search.google.com/test/rich-results).

## Success criteria

- Every built page has a valid single `application/ld+json` graph with `WebSite`
  + `Person`.
- Every post page additionally has a `BlogPosting` node cross-referencing the
  `Person`/`WebSite` by `@id`.
- All emitted JSON parses cleanly.
- Identity data (author details + `sameAs`) lives in `config.js`, not in
  template code.
