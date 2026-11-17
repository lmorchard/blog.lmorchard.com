package template

import (
	"embed"
	"fmt"
	"html/template"
	"io"
	"io/fs"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"blog-ssg/pkg/post"
)

//go:embed embedded/*.html
var embeddedFS embed.FS

// SiteConfig mirrors the site configuration for template rendering.
type SiteConfig struct {
	Title           string
	Subtitle        string
	BaseURL         string
	AbsoluteBaseURL string
	Domain          string
	Avatar          string
	Author          AuthorConfig
	NavPages        []NavPage
}

type AuthorConfig struct {
	FullName    string
	Email       string
	URL         string
	JobTitle    string
	Description string
	SameAs      []string
}

type NavPage struct {
	Title string
	Path  string
}

type PageMeta struct {
	Title      string
	IndexLabel string
	Path       string
	HTML       string
	FeedURL    string
	FeedTitle  string
}

type CommonData struct {
	Site   SiteConfig
	Page   PageMeta
	JSONLD template.HTML
}

type PostViewData struct {
	CommonData
	Post *post.Post
}

type IndexViewData struct {
	CommonData
	Posts []*post.Post
}

type TagViewData struct {
	CommonData
	Tag   string
	Posts []*post.Post
}

type DateViewData struct {
	CommonData
	Posts []*post.Post
}

type PageViewData struct {
	CommonData
}

type ArchiveViewData struct {
	CommonData
	ArchiveData ArchiveData
}

type ArchiveData struct {
	TopTags []TagCount
	Years   []YearArchive
}

type TagCount struct {
	Name  string
	Count int
}

type YearArchive struct {
	Year       string
	TotalPosts int
	Months     []MonthArchive
}

type MonthArchive struct {
	Month string
	Name  string
	Count int
}

var reStripHTML = regexp.MustCompile(`<[^>]*>`)

// Manager manages template loading (with filesystem fallback) and rendering.
type Manager struct {
	overrideDir string
	templates   map[string]*template.Template
}

func funcMap() template.FuncMap {
	return template.FuncMap{
		"safeHTML": func(s string) template.HTML {
			return template.HTML(s)
		},
		"safeURL": func(s string) template.URL {
			return template.URL(s)
		},
		"formatDate": func(t time.Time, layout string) string {
			return t.Format(layout)
		},
		"hasPrefix": func(s, prefix string) bool {
			return strings.HasPrefix(s, prefix)
		},
		"wordCount": func(body string) int {
			stripped := reStripHTML.ReplaceAllString(body, " ")
			words := strings.Fields(stripped)
			return len(words)
		},
		"shouldShowDateHeader": func(posts []*post.Post, index int) bool {
			if index >= len(posts) {
				return false
			}
			curr := posts[index].Date.Format("2006-01-02")
			if index == 0 {
				return true
			}
			prev := posts[index-1].Date.Format("2006-01-02")
			return curr != prev
		},
	}
}

// NewManager initializes the template manager with an optional disk override directory.
func NewManager(overrideDir string) (*Manager, error) {
	m := &Manager{
		overrideDir: overrideDir,
		templates:   make(map[string]*template.Template),
	}

	pages := []string{
		"post.html",
		"index_recent.html",
		"index_tag.html",
		"index_date.html",
		"archives.html",
		"page.html",
	}

	for _, pageName := range pages {
		t, err := m.buildTemplateForPage(pageName)
		if err != nil {
			return nil, fmt.Errorf("failed to load template %s: %w", pageName, err)
		}
		m.templates[pageName] = t
	}

	return m, nil
}

func (m *Manager) readFile(name string) ([]byte, error) {
	// Check disk override first
	if m.overrideDir != "" {
		diskPath := filepath.Join(m.overrideDir, name)
		if data, err := os.ReadFile(diskPath); err == nil {
			return data, nil
		}
	}

	// Fallback to embedded
	return embeddedFS.ReadFile(filepath.Join("embedded", name))
}

func (m *Manager) buildTemplateForPage(pageName string) (*template.Template, error) {
	baseData, err := m.readFile("base.html")
	if err != nil {
		return nil, fmt.Errorf("base.html missing: %w", err)
	}

	postListData, err := m.readFile("post_list.html")
	if err != nil {
		return nil, fmt.Errorf("post_list.html missing: %w", err)
	}

	pageData, err := m.readFile(pageName)
	if err != nil {
		return nil, fmt.Errorf("%s missing: %w", pageName, err)
	}

	t := template.New("base.html").Funcs(funcMap())

	if _, err := t.Parse(string(baseData)); err != nil {
		return nil, fmt.Errorf("error parsing base.html: %w", err)
	}
	if _, err := t.Parse(string(postListData)); err != nil {
		return nil, fmt.Errorf("error parsing post_list.html: %w", err)
	}
	if _, err := t.Parse(string(pageData)); err != nil {
		return nil, fmt.Errorf("error parsing %s: %w", pageName, err)
	}

	return t, nil
}

// Eject writes all embedded default templates out to disk.
func Eject(targetDir string, overwrite bool) ([]string, error) {
	if err := os.MkdirAll(targetDir, 0755); err != nil {
		return nil, err
	}

	var ejected []string
	entries, err := embeddedFS.ReadDir("embedded")
	if err != nil {
		return nil, err
	}

	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}
		targetPath := filepath.Join(targetDir, entry.Name())
		if !overwrite {
			if _, err := os.Stat(targetPath); err == nil {
				continue // skip existing without overwrite
			}
		}

		data, err := embeddedFS.ReadFile(filepath.Join("embedded", entry.Name()))
		if err != nil {
			return nil, err
		}

		if err := os.WriteFile(targetPath, data, 0644); err != nil {
			return nil, err
		}
		ejected = append(ejected, entry.Name())
	}

	return ejected, nil
}

func (m *Manager) RenderPost(w io.Writer, data PostViewData) error {
	return m.templates["post.html"].ExecuteTemplate(w, "base.html", data)
}

func (m *Manager) RenderIndexRecent(w io.Writer, data IndexViewData) error {
	return m.templates["index_recent.html"].ExecuteTemplate(w, "base.html", data)
}

func (m *Manager) RenderIndexTag(w io.Writer, data TagViewData) error {
	return m.templates["index_tag.html"].ExecuteTemplate(w, "base.html", data)
}

func (m *Manager) RenderIndexDate(w io.Writer, data DateViewData) error {
	return m.templates["index_date.html"].ExecuteTemplate(w, "base.html", data)
}

func (m *Manager) RenderArchives(w io.Writer, data ArchiveViewData) error {
	return m.templates["archives.html"].ExecuteTemplate(w, "base.html", data)
}

func (m *Manager) RenderPage(w io.Writer, data PageViewData) error {
	return m.templates["page.html"].ExecuteTemplate(w, "base.html", data)
}

// CheckTemplateFS allows inspecting the embedded FS.
func EmbeddedFS() fs.FS {
	sub, _ := fs.Sub(embeddedFS, "embedded")
	return sub
}
