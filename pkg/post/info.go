package post

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"
)

// PostInfo contains metadata and statistics for a single post.
type PostInfo struct {
	FilePath    string    `json:"file_path"`
	Title       string    `json:"title"`
	Slug        string    `json:"slug"`
	Date        time.Time `json:"date"`
	Type        string    `json:"type"`
	Draft       bool      `json:"draft"`
	Tags        []string  `json:"tags"`
	WordCount   int       `json:"word_count"`
	ReadingTime int       `json:"reading_time_minutes"`
	Summary     string    `json:"summary"`
	URLPath     string    `json:"url_path"`
	Attachments []string  `json:"attachments,omitempty"`
	PartIndex   int       `json:"part_index,omitempty"`
	TotalParts  int       `json:"total_parts,omitempty"`
}

// InspectPost loads and analyzes a post file or bundle directory.
func InspectPost(targetPath string, baseurl string) ([]PostInfo, error) {
	fi, err := os.Stat(targetPath)
	if err != nil {
		return nil, fmt.Errorf("cannot stat %s: %w", targetPath, err)
	}

	filePath := targetPath
	var dirPath string
	if fi.IsDir() {
		dirPath = targetPath
		filePath = filepath.Join(targetPath, "index.md")
		if _, err := os.Stat(filePath); err != nil {
			return nil, fmt.Errorf("no index.md found in bundle directory %s", targetPath)
		}
	} else if filepath.Base(targetPath) == "index.md" {
		dirPath = filepath.Dir(targetPath)
	}

	posts, err := ParsePostFile(filePath, baseurl)
	if err != nil {
		return nil, fmt.Errorf("error parsing post %s: %w", filePath, err)
	}
	if len(posts) == 0 {
		return nil, fmt.Errorf("no posts found in %s", filePath)
	}

	var attachments []string
	if dirPath != "" {
		entries, _ := os.ReadDir(dirPath)
		for _, e := range entries {
			name := e.Name()
			if !e.IsDir() && name != "index.md" && name != "index.html" && name != "index.json" && !strings.HasPrefix(name, ".") {
				attachments = append(attachments, name)
			}
		}
	}

	var results []PostInfo
	for i, p := range posts {
		words := len(strings.Fields(p.Body))
		readingTime := (words + 199) / 200
		if readingTime == 0 && words > 0 {
			readingTime = 1
		}

		info := PostInfo{
			FilePath:    filePath,
			Title:       p.Title,
			Slug:        p.Slug,
			Date:        p.Date,
			Type:        p.Type,
			Draft:       p.Draft,
			Tags:        p.Tags,
			WordCount:   words,
			ReadingTime: readingTime,
			Summary:     p.Summary,
			URLPath:     p.Path,
			Attachments: attachments,
		}
		if len(posts) > 1 {
			info.PartIndex = i + 1
			info.TotalParts = len(posts)
		}
		results = append(results, info)
	}

	return results, nil
}

// FormatPostInfo returns a human-readable summary block for terminal display.
func FormatPostInfo(info PostInfo) string {
	var sb strings.Builder

	if info.TotalParts > 1 {
		sb.WriteString(fmt.Sprintf("Part %d of %d (multipart file):\n", info.PartIndex, info.TotalParts))
	}

	title := info.Title
	if title == "" {
		title = "(untitled)"
	}
	sb.WriteString(fmt.Sprintf("  Title:        %s\n", title))
	sb.WriteString(fmt.Sprintf("  Slug:         %s\n", info.Slug))
	sb.WriteString(fmt.Sprintf("  Date:         %s\n", info.Date.Format("2006-01-02 15:04:05 -0700")))

	draftStatus := "no"
	if info.Draft {
		draftStatus = "YES (draft)"
	}
	sb.WriteString(fmt.Sprintf("  Type:         %s (draft: %s)\n", info.Type, draftStatus))

	if len(info.Tags) > 0 {
		sb.WriteString(fmt.Sprintf("  Tags:         %s\n", strings.Join(info.Tags, ", ")))
	} else {
		sb.WriteString("  Tags:         (none)\n")
	}

	sb.WriteString(fmt.Sprintf("  Word Count:   %d words (~%d min read)\n", info.WordCount, info.ReadingTime))
	sb.WriteString(fmt.Sprintf("  URL Path:     /%s/\n", info.URLPath))

	if len(info.Attachments) > 0 {
		sb.WriteString(fmt.Sprintf("  Attachments:  %s\n", strings.Join(info.Attachments, ", ")))
	}

	if info.Summary != "" {
		cleanSummary := strings.ReplaceAll(info.Summary, "\n", " ")
		if len(cleanSummary) > 120 {
			cleanSummary = cleanSummary[:117] + "..."
		}
		sb.WriteString(fmt.Sprintf("  Excerpt:      %s\n", cleanSummary))
	}

	return sb.String()
}
