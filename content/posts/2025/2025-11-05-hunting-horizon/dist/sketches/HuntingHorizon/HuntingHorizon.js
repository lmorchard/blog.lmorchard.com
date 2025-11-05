import p5 from "../../lib/bundles/p5.js";

class HuntingHorizon extends HTMLElement {
  static get observedAttributes() {
    return [
      'seed',
      'bird-count',
      'fish-count',
      'hunt-speed',
      'fish-speed',
      'turbulence',
      'trail-fade',
      'splash-intensity',
      'sink-speed',
      'feeding-speed',
      'drown-chance'
    ];
  }

  constructor() {
    super();

    // Default parameters
    this.params = {
      seed: 12345,
      birdCount: 20,
      fishCount: 80,
      huntSpeed: 4,
      fishSpeed: 1.5,
      turbulence: 0.6,
      trailFade: 0.08,
      splashIntensity: 15,
      sinkSpeed: 0.05,
      feedingSpeed: 0.3,
      drownChance: 0.08
    };

    this.defaultParams = {...this.params};

    // Simulation state
    this.birds = [];
    this.fish = [];
    this.splashes = [];
    this.escapingBirds = [];
    this.stars = [];
    this.deadBirds = [];
    this.jumpingFish = [];
    this.moon = null;
    this.INTERFACE_Y = 600; // Water surface at middle of 1200px canvas
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    // Convert kebab-case to camelCase
    const paramName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const value = parseFloat(newValue);

    if (!isNaN(value)) {
      this.params[paramName] = value;

      // If p5 instance exists, reinitialize if needed
      if (this.p5Instance) {
        if (paramName === 'birdCount' || paramName === 'fishCount' || paramName === 'seed') {
          this.initializeSystem();
        }
      }
    }
  }

  connectedCallback() {
    // Parse initial attributes before creating p5 instance
    this.constructor.observedAttributes.forEach(attr => {
      if (this.hasAttribute(attr)) {
        const paramName = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        const value = parseFloat(this.getAttribute(attr));
        if (!isNaN(value)) {
          this.params[paramName] = value;
        }
      }
    });
    // Create p5 instance in instance mode
    this.p5Instance = new p5((p) => {
      this.p = p;

      // Setup function
      p.setup = () => {
        let canvas = p.createCanvas(1200, 1200);
        canvas.parent(this);
        this.initializeSystem();
      };

      // Draw function
      p.draw = () => {
        // Subtle fade for trail effect
        p.fill(15, 20, 30, this.params.trailFade * 255);
        p.noStroke();
        p.rect(0, 0, p.width, p.height);

        // Draw moon
        this.drawMoon();

        // Draw twinkling stars in sky
        for (let s of this.stars) {
          s.update();
          s.draw();
        }

        // Draw depth gradient in water
        this.drawDepthGradient();

        // Draw watery ripple effect in lower half
        this.drawWaterRipples();

        // Update and draw fish
        for (let f of this.fish) {
          f.flock(this.fish);

          // Make fish flee from recent splashes
          for (let s of this.splashes) {
            if (s.lifespan > 200) {
              f.fleeFrom(s.pos.x, s.pos.y);
            }
          }

          // Make fish attracted to dead birds (feeding)
          for (let d of this.deadBirds) {
            f.attractTo(d.pos.x, d.pos.y);
          }

          // Occasionally jump at the interface
          if (f.pos.y < this.INTERFACE_Y + 150 && f.pos.y > this.INTERFACE_Y - 20 && p.random() < 0.003) {
            this.jumpingFish.push(new JumpingFish(this, f.pos.x, f.pos.y, f.vel.copy()));
          }

          f.update();
          f.draw();
        }

        // Update and draw jumping fish
        for (let i = this.jumpingFish.length - 1; i >= 0; i--) {
          this.jumpingFish[i].update();
          this.jumpingFish[i].draw();

          if (this.jumpingFish[i].isDone()) {
            this.jumpingFish.splice(i, 1);
          }
        }

        // Update and draw birds
        for (let i = this.birds.length - 1; i >= 0; i--) {
          let b = this.birds[i];
          b.hunt(this.fish);
          b.update();
          b.draw();

          // Occasionally drown when hunting underwater
          if (b.pos.y > this.INTERFACE_Y + 100 && p.random() < (this.params.drownChance / 100)) {
            this.splashes.push(new DrowningSplash(this, b.pos.x, b.pos.y));
            this.deadBirds.push(new DeadBird(this, b.pos.x, b.pos.y));
            this.birds.splice(i, 1);
            this.birds.push(new Bird(this));
            continue;
          }

          // Check for successful hunts
          if (b.pos.y > this.INTERFACE_Y) {
            for (let j = this.fish.length - 1; j >= 0; j--) {
              let f = this.fish[j];
              let d = p5.Vector.dist(b.pos, f.pos);
              if (d < 20) {
                // Successful catch!
                this.splashes.push(new Splash(this, f.pos.x, f.pos.y));
                this.fish.splice(j, 1);
                this.fish.push(new Fish(this));

                // Create escaping bird with catch
                this.escapingBirds.push(new EscapingBird(this, b.pos.x, b.pos.y, b.vel.copy()));

                this.birds.splice(i, 1);
                this.birds.push(new Bird(this));
                break;
              }
            }
          }

          // Respawn birds that dive too deep
          if (b.pos.y > p.height + 50) {
            this.birds.splice(i, 1);
            this.birds.push(new Bird(this));
          }
        }

        // Update and draw dead birds
        for (let i = this.deadBirds.length - 1; i >= 0; i--) {
          this.deadBirds[i].update();
          this.deadBirds[i].draw();

          if (this.deadBirds[i].isConsumed()) {
            this.deadBirds.splice(i, 1);
          }
        }

        // Update and draw escaping birds
        for (let i = this.escapingBirds.length - 1; i >= 0; i--) {
          this.escapingBirds[i].update();
          this.escapingBirds[i].draw();

          if (this.escapingBirds[i].isOffScreen()) {
            this.escapingBirds.splice(i, 1);
          }
        }

        // Update and draw splashes
        for (let i = this.splashes.length - 1; i >= 0; i--) {
          this.splashes[i].update();
          this.splashes[i].draw();
          if (this.splashes[i].isDead()) {
            this.splashes.splice(i, 1);
          }
        }
      };
    });
  }

