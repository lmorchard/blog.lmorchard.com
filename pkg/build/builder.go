package build

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/fs"
	"os"
	"path/filepath"
	"runtime"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/adrg/frontmatter"
	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer/html"

	"blog-ssg/pkg/feed"
	"blog-ssg/pkg/imageutil"
	"blog-ssg/pkg/post"
	"blog-ssg/pkg/template"
)

type Config struct {
	PostsPath       string
	PagesPath       string
	BuildPath       string
	PublicPath      string
	UploadsPath     string
	TemplatesPath   string
	Site            template.SiteConfig
	ShowDrafts      bool
	Clean           bool
	OptimizeImages  bool
	Concurrency     int
}

type Page struct {
	Title      string
	Slug       string
	Path       string
	Body       string
	HTML       string
	SourcePath string
}

type Builder struct {
	cfg         Config
	templateMgr *template.Manager
	pageRenderer goldmark.Markdown
}

func NewBuilder(cfg Config) (*Builder, error) {
	if cfg.Concurrency <= 0 {
		cfg.Concurrency = runtime.NumCPU()
	}

	tmplMgr, err := template.NewManager(cfg.TemplatesPath)
	if err != nil {
		return nil, fmt.Errorf("failed to init templates: %w", err)
	}

	md := goldmark.New(
		goldmark.WithExtensions(extension.GFM),
		goldmark.WithParserOptions(parser.WithAutoHeadingID()),
		goldmark.WithRendererOptions(html.WithUnsafe()),
	)

	return &Builder{
		cfg:          cfg,
		templateMgr:  tmplMgr,
		pageRenderer: md,
	}, nil
}

type BuildStats struct {
	PostsBuilt int
	PagesBuilt int
	TagsBuilt  int
	Duration   time.Duration
}

func (b *Builder) Build() (*BuildStats, error) {
	startTime := time.Now()

	// 1. Clean if requested
	if b.cfg.Clean {
		if err := os.RemoveAll(b.cfg.BuildPath); err != nil && !os.IsNotExist(err) {
			return nil, fmt.Errorf("failed to clean build dir: %w", err)
		}
	}
	if err := os.MkdirAll(b.cfg.BuildPath, 0755); err != nil {
		return nil, fmt.Errorf("failed to create build dir: %w", err)
	}

	// 2. Load static pages
	pages, err := b.loadPages()
	if err != nil {
		return nil, fmt.Errorf("failed to load pages: %w", err)
	}

	// Update site nav pages
	var navPages []template.NavPage
	for _, p := range pages {
		navPages = append(navPages, template.NavPage{
			Title: p.Title,
			Path:  p.Path,
		})
	}
	b.cfg.Site.NavPages = navPages

	// 3. Load all posts
	posts, err := post.LoadAllPosts(b.cfg.PostsPath, b.cfg.Site.BaseURL, b.cfg.ShowDrafts)
	if err != nil {
		return nil, fmt.Errorf("failed to load posts: %w", err)
	}

	// 4. Build all posts concurrently
	if err := b.buildPostsParallel(posts); err != nil {
		return nil, fmt.Errorf("failed to build posts: %w", err)
	}

	// 5. Build static pages
	for _, page := range pages {
		if err := b.buildPage(page); err != nil {
			return nil, fmt.Errorf("failed to build page %s: %w", page.Slug, err)
		}
	}

	// 6. Build root index, JSON, and RSS feeds
	if err := b.buildRoot(posts); err != nil {
		return nil, fmt.Errorf("failed to build root index: %w", err)
	}

	// 7. Build Year & Month indexes
	if err := b.buildDateIndexes(posts); err != nil {
		return nil, fmt.Errorf("failed to build date indexes: %w", err)
	}

	// 8. Build Tag indexes
	tagCount, err := b.buildTagIndexes(posts)
	if err != nil {
		return nil, fmt.Errorf("failed to build tag indexes: %w", err)
	}

	// 9. Build Archives and All Posts
	if err := b.buildArchives(posts); err != nil {
		return nil, fmt.Errorf("failed to build archives: %w", err)
	}

	// 10. Build Sitemap
	allTags := collectAllTags(posts)
	sitemapData, err := feed.GenerateSitemap(b.cfg.Site, posts, allTags)
	if err == nil {
		_ = os.WriteFile(filepath.Join(b.cfg.BuildPath, "sitemap.xml"), sitemapData, 0644)
	}

	// 11. Copy Public Assets and Uploads
	b.copyStaticAssets()

	duration := time.Since(startTime)
	return &BuildStats{
		PostsBuilt: len(posts),
		PagesBuilt: len(pages),
		TagsBuilt:  tagCount,
		Duration:   duration,
	}, nil
}

