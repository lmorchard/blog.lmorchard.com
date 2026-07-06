# JSON-LD structured data — Implementation Plan

**Goal:** Emit a single valid `application/ld+json` graph (`WebSite` + `Person`) on every built page, plus a `BlogPosting` node on each post page, so crawlers and link-preview/LLM tools can read the site's semantics.

**Approach:** A pure builder module (`lib/jsonLd.js`) produces schema.org nodes from `config.site` and post objects; `templates/layoutPage.js` always renders the base graph and concats any per-page nodes; `templates/post.js` supplies the `BlogPosting` node. Nodes cross-reference by `@id` so they merge into one `@graph`.

**Tech stack:** Node ESM, the existing `html`/`unescaped` helpers in `lib/html.js`, `node --test` for unit tests.

---

## Deviation from spec: verification approach

The spec (written earlier) states "the repo has no test framework (`npm test` is a stub)" and proposes a throwaway node parse check. That is now stale: `package.json` has `"test": "node --test \"test/**/*.test.js\""`, which runs cleanly (finds 0 tests today). Since the builders are pure functions, this plan replaces the throwaway check with real unit tests under `test/`, per the dev-session TDD default. The feature scope is unchanged — only the verification method improves. No Makefile exists; verification uses npm scripts directly.

---

## Phase 1: Base graph (`WebSite` + `Person`) on every page

Delivers: identity config, the `jsonLd` module with the two sitewide builders and the safe renderer, and `layoutPage` wiring — so every built page (posts, pages, index, archives) carries a valid base graph.

**Files:**
- Modify: `config.js` — extend `site.author` with identity fields + `sameAs`
- Create: `lib/jsonLd.js` — `websiteNode`, `personNode`, `renderJsonLd`, `compact` helper
- Modify: `templates/layoutPage.js` — accept `jsonLd = []`, build base graph, render into `<head>`
- Create: `test/jsonLd.test.js` — unit tests for the two builders + renderer

**Key changes:**

`config.js` — replace the current `author` object:
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
},
```

`lib/jsonLd.js`:
```js
import { unescaped } from "./html.js";

// Drop keys whose value is empty/undefined/null or an empty array,
// so we never emit null/empty fields.
const compact = (obj) => {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out;
};

export const websiteNode = (site) =>
  compact({
    "@type": "WebSite",
    "@id": `${site.absolute_baseurl}/#website`,
    name: site.title,
    url: site.absolute_baseurl,
    description: site.subtitle,
    publisher: { "@id": `${site.absolute_baseurl}/#person` },
  });

export const personNode = (site) => {
  const a = site.author || {};
  return compact({
    "@type": "Person",
    "@id": `${site.absolute_baseurl}/#person`,
    name: a.full_name,
    url: a.url,
    image: site.avatar,
    jobTitle: a.job_title,
    description: a.description,
    sameAs: a.sameAs,
  });
};

// Returns an unescaped html fragment function (same shape as html.js helpers),
// so it can be interpolated directly into the `html` template in layoutPage.
export const renderJsonLd = (nodes) => {
  const graph = { "@context": "https://schema.org", "@graph": nodes };
  // Emit raw JSON (NOT via htmlValue, which would &quot;-escape and corrupt it).
  // Escape every "<" to < to stay valid JSON while preventing </script> breakout.
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return unescaped(`<script type="application/ld+json">${json}</script>`);
};
```

`templates/layoutPage.js` — add import, param, and render point:
```js
import { html } from "../lib/html.js";
import { websiteNode, personNode, renderJsonLd } from "../lib/jsonLd.js";

