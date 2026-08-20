#!/usr/bin/env node
//
// Measure the render cost of the 10 PRINT maze background (see
// content/public/js/components/maze-background.js) across browsers and across
// candidate cheaper implementations.
//
//   npm run bench-maze                            # firefox + chromium, default pages
//   npm run bench-maze -- --browser firefox
//   npm run bench-maze -- --page /2002/index.html
//   npm run bench-maze -- --headed
//   npm run bench-maze -- --shots tmp/maze        # visual + theme-toggle check
//
// Needs a `build/` directory (npm run build:dev) and a playwright install; it
// reuses whichever one is already in the npx cache rather than adding a
// devDependency for a one-off investigation.

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BUILD = path.join(ROOT, "build");
const PORT = 9987;

// --- playwright lookup ------------------------------------------------------

function loadPlaywright() {
  const require = createRequire(import.meta.url);
  const candidates = [
    path.join(ROOT, "node_modules/playwright"),
    ...fs
      .globSync(`${process.env.HOME}/.npm/_npx/*/node_modules/playwright`)
      .sort(),
  ];
  for (const c of candidates) {
    try {
      return require(c);
    } catch {}
  }
  throw new Error(
    "no playwright found; run `npx playwright@latest install firefox` once"
  );
}

// --- static server ----------------------------------------------------------

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ico": "image/x-icon",
};

function serve() {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    let file = path.join(BUILD, url);
    if (fs.existsSync(file) && fs.statSync(file).isDirectory())
      file = path.join(file, "index.html");
    if (!file.startsWith(BUILD) || !fs.existsSync(file)) {
      res.writeHead(404);
      return res.end("not found");
    }
    res.writeHead(200, {
      "content-type": MIME[path.extname(file)] ?? "application/octet-stream",
      "cache-control": "no-store",
    });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) =>
    server.listen(PORT, () => resolve(server))
  );
}

// --- variants ---------------------------------------------------------------
//
// Each variant is applied in-page AFTER load, so every variant measures the
// same document with only the pattern implementation changed. `setup` runs in
// the browser and returns a label-able detail string.

const VARIANTS = [
  {
    id: "off",
    what: "no pattern at all (floor)",
    setup: () => {
      document.documentElement.classList.remove("maze-ready");
      return "";
    },
  },
  {
    id: "baseline",
    what: "shipping: mask-image, 64x24 tile, full-document layer",
    setup: () => "",
  },
  {
    id: "tile-16",
    what: "mask-image, 16x24 tile (384px period)",
    setup: () => {
      window.__rebuildMaze({ tileCells: 16 });
      return "";
    },
  },
  {
    id: "tile-8",
    what: "mask-image, 8x24 tile (192px period)",
    setup: () => {
      window.__rebuildMaze({ tileCells: 8 });
      return "";
    },
  },
  {
    id: "bgimage-64",
    what: "background-image (ink baked into SVG), 64x24 tile",
    setup: () => {
      window.__rebuildMaze({ tileCells: 64, asBackgroundImage: true });
      return "";
    },
  },
  {
    id: "bgimage-16",
    what: "background-image (ink baked into SVG), 16x24 tile",
    setup: () => {
      window.__rebuildMaze({ tileCells: 16, asBackgroundImage: true });
      return "";
    },
  },
  {
    id: "mask-png",
    what: "mask-image from a canvas-rendered PNG (keeps ink in CSS)",
    setup: async () => {
      await window.__rebuildMaskPng({ tileCells: 64 });
      return "";
    },
  },
  {
    id: "fixed-layer",
    what: "mask-image, 64x24 tile, viewport-fixed layer w/ scrolled mask-position",
    setup: () => {
      window.__fixLayer();
      return "";
    },
  },
];

// --- in-page instrumentation ------------------------------------------------

