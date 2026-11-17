package post

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/adrg/frontmatter"
	"github.com/yuin/goldmark"
	"github.com/yuin/goldmark/extension"
	"github.com/yuin/goldmark/parser"
	"github.com/yuin/goldmark/renderer/html"
)

const (
	SummaryMarker          = "<!--more-->"
	PostMultipartSeparator = "8<---"
	DefaultTime            = "12:00:00-07:00"
)

var (
	rePostName = regexp.MustCompile(`^(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})(-(?P<slug>.*))?$`)
	reHashtag  = regexp.MustCompile(`(^|\s)#([a-zA-Z0-9]+)`)
	reInclude  = regexp.MustCompile(`\{\{(.*?)\}\}`)
	reObsidian = regexp.MustCompile(`!\[\[(.*?)\]\]`)
	reMdImg    = regexp.MustCompile(`!\[.*?\]\(([^)]+)\)`)
	reHtmlImg  = regexp.MustCompile(`(?i)<img[^>]+src=["']([^"']+)["'][^>]*>`)
	reNonAlnum = regexp.MustCompile(`[^a-z0-9\s]`)
	reSpaces   = regexp.MustCompile(`\s+`)
	reTabs     = regexp.MustCompile(`(?m)^(\t+)`)
)

var mdRenderer = goldmark.New(
	goldmark.WithExtensions(
		extension.GFM,
		extension.Table,
		extension.Strikethrough,
		extension.Linkify,
	),
	goldmark.WithParserOptions(
		parser.WithAutoHeadingID(),
	),
	goldmark.WithRendererOptions(
		html.WithUnsafe(), // Allow raw HTML embedded in markdown
	),
)

// ParsePostFile parses a markdown file, returning one or more posts (for multipart files).
func ParsePostFile(filePath string, baseurl string) ([]*Post, error) {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}
	contentStr := string(data)

	if strings.Contains(contentStr, PostMultipartSeparator) {
		return parseMultipartFile(contentStr, filePath, baseurl)
	}

	post, err := parseSinglePost(contentStr, filePath, baseurl, nil)
	if err != nil {
		return nil, err
	}
	if post == nil {
		return nil, nil
	}
	return []*Post{post}, nil
}

type multipartPart struct {
	attributes map[string]interface{}
	content    string
}

func parseMultipartFile(data string, filePath string, baseurl string) ([]*Post, error) {
	rawParts := strings.Split(data, PostMultipartSeparator)
	var posts []*Post

	for _, part := range rawParts {
		trimmed := strings.TrimSpace(part)
		if trimmed == "" {
			continue
		}

		attrs := map[string]interface{}{
			"type": "aside",
		}

		lines := strings.Split(trimmed, "\n")
		firstLine := strings.TrimSpace(lines[0])
		bodyContent := trimmed

		if strings.HasPrefix(firstLine, "{") && strings.HasSuffix(firstLine, "}") {
			var jsonAttrs map[string]interface{}
			if err := json.Unmarshal([]byte(firstLine), &jsonAttrs); err == nil {
				for k, v := range jsonAttrs {
					attrs[k] = v
				}
				bodyContent = strings.TrimSpace(strings.Join(lines[1:], "\n"))
			}
		}

		if bodyContent == "" {
			continue
		}

		post, err := parseSinglePost(bodyContent, filePath, baseurl, attrs)
		if err != nil {
			return nil, err
		}
		if post != nil {
			posts = append(posts, post)
		}
	}

	return posts, nil
}