func (b *Builder) buildPostsParallel(posts []*post.Post) error {
	sem := make(chan struct{}, b.cfg.Concurrency)
	var wg sync.WaitGroup
	var errOnce sync.Once
	var firstErr error

	for _, p := range posts {
		wg.Add(1)
		sem <- struct{}{}

		go func(postItem *post.Post) {
			defer wg.Done()
			defer func() { <-sem }()

			if err := b.buildSinglePost(postItem); err != nil {
				errOnce.Do(func() {
					firstErr = err
				})
			}
		}(p)
	}

	wg.Wait()
	return firstErr
}

func (b *Builder) buildSinglePost(p *post.Post) error {
	postDir := filepath.Join(b.cfg.BuildPath, filepath.FromSlash(p.Path))
	if err := os.MkdirAll(postDir, 0755); err != nil {
		return err
	}

	// 1. index.html
	var htmlBuf bytes.Buffer
	viewData := template.PostViewData{
		CommonData: template.CommonData{
			Site: b.cfg.Site,
			Page: template.PageMeta{
				Title: p.Title,
				Path:  p.Path,
			},
			JSONLD: template.BuildJSONLD(b.cfg.Site, p),
		},
		Post: p,
	}
	if err := b.templateMgr.RenderPost(&htmlBuf, viewData); err != nil {
		return fmt.Errorf("error rendering post %s: %w", p.Path, err)
	}
	if err := os.WriteFile(filepath.Join(postDir, "index.html"), htmlBuf.Bytes(), 0644); err != nil {
		return err
	}

	// 2. index.md
	mdContent := RenderPostMarkdown(b.cfg.Site, p)
	if err := os.WriteFile(filepath.Join(postDir, "index.md"), []byte(mdContent), 0644); err != nil {
		return err
	}

	// 3. index.json
	jsonData, err := json.MarshalIndent(p, "", "  ")
	if err == nil {
		_ = os.WriteFile(filepath.Join(postDir, "index.json"), jsonData, 0644)
	}

	// 4. Directory post assets copying
	if p.IsDir && p.ParentPath != "" {
		b.copyDirAssets(p.ParentPath, postDir)
	} else if len(p.Attachments) > 0 && p.ParentPath != "" {
		for _, att := range p.Attachments {
			srcPath := filepath.Join(p.ParentPath, att)
			if _, err := os.Stat(srcPath); os.IsNotExist(err) {
				srcPath = filepath.Join(p.ParentPath, "attachments", filepath.Base(att))
			}
			if _, err := os.Stat(srcPath); err == nil {
				destPath := filepath.Join(postDir, att)
				_ = os.MkdirAll(filepath.Dir(destPath), 0755)
				copyFile(srcPath, destPath)
			}
		}
	}

	return nil
}

func isImageExt(path string) bool {
	ext := strings.ToLower(filepath.Ext(path))
	return ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".webp"
}

func (b *Builder) copyDirAssets(srcDir, destDir string) {
	_ = filepath.WalkDir(srcDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return nil
		}
		if d.IsDir() {
			base := d.Name()
			if strings.HasPrefix(base, ".") || base == "node_modules" {
				return filepath.SkipDir
			}
			return nil
		}
		name := d.Name()
		if strings.HasPrefix(name, ".") || strings.HasSuffix(name, ".md") || strings.HasSuffix(name, ".markdown") {
			return nil
		}

		rel, err := filepath.Rel(srcDir, path)
		if err != nil {
			return nil
		}
		destFile := filepath.Join(destDir, rel)

		if srcInfo, err := d.Info(); err == nil {
			if destInfo, err := os.Stat(destFile); err == nil && destInfo.ModTime().After(srcInfo.ModTime()) {
				return nil
			}
			if b.cfg.OptimizeImages && isImageExt(path) {
				_ = imageutil.OptimizeImage(path, destFile, 1400, 75)
			} else {
				_ = copyFile(path, destFile)
			}
		}
		return nil
	})
}

