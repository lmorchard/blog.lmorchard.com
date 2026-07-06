import { test } from "node:test";
import assert from "node:assert/strict";
import { websiteNode, personNode, blogPostingNode, renderJsonLd } from "../lib/jsonLd.js";

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
