export class RotatingTagline extends HTMLElement {
  constructor() {
    super();
    this.titles = [];
    try {
      this.titles = JSON.parse(this.getAttribute("titles"));
    } catch (e) {
      console.error("Failed to parse titles", e);
    }
  }

  connectedCallback() {
    const title = this.titles[Math.floor(Math.random() * this.titles.length)];
    this.innerHTML = /*html*/ `
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 250 20">
        <text lengthAdjust="spacing" fill="currentColor" y="16" textLength="240" x="5">
          ${title}
        </text>
      </svg>
    `;
  }
}

customElements.define("rotating-tagline", RotatingTagline);