  initializeSystem() {
    const p = this.p;
    p.randomSeed(this.params.seed);
    p.noiseSeed(this.params.seed);

    this.birds = [];
    this.fish = [];
    this.splashes = [];
    this.escapingBirds = [];
    this.stars = [];
    this.deadBirds = [];
    this.jumpingFish = [];

    // Initialize moon
    this.moon = {
      startX: p.width * 0.2,
      endX: p.width * 0.85,
      arcHeight: 180,
      size: 80,
      speed: 0.00008
    };

    // Initialize stars (only in upper portion)
    for (let i = 0; i < 150; i++) {
      this.stars.push(new Star(this));
    }

    // Initialize birds (start above water)
    for (let i = 0; i < this.params.birdCount; i++) {
      this.birds.push(new Bird(this));
    }

    // Initialize fish (start below interface)
    for (let i = 0; i < this.params.fishCount; i++) {
      this.fish.push(new Fish(this));
    }

    // Start with clean canvas
    p.background(15, 20, 30);
  }

  drawMoon() {
    const p = this.p;
    const moon = this.moon;

    // Calculate moon position along arc
    let progress = (p.frameCount * moon.speed) % 1.0;
    let moonX = p.lerp(moon.startX, moon.endX, progress);

    // Create arc path (parabola reaching peak at middle)
    let arcProgress = p.sin(progress * p.PI);
    let moonY = moon.arcHeight - (arcProgress * 80);

    // Draw soft glowing moon
    p.noStroke();

    // Outer glow
    for (let i = 0; i < 3; i++) {
      let size = moon.size + (i * 15);
      let alpha = p.map(i, 0, 3, 30, 0);
      p.fill(180, 190, 210, alpha);
      p.ellipse(moonX, moonY, size, size);
    }

    // Main moon body
    p.fill(200, 210, 230, 180);
    p.ellipse(moonX, moonY, moon.size, moon.size);

    // Moon surface detail (subtle craters)
    p.fill(180, 190, 210, 60);
    p.ellipse(moonX - 15, moonY - 10, 20, 20);
    p.ellipse(moonX + 10, moonY + 5, 15, 15);
    p.ellipse(moonX - 5, moonY + 15, 12, 12);
  }