func parseSinglePost(data string, filePath string, baseurl string, extraAttrs map[string]interface{}) (*Post, error) {
	dir := filepath.Dir(filePath)
	base := filepath.Base(filePath)
	isDir := strings.HasPrefix(base, "index.")

	var postName string
	if isDir {
		postName = filepath.Base(dir)
	} else {
		ext := filepath.Ext(base)
		postName = strings.TrimSuffix(base, ext)
	}

	match := rePostName.FindStringSubmatch(postName)
	if match == nil {
		// Not a post file matching YYYY-MM-DD pattern
		return nil, nil
	}

	year := match[rePostName.SubexpIndex("year")]
	month := match[rePostName.SubexpIndex("month")]
	day := match[rePostName.SubexpIndex("day")]
	var slugFromPostName string
	if slugIdx := rePostName.SubexpIndex("slug"); slugIdx >= 0 && slugIdx < len(match) {
		slugFromPostName = match[slugIdx]
	}

	// Frontmatter extraction
	var fm FrontmatterData
	bodyBytes, err := frontmatter.Parse(strings.NewReader(data), &fm)
	if err != nil {
		// If frontmatter parsing fails, treat entire content as body
		bodyBytes = []byte(data)
	}
	rawBody := string(bodyBytes)

	// Resolve file includes {{path/to/file}}
	rawBody = handleIncludes(filePath, rawBody)

	// Pre-markdown cleanups
	cleanedBody, attachments := preProcessBody(rawBody, baseurl)

	// Markdown to HTML via goldmark
	var buf bytes.Buffer
	if err := mdRenderer.Convert([]byte(cleanedBody), &buf); err != nil {
		return nil, fmt.Errorf("markdown conversion error on %s: %w", filePath, err)
	}
	renderedHTML := buf.String()

	// Post-processing HTML using goquery
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(renderedHTML))
	if err != nil {
		return nil, err
	}

	// Strip width and height on img tags (matching original SSG behavior)
	doc.Find("img").Each(func(i int, s *goquery.Selection) {
		s.RemoveAttr("width")
		s.RemoveAttr("height")
	})

	// Extract title from h1..h6 if not explicitly set
	title := fm.Title
	if extraAttrs != nil {
		if t, ok := extraAttrs["title"].(string); ok && t != "" {
			title = t
		}
	}
	if title == "" {
		for i := 1; i <= 6; i++ {
			h := doc.Find(fmt.Sprintf("h%d", i)).First()
			if h.Length() > 0 {
				title = strings.TrimSpace(h.Text())
				break
			}
		}
	}

	postType := fm.Type
	if postType == "" && extraAttrs != nil {
		if t, ok := extraAttrs["type"].(string); ok && t != "" {
			postType = t
		}
	}
	if postType == "" {
		postType = "entry"
	}

	// Determine slug
	slug := fm.Slug
	if slug == "" && extraAttrs != nil {
		if s, ok := extraAttrs["slug"].(string); ok && s != "" {
			slug = s
		}
	}
	if slug == "" && slugFromPostName != "" {
		slug = slugFromPostName
	}
	if slug == "" && title != "" {
		slug = slugify(title, 7)
	}
	if slug == "" {
		slug = slugify(cleanedBody, 7)
	}

	// Determine date/time
	postDate := resolvePostDate(fm.Date, fm.Time, year, month, day)

	postPath := fmt.Sprintf("%04d/%02d/%02d/%s", postDate.Year(), postDate.Month(), postDate.Day(), slug)

	// Extract or determine tags
	tags := normalizeTags(fm.Tags)
	if extraAttrs != nil {
		if extraTags, ok := extraAttrs["tags"]; ok {
			tags = append(tags, normalizeTags(extraTags)...)
		}
	}

	finalHTML, _ := doc.Find("body").Html()
	if finalHTML == "" {
		finalHTML = renderedHTML
	}

	// Extract summary
	summary := fm.Summary
	if summary == "" {
		summary = extractSummary(renderedHTML)
	}

	// Extract thumbnail
	thumbnail := fm.Thumbnail
	if thumbnail == "" {
		thumbnail = extractThumbnail(doc, postPath, baseurl)
	} else if !strings.HasPrefix(thumbnail, "http://") && !strings.HasPrefix(thumbnail, "https://") {
		if !strings.HasPrefix(thumbnail, "/") {
			thumbnail = fmt.Sprintf("%s/%s/%s", baseurl, postPath, thumbnail)
		} else if !strings.HasPrefix(thumbnail, baseurl) {
			thumbnail = baseurl + thumbnail
		}
	}

	draft := fm.Draft
	if extraAttrs != nil {
		if d, ok := extraAttrs["draft"].(bool); ok {
			draft = d
		}
	}

	commentsArchived := fm.CommentsArchived
	if !commentsArchived && extraAttrs != nil {
		if ca, ok := extraAttrs["comments_archived"].(bool); ok {
			commentsArchived = ca
		}
	}

	return &Post{
		Title:            title,
		Date:             postDate,
		Slug:             slug,
		Type:             postType,
		Tags:             tags,
		Thumbnail:        thumbnail,
		Summary:          summary,
		Draft:            draft,
		CommentsArchived: commentsArchived,
		Year:             year,
		Month:            month,
		Day:              day,
		PostName:         postName,
		IsDir:            isDir,
		Path:             postPath,
		Body:             rawBody,
		HTML:             finalHTML,
		SourceFile:       filePath,
		ParentPath:       dir,
		Attachments:      attachments,
	}, nil
}

