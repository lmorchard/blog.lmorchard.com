# Sitemap Generation Implementation Plan

## Architecture Overview

The sitemap generation will follow the existing patterns used for RSS feed generation:
- Templates in `templates/` directory
- Generation logic in `lib/indexes.js`
- Integration with existing build pipeline

## Implementation Phases

### Phase 1: Template Creation

Create two new templates following the existing RSS template pattern:

#### 1.1 Individual Sitemap Template (`templates/sitemap.js`)

**Purpose:** Generate individual sitemap XML files

**Inputs:**
- `site`: Site configuration object
- `urls`: Array of URL objects with structure:
  ```js
  {
    loc: string,        // Absolute URL
    lastmod: string,    // ISO 8601 date
    changefreq: string, // always|hourly|daily|weekly|monthly|yearly|never
    priority: number    // 0.0 - 1.0
  }
  ```

**Output:** XML following sitemap protocol

**Template structure:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>...</loc>
    <lastmod>...</lastmod>
    <changefreq>...</changefreq>
    <priority>...</priority>
  </url>
  ...
</urlset>
```

#### 1.2 Sitemap Index Template (`templates/sitemapIndex.js`)

**Purpose:** Generate the main sitemap index

**Inputs:**
- `site`: Site configuration object
- `sitemaps`: Array of sitemap objects:
  ```js
  {
    loc: string,      // Absolute URL to sitemap
    lastmod: string   // ISO 8601 date
  }
  ```

**Output:** Sitemap index XML

**Template structure:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>...</loc>
    <lastmod>...</lastmod>
  </sitemap>
  ...
</sitemapindex>
```

### Phase 2: Data Preparation Functions

Add helper functions to `lib/indexes.js`:

#### 2.1 `prepareSitemapUrlsFromPosts(posts, options)`

**Purpose:** Transform post objects into sitemap URL objects

**Logic:**
- Convert post.date to ISO 8601 format for lastmod
- Build absolute URL from site.absolute_baseurl + post.path
- Set appropriate changefreq (older posts: "never", recent: "monthly")
- Set priority based on post type (0.6 for posts)

#### 2.2 `prepareSitemapUrlsFromIndexPages(posts, options)`

**Purpose:** Generate URLs for year/month index pages

**Logic:**
- Extract unique year/month combinations from posts
- Generate URLs for each index page
- Use most recent post date in that period for lastmod
- Set changefreq: "monthly" for current year, "never" for old years
- Set priority: 0.7

#### 2.3 `prepareSitemapUrlsFromTagPages(posts, options)`

**Purpose:** Generate URLs for tag index pages

**Logic:**
- Extract unique tags from posts
- Generate URL for each tag page
- Use most recent post date for that tag as lastmod
- Set changefreq: "weekly" for active tags
- Set priority: 0.5

#### 2.4 `prepareSitemapUrlsFromStaticPages(posts, options)`

**Purpose:** Generate URLs for main static pages

**Logic:**
- Hardcode main pages: index, all, archives
- Use most recent post date overall for lastmod
- Set changefreq: "daily" for index, "weekly" for others
- Set priority: 1.0 for index, 0.8 for others

### Phase 3: Sitemap Generation Functions

Add to `lib/indexes.js`:

#### 3.1 `buildPostSitemapsByYear(posts)`

**Purpose:** Generate one sitemap per year

**Logic:**
```js
const postsByYear = indexBy(posts, ({ year }) => year);
const sitemaps = [];

for (const [year, yearPosts] of Object.entries(postsByYear)) {
  const urls = prepareSitemapUrlsFromPosts(yearPosts, { year });
  const filename = `sitemap-posts-${year}.xml`;
  const xml = templateSitemap({ site: config.site, urls });

  await writeFile(path.join(config.buildPath, filename), xml);

  sitemaps.push({
    filename,
    lastmod: findMostRecentDate(yearPosts)
  });
}

return sitemaps;
```

#### 3.2 `buildStaticPagesSitemap(posts)`

**Purpose:** Generate sitemap for main static pages

**Returns:** Sitemap metadata object

