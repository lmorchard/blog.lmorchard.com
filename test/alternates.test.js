import { test } from "node:test";
import assert from "node:assert/strict";
import {
  siteFeedAlternates,
  indexFeedAlternates,
  primaryFeed,
  postAlternates,
  indexAlternates,
} from "../lib/alternates.js";

const site = { baseurl: "", title: "blog.lmorchard.com" };
const stagedSite = { baseurl: "/blog.lmorchard.com", title: "blog.lmorchard.com" };

test("siteFeedAlternates advertises full-text and excerpt feeds", () => {
  assert.deepEqual(siteFeedAlternates(site), [
    {
      href: "/index.rss",
      type: "application/rss+xml",
      title: "blog.lmorchard.com",
    },
    {
      href: "/index-excerpts.rss",
      type: "application/rss+xml",
      title: "blog.lmorchard.com (excerpts)",
    },
  ]);
});

test("indexFeedAlternates points into the tag directory", () => {
  const page = { title: "mozilla", tag: "mozilla", indexPath: "tag/mozilla", indexLabel: "Tag" };
  const [full, excerpts] = indexFeedAlternates(site, page);
  assert.equal(full.href, "/tag/mozilla/index.rss");
  assert.equal(full.title, "Tag: mozilla - blog.lmorchard.com");
  assert.equal(excerpts.href, "/tag/mozilla/index-excerpts.rss");
  assert.equal(excerpts.title, "Tag: mozilla - blog.lmorchard.com (excerpts)");
});

test("indexFeedAlternates covers year and month indexes", () => {
  const [yearFull, yearExcerpts] = indexFeedAlternates(site, {
    title: "2026",
    indexPath: "2026",
    indexLabel: "Year",
  });
  assert.equal(yearFull.href, "/2026/index.rss");
  assert.equal(yearFull.title, "Year: 2026 - blog.lmorchard.com");
  assert.equal(yearExcerpts.href, "/2026/index-excerpts.rss");

  const [monthFull] = indexFeedAlternates(site, {
    title: "2026/08",
    indexPath: "2026/08",
    indexLabel: "Month",
  });
  assert.equal(monthFull.href, "/2026/08/index.rss");
  assert.equal(monthFull.title, "Month: 2026/08 - blog.lmorchard.com");
});

// The visible nav/footer link, which uses absolute URLs so it can be copied
// out of the page and pasted into a reader
const absSite = { ...site, absolute_baseurl: "https://blog.lmorchard.com" };

test("primaryFeed follows a scoped index", () => {
  assert.deepEqual(
    primaryFeed(absSite, { title: "mozilla", indexPath: "tag/mozilla", indexLabel: "Tag" }),
    {
      href: "https://blog.lmorchard.com/tag/mozilla/index.rss",
      title: "Tag: mozilla - blog.lmorchard.com",
    }
  );
  assert.equal(
    primaryFeed(absSite, { title: "2026/08", indexPath: "2026/08", indexLabel: "Month" }).href,
    "https://blog.lmorchard.com/2026/08/index.rss"
  );
});

test("primaryFeed falls back to the site feed off a scoped index", () => {
  // posts, static pages, all.html/archives.html, and the root index
  for (const page of [
    { title: "T", path: "2026/08/07/w32" },
    { title: "About", path: "about" },
    { title: "Archives" },
    { title: "Home", indexPath: "" },
  ]) {
    assert.deepEqual(primaryFeed(absSite, page), {
      href: "https://blog.lmorchard.com/index.rss",
      title: "blog.lmorchard.com",
    });
  }
});

test("postAlternates links the markdown and JSON written beside the post", () => {
  const page = { path: "2026/08/07/w32", title: "Week 32" };
  assert.deepEqual(postAlternates(site, page), [
    {
      href: "/2026/08/07/w32/index.md",
      type: "text/markdown",
      title: "Week 32 (Markdown)",
    },
    {
      href: "/2026/08/07/w32/index.json",
      type: "application/json",
      title: "Week 32 (JSON)",
    },
  ]);
});

test("indexAlternates handles the root index, which has no directory", () => {
  const [json] = indexAlternates(site, { title: "Home", indexPath: "" });
  assert.equal(json.href, "/index.json");
  assert.equal(json.type, "application/json");
});

test("indexAlternates handles nested year/month/tag indexes", () => {
  assert.equal(
    indexAlternates(site, { title: "2026/08", indexPath: "2026/08" })[0].href,
    "/2026/08/index.json"
  );
  assert.equal(
    indexAlternates(site, { title: "mozilla", indexPath: "tag/mozilla" })[0].href,
    "/tag/mozilla/index.json"
  );
});

test("a non-empty baseurl prefixes every href", () => {
  assert.equal(siteFeedAlternates(stagedSite)[0].href, "/blog.lmorchard.com/index.rss");
  assert.equal(
    indexAlternates(stagedSite, { title: "Home", indexPath: "" })[0].href,
    "/blog.lmorchard.com/index.json"
  );
  assert.equal(
    postAlternates(stagedSite, { path: "2026/08/07/w32", title: "T" })[0].href,
    "/blog.lmorchard.com/2026/08/07/w32/index.md"
  );
});
