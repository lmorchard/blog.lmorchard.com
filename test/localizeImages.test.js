import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { promises as fs } from "node:fs";

import { localizeImages } from "../lib/localizeImages.js";

// A throwaway HTTP server that serves a tiny fake clip for any *.mp4 path.
// Using a real localhost server exercises the actual download path (redirects,
// streaming, timeout handling) without mocking the module internals.
let server;
let baseUrl;

before(async () => {
  server = http.createServer((req, res) => {
    if (req.url.endsWith(".mp4")) {
      res.writeHead(200, { "Content-Type": "video/mp4" });
      res.end("FAKE-MP4-DATA");
    } else {
      res.writeHead(404);
      res.end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

async function makePostDir(contents) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "localize-video-"));
  const postDir = path.join(dir, "a-post");
  await fs.mkdir(postDir, { recursive: true });
  const filepath = path.join(postDir, "index.md");
  await fs.writeFile(filepath, contents, "utf8");
  return { dir, postDir, filepath };
}

test("localizes a <video><source> with its <a> fallback", async () => {
  const url = `${baseUrl}/clip.mp4`;
  const { dir, postDir, filepath } = await makePostDir(
    [
      "# Post",
      "",
      "<figure>",
      "  <video controls>",
      `    <source src="${url}" type="video/mp4" />`,
      `    <a href="${url}">clip.mp4</a>`,
      "  </video>",
      "</figure>",
      "",
    ].join("\n"),
  );

  await localizeImages([path.join(postDir, "**/*.md")]);

  const out = await fs.readFile(filepath, "utf8");

  // The remote URL is gone everywhere it appeared.
  assert.equal(out.includes(url), false, "remote URL should be fully rewritten");

  // Both the <source src> and the <a href> fallback now point at the local file.
  // Rewritten paths are bare relative filenames, matching how the localizer
  // already rewrites images (e.g. ![alt](hash.jpg), no "./" prefix).
  const files = await fs.readdir(postDir);
  const localVideo = files.find((f) => f.endsWith(".mp4"));
  assert.ok(localVideo, "a local .mp4 should have been downloaded into the bundle");
  assert.ok(out.includes(`src="${localVideo}"`), "<source> should reference local file");
  assert.ok(out.includes(`href="${localVideo}"`), "<a> fallback should reference local file");

  // The downloaded bytes match what the server sent.
  const bytes = await fs.readFile(path.join(postDir, localVideo), "utf8");
  assert.equal(bytes, "FAKE-MP4-DATA");

  await fs.rm(dir, { recursive: true, force: true });
});

test("localizes a bare <video src> shorthand", async () => {
  const url = `${baseUrl}/bare.mp4`;
  const { dir, postDir, filepath } = await makePostDir(
    `# Post\n\n<video src="${url}" controls></video>\n`,
  );

  await localizeImages([path.join(postDir, "**/*.md")]);

  const out = await fs.readFile(filepath, "utf8");
  assert.equal(out.includes(url), false, "remote URL should be rewritten");

  const files = await fs.readdir(postDir);
  const localVideo = files.find((f) => f.endsWith(".mp4"));
  assert.ok(localVideo, "a local .mp4 should have been downloaded");
  assert.ok(out.includes(`src="${localVideo}"`), "<video> should reference local file");

  await fs.rm(dir, { recursive: true, force: true });
});

test("leaves a local (already-relative) <source> untouched", async () => {
  const { dir, postDir, filepath } = await makePostDir(
    `# Post\n\n<video controls><source src="./already-local.mp4" type="video/mp4" /></video>\n`,
  );
  const before = await fs.readFile(filepath, "utf8");

  await localizeImages([path.join(postDir, "**/*.md")]);

  const after = await fs.readFile(filepath, "utf8");
  assert.equal(after, before, "relative sources must not be modified");

  await fs.rm(dir, { recursive: true, force: true });
});
