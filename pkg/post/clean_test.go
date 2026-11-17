package post

import (
	"os"
	"path/filepath"
	"testing"
)

func TestCleanEmptyDrafts(t *testing.T) {
	tempDir := t.TempDir()

	// 1. Empty draft (should be identified)
	emptyDraft := filepath.Join(tempDir, "2025-05-30.md")
	contentEmptyDraft := "8<--- {\"draft\": true, \"title\": \"Draft 1\"}\n\n- Hello world!\n"
	if err := os.WriteFile(emptyDraft, []byte(contentEmptyDraft), 0644); err != nil {
		t.Fatal(err)
	}

	// 2. Draft with real content (should NOT be identified)
	realDraft := filepath.Join(tempDir, "2025-05-31.md")
	contentRealDraft := "8<--- {\"draft\": true, \"title\": \"Draft Real\"}\n\n- Hello world!\n- And here is real content.\n"
	if err := os.WriteFile(realDraft, []byte(contentRealDraft), 0644); err != nil {
		t.Fatal(err)
	}

	// 3. Non-draft with hello world (should NOT be identified)
	publishedPost := filepath.Join(tempDir, "2025-06-01.md")
	contentPublished := "8<--- {\"draft\": false, \"title\": \"Published\"}\n\n- Hello world!\n"
	if err := os.WriteFile(publishedPost, []byte(contentPublished), 0644); err != nil {
		t.Fatal(err)
	}

	// 4. Multipart with one published and one draft (should NOT be identified)
	mixedPost := filepath.Join(tempDir, "2025-06-02.md")
	contentMixed := "8<--- {\"draft\": false, \"title\": \"Part 1\"}\n\nPublished aside\n8<--- {\"draft\": true, \"title\": \"Part 2\"}\n\n- Hello world!\n"
	if err := os.WriteFile(mixedPost, []byte(contentMixed), 0644); err != nil {
		t.Fatal(err)
	}

	// 5. Directory post empty draft
	dirPost := filepath.Join(tempDir, "2025-06-03-test")
	_ = os.MkdirAll(dirPost, 0755)
	indexFile := filepath.Join(dirPost, "index.md")
	contentDirDraft := "---\ntitle: Dir Draft\ndraft: true\n---\nHello world!\n"
	if err := os.WriteFile(indexFile, []byte(contentDirDraft), 0644); err != nil {
		t.Fatal(err)
	}

	// Test Dry Run
	found, err := CleanEmptyDrafts(tempDir, true)
	if err != nil {
		t.Fatalf("CleanEmptyDrafts dry-run failed: %v", err)
	}

	if len(found) != 2 {
		t.Fatalf("expected 2 empty drafts in dry run, got %d", len(found))
	}

	// Verify files still exist after dry run
	if _, err := os.Stat(emptyDraft); err != nil {
		t.Errorf("emptyDraft was unexpectedly removed during dry-run")
	}
	if _, err := os.Stat(indexFile); err != nil {
		t.Errorf("indexFile was unexpectedly removed during dry-run")
	}

	// Test Actual Deletion
	deleted, err := CleanEmptyDrafts(tempDir, false)
	if err != nil {
		t.Fatalf("CleanEmptyDrafts delete failed: %v", err)
	}
	if len(deleted) != 2 {
		t.Fatalf("expected 2 deleted drafts, got %d", len(deleted))
	}

	// Check deleted files are gone
	if _, err := os.Stat(emptyDraft); !os.IsNotExist(err) {
		t.Errorf("emptyDraft should have been deleted")
	}
	if _, err := os.Stat(indexFile); !os.IsNotExist(err) {
		t.Errorf("indexFile should have been deleted")
	}
	if _, err := os.Stat(dirPost); !os.IsNotExist(err) {
		t.Errorf("dirPost directory should have been deleted")
	}

	// Check safe files still exist
	if _, err := os.Stat(realDraft); err != nil {
		t.Errorf("realDraft should NOT have been deleted")
	}
	if _, err := os.Stat(publishedPost); err != nil {
		t.Errorf("publishedPost should NOT have been deleted")
	}
	if _, err := os.Stat(mixedPost); err != nil {
		t.Errorf("mixedPost should NOT have been deleted")
	}
}
