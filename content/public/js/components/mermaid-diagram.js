class MermaidDiagram extends HTMLElement {
  constructor() {
    super();

    // Inject styles once for all mermaid-diagram instances
    if (!MermaidDiagram.stylesInjected) {
      const style = document.createElement("style");
      style.textContent = `
        mermaid-diagram {
          display: block;
          width: 100%;
        }
        mermaid-diagram svg {
          max-width: 100%;
          height: auto;
        }
      `;
      document.head.appendChild(style);
      MermaidDiagram.stylesInjected = true;
    }
  }

  async connectedCallback() {
    // Store the diagram source from text content
    this.diagramSource = this.textContent.trim();

    // Clear the content while rendering
    this.textContent = "";

    // Render the diagram once
    await this.render();

    // Listen for theme changes from theme-selector component
    this.themeChangeListener = () => this.updateTheme();
    window.addEventListener("themechange", this.themeChangeListener);
  }

  disconnectedCallback() {
    // Clean up event listener
    if (this.themeChangeListener) {
      window.removeEventListener("themechange", this.themeChangeListener);
    }
  }

  async render() {
    try {
      // Lazy load the beautiful-mermaid library (relative to this component file)
      const bundlePath = new URL("../vendor/bundles/beautiful-mermaid.js", import.meta.url).href;
      const { renderMermaid } = await import(bundlePath);

      // Build theme options with all supported attributes
      const themeOptions = this.getThemeOptions();

      // Font family
      const font = this.getAttribute("font");
      if (font) {
        themeOptions.font = font;
      }

      // Transparent background
      if (this.hasAttribute("transparent")) {
        themeOptions.transparent = true;
      }

      // Render the diagram
      const svg = await renderMermaid(this.diagramSource, themeOptions);

      // Insert the SVG
      this.innerHTML = svg;

      // Remove explicit width/height attributes to allow CSS control
      const svgElement = this.querySelector("svg");
      if (svgElement) {
        svgElement.removeAttribute("width");
        svgElement.removeAttribute("height");
      }

      // Add a class for styling
      this.classList.add("rendered");
    } catch (error) {
      console.error("Failed to render Mermaid diagram:", error);
      this.innerHTML = `<pre class="error">Failed to render diagram: ${error.message}</pre>`;
      this.classList.add("error");
    }
  }

  updateTheme() {
    // Update CSS custom properties on the SVG instead of re-rendering
    const svgElement = this.querySelector("svg");
    if (!svgElement) return;

    const themeOptions = this.getThemeOptions();

    // Update CSS custom properties
    svgElement.style.setProperty("--bg", themeOptions.bg);
    svgElement.style.setProperty("--fg", themeOptions.fg);

    // Optional color overrides
    const optionalColors = ["line", "accent", "muted", "surface", "border"];
    for (const color of optionalColors) {
      if (themeOptions[color]) {
        svgElement.style.setProperty(`--${color}`, themeOptions[color]);
      }
    }
  }

  getThemeOptions() {
    // Get theme colors (with fallbacks)
    const bg = this.getAttribute("bg") || this.getComputedColor("background-color") || "#ffffff";
    const fg = this.getAttribute("fg") || this.getComputedColor("color") || "#000000";

    const themeOptions = { bg, fg };

    // Optional color overrides
    const optionalColors = ["line", "accent", "muted", "surface", "border"];
    for (const color of optionalColors) {
      const value = this.getAttribute(color);
      if (value) {
        themeOptions[color] = value;
      }
    }

    return themeOptions;
  }

  getComputedColor(property) {
    try {
      const computed = window.getComputedStyle(this);
      return computed.getPropertyValue(property);
    } catch {
      return null;
    }
  }
}

customElements.define("mermaid-diagram", MermaidDiagram);
