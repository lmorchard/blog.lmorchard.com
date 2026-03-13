# Layout Refactor - Notes

## Progress

### Steps 1-7: Implementation (complete)
- Added shared layout CSS custom properties to base-vars.css:
  --layout-padding, --layout-max-width, --layout-width-lg, --layout-width-xl,
  --layout-grid-columns, --layout-grid-columns-xl
- Created page-container.css — simple width/centering utility class
- Refactored content-grid.css to use shared vars, kept article-only concerns
- Migrated footer from content-grid to page-container, added flex layout
- Migrated section.main to use page-container, removed conflicting align-items
- Updated header to use shared width/grid vars (already decoupled)
- Updated posts-nav to use shared width vars
- Removed all !important overrides except mermaid font

### Step 8: Verification
- Pending — need clean rebuild and testing at multiple breakpoints