// Injected before the page's own scripts. Exposes helpers the variants call,
// and re-implements the tile builder so a variant can change its parameters
// without a rebuild of the site.
const INIT_SCRIPT = `
window.__mazeBench = {};

window.__buildTile = function (opts) {
  const cell = opts.cell ?? 24;
  const tileCells = opts.tileCells ?? 64;
  const lineWidth = opts.lineWidth ?? 1;
  const stroke = opts.stroke ?? "#fff";
  const seed = 0x5eed1234;
  const cellAt = (col, row) => {
    let h = (Math.imul(col | 0, 0x1f1f1f1f) ^ Math.imul(row | 0, 0x27220a95)) ^ seed;
    h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d);
    h = Math.imul(h ^ (h >>> 12), 0x297a2d39);
    h ^= h >>> 15;
    return (h & 1) === 1;
  };
  const px = tileCells * cell;
  const d = [];
  for (let row = 0; row < tileCells; row++) {
    for (let col = 0; col < tileCells; col++) {
      const x = col * cell, y = row * cell;
      d.push(cellAt(col, row)
        ? "M" + x + " " + y + "l" + cell + " " + cell
        : "M" + x + " " + (y + cell) + "l" + cell + " -" + cell);
    }
  }
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + px + '" height="' + px + '">' +
    '<path fill="none" stroke="' + stroke + '" stroke-width="' + lineWidth + '" d="' + d.join("") + '"/>' +
    "</svg>";
  return { uri: "data:image/svg+xml;utf8," + encodeURIComponent(svg), px, bytes: svg.length };
};

// Swap the shipping tile for one built with different parameters. When
// asBackgroundImage is set, the ink colour is resolved once from
// --pattern-ink and baked into the SVG, and the layer paints the image
// directly instead of masking a solid fill.
window.__rebuildMaze = function (opts) {
  const root = document.documentElement;
  let stroke = "#fff";
  if (opts.asBackgroundImage) {
    const probe = document.createElement("div");
    probe.style.color = getComputedStyle(root).getPropertyValue("--pattern-ink").trim();
    document.body.appendChild(probe);
    stroke = getComputedStyle(probe).color;
    probe.remove();
  }
  const t0 = performance.now();
  const { uri, px, bytes } = window.__buildTile({ ...opts, stroke });
  window.__mazeBench.buildMs = performance.now() - t0;
  window.__mazeBench.uriBytes = uri.length;
  window.__mazeBench.svgBytes = bytes;
  window.__mazeBench.tilePx = px;
  root.style.setProperty("--maze-tile", px + "px");
  if (opts.asBackgroundImage) {
    const s = document.createElement("style");
    s.id = "maze-bench-bgimage";
    s.textContent =
      "html.maze-ready::before{" +
      "-webkit-mask-image:none!important;mask-image:none!important;" +
      "background:url('" + uri + "') repeat 0 0/var(--maze-tile) var(--maze-tile)!important;}";
    document.head.appendChild(s);
  } else {
    root.style.setProperty("--maze-mask", 'url("' + uri + '")');
  }
};

// Rasterise the tile to a PNG once and use that as the mask instead of the
// SVG. Tests whether Firefox's cost is SVG rasterisation or masking itself; if
// it is the former, the mask (and therefore CSS-only theming) can be kept.
window.__rebuildMaskPng = function (opts) {
  const cell = opts.cell ?? 24;
  const tileCells = opts.tileCells ?? 64;
  const px = tileCells * cell;
  const seed = 0x5eed1234;
  const cellAt = (col, row) => {
    let h = (Math.imul(col | 0, 0x1f1f1f1f) ^ Math.imul(row | 0, 0x27220a95)) ^ seed;
    h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d);
    h = Math.imul(h ^ (h >>> 12), 0x297a2d39);
    h ^= h >>> 15;
    return (h & 1) === 1;
  };
  const t0 = performance.now();
  const c = document.createElement("canvas");
  c.width = c.height = px;
  const g = c.getContext("2d");
  g.strokeStyle = "#fff";
  g.lineWidth = opts.lineWidth ?? 1;
  g.beginPath();
  for (let row = 0; row < tileCells; row++) {
    for (let col = 0; col < tileCells; col++) {
      const x = col * cell, y = row * cell;
      if (cellAt(col, row)) { g.moveTo(x, y); g.lineTo(x + cell, y + cell); }
      else { g.moveTo(x, y + cell); g.lineTo(x + cell, y); }
    }
  }
  g.stroke();
  const uri = c.toDataURL("image/png");
  window.__mazeBench.buildMs = performance.now() - t0;
  window.__mazeBench.uriBytes = uri.length;
  window.__mazeBench.tilePx = px;
  const root = document.documentElement;
  root.style.setProperty("--maze-tile", px + "px");
  root.style.setProperty("--maze-mask", 'url("' + uri + '")');
  return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
};

// Pin the pattern layer to the viewport and move the mask origin with the
// scroll offset instead, so the painted area is one screenful rather than the
// whole document.
window.__fixLayer = function () {
  const s = document.createElement("style");
  s.id = "maze-bench-fixed";
  s.textContent = "html.maze-ready::before{position:fixed!important;inset:0!important;}";
  document.head.appendChild(s);
  const root = document.documentElement;
  const sync = () => root.style.setProperty("--maze-origin", "0 " + (-window.scrollY) + "px");
  const s2 = document.createElement("style");
  s2.textContent =
    "html.maze-ready::before{-webkit-mask-position:var(--maze-origin,0 0)!important;mask-position:var(--maze-origin,0 0)!important;}";
  document.head.appendChild(s2);
  addEventListener("scroll", sync, { passive: true });
  sync();
};

// Scroll the document a fixed distance per animation frame and record the
// interval between frames. A pattern layer that is expensive to paint shows up
// as long frames here.
window.__scrollBench = function (frames, stepPx) {
  return new Promise((resolve) => {
    const deltas = [];
    let last = performance.now();
    let n = 0;
    scrollTo(0, 0);
    requestAnimationFrame(function tick(now) {
      deltas.push(now - last);
      last = now;
      scrollBy(0, stepPx);
      if (++n < frames && window.scrollY + innerHeight < document.body.scrollHeight - 4) {
        requestAnimationFrame(tick);
      } else {
        resolve(deltas.slice(3)); // drop warm-up frames
      }
    });
  });
};

// Cost of a full repaint of the pattern layer: toggle a property that forces
// the layer to be re-rasterised, then wait for the frame to land.
window.__repaintBench = function (n) {
  return new Promise(async (resolve) => {
    const el = document.documentElement;
    const times = [];
    for (let i = 0; i < n; i++) {
      const t0 = performance.now();
      el.style.setProperty("--pattern-ink", i % 2 ? "rgba(128,128,128,.2)" : "rgba(128,128,128,.21)");
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      times.push(performance.now() - t0);
    }
    el.style.removeProperty("--pattern-ink");
    resolve(times);
  });
};
`;

