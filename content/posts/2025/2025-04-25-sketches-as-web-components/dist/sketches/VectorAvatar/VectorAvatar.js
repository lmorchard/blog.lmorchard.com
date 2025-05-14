import { Container, Graphics } from "../../lib/bundles/pixi.js";
import BaseSketch from "../../lib/BaseSketch.js";
import { hslToRgb } from "../../lib/hslToRgb.js";
import {
  mkrng,
  rngRange,
  rngChoose,
  rngSign,
  rngTableSelector,
} from "../../lib/randoms.js";

const PI2 = Math.PI * 2.0;

let PARTICLE_TYPE_IDX = 0;
const AvatarParticleType = {
  RASTER: PARTICLE_TYPE_IDX++,
  SQUARE: PARTICLE_TYPE_IDX++,
  TRIANGLES: PARTICLE_TYPE_IDX++,
  BOUNCING_LINE: PARTICLE_TYPE_IDX++,
  BOUNCING_RASTER: PARTICLE_TYPE_IDX++,
  BOUNCING_VERTICAL: PARTICLE_TYPE_IDX++,
  BOUNCING_ANGLE_RASTER: PARTICLE_TYPE_IDX++,
  BOUNCING_ANGLE_VERTICAL: PARTICLE_TYPE_IDX++,
  HEAD_SPINNER: PARTICLE_TYPE_IDX++,
  BODY_SPINNER: PARTICLE_TYPE_IDX++,
};

const AvatarSpecies = {
  PLAID: {
    [AvatarParticleType.BOUNCING_RASTER]: 1.0,
    [AvatarParticleType.BOUNCING_VERTICAL]: 1.0,
  },
  RADIAL: {
    [AvatarParticleType.HEAD_SPINNER]: 2.0,
    [AvatarParticleType.BODY_SPINNER]: 3.0,
    [AvatarParticleType.RASTER]: 1.0,
  },
  RASTER: {
    [AvatarParticleType.RASTER]: 1.0,
  },
  ANGLER: {
    [AvatarParticleType.BOUNCING_ANGLE_RASTER]: 2.0,
    [AvatarParticleType.BOUNCING_ANGLE_VERTICAL]: 2.0,
  },
  SQUARES: {
    [AvatarParticleType.SQUARE]: 3.0,
    [AvatarParticleType.RASTER]: 1.0,
  },
  TRIANGLES: {
    [AvatarParticleType.TRIANGLES]: 1.0,
  },
};

let PARTICLE_RECORD_LENGTH = 0;
const AvatarParticleFields = {
  TYPE: PARTICLE_RECORD_LENGTH++,
  COLOR: PARTICLE_RECORD_LENGTH++,
  X1: PARTICLE_RECORD_LENGTH++,
  Y1: PARTICLE_RECORD_LENGTH++,
  DX1: PARTICLE_RECORD_LENGTH++,
  DY1: PARTICLE_RECORD_LENGTH++,
  X2: PARTICLE_RECORD_LENGTH++,
  Y2: PARTICLE_RECORD_LENGTH++,
  DX2: PARTICLE_RECORD_LENGTH++,
  DY2: PARTICLE_RECORD_LENGTH++,
};

const MIN_NUM_PARTICLES = 10;
const MAX_NUM_PARTICLES = 50;
const MIN_SPEED = 2;
const MAX_SPEED = 25;

class VectorAvatar extends BaseSketch {
  constructor() {
    super();

    this.seed = parseInt(Math.random() * 10000);
  }

  async init() {
    await super.init();

    const { width, height } = this.app.renderer;
    this.width = width;
    this.height = height;

    await this.initParticles();
    await this.initGraphics();
  }

  update() {
    this.updateParticles();
    this.updateGraphics();
  }

  async initParticles() {
    const { width, height } = this;

    const rng = mkrng(this.seed);

    const species = rngChoose(Object.keys(AvatarSpecies), rng);
    const particleTypeSelector = rngTableSelector(AvatarSpecies[species], rng);

    const hueStart = rng();
    const hueRange = rng() * 0.8;
    const saturation = rngRange(0.3, 0.6, rng);
    const lightness = rngRange(0.3, 0.6, rng);

    this.numParticles = Math.floor(
      rngRange(MIN_NUM_PARTICLES, MAX_NUM_PARTICLES, rng)
    );

    const particles = [];
    for (let idx = 0; idx < this.numParticles; idx++) {
      const hue = (hueStart + rng() * hueRange) % 1.0;
      const color = hslToRgb(hue, saturation, lightness);
      particles.push(
        particleTypeSelector(),
        color,
        rngRange(0, width, rng),
        rngRange(0, height, rng),
        rngRange(MIN_SPEED, MAX_SPEED, rng) * rngSign(rng),
        rngRange(MIN_SPEED, MAX_SPEED, rng) * rngSign(rng),
        rngRange(0, width, rng),
        rngRange(0, height, rng),
        rngRange(MIN_SPEED, MAX_SPEED, rng) * rngSign(rng),
        rngRange(MIN_SPEED, MAX_SPEED, rng) * rngSign(rng)
      );
    }
    this.particles = new Float32Array(particles);
  }

