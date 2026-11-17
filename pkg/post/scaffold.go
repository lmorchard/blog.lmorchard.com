package post

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"
)

var reSlugInvalid = regexp.MustCompile(`[^a-zA-Z0-9\-_]+`)
var reSlugHyphens = regexp.MustCompile(`-+`)

// Slugify converts arbitrary titles into URL-safe slug strings.
func Slugify(title string) string {
	slug := strings.ToLower(title)
	slug = reSlugInvalid.ReplaceAllString(slug, "-")
	slug = reSlugHyphens.ReplaceAllString(slug, "-")
	slug = strings.Trim(slug, "-")
	if slug == "" {
		slug = "untitled"
	}
	return slug
}

type NewPostOptions struct {
	PostsDir string
	Title    string
	Slug     string
	Tags     []string
	Date     time.Time
	Draft    bool
	Bundle   bool
}

// CreateNewPost scaffolds a new Markdown post bundle or standalone file.
func CreateNewPost(opts NewPostOptions) (string, error) {
	if strings.TrimSpace(opts.Title) == "" {
		return "", fmt.Errorf("post title cannot be empty")
	}
	if opts.Date.IsZero() {
		opts.Date = time.Now()
	}
	if opts.Slug == "" {
		opts.Slug = Slugify(opts.Title)
	}

	yearStr := opts.Date.Format("2006")
	datePrefix := opts.Date.Format("2006-01-02")
	dirOrFileName := fmt.Sprintf("%s-%s", datePrefix, opts.Slug)

	targetDir := filepath.Join(opts.PostsDir, yearStr)
	if err := os.MkdirAll(targetDir, 0755); err != nil {
		return "", fmt.Errorf("failed to create directory %s: %w", targetDir, err)
	}

	var filePath string
	if opts.Bundle {
		bundleDir := filepath.Join(targetDir, dirOrFileName)
		if err := os.MkdirAll(bundleDir, 0755); err != nil {
			return "", fmt.Errorf("failed to create bundle directory %s: %w", bundleDir, err)
		}
		filePath = filepath.Join(bundleDir, "index.md")
	} else {
		filePath = filepath.Join(targetDir, dirOrFileName+".md")
	}

	if _, err := os.Stat(filePath); err == nil {
		return "", fmt.Errorf("file already exists: %s", filePath)
	}

	var sb strings.Builder
	sb.WriteString("---\n")
	sb.WriteString(fmt.Sprintf("title: %q\n", opts.Title))
	sb.WriteString(fmt.Sprintf("date: %s\n", opts.Date.Format("2006-01-02 15:04:05 -0700")))
	if opts.Draft {
		sb.WriteString("draft: true\n")
	}
	sb.WriteString("type: entry\n")
	if len(opts.Tags) > 0 {
		sb.WriteString("tags:\n")
		for _, t := range opts.Tags {
			t = strings.TrimSpace(t)
			if t != "" {
				sb.WriteString(fmt.Sprintf("  - %s\n", t))
			}
		}
	} else {
		sb.WriteString("tags: []\n")
	}
	sb.WriteString("---\n\n")
	sb.WriteString("Write your post content here.\n\n<!--more-->\n")

	if err := os.WriteFile(filePath, []byte(sb.String()), 0644); err != nil {
		return "", fmt.Errorf("failed to write post file: %w", err)
	}

	return filePath, nil
}
