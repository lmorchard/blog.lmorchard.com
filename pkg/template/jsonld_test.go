package template

import (
	"strings"
	"testing"
	"time"

	"blog-ssg/pkg/post"
)

func TestBuildJSONLDWebsiteAndPerson(t *testing.T) {
	site := SiteConfig{
		Title:           "Test Blog",
		Subtitle:        "Testing subtitle",
		AbsoluteBaseURL: "https://blog.example.com",
		Avatar:          "https://example.com/avatar.jpg",
		Author: AuthorConfig{
			FullName:    "Jane Doe",
			URL:         "https://janedoe.com",
			JobTitle:    "Engineer",
			Description: "Maker",
			SameAs:      []string{"https://github.com/janedoe"},
		},
	}

	html := BuildJSONLD(site, nil)
	str := string(html)

	if !strings.HasPrefix(str, "<script type=\"application/ld+json\">") {
		t.Fatalf("Expected script tag prefix, got: %s", str)
	}
	if !strings.Contains(str, `"@type":"WebSite"`) {
		t.Errorf("Expected WebSite node, got: %s", str)
	}
	if !strings.Contains(str, `"@type":"Person"`) {
		t.Errorf("Expected Person node, got: %s", str)
	}
	if !strings.Contains(str, `"Jane Doe"`) {
		t.Errorf("Expected author name, got: %s", str)
	}
}

func TestBuildJSONLDBlogPosting(t *testing.T) {
	site := SiteConfig{
		Title:           "Test Blog",
		AbsoluteBaseURL: "https://blog.example.com",
		Author: AuthorConfig{
			FullName: "Jane Doe",
		},
	}

	p := &post.Post{
		Title:     "Sample Post",
		Summary:   "Sample Summary",
		Path:      "2026/01/01/sample",
		Thumbnail: "/uploads/sample.jpg",
		Tags:      []string{"go", "blog"},
		Date:      time.Date(2026, 1, 1, 12, 0, 0, 0, time.UTC),
	}

	html := BuildJSONLD(site, p)
	str := string(html)

	if !strings.Contains(str, `"@type":"BlogPosting"`) {
		t.Errorf("Expected BlogPosting node, got: %s", str)
	}
	if !strings.Contains(str, `"Sample Post"`) {
		t.Errorf("Expected post title, got: %s", str)
	}
	if !strings.Contains(str, `"https://blog.example.com/uploads/sample.jpg"`) {
		t.Errorf("Expected absolute thumbnail url, got: %s", str)
	}
	if !strings.Contains(str, `"https://blog.example.com/2026/01/01/sample/#article"`) {
		t.Errorf("Expected article id, got: %s", str)
	}
}