  async initGraphics() {
    const { width, height } = this;

    const g = new Container();
    this.stage.addChild(g);

    const gTexture = new Graphics();
    g.addChild(gTexture);
    gTexture.x = 0 - width / 2;
    gTexture.y = 0 - height / 2;
    this.g = gTexture;

    const gMask = new Graphics();
    gTexture.addChild(gMask);
    gTexture.mask = gMask;

    gMask.clear();

    const hWidth = width / 2;

    // head portion of mask
    gMask.poly(
      this.ellipsePolygon(
        hWidth,
        height * 0.25,
        height * 0.25,
        height * 0.25,
        12,
        0,
        PI2
      )
    );

    // body portion of mask
    gMask.poly(
      this.ellipsePolygon(
        hWidth,
        height,
        hWidth,
        height * 0.6,
        12,
        Math.PI,
        PI2
      )
    );

    gMask.fill(0xffffff);
    gMask.stroke({ width: 1.5, color: 0xffffff, alpha: 1 });
  }

  updateParticles() {
    const deltaSec = this.app.ticker.deltaMS / 1000.0;

    const { numParticles, particles } = this;

    const updates = [
      ["width", AvatarParticleFields.X1, AvatarParticleFields.DX1],
      ["width", AvatarParticleFields.X2, AvatarParticleFields.DX2],
      ["height", AvatarParticleFields.Y1, AvatarParticleFields.DY1],
      ["height", AvatarParticleFields.Y2, AvatarParticleFields.DY2],
    ];
    for (let idx = 0; idx < numParticles; idx++) {
      const ptr = idx * PARTICLE_RECORD_LENGTH;
      for (let [boundName, varyingOffset, speedOffset] of updates) {
        let speed = particles[ptr + speedOffset];
        let varying = particles[ptr + varyingOffset] + speed * deltaSec;
        if (varying < 0) {
          varying = 0;
          speed = speed * -1;
        } else if (varying > this[boundName]) {
          varying = this[boundName];
          speed = speed * -1;
        }
        particles[ptr + speedOffset] = speed;
        particles[ptr + varyingOffset] = varying;
      }
    }
  }

  updateGraphics() {
    const { numParticles, particles, width, height } = this;

    const hWidth = width / 2;

    const { g } = this;

    g.clear();

    for (let idx = 0; idx < numParticles; idx++) {
      const [type, color, x1, y1, dx1, dy1, x2, y2, dx2, dy2] =
        particles.subarray(
          idx * PARTICLE_RECORD_LENGTH,
          (idx + 1) * PARTICLE_RECORD_LENGTH
        );

      const x1m = width - x1;
      const y1m = height - y1;
      const x2m = width - x2;
      const y2m = height - y2;

      switch (type) {
        case AvatarParticleType.RASTER:
          g.moveTo(0, y1);
          g.lineTo(width, y1);
          break;
        case AvatarParticleType.SQUARE:
          g.moveTo(x1, y1);
          g.lineTo(x2, y1);
          g.lineTo(x2, y2);
          g.lineTo(x1, y2);
          g.lineTo(x1, y1);
          break;
        case AvatarParticleType.TRIANGLES:
          g.moveTo(x1, y1);
          g.lineTo(x1m, y1);
          g.lineTo(x1, y2);
          g.lineTo(x1m, y2);
          g.lineTo(x1, y1);
          break;
        case AvatarParticleType.BOUNCING_LINE:
          g.moveTo(x1, y1);
          g.lineTo(x2, y2);
          break;
        case AvatarParticleType.BOUNCING_RASTER:
          g.moveTo(0, y1);
          g.lineTo(width, y1);
          break;
        case AvatarParticleType.BOUNCING_VERTICAL:
          g.moveTo(x1, 0);
          g.lineTo(x1, height);
          break;
        case AvatarParticleType.BOUNCING_ANGLE_RASTER:
          g.moveTo(0, y1);
          g.lineTo(width, y2);
          break;
        case AvatarParticleType.BOUNCING_ANGLE_VERTICAL:
          g.moveTo(x1, 0);
          g.lineTo(x2, height);
          break;
        case AvatarParticleType.HEAD_SPINNER:
          this.drawSpinner(
            g,
            PI2 * (x2 / width),
            hWidth,
            height * 0.25,
            width * 0.25,
            0
          );
          break;
        case AvatarParticleType.BODY_SPINNER:
          this.drawSpinner(
            g,
            PI2 * (x2 / width),
            hWidth,
            height * 0.66,
            width * 0.5,
            0
          );
          break;
      }

      g.stroke({
        width: 1.5,
        color,
        alpha: 1.0,
      });
    }
  }

  drawSpinner(g, angle, cx, cy, dx, dy) {
    const x = Math.cos(angle) * dx - Math.sin(angle) * dy + cx;
    const y = Math.sin(angle) * dx - Math.cos(angle) * dy + cy;
    const x2 =
      Math.cos(Math.PI + angle) * dx - Math.sin(Math.PI + angle) * dy + cx;
    const y2 =
      Math.sin(Math.PI + angle) * dx - Math.cos(Math.PI + angle) * dy + cy;
    g.moveTo(x, y);
    g.lineTo(x2, y2);
  }

  ellipsePolygon(
    centerX,
    centerY,
    radiusX,
    radiusY,
    numPoints,
    angleStart,
    angleEnd
  ) {
    const angleStep = (angleEnd - angleStart) / numPoints;
    const points = [];
    for (let angle = angleStart; angle <= angleEnd; angle += angleStep) {
      const x = radiusX * Math.cos(angle) + centerX;
      const y = radiusY * Math.sin(angle) + centerY;
      points.push(x, y);
    }
    return points;
  }
}

customElements.define("vector-avatar", VectorAvatar);
