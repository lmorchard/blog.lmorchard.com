// maze-background.js — the 10 PRINT maze as a page background.
//
//   10 PRINT CHR$(205.5+RND(1)); : GOTO 10
//
// CHR$(205) is "\" and CHR$(206) is "/" in PETSCII; printing one at random per
// cell fills the screen with a maze.
//
// This builds ONE tile as an SVG data URI and hands it to CSS as a repeating
// mask-image. CSS fills the mask with var(--pattern-ink), so:
//
//   * the ink colour never leaves CSS -> themes for free, no regeneration on
//     theme change, and no probe element to resolve color-mix() for canvas
//   * no canvas, no raster encode: building the string costs ~4ms at 64 cells,
//     versus ~72ms for draw + PNG encode + PNG decode
//   * the layer is absolutely positioned, so the BROWSER scrolls it -> zero lag
//     and zero per-frame cost (a canvas repainted on scroll is inherently one
//     frame behind the compositor)
//
// Tiling is safe because every cell is a diagonal between opposite corners, so
// tile edges always meet corner-to-corner: a maze tile is seamless at ANY size.
// The only artifact is the repetition period, tileCells * cell.
//
// The seed should be injected by the build (see `seed` below) so the maze is
// identical across every page of a build and changes when the site is published.

const DEFAULTS = {
  cell: 24, // px per PETSCII cell
  lineWidth: 1,
  tileCells: 64, // tile is tileCells square; period = tileCells * cell
  seed: null, // build-injected integer; null falls back to per-load random
};

export class MazeBackground {
  constructor(options = {}) {
    this.opts = { ...DEFAULTS, ...options };
    this.seed =
      this.opts.seed == null ? (Math.random() * 0xffffffff) | 0 : this.opts.seed | 0;
  }

  mount() {
    this.install();
  }

  destroy() {
    const root = document.documentElement;
    root.style.removeProperty("--maze-mask");
    root.style.removeProperty("--maze-tile");
    root.classList.remove("maze-ready");
  }

  // Pure function of position: no stored state, so nothing can reshuffle and an
  // arbitrarily long document costs nothing.
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

    // stroke is #fff because this is used as a MASK: only alpha matters, and the
    // visible colour comes from CSS.
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}">` +
      `<path fill="none" stroke="#fff" stroke-width="${lineWidth}" d="${d.join("")}"/>` +
      `</svg>`;

    return { uri: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`, px };
  }

  install() {
    const t0 = performance.now();
    const { uri, px } = this.buildTileUri();
    const root = document.documentElement;
    root.style.setProperty("--maze-mask", `url("${uri}")`);
    root.style.setProperty("--maze-tile", `${px}px`);
    root.classList.add("maze-ready");
    this.lastInstall = {
      ms: Math.round(performance.now() - t0),
      periodPx: px,
      bytes: uri.length,
      seed: this.seed,
    };
  }

  set(key, value) {
    this.opts[key] = value;
    if (key === "seed") this.seed = value | 0;
    this.install();
  }
}