  drawDepthGradient() {
    const p = this.p;
    p.noStroke();
    for (let y = this.INTERFACE_Y; y < p.height; y += 2) {
      let depth = y - this.INTERFACE_Y;
      let maxDepth = p.height - this.INTERFACE_Y;
      let alpha = p.map(depth, 0, maxDepth, 0, 40);
      p.fill(5, 10, 20, alpha);
      p.rect(0, y, p.width, 2);
    }
  }

  drawWaterRipples() {
    const p = this.p;
    let spacing = 8;

    for (let y = this.INTERFACE_Y + 20; y < p.height; y += spacing) {
      p.stroke(60, 120, 160, 15);
      p.strokeWeight(1);

      p.noFill();
      p.beginShape();
      for (let x = 0; x <= p.width; x += 4) {
        let wave1 = p.sin((x * 0.01) + (p.frameCount * 0.02)) * 2;
        let wave2 = p.sin((x * 0.015) + (y * 0.02) + (p.frameCount * 0.015)) * 1.5;
        let wave3 = p.sin((x * 0.008) - (p.frameCount * 0.01)) * 1;

        let offset = wave1 + wave2 + wave3;
        p.vertex(x, y + offset);
      }
      p.endShape();
    }

    // Add occasional stronger ripple lines
    for (let y = this.INTERFACE_Y + 40; y < p.height; y += spacing * 4) {
      p.stroke(80, 140, 180, 25);
      p.strokeWeight(0.5);

      p.noFill();
      p.beginShape();
      for (let x = 0; x <= p.width; x += 4) {
        let wave = p.sin((x * 0.012) + (y * 0.015) + (p.frameCount * 0.025)) * 3;
        p.vertex(x, y + wave);
      }
      p.endShape();
    }
  }

  updateParam(paramName, value) {
    this.params[paramName] = parseFloat(value);

    // Reinitialize when population counts change
    if (paramName === 'birdCount' || paramName === 'fishCount') {
      this.initializeSystem();
    }
  }

  updateSeed(newSeed) {
    this.params.seed = newSeed;
    this.initializeSystem();
  }

  resetParameters() {
    this.params = {...this.defaultParams};
    this.initializeSystem();
  }
}

// ═══════════════════════════════════════════════════════════════════════
// BIRD CLASS
// ═══════════════════════════════════════════════════════════════════════

class Bird {
  constructor(sketch) {
    this.sketch = sketch;
    const p = sketch.p;
    this.pos = p.createVector(p.random(p.width), p.random(-100, -20));
    this.vel = p.createVector(0, 0);
    this.acc = p.createVector(0, 0);
    this.targetFish = null;
    this.maxSpeed = sketch.params.huntSpeed;
    this.maxForce = 0.3;
    this.history = [];
  }

  hunt(fishArray) {
    const p = this.sketch.p;
    if (fishArray.length === 0) return;

    // Select target fish if none assigned
    if (!this.targetFish || !fishArray.includes(this.targetFish)) {
      this.targetFish = p.random(fishArray);
    }

    // Calculate interception vector
    let target = this.targetFish.pos.copy();
    let desired = p5.Vector.sub(target, this.pos);

    // Add noise-based turbulence
    let noiseVal = p.noise(this.pos.x * 0.01, this.pos.y * 0.01, p.frameCount * 0.01);
    let turbAngle = p.map(noiseVal, 0, 1, -p.PI, p.PI) * this.sketch.params.turbulence;
    desired.rotate(turbAngle);

    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);

    // Gravity-like acceleration when diving
    if (this.pos.y > 100) {
      this.applyForce(p.createVector(0, 0.15));
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Trail history
    this.history.push(this.pos.copy());
    if (this.history.length > 15) {
      this.history.shift();
    }
  }

