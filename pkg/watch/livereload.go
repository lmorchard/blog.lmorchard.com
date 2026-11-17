package watch

import (
	"bytes"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"
)

const liveReloadScript = `
<!-- blog-ssg live reload -->
<script>
(function() {
  const es = new EventSource('/__reload');
  es.addEventListener('reload', function() {
    console.log('[live-reload] Change detected, reloading...');
    location.reload();
  });
})();
</script>
`

type LiveReloadHub struct {
	mu      sync.Mutex
	clients map[chan struct{}]bool
}

func NewLiveReloadHub() *LiveReloadHub {
	return &LiveReloadHub{
		clients: make(map[chan struct{}]bool),
	}
}

func (h *LiveReloadHub) Subscribe() chan struct{} {
	h.mu.Lock()
	defer h.mu.Unlock()
	ch := make(chan struct{}, 1)
	h.clients[ch] = true
	return ch
}

func (h *LiveReloadHub) Unsubscribe(ch chan struct{}) {
	h.mu.Lock()
	defer h.mu.Unlock()
	delete(h.clients, ch)
}

func (h *LiveReloadHub) Broadcast() {
	h.mu.Lock()
	defer h.mu.Unlock()
	for ch := range h.clients {
		select {
		case ch <- struct{}{}:
		default:
		}
	}
}

// SSEHandler returns an http.HandlerFunc that serves the SSE stream.
func (h *LiveReloadHub) SSEHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Connection", "keep-alive")

		ch := h.Subscribe()
		defer h.Unsubscribe(ch)

		// Send initial connected event
		fmt.Fprintf(w, "event: connected\ndata: ready\n\n")
		if flusher, ok := w.(http.Flusher); ok {
			flusher.Flush()
		}

		ctx := r.Context()
		for {
			select {
			case <-ctx.Done():
				return
			case <-ch:
				fmt.Fprintf(w, "event: reload\ndata: reload\n\n")
				if flusher, ok := w.(http.Flusher); ok {
					flusher.Flush()
				}
			}
		}
	}
}

// InjectLiveReload returns an http.Handler that wraps a static FileServer,
// serving /__reload SSE endpoint and injecting the live reload script into HTML files.
func (h *LiveReloadHub) InjectLiveReload(buildDir string, fallback http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/__reload" {
			h.SSEHandler()(w, r)
			return
		}

		// Check if this request is for an HTML page
		reqPath := filepath.Clean(r.URL.Path)
		targetFile := filepath.Join(buildDir, reqPath)

		// Check if it's a directory
		if info, err := os.Stat(targetFile); err == nil && info.IsDir() {
			targetFile = filepath.Join(targetFile, "index.html")
		} else if !strings.HasSuffix(targetFile, ".html") {
			// Also check if appending .html works
			if _, err := os.Stat(targetFile + ".html"); err == nil {
				targetFile = targetFile + ".html"
			}
		}

		if strings.HasSuffix(targetFile, ".html") {
			if content, err := os.ReadFile(targetFile); err == nil {
				// Inject script before </body>
				idx := bytes.LastIndex(content, []byte("</body>"))
				if idx != -1 {
					var buf bytes.Buffer
					buf.Write(content[:idx])
					buf.WriteString(liveReloadScript)
					buf.Write(content[idx:])
					content = buf.Bytes()
				}
				w.Header().Set("Content-Type", "text/html; charset=utf-8")
				w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
				w.WriteHeader(http.StatusOK)
				_, _ = w.Write(content)
				return
			}
		}

		fallback.ServeHTTP(w, r)
	})
}
