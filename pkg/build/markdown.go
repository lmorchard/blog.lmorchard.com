package build

import (
	"fmt"
	"strings"
	"time"

	"blog-ssg/pkg/post"
	"blog-ssg/pkg/template"
)

// RenderPostMarkdown renders the published companion index.md with frontmatter.
func RenderPostMarkdown(site template.SiteConfig, p *post.Post) string {
	var sb strings.Builder

	sb.WriteString("---\n")
	if p.Title != "" {
		sb.WriteString(fmt.Sprintf("title: %q\n", p.Title))
	}
	sb.WriteString(fmt.Sprintf("date: %s\n", p.Date.Format(time.RFC3339)))
	sb.WriteString(fmt.Sprintf("url: %s/%s/\n", site.AbsoluteBaseURL, p.Path))
	if site.Author.FullName != "" {
		sb.WriteString(fmt.Sprintf("author: %q\n", site.Author.FullName))
	}
	if len(p.Tags) > 0 {
		var quotedTags []string
		for _, tag := range p.Tags {
			quotedTags = append(quotedTags, fmt.Sprintf("%q", tag))
		}
		sb.WriteString(fmt.Sprintf("tags: [%s]\n", strings.Join(quotedTags, ", ")))
	}
	sb.WriteString("---\n\n")

	// Prepend title heading if not already starting with H1
	trimmedBody := strings.TrimLeft(p.Body, "\r\n")
	if p.Title != "" && !strings.HasPrefix(trimmedBody, "# ") {
		sb.WriteString(fmt.Sprintf("# %s\n\n", strings.TrimSpace(p.Title)))
	}

	sb.WriteString(trimmedBody)
	sb.WriteString("\n")

	return sb.String()
}