// --- stats ------------------------------------------------------------------

const pct = (xs, p) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor((s.length - 1) * p))];
};
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
const f1 = (n) => n.toFixed(1);

// --- runner -----------------------------------------------------------------

async function measure(page, url, variant) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);
  await page.evaluate(variant.setup);
  await page.waitForTimeout(400);

  const scroll = await page.evaluate(() => window.__scrollBench(180, 40));
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(200);
  const repaint = await page.evaluate(() => window.__repaintBench(12));
  const info = await page.evaluate(() => ({
    docHeight: document.documentElement.scrollHeight,
    ...window.__mazeBench,
  }));

  return {
    variant: variant.id,
    frames: scroll.length,
    frameMean: mean(scroll),
    frameP50: pct(scroll, 0.5),
    frameP95: pct(scroll, 0.95),
    frameMax: Math.max(...scroll),
    longFrames: scroll.filter((d) => d > 20).length,
    repaintMean: mean(repaint),
    repaintP95: pct(repaint, 0.95),
    info,
  };
}

// --- visual check -----------------------------------------------------------
//
// The tile now carries the ink colour, so a theme change has to rebuild it.
// Screenshot both themes and assert the generated URI actually differs, which
// is the failure mode a scroll benchmark cannot see.

async function shoot(pw, browserName, url, outDir) {
  const browser = await pw[browserName].launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await ctx.route("**/*", (route) =>
    new URL(route.request().url()).port === String(PORT)
      ? route.continue()
      : route.abort()
  );
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  const read = () =>
    page.evaluate(() =>
      document.documentElement.style.getPropertyValue("--maze-image")
    );

  const before = await read();
  await page.screenshot({ path: path.join(outDir, `${browserName}-light.png`) });

  // Drive the real control rather than the class directly, so this exercises
  // the same path a reader does.
  await page.evaluate(() => {
    const cb = document.querySelector("theme-selector input[type=checkbox]");
    cb.checked = !cb.checked;
    cb.dispatchEvent(new Event("change"));
  });
  await page.waitForTimeout(600);
  const after = await read();
  await page.screenshot({ path: path.join(outDir, `${browserName}-dark.png`) });

  const ink = (u) => (u.match(/stroke%3D%22([^%]*(?:%[^2][^%]*|%2[^2][^%]*)*)/) ?? [])[1];
  console.log(`${browserName}:`);
  console.log(`  light ink: ${decodeURIComponent(ink(before) ?? "?")}`);
  console.log(`  dark  ink: ${decodeURIComponent(ink(after) ?? "?")}`);
  console.log(
    `  tile rebuilt on theme change: ${before && after && before !== after ? "yes" : "NO — BUG"}`
  );
  console.log(`  screenshots in ${outDir}\n`);
  await browser.close();
}

