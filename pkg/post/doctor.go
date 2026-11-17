package post

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

// IssueSeverity indicates the level of a doctor diagnostic.
type IssueSeverity string

const (
	SeverityError IssueSeverity = "ERROR"
	SeverityWarn  IssueSeverity = "WARN"
	SeverityInfo  IssueSeverity = "INFO"
)

// DoctorIssue represents a diagnostic finding for a post file.
type DoctorIssue struct {
	FilePath string        `json:"file_path"`
	Severity IssueSeverity `json:"severity"`
	Message  string        `json:"message"`
}

// DoctorReport contains the aggregated findings of a health check run.
type DoctorReport struct {
	TotalFiles  int           `json:"total_files"`
	TotalPosts  int           `json:"total_posts"`
	TotalDrafts int           `json:"total_drafts"`
	Issues      []DoctorIssue `json:"issues"`
}

// RunDoctor scans all posts under postsDir and diagnoses metadata, asset, and syntax issues.
func RunDoctor(postsDir string, baseurl string) (*DoctorReport, error) {
	report := &DoctorReport{}

	err := filepath.WalkDir(postsDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			if strings.HasPrefix(d.Name(), ".") {
				return filepath.SkipDir
			}
			return nil
		}

		ext := filepath.Ext(path)
		if ext != ".md" && ext != ".markdown" {
			return nil
		}
		if strings.HasPrefix(d.Name(), ".") {
			return nil
		}

		report.TotalFiles++
		checkPostFile(path, baseurl, report)
		return nil
	})

	return report, err
}

func checkPostFile(path string, baseurl string, report *DoctorReport) {
	data, err := os.ReadFile(path)
	if err != nil {
		report.Issues = append(report.Issues, DoctorIssue{
			FilePath: path,
			Severity: SeverityError,
			Message:  fmt.Sprintf("cannot read file: %v", err),
		})
		return
	}

	content := string(data)

	posts, err := ParsePostFile(path, baseurl)
	if err != nil {
		report.Issues = append(report.Issues, DoctorIssue{
			FilePath: path,
			Severity: SeverityError,
			Message:  fmt.Sprintf("parsing error: %v", err),
		})
		return
	}

	dir := filepath.Dir(path)
	isBundle := filepath.Base(path) == "index.md"

	for _, p := range posts {
		report.TotalPosts++
		if p.Draft {
			report.TotalDrafts++
			if isPlaceholderBody(strings.TrimSpace(p.Body)) {
				report.Issues = append(report.Issues, DoctorIssue{
					FilePath: path,
					Severity: SeverityWarn,
					Message:  "file appears to be an unedited empty placeholder draft",
				})
			}
		}

		// Check for missing title on standard entries
		if p.Type == "entry" && p.Title == "" {
			report.Issues = append(report.Issues, DoctorIssue{
				FilePath: path,
				Severity: SeverityWarn,
				Message:  "entry post has no title (will fall back to first heading or date)",
			})
		}

		// Check for long posts missing the <!--more--> excerpt marker
		words := len(strings.Fields(p.Body))
		if p.Type == "entry" && words > 300 && !strings.Contains(content, SummaryMarker) {
			report.Issues = append(report.Issues, DoctorIssue{
				FilePath: path,
				Severity: SeverityInfo,
				Message:  fmt.Sprintf("long post (%d words) is missing <!--more--> excerpt fold marker", words),
			})
		}

		// Check local image references in directory bundles
		if isBundle {
			for _, match := range reMdImg.FindAllStringSubmatch(p.Body, -1) {
				if len(match) > 1 {
					src := match[1]
					checkLocalAsset(dir, path, src, report)
				}
			}
			for _, match := range reHtmlImg.FindAllStringSubmatch(p.HTML, -1) {
				if len(match) > 1 {
					src := match[1]
					checkLocalAsset(dir, path, src, report)
				}
			}
		}
	}
}

func checkLocalAsset(bundleDir string, postPath string, src string, report *DoctorReport) {
	// Skip external or root-absolute URLs
	if strings.HasPrefix(src, "http://") || strings.HasPrefix(src, "https://") || strings.HasPrefix(src, "/") {
		return
	}
	cleanSrc := strings.TrimPrefix(src, "./")
	target := filepath.Join(bundleDir, cleanSrc)
	if _, err := os.Stat(target); err != nil {
		report.Issues = append(report.Issues, DoctorIssue{
			FilePath: postPath,
			Severity: SeverityWarn,
			Message:  fmt.Sprintf("missing co-located asset referenced in post: %s", cleanSrc),
		})
	}
}
