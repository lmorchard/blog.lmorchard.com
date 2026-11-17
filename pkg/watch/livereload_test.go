package watch

import (
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

func TestLiveReloadHubSubscribeBroadcast(t *testing.T) {
	hub := NewLiveReloadHub()
	ch := hub.Subscribe()
	defer hub.Unsubscribe(ch)

	received := make(chan bool, 1)
	go func() {
		select {
		case <-ch:
			received <- true
		case <-time.After(500 * time.Millisecond):
			received <- false
		}
	}()

	hub.Broadcast()

	if !<-received {
		t.Fatal("Expected broadcast notification on subscriber channel")
	}
}

func TestLiveReloadScriptInjection(t *testing.T) {
	tmpDir, err := os.MkdirTemp("", "livereload-test")
	if err != nil {
		t.Fatal(err)
	}
	defer os.RemoveAll(tmpDir)

	htmlContent := "<html><head><title>Test</title></head><body><h1>Hello</h1></body></html>"
	err = os.WriteFile(filepath.Join(tmpDir, "index.html"), []byte(htmlContent), 0644)
	if err != nil {
		t.Fatal(err)
	}

	hub := NewLiveReloadHub()
	fileServer := http.FileServer(http.Dir(tmpDir))
	handler := hub.InjectLiveReload(tmpDir, fileServer)

	req := httptest.NewRequest("GET", "/", nil)
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)

	resp := rec.Body.String()
	if !strings.Contains(resp, "<!-- blog-ssg live reload -->") {
		t.Fatalf("Expected live reload script injection in HTML response, got:\n%s", resp)
	}
	if !strings.Contains(resp, "new EventSource('/__reload')") {
		t.Fatalf("Expected EventSource script, got:\n%s", resp)
	}
}
