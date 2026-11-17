package post

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestInspectPost(t *testing.T) {
	tmpDir := t.TempDir()
	bundleDir := filepath.Join(tmpDir, "2026-11-17-test-post")
	if err := os.MkdirAll(bundleDir, 0755); err != nil {
		t.Fatalf("failed to create bundle dir: %v", err)
	}

	postFile := filepath.Join(bundleDir, "index.md")
	content := `---
title: "Testing Inspector"
tags:
  - golang
  - testing
draft: true
---

This is a test summary before the fold.

<!--more-->

Here is the remainder of the post content with several words to test word counting.
`
	if err := os.WriteFile(postFile, []byte(content), 0644); err != nil {
		t.Fatalf("failed to write post: %v", err)
	}

	// Add an attachment
	if err := os.WriteFile(filepath.Join(bundleDir, "hero.png"), []byte("dummy"), 0644); err != nil {
		t.Fatalf("failed to write attachment: %v", err)
	}

	// Test passing directory
	infos, err := InspectPost(bundleDir, "https://example.com")
	if err != nil {
		t.Fatalf("InspectPost failed on directory: %v", err)
	}
	if len(infos) != 1 {
		t.Fatalf("expected 1 info, got %d", len(infos))
	}

	info := infos[0]
	if info.Title != "Testing Inspector" {
		t.Errorf("expected title 'Testing Inspector', got %q", info.Title)
	}
	if !info.Draft {
		t.Errorf("expected draft=true")
	}
	if len(info.Tags) != 2 {
		t.Errorf("expected 2 tags, got %d", len(info.Tags))
	}
	if len(info.Attachments) != 1 || info.Attachments[0] != "hero.png" {
		t.Errorf("expected attachment [hero.png], got %v", info.Attachments)
	}
	if info.WordCount <= 0 {
		t.Errorf("expected word count > 0, got %d", info.WordCount)
	}

	formatted := FormatPostInfo(info)
	if !strings.Contains(formatted, "Testing Inspector") {
		t.Errorf("expected formatted output to contain title, got:\n%s", formatted)
	}
}