func (b *Builder) buildPage(page Page) error {
	pageDir := filepath.Join(b.cfg.BuildPath, page.Path)
	if err := os.MkdirAll(pageDir, 0755); err != nil {
		return err
	}

	var buf bytes.Buffer
	viewData := template.PageViewData{
		CommonData: template.CommonData{
			Site: b.cfg.Site,
			Page: template.PageMeta{
				Title: page.Title,
				Path:  page.Path,
				HTML:  page.HTML,
			},
			JSONLD: template.BuildJSONLD(b.cfg.Site, nil),
		},
	}

	if err := b.templateMgr.RenderPage(&buf, viewData); err != nil {
		return err
	}

	return os.WriteFile(filepath.Join(pageDir, "index.html"), buf.Bytes(), 0644)
}

func (b *Builder) buildRoot(posts []*post.Post) error {
	// Root index.html (latest 31 posts)
	limit := 31
	if len(posts) < limit {
		limit = len(posts)
	}
	recentPosts := posts[:limit]

	var htmlBuf bytes.Buffer
	viewData := template.IndexViewData{
		CommonData: template.CommonData{
			Site: b.cfg.Site,
			Page: template.PageMeta{
				Title: "Home",
				Path:  "",
			},
			JSONLD: template.BuildJSONLD(b.cfg.Site, nil),
		},
		Posts: recentPosts,
	}

	if err := b.templateMgr.RenderIndexRecent(&htmlBuf, viewData); err != nil {
		return err
	}
	if err := os.WriteFile(filepath.Join(b.cfg.BuildPath, "index.html"), htmlBuf.Bytes(), 0644); err != nil {
		return err
	}

	// .nojekyll
	_ = os.WriteFile(filepath.Join(b.cfg.BuildPath, ".nojekyll"), []byte("nojekyll\n"), 0644)

	// index.rss (full text, 15 posts)
	rssFull, err := feed.GenerateRSS(b.cfg.Site, posts, "", 15, true)
	if err == nil {
		_ = os.WriteFile(filepath.Join(b.cfg.BuildPath, "index.rss"), rssFull, 0644)
	}

	// index-excerpts.rss (excerpt text, 15 posts)
	rssExcerpts, err := feed.GenerateRSS(b.cfg.Site, posts, "", 15, false)
	if err == nil {
		_ = os.WriteFile(filepath.Join(b.cfg.BuildPath, "index-excerpts.rss"), rssExcerpts, 0644)
	}

	return nil
}

func (b *Builder) buildDateIndexes(posts []*post.Post) error {
	byYear := make(map[string][]*post.Post)
	byMonth := make(map[string][]*post.Post)

	for _, p := range posts {
		byYear[p.Year] = append(byYear[p.Year], p)
		ym := fmt.Sprintf("%s/%s", p.Year, p.Month)
		byMonth[ym] = append(byMonth[ym], p)
	}

	type dateTask struct {
		dir   string
		title string
		label string
		path  string
		posts []*post.Post
	}

	var tasks []dateTask

	// Year tasks
	for year, yearPosts := range byYear {
		tasks = append(tasks, dateTask{
			dir:   filepath.Join(b.cfg.BuildPath, year),
			title: year,
			label: "Year",
			path:  year,
			posts: yearPosts,
		})
	}

	// Month tasks
	for ym, monthPosts := range byMonth {
		parts := strings.Split(ym, "/")
		title := ym
		if len(parts) == 2 && len(monthPosts) > 0 {
			title = monthPosts[0].Date.Format("January 2006")
		}
		tasks = append(tasks, dateTask{
			dir:   filepath.Join(b.cfg.BuildPath, filepath.FromSlash(ym)),
			title: title,
			label: "Month",
			path:  ym,
			posts: monthPosts,
		})
	}

	sem := make(chan struct{}, b.cfg.Concurrency)
	var wg sync.WaitGroup

	for _, task := range tasks {
		wg.Add(1)
		sem <- struct{}{}

		go func(t dateTask) {
			defer wg.Done()
			defer func() { <-sem }()

			_ = os.MkdirAll(t.dir, 0755)

			var buf bytes.Buffer
			data := template.DateViewData{
				CommonData: template.CommonData{
					Site: b.cfg.Site,
					Page: template.PageMeta{
						Title:      t.title,
						IndexLabel: t.label,
						Path:       t.path,
					},
					JSONLD: template.BuildJSONLD(b.cfg.Site, nil),
				},
				Posts: t.posts,
			}
			if err := b.templateMgr.RenderIndexDate(&buf, data); err == nil {
				_ = os.WriteFile(filepath.Join(t.dir, "index.html"), buf.Bytes(), 0644)
			}
		}(task)
	}

	wg.Wait()
	return nil
}

