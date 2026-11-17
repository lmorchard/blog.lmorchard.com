package template

import (
	"bytes"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"blog-ssg/pkg/post"
)

func TestEmbeddedTemplatesAndEject(t *testing.T) {
	mgr, err := NewManager("")
	if err != nil {
		t.Fatalf("NewManager failed: %v", err)
	}

	p := &post.Post{
		Title: "Test Post",
		Date:  time.Date(2024, 5, 12, 12, 0, 0, 0, time.UTC),
		Path:  "2024/05/12/test-post",
		Year:  "2024",
		Month: "05",
		Day:   "12",
		Type:  "entry",
		HTML:  "<p>Hello from <strong>Go SSG</strong></p>",
		Tags:  []string{"go", "ssg"},
	}

	data := PostViewData{
		CommonData: CommonData{
			Site: SiteConfig{
				Title:   "blog.lmorchard.com",
				BaseURL: "",
				Author:  AuthorConfig{FullName: "Les Orchard"},
			},
			Page: PageMeta{
				Title: "Test Post",
			},
		},
		Post: p,
	}

	var buf bytes.Buffer
	if err := mgr.RenderPost(&buf, data); err != nil {
		t.Fatalf("RenderPost failed: %v", err)
	}

	out := buf.String()
	if !strings.Contains(out, "<title>Test Post - blog.lmorchard.com</title>") {
		t.Errorf("missing title in rendered output")
	}
	if !strings.Contains(out, "Hello from <strong>Go SSG</strong>") {
		t.Errorf("missing post HTML in rendered output")
	}

	// Test Eject
	tmpDir := t.TempDir()
	ejected, err := Eject(tmpDir, false)
	if err != nil {
		t.Fatalf("Eject failed: %v", err)
	}
	if len(ejected) == 0 {
		t.Fatalf("expected ejected files, got 0")
	}

	// Test disk override
	customBase := filepath.Join(tmpDir, "base.html")
	if err := os.WriteFile(customBase, []byte(`CUSTOM BASE: {{block "content" .}}{{end}}`), 0644); err != nil {
		t.Fatalf("failed to write custom base: %v", err)
	}

	customMgr, err := NewManager(tmpDir)
	if err != nil {
		t.Fatalf("NewManager with override failed: %v", err)
	}

	buf.Reset()
	if err := customMgr.RenderPost(&buf, data); err != nil {
		t.Fatalf("RenderPost with custom template failed: %v", err)
	}
	if !strings.HasPrefix(buf.String(), "CUSTOM BASE:") {
		t.Errorf("expected custom base prefix, got: %s", buf.String()[:30])
	}
}