  draw() {
    const p = this.sketch.p;
    const INTERFACE_Y = this.sketch.INTERFACE_Y;

    // Draw trail with velocity-based color
    for (let i = 0; i < this.history.length - 1; i++) {
      let alpha = p.map(i, 0, this.history.length, 0, 180);

      // Sky colors (bright blues/whites)
      if (this.history[i].y < INTERFACE_Y) {
        p.stroke(200, 220, 255, alpha);
      } else {
        // Water colors when penetrating
        p.stroke(150, 200, 255, alpha);
      }

      p.strokeWeight(p.map(i, 0, this.history.length, 1, 3));
      p.line(this.history[i].x, this.history[i].y,
           this.history[i + 1].x, this.history[i + 1].y);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════
// STAR CLASS
// ═══════════════════════════════════════════════════════════════════════

class Star {
  constructor(sketch) {
    this.sketch = sketch;
    const p = sketch.p;
    this.x = p.random(p.width);
    this.y = p.random(0, sketch.INTERFACE_Y - 50);
    this.baseSize = p.random(0.8, 2.2);
    this.brightness = p.random(100, 255);
    this.noiseOffset = p.random(1000);
    this.twinkleSpeed = p.random(0.005, 0.015);
  }

  update() {
    const p = this.sketch.p;
    let noiseVal = p.noise(this.noiseOffset + p.frameCount * this.twinkleSpeed);
    this.brightness = p.map(noiseVal, 0, 1, 80, 255);
  }

  draw() {
    const p = this.sketch.p;
    p.noStroke();
    p.fill(220, 230, 255, this.brightness * 0.6);

    let size = this.baseSize * p.map(this.brightness, 80, 255, 0.7, 1.2);
    p.ellipse(this.x, this.y, size, size);
  }
}

// ═══════════════════════════════════════════════════════════════════════
// ESCAPING BIRD CLASS
// ═══════════════════════════════════════════════════════════════════════

class EscapingBird {
  constructor(sketch, x, y, initialVel) {
    this.sketch = sketch;
    const p = sketch.p;
    this.pos = p.createVector(x, y);
    this.vel = initialVel;
    this.acc = p.createVector(0, 0);
    this.maxSpeed = sketch.params.huntSpeed * 1.3;
    this.maxForce = 0.4;
    this.history = [];
    this.noiseOffset = p.random(1000);
  }

  update() {
    const p = this.sketch.p;

    // Strong upward force
    let upward = p.createVector(0, -0.5);
    this.applyForce(upward);

    // Noise-based horizontal perturbation
    let noiseVal = p.noise(this.pos.x * 0.008, this.pos.y * 0.008, p.frameCount * 0.02 + this.noiseOffset);
    let noiseForce = p.createVector(
      p.map(noiseVal, 0, 1, -0.3, 0.3) * this.sketch.params.turbulence,
      0
    );
    this.applyForce(noiseForce);

    // Apply velocity changes
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Trail history
    this.history.push(this.pos.copy());
    if (this.history.length > 20) {
      this.history.shift();
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  draw() {
    const p = this.sketch.p;

    // Draw trail with warm success colors
    for (let i = 0; i < this.history.length - 1; i++) {
      let alpha = p.map(i, 0, this.history.length, 0, 200);

      let r = p.map(i, 0, this.history.length, 200, 255);
      let g = p.map(i, 0, this.history.length, 140, 200);
      let b = p.map(i, 0, this.history.length, 80, 120);

      p.stroke(r, g, b, alpha);
      p.strokeWeight(p.map(i, 0, this.history.length, 1, 3.5));
      p.line(this.history[i].x, this.history[i].y,
           this.history[i + 1].x, this.history[i + 1].y);
    }
  }

  isOffScreen() {
    const p = this.sketch.p;
    return this.pos.y < -100 || this.pos.x < -100 || this.pos.x > p.width + 100;
  }
}

// ═══════════════════════════════════════════════════════════════════════
// DEAD BIRD CLASS
// ═══════════════════════════════════════════════════════════════════════

class DeadBird {
  constructor(sketch, x, y) {
    this.sketch = sketch;
    const p = sketch.p;
    this.pos = p.createVector(x, y);
    this.vel = p.createVector(0, sketch.params.sinkSpeed);
    this.mass = 100;
    this.maxMass = 100;
  }

  update() {
    const p = this.sketch.p;

    // Slowly sink
    this.pos.add(this.vel);
    this.vel.y += this.sketch.params.sinkSpeed * 0.2;

    // Stop at bottom
    if (this.pos.y > p.height - 50) {
      this.vel.y = 0;
      this.pos.y = p.height - 50;
    }

    // Get consumed by nearby fish
    this.mass -= this.sketch.params.feedingSpeed;
  }

  draw() {
    const p = this.sketch.p;

    // Draw dead bird as a dull blue-gray mass
    let alpha = p.map(this.mass, 0, this.maxMass, 0, 150);
    p.noStroke();

    p.fill(100, 120, 140, alpha);

    let size = p.map(this.mass, 0, this.maxMass, 3, 12);
    p.ellipse(this.pos.x, this.pos.y, size, size);

    // Faint sinking trail
    p.fill(80, 100, 120, alpha * 0.3);
    p.ellipse(this.pos.x, this.pos.y - 5, size * 0.7, size * 0.7);
    p.ellipse(this.pos.x, this.pos.y - 10, size * 0.4, size * 0.4);
  }

  isConsumed() {
    return this.mass <= 0;
  }
}

// ═══════════════════════════════════════════════════════════════════════
// JUMPING FISH CLASS
// ═══════════════════════════════════════════════════════════════════════

class JumpingFish {
  constructor(sketch, x, y, initialVel) {
    this.sketch = sketch;
    const p = sketch.p;
    this.pos = p.createVector(x, y);
    this.vel = p.createVector(initialVel.x * 0.8, -6);
    this.acc = p.createVector(0, 0.15);
    this.history = [];
    this.lifespan = 90;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan--;

    // Trail history
    this.history.push(this.pos.copy());
    if (this.history.length > 8) {
      this.history.shift();
    }
  }

  draw() {
    const p = this.sketch.p;
    const INTERFACE_Y = this.sketch.INTERFACE_Y;

    // Draw jumping arc with bright cyan
    for (let i = 0; i < this.history.length - 1; i++) {
      let alpha = p.map(i, 0, this.history.length, 0, 150);

      // Bright cyan when in air, dimmer in water
      if (this.history[i].y < INTERFACE_Y) {
        p.stroke(120, 220, 255, alpha);
      } else {
        p.stroke(80, 180, 210, alpha);
      }

      p.strokeWeight(p.map(i, 0, this.history.length, 1, 2.5));
      p.line(this.history[i].x, this.history[i].y,
           this.history[i + 1].x, this.history[i + 1].y);
    }

    // Small splash when re-entering water
    if (this.pos.y > INTERFACE_Y && this.vel.y > 0 && this.lifespan > 50) {
      p.stroke(100, 200, 220, 100);
      p.strokeWeight(1);
      p.noFill();
      p.ellipse(this.pos.x, INTERFACE_Y, 15, 8);
    }
  }

  isDone() {
    return this.lifespan <= 0 || this.pos.y > this.sketch.INTERFACE_Y + 100;
  }
}

// ═══════════════════════════════════════════════════════════════════════
// FISH CLASS
// ═══════════════════════════════════════════════════════════════════════

class Fish {
  constructor(sketch) {
    this.sketch = sketch;
    const p = sketch.p;
    this.pos = p.createVector(p.random(p.width), p.random(sketch.INTERFACE_Y + 50, p.height - 50));
    this.vel = p.createVector(p.random(-1, 1), p.random(-1, 1));
    this.acc = p.createVector(0, 0);
    this.maxSpeed = sketch.params.fishSpeed;
    this.maxForce = 0.2;
    this.history = [];
    this.panicLevel = 0;
  }

  flock(fishArray) {
    const p = this.sketch.p;

    // When panicked, reduce flocking and increase separation
    let panicMult = 1 - (this.panicLevel * 0.7);

    let separation = this.separate(fishArray);
    let alignment = this.align(fishArray);
    let cohesion = this.cohesion(fishArray);

    // Weight the forces
    separation.mult(1.5 + (this.panicLevel * 2));
    alignment.mult(1.0 * panicMult);
    cohesion.mult(1.0 * panicMult);

    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);

    // Avoid surface
    if (this.pos.y < this.sketch.INTERFACE_Y + 30) {
      let avoid = p.createVector(0, 1);
      avoid.mult(0.5);
      this.applyForce(avoid);
    }
  }

  fleeFrom(x, y) {
    const p = this.sketch.p;

    // Make fish panic and flee from a specific point
    let distance = p.dist(this.pos.x, this.pos.y, x, y);
    if (distance < 150) {
      this.panicLevel = p.map(distance, 0, 150, 1.0, 0.3);

      // Strong repulsion force
      let flee = p.createVector(this.pos.x - x, this.pos.y - y);
      flee.normalize();
      flee.mult(2.5 * this.panicLevel);
      this.applyForce(flee);
    }
  }

  attractTo(x, y) {
    const p = this.sketch.p;

    // Make fish attracted to food
    let distance = p.dist(this.pos.x, this.pos.y, x, y);
    if (distance < 200 && distance > 60) {
      let attractionStrength = p.map(distance, 60, 200, 0.3, 0.2);

      // Gentle attraction force
      let attract = p.createVector(x - this.pos.x, y - this.pos.y);
      attract.normalize();
      attract.mult(attractionStrength);
      this.applyForce(attract);
    } else if (distance <= 60 && distance > 10) {
      // Orbit zone - strong circular swooping force
      let tangent = p.createVector(-(y - this.pos.y), x - this.pos.x);
      tangent.normalize();

      let orbitalStrength = p.map(distance, 10, 60, 1.2, 0.6);
      tangent.mult(orbitalStrength);
      this.applyForce(tangent);

      // Also add slight inward force to maintain orbit
      let inward = p.createVector(x - this.pos.x, y - this.pos.y);
      inward.normalize();
      inward.mult(0.15);
      this.applyForce(inward);
    }
  }

  separate(fishArray) {
    const p = this.sketch.p;
    let desiredSeparation = 30;
    let steer = p.createVector(0, 0);
    let count = 0;

    for (let other of fishArray) {
      let d = p5.Vector.dist(this.pos, other.pos);
      if ((d > 0) && (d < desiredSeparation)) {
        let diff = p5.Vector.sub(this.pos, other.pos);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    }

    if (count > 0) {
      steer.div(count);
      steer.setMag(this.maxSpeed);
      steer.sub(this.vel);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  align(fishArray) {
    const p = this.sketch.p;
    let neighborDist = 50;
    let sum = p.createVector(0, 0);
    let count = 0;

    for (let other of fishArray) {
      let d = p5.Vector.dist(this.pos, other.pos);
      if ((d > 0) && (d < neighborDist)) {
        sum.add(other.vel);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      sum.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.vel);
      steer.limit(this.maxForce);
      return steer;
    }
    return p.createVector(0, 0);
  }

  cohesion(fishArray) {
    const p = this.sketch.p;
    let neighborDist = 50;
    let sum = p.createVector(0, 0);
    let count = 0;

    for (let other of fishArray) {
      let d = p5.Vector.dist(this.pos, other.pos);
      if ((d > 0) && (d < neighborDist)) {
        sum.add(other.pos);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    }
    return p.createVector(0, 0);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    const p = this.sketch.p;

    // Gradually calm down from panic
    this.panicLevel *= 0.97;

    // Increase speed when panicked
    let currentMaxSpeed = this.maxSpeed * (1 + this.panicLevel * 1.5);

    this.vel.add(this.acc);
    this.vel.limit(currentMaxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Boundaries - stay in water
    let teleported = false;
    if (this.pos.x < 0) {
      this.pos.x = p.width;
      teleported = true;
    }
    if (this.pos.x > p.width) {
      this.pos.x = 0;
      teleported = true;
    }
    if (this.pos.y < this.sketch.INTERFACE_Y + 20) {
      this.pos.y = this.sketch.INTERFACE_Y + 20;
      teleported = true;
    }
    if (this.pos.y > p.height) {
      this.pos.y = this.sketch.INTERFACE_Y + 50 + p.random(-20, 20);
      teleported = true;
    }

    // Clear history when teleporting
    if (teleported) {
      this.history = [];
    }

    // Trail history
    this.history.push(this.pos.copy());
    if (this.history.length > 10) {
      this.history.shift();
    }
  }

  draw() {
    const p = this.sketch.p;

    // Draw subtle trail (brighter when panicked)
    for (let i = 0; i < this.history.length - 1; i++) {
      let baseAlpha = p.map(i, 0, this.history.length, 0, 100);
      let alpha = baseAlpha * (1 + this.panicLevel * 0.8);

      // Brighter, more yellow-green when panicked
      let r = 100 + (this.panicLevel * 50);
      let g = 200 + (this.panicLevel * 40);
      let b = 220 - (this.panicLevel * 40);

      p.stroke(r, g, b, alpha);
      p.strokeWeight(1 + (this.panicLevel * 0.5));
      p.line(this.history[i].x, this.history[i].y,
           this.history[i + 1].x, this.history[i + 1].y);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════
// SPLASH CLASS
// ═══════════════════════════════════════════════════════════════════════

class Splash {
  constructor(sketch, x, y) {
    this.sketch = sketch;
    const p = sketch.p;
    this.pos = p.createVector(x, y);
    this.particles = [];
    this.lifespan = 255;

    // Create burst particles
    for (let i = 0; i < sketch.params.splashIntensity; i++) {
      let angle = p.random(p.TWO_PI);
      let speed = p.random(1, 4);
      let vel = p.createVector(p.cos(angle) * speed, p.sin(angle) * speed);
      this.particles.push({
        pos: this.pos.copy(),
        vel: vel
      });
    }
  }

  update() {
    this.lifespan -= 8;
    for (let particle of this.particles) {
      particle.pos.add(particle.vel);
      particle.vel.mult(0.95);
    }
  }

  draw() {
    const p = this.sketch.p;

    for (let particle of this.particles) {
      let alpha = p.map(this.lifespan, 0, 255, 0, 200);
      p.stroke(255, 255, 255, alpha);
      p.strokeWeight(2);
      p.point(particle.pos.x, particle.pos.y);
    }
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

// ═══════════════════════════════════════════════════════════════════════
// DROWNING SPLASH CLASS
// ═══════════════════════════════════════════════════════════════════════

class DrowningSplash {
  constructor(sketch, x, y) {
    this.sketch = sketch;
    const p = sketch.p;
    this.pos = p.createVector(x, y);
    this.particles = [];
    this.lifespan = 255;
    this.rings = [];

    // Create slower, darker burst particles
    for (let i = 0; i < sketch.params.splashIntensity * 2; i++) {
      let angle = p.random(p.TWO_PI);
      let speed = p.random(0.5, 3);
      let vel = p.createVector(p.cos(angle) * speed, p.sin(angle) * speed);
      this.particles.push({
        pos: this.pos.copy(),
        vel: vel
      });
    }

    // Create expanding rings
    for (let i = 0; i < 3; i++) {
      this.rings.push({
        radius: 0,
        maxRadius: 60 + (i * 20),
        speed: 1.0 - (i * 0.2)
      });
    }
  }

  update() {
    this.lifespan -= 6;
    for (let particle of this.particles) {
      particle.pos.add(particle.vel);
      particle.vel.mult(0.92);
    }

    // Expand rings
    for (let ring of this.rings) {
      ring.radius += ring.speed;
    }
  }

  draw() {
    const p = this.sketch.p;

    // Draw expanding rings
    for (let ring of this.rings) {
      let alpha = p.map(this.lifespan, 0, 255, 0, 80) * p.map(ring.radius, 0, ring.maxRadius, 1, 0);
      p.stroke(100, 140, 160, alpha);
      p.strokeWeight(2);
      p.noFill();
      p.ellipse(this.pos.x, this.pos.y, ring.radius * 2, ring.radius * 2);
    }

    // Draw particles
    for (let particle of this.particles) {
      let alpha = p.map(this.lifespan, 0, 255, 0, 150);
      p.stroke(110, 130, 150, alpha);
      p.strokeWeight(1.5);
      p.point(particle.pos.x, particle.pos.y);
    }
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

customElements.define("hunting-horizon", HuntingHorizon);