func (b *Builder) buildTagIndexes(posts []*post.Post) (int, error) {
	byTag := make(map[string][]*post.Post)
	for _, p := range posts {
		for _, tag := range p.Tags {
			byTag[tag] = append(byTag[tag], p)
		}
	}

	type tagTask struct {
		tag   string
		posts []*post.Post
	}

	tasks := make([]tagTask, 0, len(byTag))
	for tag, tagPosts := range byTag {
		tasks = append(tasks, tagTask{tag: tag, posts: tagPosts})
	}

	sem := make(chan struct{}, b.cfg.Concurrency)
	var wg sync.WaitGroup

	for _, task := range tasks {
		wg.Add(1)
		sem <- struct{}{}

		go func(t tagTask) {
			defer wg.Done()
			defer func() { <-sem }()

			tagDir := filepath.Join(b.cfg.BuildPath, "tag", t.tag)
			_ = os.MkdirAll(tagDir, 0755)

			var buf bytes.Buffer
			data := template.TagViewData{
				CommonData: template.CommonData{
					Site: b.cfg.Site,
					Page: template.PageMeta{
						Title:     t.tag,
						Path:      fmt.Sprintf("tag/%s", t.tag),
						FeedURL:   fmt.Sprintf("%s/tag/%s/index.rss", b.cfg.Site.BaseURL, t.tag),
						FeedTitle: fmt.Sprintf("Tag: %s Feed", t.tag),
					},
					JSONLD: template.BuildJSONLD(b.cfg.Site, nil),
				},
				Tag:   t.tag,
				Posts: t.posts,
			}

			if err := b.templateMgr.RenderIndexTag(&buf, data); err == nil {
				_ = os.WriteFile(filepath.Join(tagDir, "index.html"), buf.Bytes(), 0644)
			}

			// Tag RSS feeds (full text and excerpts)
			tagRSS, err := feed.GenerateRSS(b.cfg.Site, t.posts, t.tag, 15, true)
			if err == nil {
				_ = os.WriteFile(filepath.Join(tagDir, "index.rss"), tagRSS, 0644)
			}
			tagExcerptsRSS, err := feed.GenerateRSS(b.cfg.Site, t.posts, t.tag, 15, false)
			if err == nil {
				_ = os.WriteFile(filepath.Join(tagDir, "index-excerpts.rss"), tagExcerptsRSS, 0644)
			}
		}(task)
	}

	wg.Wait()
	return len(byTag), nil
}

