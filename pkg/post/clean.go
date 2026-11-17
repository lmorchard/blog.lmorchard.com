package post

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

// EmptyDraft represents a discovered empty draft file.
type EmptyDraft struct {
	Path   string
	IsDir  bool
	Reason string
}

// IsEmptyDraft checks if a markdown file is a draft with no meaningful content
// beyond whitespace or placeholder text like "- Hello world!".
func IsEmptyDraft(filePath string) (bool, string, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return false, "", err
	}
	contentStr := string(data)

	// Quick check: must mention draft
	if !strings.Contains(contentStr, "draft") {
		return false, "", nil
	}

	posts, err := ParsePostFile(filePath, "")
	if err != nil {
		return false, "", err
	}
	if len(posts) == 0 {
		return false, "", nil
	}

	// Rule 1: EVERY post in the file must be marked draft.
	// If any part of a multipart post or file is published, do NOT delete.
	for _, p := range posts {
		if !p.Draft {
			return false, "", nil
		}
	}

	// Rule 2: For every post in the file, body must be placeholder or empty.
	for _, p := range posts {
		cleanBody := strings.TrimSpace(p.Body)
		if !isPlaceholderBody(cleanBody) {
			return false, "", nil
		}
	}

	return true, "draft with placeholder content", nil
}

func isPlaceholderBody(body string) bool {
	if body == "" {
		return true
	}
	lines := strings.Split(body, "\n")
	var nonBlank []string
	for _, l := range lines {
		trimmed := strings.TrimSpace(l)
		if trimmed != "" {
			nonBlank = append(nonBlank, trimmed)
		}
	}
	if len(nonBlank) == 0 {
		return true
	}
	if len(nonBlank) == 1 {
		norm := strings.ToLower(strings.Trim(nonBlank[0], "-*# \t"))
		if norm == "hello world!" || norm == "hello world" {
			return true
		}
	}
	return false
}

// FindEmptyDrafts scans rootDir for markdown files that qualify as empty drafts.
func FindEmptyDrafts(rootDir string) ([]EmptyDraft, error) {
	var results []EmptyDraft

	err := filepath.WalkDir(rootDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			base := d.Name()
			if strings.HasPrefix(base, ".") || strings.HasPrefix(base, "_") || base == "node_modules" || base == "build" || base == "tmp" {
				return filepath.SkipDir
			}
			return nil
		}
		ext := filepath.Ext(path)
		if ext != ".md" && ext != ".markdown" {
			return nil
		}
		if strings.Contains(path, ".sync-conflict-") {
			return nil
		}

		isEmpty, reason, err := IsEmptyDraft(path)
		if err != nil || !isEmpty {
			return nil
		}

		isDirPost := filepath.Base(path) == "index.md" || filepath.Base(path) == "index.markdown"
		results = append(results, EmptyDraft{
			Path:   path,
			IsDir:  isDirPost,
			Reason: reason,
		})
		return nil
	})

	return results, err
}

// CleanEmptyDrafts finds and optionally deletes empty draft files.
// If dryRun is true, files are not deleted.
func CleanEmptyDrafts(rootDir string, dryRun bool) ([]EmptyDraft, error) {
	drafts, err := FindEmptyDrafts(rootDir)
	if err != nil {
		return nil, err
	}

	if dryRun {
		return drafts, nil
	}

	for _, d := range drafts {
		if err := os.Remove(d.Path); err != nil && !os.IsNotExist(err) {
			return nil, fmt.Errorf("failed to remove %s: %w", d.Path, err)
		}
		if d.IsDir {
			parentDir := filepath.Dir(d.Path)
			// Remove index.json if present
			_ = os.Remove(filepath.Join(parentDir, "index.json"))
			// Remove parent dir if now empty (fails silently if non-empty)
			_ = os.Remove(parentDir)
		}
	}

	return drafts, nil
}
