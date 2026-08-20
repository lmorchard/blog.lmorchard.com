// The 10 PRINT maze as a page background.
//
//   10 PRINT CHR$(205.5+RND(1)); : GOTO 10
//
// CHR$(205) is "\" and CHR$(206) is "/" in PETSCII; printing one at random per
// character cell fills the screen with a maze. See http://10print.org/
//
// One tile is built as an SVG data URI and handed to CSS as a repeating
// background-image, so:
//
//   * no canvas and no raster encode: ~4ms to build the string, versus ~72ms
//     measured for draw + PNG encode + PNG decode
//   * the layer is positioned by CSS, so the BROWSER scrolls it -> zero lag and
//     zero per-frame cost. A canvas repainted on scroll is inherently one frame
//     behind the compositor (measured: p95 120px of trailing at 120px/frame),
//     because scroll is composited off the main thread and the repaint is not.
//
// The ink colour is resolved from --pattern-ink and baked into the SVG's
// stroke. An earlier version instead handed the tile to CSS as a mask-image and
// let CSS fill it with var(--pattern-ink), which kept the colour entirely in CSS
// and made theming free. That had to go: Firefox has no cheap path for a masked
// layer this large, and it cost roughly two thirds of every scrolled frame.
// Measured with script/bench-maze.mjs on a 4510px post page, scrolling 40px per
// frame, as frame interval p50 / frames over 20ms out of 87:
//
//   pattern off (floor)                      8.3ms   1/87
//   mask-image, 1536px tile                 24.7ms  54/87
//   mask-image, 192px tile (1KB URI)        16.5ms  24/87
//   mask-image from a rasterised PNG        16.7ms  19/87
//   background-image, 1536px tile           8.3ms    0/87
//
// So it is masking itself, not the size of the tile and not SVG rasterisation:
// shrinking the tile 64-fold barely helped, a raster mask barely helped, and
// dropping the mask at the ORIGINAL tile size took the cost to zero. Chromium
// showed no cost for any of these, which is why this only ever looked fine here.
//
// Baking the colour in means the tile has to be rebuilt whenever the theme
// changes, which install() handles by watching for both ways that can happen.
//
// Tiling is safe because every cell is a diagonal between opposite corners, so
// tile edges always meet corner-to-corner: a maze tile is seamless at ANY size.
// The only artifact is the repetition period, tileCells * cell.
//
// The seed is random per page load, so every visit gets a different maze — which
// is what running the original program twice does. An earlier version injected a
// per-build seed from config.js to keep the maze stable across a build; that was
// dropped because it also made the seed attribute appear in every page's markup,
// so all ~2300 HTML files changed on every build and the deploy re-uploaded and
// invalidated the entire site each time. The `seed` option remains for callers
// that want determinism, e.g. reproducible screenshots.

const DEFAULTS = {
  cell: 24, // px per PETSCII cell
  lineWidth: 1,
  tileCells: 64, // tile is tileCells square; period = 64 * 24 = 1536px
  seed: null, // null (the default) = fresh random maze per page load
};

export class MazeBackground {
  constructor(options = {}) {
    this.opts = { ...DEFAULTS, ...options };
    this.seed =
      this.opts.seed == null || Number.isNaN(this.opts.seed)
        ? (Math.random() * 0xffffffff) | 0
        : this.opts.seed | 0;
  }

