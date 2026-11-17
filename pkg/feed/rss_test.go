package feed

import (
	"strings"
	"testing"
	"time"

	"blog-ssg/pkg/post"
	"blog-ssg/pkg/template"
)

func TestGenerateRSSFullAndExcerpts(t *testing.T) {
	site := template.SiteConfig{
		Title:           "Test Blog",
		Subtitle:        "A testing blog",
		AbsoluteBaseURL: "https://example.com",
	}

	posts := []*post.Post{
		{
			Title:   "First Post",
			HTML:    "<p>Full content of first post.</p>",
			Summary: "<p>Excerpt of first post.</p>",
			Path:    "2026/01/01/first-post",
			Date:    time.Date(2026, 1, 1, 12, 0, 0, 0, time.UTC),
			Type:    "entry",
		},
	}

	// 1. Full text feed
	fullXML, err := GenerateRSS(site, posts, "", 10, true)
	if err != nil {
		t.Fatalf("GenerateRSS full failed: %v", err)
	}
	fullStr := string(fullXML)
	if !strings.Contains(fullStr, "<title>Test Blog</title>") {
		t.Errorf("Expected site title in full feed, got: %s", fullStr)
	}
	if !strings.Contains(fullStr, "Full content of first post.") {
		t.Errorf("Expected full content in full feed, got: %s", fullStr)
	}
	if !strings.Contains(fullStr, "https://example.com/index.rss") {
		t.Errorf("Expected atom self link for index.rss, got: %s", fullStr)
	}

	// 2. Excerpt feed
	excerptXML, err := GenerateRSS(site, posts, "", 10, false)
	if err != nil {
		t.Fatalf("GenerateRSS excerpt failed: %v", err)
	}
	excerptStr := string(excerptXML)
	if !strings.Contains(excerptStr, "<title>Test Blog (excerpts)</title>") {
		t.Errorf("Expected (excerpts) title in excerpt feed, got: %s", excerptStr)
	}
	if !strings.Contains(excerptStr, "Excerpt of first post.") {
		t.Errorf("Expected excerpt content in excerpt feed, got: %s", excerptStr)
	}
	if !strings.Contains(excerptStr, "https://example.com/index-excerpts.rss") {
		t.Errorf("Expected atom self link for index-excerpts.rss, got: %s", excerptStr)
	}
}