export default ({ site = {}, page = {}, head = "", js = "", contentAfter = "", jsonLd = [] }, content) => {
  const graph = [websiteNode(site), personNode(site), ...jsonLd];
  // ...existing feedUrl/feedTitle...
```
Then inside `<head>`, immediately after `${head}` (layoutPage.js:61):
```js
        ${head}
        ${renderJsonLd(graph)}
```

`test/jsonLd.test.js` — write these FIRST and watch them fail (module doesn't exist yet):
```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { websiteNode, personNode, renderJsonLd } from "../lib/jsonLd.js";

const site = {
  absolute_baseurl: "https://blog.lmorchard.com",
  title: "blog.lmorchard.com",
  subtitle: "sub",
  avatar: "https://example.com/a.jpg",
  author: {
    full_name: "Les Orchard",
    url: "https://lmorchard.com",
    job_title: "Software developer",
    description: "desc",
    sameAs: ["https://github.com/lmorchard"],
  },
};

test("websiteNode references person by @id", () => {
  const n = websiteNode(site);
  assert.equal(n["@type"], "WebSite");
  assert.equal(n["@id"], "https://blog.lmorchard.com/#website");
  assert.equal(n.publisher["@id"], "https://blog.lmorchard.com/#person");
});

test("personNode carries identity + sameAs", () => {
  const n = personNode(site);
  assert.equal(n["@id"], "https://blog.lmorchard.com/#person");
  assert.equal(n.name, "Les Orchard");
  assert.deepEqual(n.sameAs, ["https://github.com/lmorchard"]);
});

test("personNode omits empty optional fields", () => {
  const n = personNode({ absolute_baseurl: "https://x", author: { full_name: "L" } });
  assert.ok(!("jobTitle" in n));
  assert.ok(!("sameAs" in n));
  assert.ok(!("image" in n));
});

test("renderJsonLd emits one script with valid, breakout-safe JSON", () => {
  const frag = renderJsonLd([websiteNode(site), personNode(site)]);
  const out = frag(); // helper functions render when called
  assert.match(out, /^<script type="application\/ld\+json">/);
  assert.match(out, /<\/script>$/);
  const jsonText = out.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");
  assert.ok(!jsonText.includes("</script"), "no raw </script> breakout");
  const parsed = JSON.parse(jsonText); // < is valid JSON, parses fine
  assert.equal(parsed["@context"], "https://schema.org");
  assert.equal(parsed["@graph"].length, 2);
});
```

**Verification — automated:**
- [x] `npm test` passes (all Phase 1 tests green) — 4/4 pass
- [x] `npm run build:dev` completes without error
- [x] Homepage base-graph parses: extract the `ld+json` block from `build/index.html` and `JSON.parse` it; assert `@graph` has exactly `WebSite` + `Person` — 1 block, types `[WebSite, Person]`, no `&quot;`

**Verification — manual:**
- [ ] View source of `build/index.html`: exactly one `<script type="application/ld+json">`, containing `WebSite` + `Person`, no stray `&quot;`
- [ ] Confirm `sameAs` list and author description render as expected

---

## Phase 2: `BlogPosting` node on post pages

Delivers: the `blogPostingNode` builder and `post.js` wiring, so each post page additionally emits a `BlogPosting` that cross-references `Person`/`WebSite` by `@id` and merges into the single page graph.

**Files:**
- Modify: `lib/jsonLd.js` — add `blogPostingNode(site, page)`
- Modify: `templates/post.js` — pass `jsonLd: [blogPostingNode(site, page)]` to `layoutPage`
- Modify: `test/jsonLd.test.js` — add `blogPostingNode` tests

**Key changes:**

`lib/jsonLd.js` — add:
```js
export const blogPostingNode = (site, page) => {
  // Mirror the og:image logic in templates/post.js:21-23: prepend the
  // absolute baseurl only when the thumbnail is a site-root-relative path.
  const image = page.thumbnail
    ? page.thumbnail.indexOf("/") === 0
      ? `${site.absolute_baseurl}${page.thumbnail}`
      : page.thumbnail
    : undefined;

  // page.date is a moment object (lib/posts.js:34); new Date(...).toISOString()
  // is the same conversion used for the sitemap (lib/indexes.js:252).
  const published = page.date ? new Date(page.date).toISOString() : undefined;
  const modifiedSrc = page.modified || page.date;
  const modified = modifiedSrc ? new Date(modifiedSrc).toISOString() : undefined;

  return compact({
    "@type": "BlogPosting",
    "@id": `${site.absolute_baseurl}/${page.path}/#article`,
    mainEntityOfPage: `${site.absolute_baseurl}/${page.path}/`,
    headline: page.title,
    description: page.summary,
    image,
    datePublished: published,
    dateModified: modified,
    keywords: page.tags,
    author: { "@id": `${site.absolute_baseurl}/#person` },
    publisher: { "@id": `${site.absolute_baseurl}/#person` },
    isPartOf: { "@id": `${site.absolute_baseurl}/#website` },
  });
};
```

`templates/post.js` — extend imports and the `layoutPage` args object (add alongside `head`/`contentAfter`):
```js
import { blogPostingNode } from "../lib/jsonLd.js";
// ...
    {
      site,
      page,
      jsonLd: [blogPostingNode(site, page)],
      head: html`...`,
      contentAfter: html`...`,
    },
```

`test/jsonLd.test.js` — add:
```js
import { blogPostingNode } from "../lib/jsonLd.js";

const page = {
  path: "2026/2026-03-21-starnet",
  title: "StarNet",
  summary: "a summary",
  thumbnail: "/uploads/x.jpg",
  tags: ["ai", "art"],
  date: new Date("2026-03-21T12:00:00Z"),
};

test("blogPostingNode cross-references person and website by @id", () => {
  const n = blogPostingNode(site, page);
  assert.equal(n["@id"], "https://blog.lmorchard.com/2026/2026-03-21-starnet/#article");
  assert.equal(n.author["@id"], "https://blog.lmorchard.com/#person");
  assert.equal(n.isPartOf["@id"], "https://blog.lmorchard.com/#website");
  assert.equal(n.image, "https://blog.lmorchard.com/uploads/x.jpg");
  assert.deepEqual(n.keywords, ["ai", "art"]);
});

test("blogPostingNode dateModified falls back to datePublished", () => {
  const n = blogPostingNode(site, page);
  assert.equal(n.datePublished, "2026-03-21T12:00:00.000Z");
  assert.equal(n.dateModified, n.datePublished);
});

test("blogPostingNode omits thumbnail/tags/summary when absent", () => {
  const n = blogPostingNode(site, { path: "p", title: "t", date: page.date });
  assert.ok(!("image" in n));
  assert.ok(!("keywords" in n));
  assert.ok(!("description" in n));
});

test("blogPostingNode leaves an already-absolute thumbnail untouched", () => {
  const n = blogPostingNode(site, { ...page, thumbnail: "https://cdn.example.com/y.jpg" });
  assert.equal(n.image, "https://cdn.example.com/y.jpg");
});
```

**Verification — automated:**
- [x] `npm test` passes (Phase 1 + Phase 2 tests green) — 8/8 pass
- [x] `npm run build-posts-with-drafts` completes without error
- [x] Post-graph parses: 1429 post pages carry `BlogPosting`; sampled files parse cleanly; `BlogPosting.author["@id"]` and `isPartOf["@id"]` resolve to the `Person`/`WebSite` `@id`; 1184 thumbnail-less posts omit `image`
  - NOTE: incremental build only re-renders posts whose *content* changed. A template-only change (like this one) requires a clean rebuild (`node index.js build --clean ...`) to reach existing posts. Flagged for deploy.

**Verification — manual:**
- [ ] View source of one built post: single `ld+json` block, `BlogPosting` present with headline/date/keywords, references resolve
- [ ] Confirm a post *without* a thumbnail omits `image` (no empty/null field)
- [ ] Follow-up (non-blocking, for Les): paste a post's JSON into the [schema.org validator](https://validator.schema.org/) and [Google Rich Results test](https://search.google.com/test/rich-results)

---

## Plan self-review

- **Spec coverage:** config identity (§1) → Phase 1 config change; `lib/jsonLd.js` builders + renderer (§2) → Phase 1 (website/person/render) + Phase 2 (blogPosting); injection/merged-graph (§3) → Phase 1 layoutPage + Phase 2 post.js; edge cases (missing fields, dateModified fallback, `<` escape) → `compact`, fallback logic, and `renderJsonLd` replace, each covered by a test. Success criteria all map to a verification checkbox.
- **Placeholder scan:** no TBD/TODO; all logic shown in code.
- **Type consistency:** `websiteNode`/`personNode`/`blogPostingNode`/`renderJsonLd`/`compact` names are used identically across phases; `jsonLd` param name matches between `layoutPage` and `post.js`; `renderJsonLd` returns an `unescaped(...)` function consistent with how `layoutPage`'s `html` template renders interpolated functions.

## Out of scope (per spec "What we're NOT doing")

`Blog` node on the index, `CollectionPage`/`BreadcrumbList` on archive and tag pages, and the Discord invite in `sameAs`. Do not add these.
