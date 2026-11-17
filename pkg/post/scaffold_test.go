package post

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

func TestSlugify(t *testing.T) {
	cases := []struct {
		input    string
		expected string
	}{
		{"Hello World!", "hello-world"},
		{"Twenty-Four Years of Blog Posts in 1.35 Seconds", "twenty-four-years-of-blog-posts-in-1-35-seconds"},
		{"   leading and trailing spaces   ", "leading-and-trailing-spaces"},
		{"special @#$% characters", "special-characters"},
		{"", "untitled"},
	}

	for _, c := range cases {
		out := Slugify(c.input)
		if out != c.expected {
			t.Errorf("Slugify(%q) = %q, expected %q", c.input, out, c.expected)
		}
	}
}

func TestCreateNewPostBundle(t *testing.T) {
	tmpDir, err := os.MkdirTemp("", "scaffold-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.RemoveAll(tmpDir)

	fixedDate := time.Date(2026, 11, 17, 14, 30, 0, 0, time.UTC)
	filePath, err := CreateNewPost(NewPostOptions{
		PostsDir: tmpDir,
		Title:    "Testing Post Scaffolding",
		Date:     fixedDate,
		Tags:     []string{"golang", "ssg"},
		Draft:    true,
		Bundle:   true,
	})
	if err != nil {
		t.Fatalf("CreateNewPost failed: %v", err)
	}

	expectedRel := filepath.Join("2026", "2026-11-17-testing-post-scaffolding", "index.md")
	if !strings.HasSuffix(filePath, expectedRel) {
		t.Errorf("Expected path ending with %s, got: %s", expectedRel, filePath)
	}

	content, err := os.ReadFile(filePath)
	if err != nil {
		t.Fatal(err)
	}
	contentStr := string(content)

	if !strings.Contains(contentStr, `title: "Testing Post Scaffolding"`) {
		t.Errorf("Expected title in frontmatter, got: %s", contentStr)
	}
	if !strings.Contains(contentStr, "draft: true") {
		t.Errorf("Expected draft: true, got: %s", contentStr)
	}
	if !strings.Contains(contentStr, "- golang\n  - ssg") {
		t.Errorf("Expected tags in frontmatter, got: %s", contentStr)
	}
}
