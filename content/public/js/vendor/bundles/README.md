# Vendor JS Bundles

This directory contains standalone, pre-bundled browser ES modules for third-party vendor dependencies imported by web components in `content/public/js/components/`.

## The Architectural Pattern: Pre-bundled Vendor Modules

**This is the intended pattern for all JS / NPM vendor dependencies across the blog:**

1. **Native ESM for all first-party code:** Custom web components and site scripts (`maze-background.js`, `theme-selector.js`, `mermaid-diagram.js`, `rotating-tagline.js`, etc.) are written as 100% native ES modules. Browsers load them directly via `<script type="module" src="/index.js">` without any bundling, transpilation, or packaging steps.
2. **Pre-bundle third-party npm packages:** Whenever a web component needs a third-party npm dependency (e.g. `beautiful-mermaid`), that dependency is compiled once into a standalone, self-contained ESM bundle (`<package>.js`) and committed directly to this directory in git.
3. **Zero node_modules at build time:** Normal site builds, preview servers, and CI deployments run with zero Node.js, npm, or `node_modules` dependencies. The static site generator simply copies `content/public/` to `build/`, making the bundles immediately reachable for browser dynamic imports (e.g. `await import("../vendor/bundles/beautiful-mermaid.js")`).

## Conventions per Vendor Package

For each vendor dependency in this directory, keep:
- `<package>.src.js`: The tiny source entry point defining what is re-exported from npm.
- `<package>.js`: The standalone minified ESM bundle ready for browser execution (committed to git).
- `<package>.js.map`: Source map for debugging (committed to git).

## How to Add or Update a Vendor Bundle

1. Create or edit `<package>.src.js`:
   ```javascript
   export { renderMermaid, renderMermaidAscii } from "beautiful-mermaid";
   ```

2. Compile the standalone bundle using `esbuild` (either via `npx` or a standalone `esbuild` binary):
   ```bash
   npx esbuild content/public/js/vendor/bundles/<package>.src.js \
     --bundle \
     --minify \
     --format=esm \
     --sourcemap \
     --outfile=content/public/js/vendor/bundles/<package>.js
   ```

3. Commit the resulting `.src.js`, `.js`, and `.js.map` files to git.

4. Import it dynamically in your web component:
   ```javascript
   const bundleUrl = new URL("../vendor/bundles/<package>.js", import.meta.url).href;
   const { exportedFunction } = await import(bundleUrl);
   ```