  // Pure function of position, rather than Math.random() memoised in a Map.
  // Nothing can reshuffle on resize or scroll, the tile is reproducible from the
  // seed alone, and an arbitrarily long document costs no memory.
  cellAt(col, row) {
    let h =
      (Math.imul(col | 0, 0x1f1f1f1f) ^ Math.imul(row | 0, 0x27220a95)) ^ this.seed;
    h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d);
    h = Math.imul(h ^ (h >>> 12), 0x297a2d39);
    h ^= h >>> 15;
    return (h & 1) === 1;
  }

  // --pattern-ink is a color-mix(), and reading a custom property back gives the
  // unresolved token rather than a colour. Assigning it to a real `color`
  // property on a throwaway element and reading the computed value is what
  // resolves it — and it resolves against wherever the probe sits in the tree,
  // so it picks up the current theme with no knowledge of how themes are
  // implemented.
  resolveInk() {
    const probe = document.createElement("div");
    probe.style.color = "var(--pattern-ink)";
    probe.style.display = "none";
    document.documentElement.appendChild(probe);
    const ink = getComputedStyle(probe).color;
    probe.remove();
    return ink;
  }

  buildTileUri(ink) {
    const { cell, lineWidth, tileCells } = this.opts;
    const px = tileCells * cell;

    // One path with many subpaths: far smaller than one element per cell.
    const d = [];
    for (let row = 0; row < tileCells; row++) {
      for (let col = 0; col < tileCells; col++) {
        const x = col * cell;
        const y = row * cell;
        d.push(
          this.cellAt(col, row)
            ? `M${x} ${y}l${cell} ${cell}` // "\"
            : `M${x} ${y + cell}l${cell} -${cell}` // "/"
        );
      }
    }

    // The resolved ink carries the alpha from --pattern-ink's color-mix, so the
    // stroke is already the translucent colour the page wants; nothing tints it
    // afterwards.
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}">` +
      `<path fill="none" stroke="${ink}" stroke-width="${lineWidth}" d="${d.join("")}"/>` +
      `</svg>`;

    return { uri: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`, px };
  }

  // Rebuild the tile for the current ink. The seed is held on the instance, so
  // a theme change re-tints the SAME maze rather than reshuffling it.
  render() {
    const ink = this.resolveInk();
    if (ink === this.ink) return;
    this.ink = ink;
    const { uri, px } = this.buildTileUri(ink);
    const root = document.documentElement;
    root.style.setProperty("--maze-image", `url("${uri}")`);
    root.style.setProperty("--maze-tile", `${px}px`);
  }

  install() {
    this.render();
    // Gates both the pattern layer and the sheet in background-pattern.css.
    // Without JS neither renders, and the page falls back to a flat background.
    document.documentElement.classList.add("maze-ready");

    // Two independent ways the theme can change under us, and the pattern goes
    // stale for both:
    //
    //   * the reader picks one. theme-selector.js dispatches `themechange` on
    //     window once it has finished rewriting the prefers-color-scheme media
    //     rules, which is the same seam mermaid-diagram.js and remark42-loader.js
    //     already use. Listening for it rather than watching body's class matters
    //     for ordering: the class is toggled BEFORE those rules are rewritten, so
    //     the ink is not yet current at that point.
    //   * the OS flips and no override is stored, in which case the media query
    //     switches with no JavaScript involved at all and no event is dispatched.
    //
    // Both land in render(), which compares the resolved ink and returns
    // immediately when nothing actually changed.
    this.onThemeChange = () => this.render();
    addEventListener("themechange", this.onThemeChange);
    this.scheme = matchMedia("(prefers-color-scheme: dark)");
    this.scheme.addEventListener("change", this.onThemeChange);
  }

  destroy() {
    removeEventListener("themechange", this.onThemeChange);
    this.scheme?.removeEventListener("change", this.onThemeChange);
    const root = document.documentElement;
    root.style.removeProperty("--maze-image");
    root.style.removeProperty("--maze-tile");
    root.classList.remove("maze-ready");
  }
}

class MazeBackgroundElement extends HTMLElement {
  connectedCallback() {
    const num = (name) => {
      const v = this.getAttribute(name);
      return v == null || v === "" ? undefined : Number(v);
    };
    this.maze = new MazeBackground({
      cell: num("cell") ?? DEFAULTS.cell,
      tileCells: num("tile-cells") ?? DEFAULTS.tileCells,
      seed: num("seed") ?? null,
    });
    this.maze.install();
  }

  disconnectedCallback() {
    this.maze?.destroy();
  }
}

customElements.define("maze-background", MazeBackgroundElement);
