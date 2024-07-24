// TODO:
// - observe the attributes for changes?
// - add a pause on hover
// - fade in/out transitions
export class RotatingTagline extends HTMLElement {
  constructor() {
    super();

    this.period = 5000;
    if (this.hasAttribute("period")) {
      this.period = parseInt(this.getAttribute("period"), 10);
    }

    this.titleIdx = 0;
    if (this.hasAttribute("initial")) {
      this.titleIdx = parseInt(this.getAttribute("initial"), 10);
    }

    this.random = false;
    if (this.hasAttribute("random")) {
      this.random = true;
    }

    this.titles = [];
    try {
      this.titles = JSON.parse(this.getAttribute("taglines"));
    } catch (e) {
      console.error("Failed to parse titles", e);
    }
  }

  connectedCallback() {
    this.rotateTimer = setInterval(() => this.rotateTagline(), this.period);
    this.rotateTagline();
  }

  disconnectedCallback() {
    clearInterval(this.rotateTimer);
  }

  rotateTagline() {
    if (this.random) {
      this.titleIdx = Math.floor(Math.random() * this.titles.length);
    } else {
      this.titleIdx = (this.titleIdx + 1) % this.titles.length;
    }
    const title = this.titles[this.titleIdx];
    const titleEl = this.querySelector(".tagline");
    if (titleEl) titleEl.innerHTML = title;
  }
}

customElements.define("rotating-tagline", RotatingTagline);