#### 3.3 `buildIndexPagesSitemap(posts)`

**Purpose:** Generate sitemap for year/month indexes

**Returns:** Sitemap metadata object

#### 3.4 `buildTagPagesSitemap(posts)`

**Purpose:** Generate sitemap for tag indexes

**Returns:** Sitemap metadata object

#### 3.5 `buildSitemapIndex(sitemapMetadata)`

**Purpose:** Generate main sitemap.xml index

**Logic:**
```js
const sitemaps = sitemapMetadata.map(sm => ({
  loc: `${config.site.absolute_baseurl}/${sm.filename}`,
  lastmod: sm.lastmod
}));

const xml = templateSitemapIndex({ site: config.site, sitemaps });
await writeFile(path.join(config.buildPath, 'sitemap.xml'), xml);
```

### Phase 4: Integration

#### 4.1 Update `buildAllIndexes()` in `lib/indexes.js`

Add sitemap generation after existing index generation:

```js
export async function buildAllIndexes(postsIn, { showDrafts = false } = {}) {
  // ... existing code ...

  // Generate sitemaps
  const sitemapMetadata = [];

  sitemapMetadata.push(...await buildPostSitemapsByYear(posts));
  sitemapMetadata.push(await buildStaticPagesSitemap(posts));
  sitemapMetadata.push(await buildIndexPagesSitemap(posts));
  sitemapMetadata.push(await buildTagPagesSitemap(posts));

  await buildSitemapIndex(sitemapMetadata);
}
```

### Phase 5: Testing & Validation

#### 5.1 Manual Testing
- Run `npm run build`
- Verify all sitemap files are generated
- Check file sizes are reasonable
- Inspect sample URLs from each sitemap type

#### 5.2 XML Validation
- Validate sitemap.xml against sitemap index schema
- Validate individual sitemaps against sitemap protocol schema
- Can use online validators or XML lint tools

#### 5.3 Search Console Testing
- Submit sitemap.xml to Google Search Console
- Verify no errors reported
- Check that all URLs are discovered

## File Modifications Summary

### New Files
- `templates/sitemap.js`
- `templates/sitemapIndex.js`

### Modified Files
- `lib/indexes.js` (add sitemap generation functions and integration)

### Generated Files (in build/)
- `sitemap.xml`
- `sitemap-posts-YYYY.xml` (one per year, ~24 files)
- `sitemap-pages.xml`
- `sitemap-indexes.xml`
- `sitemap-tags.xml`

## Implementation Notes

### Date Handling
- Use existing `moment` library for date formatting
- Format: ISO 8601 (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS+00:00)
- For indexes, use most recent post's date in that collection

### URL Encoding
- Use existing `html` template function which handles escaping
- Ensure URLs are absolute (include domain)
- Properly escape special characters in URLs

### Priority Guidelines
- Homepage: 1.0
- Main pages (all, archives): 0.8
- Year/month indexes: 0.7
- Individual posts: 0.6
- Tag pages: 0.5

### Changefreq Guidelines
- Homepage: daily
- Current year posts: monthly
- Old year posts: never
- Indexes: weekly to monthly
- Tag pages: weekly

### Performance Considerations
- Reuse existing `indexBy` function for grouping
- Generate all sitemaps in parallel where possible
- File writes are already optimized in `writeFiles`

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Large tag sitemap (679 URLs) | Build performance | Acceptable size, well under limits |
| Incorrect lastmod dates | Poor crawl efficiency | Use post date as source of truth |
| URL encoding issues | Broken links in sitemap | Test with posts containing special chars |
| Missing pages | Incomplete coverage | Cross-reference with RSS feed URLs |

## Testing Strategy

1. **Unit-level:** Test helper functions with sample data
2. **Integration:** Run full build and inspect output files
3. **Validation:** Use XML validators and Search Console
4. **Spot-check:** Verify sample URLs from each category load correctly

## Rollout Plan

1. Implement on local development branch
2. Test locally with full build
3. Validate XML structure
4. Deploy to staging (GitHub Pages)
5. Submit to Google Search Console for validation
6. Merge to main after validation passes
