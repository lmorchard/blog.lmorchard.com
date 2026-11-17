package post

import (
	"os"
	"path/filepath"
	"testing"
)

func TestRunDoctorDiagnostics(t *testing.T) {
	tmpDir := t.TempDir()

	// 1. Valid post bundle
	bundle1 := filepath.Join(tmpDir, "2026-11-17-good-post")
	if err := os.MkdirAll(bundle1, 0755); err != nil {
		t.Fatal(err)
	}
	goodContent := `---
title: "Good Post"
tags: [test]
---

Summary here.
<!--more-->

Body here with an image ![hero](./hero.png)
`
	if err := os.WriteFile(filepath.Join(bundle1, "index.md"), []byte(goodContent), 0644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(bundle1, "hero.png"), []byte("data"), 0644); err != nil {
		t.Fatal(err)
	}

	// 2. Post bundle with missing referenced image
	bundle2 := filepath.Join(tmpDir, "2026-11-17-missing-image")
	if err := os.MkdirAll(bundle2, 0755); err != nil {
		t.Fatal(err)
	}
	missingContent := `---
title: "Missing Image Post"
---

Summary here.
<!--more-->

![ghost](./ghost.png)
`
	if err := os.WriteFile(filepath.Join(bundle2, "index.md"), []byte(missingContent), 0644); err != nil {
		t.Fatal(err)
	}

	// 3. Placeholder draft
	bundle3 := filepath.Join(tmpDir, "2026-11-17-empty-draft")
	if err := os.MkdirAll(bundle3, 0755); err != nil {
		t.Fatal(err)
	}
	emptyDraft := `---
title: "Draft"
draft: true
---

- Hello world!
`
	if err := os.WriteFile(filepath.Join(bundle3, "index.md"), []byte(emptyDraft), 0644); err != nil {
		t.Fatal(err)
	}

	report, err := RunDoctor(tmpDir, "https://example.com")
	if err != nil {
		t.Fatalf("RunDoctor failed: %v", err)
	}

	if report.TotalFiles != 3 {
		t.Errorf("expected 3 files, got %d", report.TotalFiles)
	}

	var foundMissingImage, foundPlaceholder bool
	for _, issue := range report.Issues {
		if issue.Severity == SeverityWarn && filepath.Base(filepath.Dir(issue.FilePath)) == "2026-11-17-missing-image" {
			foundMissingImage = true
		}
		if issue.Severity == SeverityWarn && filepath.Base(filepath.Dir(issue.FilePath)) == "2026-11-17-empty-draft" {
			foundPlaceholder = true
		}
	}

	if !foundMissingImage {
		t.Errorf("expected diagnostic for missing image")
	}
	if !foundPlaceholder {
		t.Errorf("expected diagnostic for placeholder draft")
	}
}