async function main() {
  const argv = process.argv.slice(2);
  const arg = (name, dflt) => {
    const i = argv.indexOf(`--${name}`);
    return i === -1 ? dflt : argv[i + 1];
  };
  const headed = argv.includes("--headed");
  const browsers = (arg("browser", "firefox,chromium")).split(",");
  const pages = (arg("page", "/2002/index.html,/index.html")).split(",");
  const only = arg("variant", null);
  const variants = only
    ? VARIANTS.filter((v) => only.split(",").includes(v.id))
    : VARIANTS;

  if (!fs.existsSync(BUILD)) throw new Error("no build/ — run `npm run build:dev`");

  const pw = loadPlaywright();
  const server = await serve();
  console.log(`serving ${BUILD} on :${PORT}\n`);

  const shots = arg("shots", null);
  if (shots) {
    fs.mkdirSync(shots, { recursive: true });
    for (const b of browsers)
      await shoot(pw, b, `http://localhost:${PORT}${pages[0]}`, shots);
    return server.close();
  }

  for (const browserName of browsers) {
    const browser = await pw[browserName].launch({ headless: !headed });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addInitScript(INIT_SCRIPT);
    // Off-origin requests (fonts, remark42, analytics) add seconds of noise and
    // nothing this benchmark measures depends on them.
    await ctx.route("**/*", (route) =>
      new URL(route.request().url()).port === String(PORT)
        ? route.continue()
        : route.abort()
    );
    const page = await ctx.newPage();

    for (const p of pages) {
      const url = `http://localhost:${PORT}${p}`;
      const rows = [];
      for (const v of variants) rows.push(await measure(page, url, v));

      const h = rows[0].info.docHeight;
      console.log(`## ${browserName} — ${p} (document ${h}px tall)`);
      console.log(
        [
          "variant".padEnd(14),
          "frame p50".padStart(10),
          "frame p95".padStart(10),
          "frame max".padStart(10),
          ">20ms".padStart(7),
          "repaint".padStart(9),
          "tile".padStart(7),
          "uri KB".padStart(8),
        ].join("")
      );
      for (const r of rows) {
        console.log(
          [
            r.variant.padEnd(14),
            f1(r.frameP50).padStart(10),
            f1(r.frameP95).padStart(10),
            f1(r.frameMax).padStart(10),
            `${r.longFrames}/${r.frames}`.padStart(7),
            f1(r.repaintMean).padStart(9),
            (r.info.tilePx ? `${r.info.tilePx}px` : "1536px").padStart(7),
            (r.info.uriBytes ? (r.info.uriBytes / 1024).toFixed(0) : "78").padStart(8),
          ].join("")
        );
      }
      console.log();
    }
    await browser.close();
  }
  server.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
