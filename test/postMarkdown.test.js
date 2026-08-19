import { test } from "node:test";
import assert from "node:assert/strict";
import { renderPostMarkdown } from "../lib/postMarkdown.js";

const site = {
  absolute_baseurl: "https://blog.lmorchard.com",
  title: "blog.lmorchard.com",
  author: { full_name: "Les Orchard" },
};

const post = {
  title: "Week 32",
  date: "2026-08-07T12:00:00-07:00",
  path: "2026/08/07/w32",
  tags: ["weeknotes", "ai"],
  body: "*TL;DR:* a smoky week.\n<!--more-->\n\nMore words.\n",
  html: "<p><em>TL;DR:</em> a smoky week.</p>",
};

test("prepends frontmatter and a title heading", () => {
  assert.equal(
    renderPostMarkdown(site, post),
    [
      "---",
      'title: "Week 32"',
      "date: 2026-08-07T12:00:00-07:00",
      "url: https://blog.lmorchard.com/2026/08/07/w32/",
      "author: Les Orchard",
      "tags: [weeknotes, ai]",
      "---",
      "",
      "# Week 32",
      "",
      "*TL;DR:* a smoky week.",
      "<!--more-->",
      "",
      "More words.",
      "",
    ].join("\n")
  );
});

test("omits the heading when the body already opens with the title", () => {
  const out = renderPostMarkdown(site, {
    ...post,
    title: "A Heading Post",
    body: "# A Heading Post\n\nWords.\n",
    html: "<h1>A Heading Post</h1>\n<p>Words.</p>",
  });
  assert.equal(out.match(/A Heading Post/g).length, 2); // frontmatter + body
  assert.match(out, /---\n\n# A Heading Post/);
});

test("still adds the heading when the body's first heading differs", () => {
  const out = renderPostMarkdown(site, {
    ...post,
    title: "Real Title",
    body: "## Section One\n\nWords.\n",
    html: "<h2>Section One</h2>\n<p>Words.</p>",
  });
  assert.match(out, /# Real Title\n\n## Section One/);
});

test("omits tags and title when a post has neither", () => {
  const out = renderPostMarkdown(site, {
    ...post,
    title: undefined,
    tags: [],
    body: "Just an aside.\n",
    html: "<p>Just an aside.</p>",
  });
  assert.ok(!out.includes("title:"));
  assert.ok(!out.includes("tags:"));
  assert.ok(!/^#/m.test(out));
  assert.match(out, /author: Les Orchard\n---\n\nJust an aside\.\n$/);
});

test("quotes titles that would break or confuse YAML", () => {
  const quoted = (title) =>
    renderPostMarkdown(site, { ...post, title }).split("\n")[1];
  assert.equal(quoted('He said "hi": a story'), 'title: "He said \\"hi\\": a story"');
  assert.equal(quoted("Backslash \\ here"), 'title: "Backslash \\\\ here"');
  assert.equal(quoted("Two\nlines"), 'title: "Two\\nlines"');
});

test("quotes tags that could be read as numbers or booleans", () => {
  const tagLine = (tags) =>
    renderPostMarkdown(site, { ...post, tags })
      .split("\n")
      .find((l) => l.startsWith("tags:"));
  assert.equal(tagLine(["2026", "no", "web-dev", "a.b"]), 'tags: ["2026", "no", web-dev, a.b]');
  assert.equal(tagLine(["has space"]), "tags: [has space]");
  assert.equal(tagLine(["odd: tag"]), 'tags: ["odd: tag"]');
});

test("ends with exactly one newline", () => {
  const out = renderPostMarkdown(site, { ...post, body: "Words.\n\n\n" });
  assert.ok(out.endsWith("Words.\n"));
  assert.ok(!out.endsWith("\n\n"));
});
