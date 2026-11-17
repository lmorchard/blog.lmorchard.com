package feed

import (
	"bytes"
	"encoding/xml"
	"fmt"
	"regexp"
	"strings"
	"time"

	"blog-ssg/pkg/post"
	"blog-ssg/pkg/template"
)

type RSSItem struct {
	Title       string   `xml:"title"`
	Description CDATA    `xml:"description"`
	PubDate     string   `xml:"pubDate"`
	Link        string   `xml:"link"`
	GUID        RSSGUID  `xml:"guid"`
	Categories  []string `xml:"category,omitempty"`
}

type CDATA struct {
	Value string `xml:",cdata"`
}

type RSSGUID struct {
	IsPermaLink bool   `xml:"isPermaLink,attr"`
	Value       string `xml:",chardata"`
}

type AtomLink struct {
	Href string `xml:"href,attr"`
	Rel  string `xml:"rel,attr"`
	Type string `xml:"type,attr"`
}

type RSSChannel struct {
	Title       string    `xml:"title"`
	Description string    `xml:"description"`
	Link        string    `xml:"link"`
	AtomLink    AtomLink  `xml:"http://www.w3.org/2005/Atom link"`
	Items       []RSSItem `xml:"item"`
}

type RSSFeed struct {
	XMLName xml.Name   `xml:"rss"`
	Version string     `xml:"version,attr"`
	AtomNS  string     `xml:"xmlns:atom,attr"`
	Channel RSSChannel `xml:"channel"`
}

var reRelSrc = regexp.MustCompile(`(?i)(src|href)=["']([^"']+)["']`)

func resolveRelativeURLs(htmlStr string, baseURL string) string {
	return reRelSrc.ReplaceAllStringFunc(htmlStr, func(m string) string {
		sub := reRelSrc.FindStringSubmatch(m)
		if len(sub) < 3 {
			return m
		}
		attr := sub[1]
		relPath := sub[2]
		if strings.HasPrefix(relPath, "http://") || strings.HasPrefix(relPath, "https://") || strings.HasPrefix(relPath, "mailto:") || strings.HasPrefix(relPath, "/") || strings.HasPrefix(relPath, "#") {
			return m
		}
		return fmt.Sprintf(`%s="%s/%s"`, attr, strings.TrimRight(baseURL, "/"), relPath)
	})
}

// GenerateRSS creates an RSS 2.0 XML document.
func GenerateRSS(site template.SiteConfig, posts []*post.Post, tag string, maxItems int, fullText bool) ([]byte, error) {
	channelTitle := site.Title
	channelLink := site.AbsoluteBaseURL
	feedURL := fmt.Sprintf("%s/index.rss", site.AbsoluteBaseURL)

	if !fullText && tag == "" {
		channelTitle = fmt.Sprintf("%s (excerpts)", site.Title)
		feedURL = fmt.Sprintf("%s/index-excerpts.rss", site.AbsoluteBaseURL)
	}

	if tag != "" {
		if fullText {
			channelTitle = fmt.Sprintf("Tag: %s - %s", tag, site.Title)
			channelLink = fmt.Sprintf("%s/tag/%s/", site.AbsoluteBaseURL, tag)
			feedURL = fmt.Sprintf("%s/tag/%s/index.rss", site.AbsoluteBaseURL, tag)
		} else {
			channelTitle = fmt.Sprintf("Tag: %s - %s (excerpts)", tag, site.Title)
			channelLink = fmt.Sprintf("%s/tag/%s/", site.AbsoluteBaseURL, tag)
			feedURL = fmt.Sprintf("%s/tag/%s/index-excerpts.rss", site.AbsoluteBaseURL, tag)
		}
	}

	if maxItems <= 0 || maxItems > len(posts) {
		maxItems = len(posts)
	}

	var items []RSSItem
	for _, p := range posts[:maxItems] {
		title := p.Title
		if title == "" {
			title = "untitled"
		}

		postURL := fmt.Sprintf("%s/%s/", site.AbsoluteBaseURL, p.Path)

		var desc string
		if fullText || p.Type != "entry" {
			desc = p.HTML
		} else {
			desc = p.Summary
			if desc == "" {
				desc = p.HTML
			}
		}
		desc = resolveRelativeURLs(desc, postURL)

		items = append(items, RSSItem{
			Title:       title,
			Description: CDATA{Value: desc},
			PubDate:     p.Date.Format(time.RFC1123Z),
			Link:        postURL,
			GUID: RSSGUID{
				IsPermaLink: true,
				Value:       postURL,
			},
			Categories: p.Tags,
		})
	}

	feed := RSSFeed{
		Version: "2.0",
		AtomNS:  "http://www.w3.org/2005/Atom",
		Channel: RSSChannel{
			Title:       channelTitle,
			Description: site.Subtitle,
			Link:        channelLink,
			AtomLink: AtomLink{
				Href: feedURL,
				Rel:  "self",
				Type: "application/rss+xml",
			},
			Items: items,
		},
	}

	var buf bytes.Buffer
	buf.WriteString("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n")
	enc := xml.NewEncoder(&buf)
	enc.Indent("", "  ")
	if err := enc.Encode(feed); err != nil {
		return nil, err
	}
	buf.WriteString("\n")

	return buf.Bytes(), nil
}
