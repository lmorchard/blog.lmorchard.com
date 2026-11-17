package post

import (
	"io/fs"
	"path/filepath"
	"runtime"
	"sort"
	"strings"
	"sync"
)

// LoadAllPosts walks rootDir for markdown posts, parses them concurrently,
// sorts them newest first, and links chronological prev/next references.
func LoadAllPosts(rootDir string, baseurl string, showDrafts bool) ([]*Post, error) {
	var filePaths []string

	err := filepath.WalkDir(rootDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		// Skip hidden or special directories
		if d.IsDir() {
			base := d.Name()
			if strings.HasPrefix(base, "_") || base == "node_modules" || base == "build" || base == "tmp" {
				return filepath.SkipDir
			}
			return nil
		}

		// Skip non-markdown files or sync conflicts
		ext := filepath.Ext(path)
		if ext != ".md" && ext != ".markdown" {
			return nil
		}
		if strings.Contains(path, ".sync-conflict-") {
			return nil
		}

		filePaths = append(filePaths, path)
		return nil
	})

	if err != nil {
		return nil, err
	}

	numWorkers := runtime.NumCPU()
	if numWorkers < 1 {
		numWorkers = 1
	}

	pathCh := make(chan string, len(filePaths))
	for _, p := range filePaths {
		pathCh <- p
	}
	close(pathCh)

	var (
		mu       sync.Mutex
		allPosts []*Post
		wg       sync.WaitGroup
	)

	wg.Add(numWorkers)
	for i := 0; i < numWorkers; i++ {
		go func() {
			defer wg.Done()
			var localPosts []*Post
			for path := range pathCh {
				posts, err := ParsePostFile(path, baseurl)
				if err != nil {
					continue
				}
				for _, p := range posts {
					if p != nil {
						if !p.Draft || showDrafts {
							localPosts = append(localPosts, p)
						}
					}
				}
			}
			if len(localPosts) > 0 {
				mu.Lock()
				allPosts = append(allPosts, localPosts...)
				mu.Unlock()
			}
		}()
	}
	wg.Wait()

	// Sort posts descending (newest first)
	sort.Slice(allPosts, func(i, j int) bool {
		return allPosts[i].Date.After(allPosts[j].Date)
	})

	// Link chronological prev/next
	// Posts are descending (index 0 is newest)
	// prevPost is chronologically EARLIER (older)
	// nextPost is chronologically LATER (newer)
	var laterPost *Post
	for _, post := range allPosts {
		if laterPost != nil {
			laterPost.PrevPostPath = post.Path
			laterPost.PrevPostTitle = post.Title
			post.NextPostPath = laterPost.Path
			post.NextPostTitle = laterPost.Title
		}
		laterPost = post
	}

	return allPosts, nil
}