func (b *Builder) buildArchives(posts []*post.Post) error {
	// archives.html
	monthNames := map[string]string{
		"01": "January", "02": "February", "03": "March", "04": "April",
		"05": "May", "06": "June", "07": "July", "08": "August",
		"09": "September", "10": "October", "11": "November", "12": "December",
	}

	tagCounts := make(map[string]int)
	dateCounts := make(map[string]map[string]int)

	for _, p := range posts {
		for _, tag := range p.Tags {
			tagCounts[tag]++
		}
		if dateCounts[p.Year] == nil {
			dateCounts[p.Year] = make(map[string]int)
		}
		dateCounts[p.Year][p.Month]++
	}

	var topTags []template.TagCount
	for tag, count := range tagCounts {
		if count > 3 && tag != "asides" && tag != "entries" && tag != "Header" {
			topTags = append(topTags, template.TagCount{Name: tag, Count: count})
		}
	}
	sort.Slice(topTags, func(i, j int) bool {
		return topTags[i].Count > topTags[j].Count
	})
	if len(topTags) > 50 {
		topTags = topTags[:50]
	}

	var years []template.YearArchive
	var sortedYears []string
	for y := range dateCounts {
		sortedYears = append(sortedYears, y)
	}
	sort.Sort(sort.Reverse(sort.StringSlice(sortedYears)))

	for _, y := range sortedYears {
		monthsMap := dateCounts[y]
		var months []template.MonthArchive
		totalYearPosts := 0
		for m := 1; m <= 12; m++ {
			mKey := fmt.Sprintf("%02d", m)
			cnt := monthsMap[mKey]
			totalYearPosts += cnt
			months = append(months, template.MonthArchive{
				Month: mKey,
				Name:  monthNames[mKey],
				Count: cnt,
			})
		}
		years = append(years, template.YearArchive{
			Year:       y,
			TotalPosts: totalYearPosts,
			Months:     months,
		})
	}

	var archBuf bytes.Buffer
	archViewData := template.ArchiveViewData{
		CommonData: template.CommonData{
			Site: b.cfg.Site,
			Page: template.PageMeta{
				Title: "Archives",
				Path:  "archives.html",
			},
			JSONLD: template.BuildJSONLD(b.cfg.Site, nil),
		},
		ArchiveData: template.ArchiveData{
			TopTags: topTags,
			Years:   years,
		},
	}

	if err := b.templateMgr.RenderArchives(&archBuf, archViewData); err != nil {
		return fmt.Errorf("failed to render archives.html: %w", err)
	}
	return os.WriteFile(filepath.Join(b.cfg.BuildPath, "archives.html"), archBuf.Bytes(), 0644)
}

func (b *Builder) copyStaticAssets() {
	if b.cfg.PublicPath != "" {
		copyDirRecursive(b.cfg.PublicPath, b.cfg.BuildPath)
	}
	if b.cfg.UploadsPath != "" {
		copyDirRecursive(b.cfg.UploadsPath, b.cfg.BuildPath)
	}
}

func (b *Builder) loadPages() ([]Page, error) {
	if b.cfg.PagesPath == "" {
		return nil, nil
	}
	var pages []Page

	err := filepath.WalkDir(b.cfg.PagesPath, func(path string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() || !strings.HasSuffix(path, ".md") {
			return nil
		}

		raw, err := os.ReadFile(path)
		if err != nil {
			return nil
		}

		var fm struct {
			Title string `yaml:"title"`
			Slug  string `yaml:"slug"`
		}
		bodyBytes, err := frontmatter.Parse(strings.NewReader(string(raw)), &fm)
		if err != nil {
			bodyBytes = raw
		}

		var buf bytes.Buffer
		_ = b.pageRenderer.Convert(bodyBytes, &buf)

		base := strings.TrimSuffix(filepath.Base(path), ".md")
		slug := fm.Slug
		if slug == "" {
			slug = base
		}

		pages = append(pages, Page{
			Title:      fm.Title,
			Slug:       slug,
			Path:       slug,
			Body:       string(bodyBytes),
			HTML:       buf.String(),
			SourcePath: path,
		})
		return nil
	})

	return pages, err
}

func collectAllTags(posts []*post.Post) []string {
	seen := make(map[string]bool)
	var tags []string
	for _, p := range posts {
		for _, t := range p.Tags {
			if !seen[t] {
				seen[t] = true
				tags = append(tags, t)
			}
		}
	}
	sort.Strings(tags)
	return tags
}

func copyFile(src, dest string) error {
	_ = os.MkdirAll(filepath.Dir(dest), 0755)
	in, err := os.Open(src)
	if err != nil {
		return err
	}
	defer in.Close()

	out, err := os.Create(dest)
	if err != nil {
		return err
	}
	defer out.Close()

	_, err = io.Copy(out, in)
	return err
}

func copyDirRecursive(srcDir, destDir string) {
	_ = filepath.WalkDir(srcDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return nil
		}
		rel, err := filepath.Rel(srcDir, path)
		if err != nil {
			return nil
		}
		dest := filepath.Join(destDir, rel)
		_ = copyFile(path, dest)
		return nil
	})
}
