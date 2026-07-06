# Reading Progress Bar - Notes

## Progress

### Step 1 & 2: Implementation and wiring (complete)
- Created `content/public/js/reading-progress.js` as an IIFE
- Measures from bottom of article header to bottom of article element
- Bails out if content height <= innerHeight (checked once on load)
- Creates a fixed 3px bar at top of viewport, z-index 9999
- Uses rAF-guarded scroll listener for smooth updates
- Fades in/out via opacity transition (300ms) based on progress > 0
- Runs once on load for mid-scroll page loads (back button, etc.)
- Imported in `content/public/index.js` alongside toc.js

### Testing
- Pending manual testing on long and short posts
