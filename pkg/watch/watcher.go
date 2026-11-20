package watch

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/fsnotify/fsnotify"
)

type Watcher struct {
	fswatcher *fsnotify.Watcher
	debounce  time.Duration
	onChange  func(changedFiles []string)
	roots     []string

	mu      sync.Mutex
	timer   *time.Timer
	pending map[string]bool
	stopCh  chan struct{}
}

// NewWatcher creates a recursive directory watcher with debounced change notifications.
func NewWatcher(roots []string, debounce time.Duration, onChange func(changedFiles []string)) (*Watcher, error) {
	if debounce <= 0 {
		debounce = 2 * time.Second
	}

	fsw, err := fsnotify.NewWatcher()
	if err != nil {
		return nil, fmt.Errorf("failed to create fsnotify watcher: %w", err)
	}

	w := &Watcher{
		fswatcher: fsw,
		debounce:  debounce,
		onChange:  onChange,
		roots:     roots,
		pending:   make(map[string]bool),
		stopCh:    make(chan struct{}),
	}

	// Add all directories recursively
	for _, root := range roots {
		if err := w.addRecursive(root); err != nil {
			// Directory might not exist yet; skip
			continue
		}
	}

	return w, nil
}

func (w *Watcher) addRecursive(root string) error {
	return filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return nil
		}
		if d.IsDir() {
			base := d.Name()
			if strings.HasPrefix(base, ".") || base == "node_modules" || base == "build" || base == "tmp" {
				return filepath.SkipDir
			}
			_ = w.fswatcher.Add(path)
		}
		return nil
	})
}

// Start listens for filesystem events and triggers the debounced callback.
func (w *Watcher) Start() {
	go func() {
		for {
			select {
			case <-w.stopCh:
				return
			case event, ok := <-w.fswatcher.Events:
				if !ok {
					return
				}

				// Skip chmod or non-modifying events
				if event.Has(fsnotify.Chmod) {
					continue
				}

				// If a new directory is created, watch it recursively
				if event.Has(fsnotify.Create) {
					if info, err := os.Stat(event.Name); err == nil && info.IsDir() {
						_ = w.addRecursive(event.Name)
					}
				}

				w.recordChange(event.Name)

			case err, ok := <-w.fswatcher.Errors:
				if !ok {
					return
				}
				fmt.Fprintf(os.Stderr, "Watch error: %v\n", err)
			}
		}
	}()
}

func (w *Watcher) recordChange(file string) {
	w.mu.Lock()
	defer w.mu.Unlock()

	w.pending[file] = true

	if w.timer != nil {
		w.timer.Stop()
	}

	w.timer = time.AfterFunc(w.debounce, func() {
		w.mu.Lock()
		var changed []string
		for f := range w.pending {
			changed = append(changed, f)
		}
		w.pending = make(map[string]bool)
		w.mu.Unlock()

		if len(changed) > 0 && w.onChange != nil {
			w.onChange(changed)
		}
	})
}

// Close stops the watcher.
func (w *Watcher) Close() error {
	close(w.stopCh)
	w.mu.Lock()
	if w.timer != nil {
		w.timer.Stop()
	}
	w.mu.Unlock()
	return w.fswatcher.Close()
}