func handleIncludes(filePath string, body string) string {
	dir := filepath.Dir(filePath)
	return reInclude.ReplaceAllStringFunc(body, func(m string) string {
		sub := reInclude.FindStringSubmatch(m)
		if len(sub) < 2 {
			return m
		}
		relFile := strings.TrimSpace(sub[1])
		targetPath := filepath.Join(dir, relFile)
		incData, err := os.ReadFile(targetPath)
		if err != nil {
			return m
		}
		return string(incData)
	})
}

func preProcessBody(bodyIn string, baseurl string) (string, []string) {
	body := bodyIn

	// Archived comments indentation fix
	const marker = `<div id="comments" class="comments archived-comments">`
	if idx := strings.Index(body, marker); idx != -1 {
		part1 := body[:idx]
		part2 := body[idx+len(marker):]
		// remove leading whitespace on each line of comments
		lines := strings.Split(part2, "\n")
		for i, l := range lines {
			lines[i] = strings.TrimLeft(l, " \t")
		}
		body = part1 + marker + strings.Join(lines, "\n")
	}

	// Convert leading tabs to 4 spaces
	body = reTabs.ReplaceAllStringFunc(body, func(match string) string {
		tabsCount := len(match)
		return strings.Repeat("    ", tabsCount)
	})

	// Fix line ending quirks
	body = strings.ReplaceAll(body, "<br /><br />", "\n\n")
	body = strings.ReplaceAll(body, "<br />", "\n\n")
	body = strings.ReplaceAll(body, "</ul>", "</ul>\n\n")
	body = strings.ReplaceAll(body, "</small>", "</small>\n\n")
	body = strings.ReplaceAll(body, "</blockquote>", "</blockquote>\n\n")
	body = strings.ReplaceAll(body, "</div>", "</div>\n\n")
	body = strings.ReplaceAll(body, "<!--more-->", "\n\n<!--more-->\n\n")

	// Process hashtags
	body = reHashtag.ReplaceAllStringFunc(body, func(m string) string {
		sub := reHashtag.FindStringSubmatch(m)
		if len(sub) < 3 {
			return m
		}
		space := sub[1]
		tag := sub[2]
		return fmt.Sprintf("%s[#%s](%s/tag/%s)", space, tag, baseurl, tag)
	})

	// Obsidian & markdown attachments
	var attachments []string
	seen := make(map[string]bool)

	// Obsidian ![[image.jpg]]
	body = reObsidian.ReplaceAllStringFunc(body, func(m string) string {
		sub := reObsidian.FindStringSubmatch(m)
		if len(sub) < 2 {
			return m
		}
		imgPath := sub[1]
		if !seen[imgPath] {
			attachments = append(attachments, imgPath)
			seen[imgPath] = true
		}
		return fmt.Sprintf(`<img src="%s" />`, imgPath)
	})

	// Markdown attachments ![alt](path)
	for _, match := range reMdImg.FindAllStringSubmatch(body, -1) {
		if len(match) > 1 {
			imgPath := match[1]
			if !strings.HasPrefix(imgPath, "http://") && !strings.HasPrefix(imgPath, "https://") && !strings.HasPrefix(imgPath, "/") {
				if !seen[imgPath] {
					attachments = append(attachments, imgPath)
					seen[imgPath] = true
				}
			}
		}
	}

	// HTML img attachments <img src="path" />
	for _, match := range reHtmlImg.FindAllStringSubmatch(body, -1) {
		if len(match) > 1 {
			imgPath := match[1]
			if !strings.HasPrefix(imgPath, "http://") && !strings.HasPrefix(imgPath, "https://") && !strings.HasPrefix(imgPath, "/") {
				if !seen[imgPath] {
					attachments = append(attachments, imgPath)
					seen[imgPath] = true
				}
			}
		}
	}

	return body, attachments
}

