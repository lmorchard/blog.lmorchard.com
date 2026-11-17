package search

import (
	"os"
	"os/exec"
	"testing"
)

func TestQueryIndexAgainstLiveBuild(t *testing.T) {
	if _, err := exec.LookPath("node"); err != nil {
		t.Skip("node not available on PATH")
	}
	if _, err := os.Stat("../../build/pagefind/pagefind.js"); err != nil {
		t.Skip("build/pagefind/pagefind.js not available")
	}

	results, err := QueryIndex("../../build", "tempest", 5)
	if err != nil {
		t.Fatalf("QueryIndex failed: %v", err)
	}

	if len(results) == 0 {
		t.Errorf("expected search results for 'tempest', got 0")
	}

	for _, r := range results {
		if r.Title == "" {
			t.Errorf("result %d has empty title", r.Index)
		}
		if r.URL == "" {
			t.Errorf("result %d has empty URL", r.Index)
		}
	}
}
