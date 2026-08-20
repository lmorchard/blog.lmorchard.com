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
    } else if (req.url.endsWith(".jpg")) {
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end("FAKE-JPEG-DATA");
    } else if (req.url.startsWith("/agent")) {
      // Echo the agent back so a test can assert we identify ourselves.
      res.writeHead(200, { "Content-Type": "image/png" });
      res.end(req.headers["user-agent"] || "none");
    } else if (req.url.startsWith("/page")) {
      // A URL that serves HTML, not the image its extension promises.
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<!DOCTYPE html><html><body>a web page</body></html>");
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

test("localizes a frontmatter thumbnail", async () => {
  const url = `${baseUrl}/thumb.jpg`;
  const { dir, postDir, filepath } = await makePostDir(
    `---\ntitle: "A Post"\nthumbnail: "${url}"\nlayout: post\n---\n\nBody text.\n`,
  );

  await localizeImages([path.join(postDir, "**/*.md")]);

  const out = await fs.readFile(filepath, "utf8");
  assert.equal(out.includes(url), false, "remote URL should be rewritten");

  const files = await fs.readdir(postDir);
  const localImage = files.find((f) => f.endsWith(".jpg"));
  assert.ok(localImage, "a local .jpg should have been downloaded");
  assert.ok(
    out.includes(`thumbnail: "${localImage}"`),
    "frontmatter should reference the local file",
  );

  await fs.rm(dir, { recursive: true, force: true });
});

test("reuses one local copy when the thumbnail is also a body image", async () => {
  const url = `${baseUrl}/shared.jpg`;
  const { dir, postDir, filepath } = await makePostDir(
    `---\nthumbnail: "${url}"\n---\n\n![shared](${url})\n`,
  );

  await localizeImages([path.join(postDir, "**/*.md")]);

  const out = await fs.readFile(filepath, "utf8");
  const images = (await fs.readdir(postDir)).filter((f) => f.endsWith(".jpg"));
  assert.equal(images.length, 1, "the image should only be downloaded once");
  assert.ok(out.includes(`thumbnail: "${images[0]}"`));
  assert.ok(out.includes(`![shared](${images[0]})`));

  await fs.rm(dir, { recursive: true, force: true });
});

test("leaves a relative frontmatter thumbnail untouched", async () => {
  const { dir, postDir, filepath } = await makePostDir(
    `---\nthumbnail: "already-local.jpg"\n---\n\nBody text.\n`,
  );
  const before = await fs.readFile(filepath, "utf8");

  await localizeImages([path.join(postDir, "**/*.md")]);

  assert.equal(await fs.readFile(filepath, "utf8"), before);

  await fs.rm(dir, { recursive: true, force: true });
});

test("identifies itself with a descriptive user agent", async () => {
  const { dir, postDir } = await makePostDir(
    `# Post\n\n![agent](${baseUrl}/agent.png)\n`,
  );

  await localizeImages([path.join(postDir, "**/*.md")]);

  const local = (await fs.readdir(postDir)).find((f) => f.endsWith(".png"));
  const sent = await fs.readFile(path.join(postDir, local), "utf8");
  assert.match(sent, /blog\.lmorchard\.com/, "should send a descriptive agent");

  await fs.rm(dir, { recursive: true, force: true });
});

test("refuses to save an HTML page as an image", async () => {
  const url = `${baseUrl}/page.png`;
  const { dir, postDir, filepath } = await makePostDir(
    `# Post\n\n![page](${url})\n`,
  );

  await localizeImages([path.join(postDir, "**/*.md")]);

  const out = await fs.readFile(filepath, "utf8");
  assert.ok(out.includes(url), "the reference should be left alone");
  assert.deepEqual(
    (await fs.readdir(postDir)).filter((f) => f !== "index.md"),
    [],
    "no junk file should be left in the post bundle",
  );

  await fs.rm(dir, { recursive: true, force: true });
});

test("treats a linked image as an image plus a link", async () => {
  const img = `${baseUrl}/linked.jpg`;
  const page = "https://example.com/some/page";
  const { dir, postDir, filepath } = await makePostDir(
    `# Post\n\n[![alt text](${img})](${page})\n`,
  );

  await localizeImages([path.join(postDir, "**/*.md")]);

  const out = await fs.readFile(filepath, "utf8");
  const local = (await fs.readdir(postDir)).find((f) => f.endsWith(".jpg"));
  assert.ok(local, "the image should have been downloaded");
  assert.ok(
    out.includes(`[![alt text](${local})](${page})`),
    "the link target must survive untouched",
  );

  await fs.rm(dir, { recursive: true, force: true });
});