func resolvePostDate(rawDate interface{}, rawTime string, year, month, day string) time.Time {
	timeStr := rawTime
	if timeStr == "" {
		timeStr = DefaultTime
	}

	// Build candidate string
	var dateCandidate string
	switch v := rawDate.(type) {
	case time.Time:
		return v
	case string:
		if strings.Contains(v, "T") {
			dateCandidate = v
		} else {
			dateCandidate = fmt.Sprintf("%sT%s", strings.TrimSpace(v), timeStr)
		}
	default:
		dateCandidate = fmt.Sprintf("%s-%s-%sT%s", year, month, day, timeStr)
	}

	// Try common layouts
	layouts := []string{
		time.RFC3339,
		"2006-01-02T15:04:05-07:00",
		"2006-01-02T15:04:05Z",
		"2006-01-02T15:04:05",
		"2006-01-02",
	}

	for _, layout := range layouts {
		if t, err := time.Parse(layout, dateCandidate); err == nil {
			return t
		}
	}

	// Fallback to parsed year/month/day
	var y, m, d int
	fmt.Sscanf(year, "%d", &y)
	fmt.Sscanf(month, "%d", &m)
	fmt.Sscanf(day, "%d", &d)
	return time.Date(y, time.Month(m), d, 12, 0, 0, 0, time.UTC)
}

func normalizeTags(raw interface{}) []string {
	if raw == nil {
		return nil
	}
	var result []string
	switch v := raw.(type) {
	case []interface{}:
		for _, item := range v {
			if s, ok := item.(string); ok && s != "" {
				result = append(result, strings.TrimSpace(s))
			}
		}
	case []string:
		for _, s := range v {
			if s != "" {
				result = append(result, strings.TrimSpace(s))
			}
		}
	case string:
		// Could be comma-separated or space-separated
		parts := strings.Fields(strings.ReplaceAll(v, ",", " "))
		for _, p := range parts {
			if p != "" {
				result = append(result, strings.TrimSpace(p))
			}
		}
	}
	return result
}

func slugify(input string, maxWords int) string {
	lower := strings.ToLower(input)
	cleaned := reNonAlnum.ReplaceAllString(lower, " ")
	words := strings.Fields(reSpaces.ReplaceAllString(cleaned, " "))
	if len(words) > maxWords {
		words = words[:maxWords]
	}
	return strings.Join(words, "-")
}

func extractSummary(htmlContent string) string {
	idx := strings.Index(htmlContent, SummaryMarker)
	if idx == -1 {
		return ""
	}
	summaryPart := htmlContent[:idx]
	doc, err := goquery.NewDocumentFromReader(strings.NewReader(summaryPart))
	if err != nil {
		return strings.TrimSpace(summaryPart)
	}
	return strings.TrimSpace(doc.Text())
}

func extractThumbnail(doc *goquery.Document, postPath string, baseurl string) string {
	// Look for img#thumbnail first
	var src string
	doc.Find("img#thumbnail").Each(func(i int, s *goquery.Selection) {
		if src == "" {
			src, _ = s.Attr("src")
		}
	})

	if src == "" {
		doc.Find("img").Each(func(i int, s *goquery.Selection) {
			if src == "" {
				val, exists := s.Attr("src")
				if exists && !strings.Contains(val, "gravatar.com") {
					src = val
				}
			}
		})
	}

	if src == "" {
		return ""
	}

	// Resolve relative URLs
	if !strings.HasPrefix(src, "http://") && !strings.HasPrefix(src, "https://") {
		base, err := url.Parse(fmt.Sprintf("%s/%s/", baseurl, postPath))
		if err == nil {
			ref, err := url.Parse(src)
			if err == nil {
				return base.ResolveReference(ref).String()
			}
		}
	}

	return src
}
