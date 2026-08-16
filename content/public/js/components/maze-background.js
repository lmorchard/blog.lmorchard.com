// The 10 PRINT maze as a page background.
//
//   10 PRINT CHR$(205.5+RND(1)); : GOTO 10
//
// CHR$(205) is "\" and CHR$(206) is "/" in PETSCII; printing one at random per
// character cell fills the screen with a maze. See http://10print.org/
//
// One tile is built as an SVG data URI and handed to CSS as a repeating
// mask-image. CSS fills the mask with var(--pattern-ink), so:
//
//   * the ink colour never leaves CSS -> themes for free, nothing to regenerate
//     on theme change, and no probe element needed to resolve color-mix() for a
//     canvas context
//   * no canvas and no raster encode: ~4ms to build the string, versus ~72ms
//     measured for draw + PNG encode + PNG decode
//   * the layer is positioned by CSS, so the BROWSER scrolls it -> zero lag and
//     zero per-frame cost. A canvas repainted on scroll is inherently one frame
//     behind the compositor (measured: p95 120px of trailing at 120px/frame),
//     because scroll is composited off the main thread and the repaint is not.
//
// Tiling is safe because every cell is a diagonal between opposite corners, so
// tile edges always meet corner-to-corner: a maze tile is seamless at ANY size.
// The only artifact is the repetition period, tileCells * cell.

const DEFAULTS = {
  cell: 24, // px per PETSCII cell
  lineWidth: 1,
  tileCells: 64, // tile is tileCells square; period = 64 * 24 = 1536px
  seed: null, // build-injected integer; null falls back to per-load random
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

  buildTileUri() {
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

    // stroke is #fff because this is consumed as a MASK: only the alpha channel
    // matters, and the visible colour comes from CSS.
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}">` +
      `<path fill="none" stroke="#fff" stroke-width="${lineWidth}" d="${d.join("")}"/>` +
      `</svg>`;

    return { uri: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`, px };
  }

  install() {
    const { uri, px } = this.buildTileUri();
    const root = document.documentElement;
    root.style.setProperty("--maze-mask", `url("${uri}")`);
    root.style.setProperty("--maze-tile", `${px}px`);
    // Gates both the pattern layer and the sheet in background-pattern.css.
    // Without JS neither renders, and the page falls back to a flat background.
    root.classList.add("maze-ready");
  }

  destroy() {
    const root = document.documentElement;
    root.style.removeProperty("--maze-mask");
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
