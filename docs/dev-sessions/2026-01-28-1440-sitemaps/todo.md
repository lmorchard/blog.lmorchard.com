# Sitemap Generation TODO List

## Phase 1: Template Creation
- [x] Create `templates/sitemap.js` for individual sitemaps
- [x] Create `templates/sitemapIndex.js` for sitemap index
- [ ] Test templates with sample data

## Phase 2: Helper Functions
- [x] Add `prepareSitemapUrlsFromPosts()` to `lib/indexes.js`
- [x] Add `prepareSitemapUrlsFromIndexPages()` to `lib/indexes.js`
- [x] Add `prepareSitemapUrlsFromTagPages()` to `lib/indexes.js`
- [x] Add `prepareSitemapUrlsFromStaticPages()` to `lib/indexes.js`
- [x] Add `findMostRecentDate()` helper if needed
- [x] Add `getChangefreqForPost()` helper

## Phase 3: Sitemap Generation
- [x] Implement `buildPostSitemapsByYear()` in `lib/indexes.js`
- [x] Implement `buildStaticPagesSitemap()` in `lib/indexes.js`
- [x] Implement `buildIndexPagesSitemap()` in `lib/indexes.js`
- [x] Implement `buildTagPagesSitemap()` in `lib/indexes.js`
- [x] Implement `buildSitemapIndex()` in `lib/indexes.js`

## Phase 4: Integration
- [x] Update `buildAllIndexes()` to call sitemap generation functions
- [x] Ensure draft posts are excluded from sitemaps (handled by existing filter)

## Phase 5: Testing & Validation
- [x] Run `npm run build` and verify sitemaps are generated
- [x] Check sitemap file sizes are reasonable
- [x] Validate `sitemap.xml` structure
- [x] Validate individual sitemap XML structure
- [x] Spot-check URLs from each sitemap type
- [ ] Test with online XML validator (optional - xmllint passed)
- [ ] Submit to Google Search Console (ready when Les deploys)

## Documentation
- [ ] Update README.md if needed
- [x] Document sitemap structure in session notes
- [ ] Add any learnings to journal
