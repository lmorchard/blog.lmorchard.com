package watch

import (
	"os"
	"path/filepath"
	"testing"
	"time"
)

func TestWatcherDebounce(t *testing.T) {
	tmpDir := t.TempDir()

	ch := make(chan []string, 1)
	w, err := NewWatcher([]string{tmpDir}, 100*time.Millisecond, func(changed []string) {
		ch <- changed
	})
	if err != nil {
		t.Fatalf("NewWatcher failed: %v", err)
	}
	defer w.Close()

	w.Start()

	// Write a file
	testFile := filepath.Join(tmpDir, "test.md")
	if err := os.WriteFile(testFile, []byte("hello"), 0644); err != nil {
		t.Fatalf("failed to write test file: %v", err)
	}

	select {
	case changed := <-ch:
		if len(changed) == 0 {
			t.Errorf("expected changed files, got 0")
		}
	case <-time.After(2 * time.Second):
		t.Errorf("timed out waiting for watch event")
	}
}
