package feed

import (
	"bytes"
	"encoding/xml"
	"fmt"

	"blog-ssg/pkg/post"
	"blog-ssg/pkg/template"
)

type SitemapURL struct {
	Loc        string  `xml:"loc"`
	LastMod    string  `xml:"lastmod,omitempty"`
	ChangeFreq string  `xml:"changefreq,omitempty"`
	Priority   float32 `xml:"priority,omitempty"`
}

type URLSet struct {
	XMLName xml.Name     `xml:"urlset"`
	XMLNS   string       `xml:"xmlns,attr"`
	URLs    []SitemapURL `xml:"url"`
}

// GenerateSitemap builds a standard XML sitemap for the blog.
func GenerateSitemap(site template.SiteConfig, posts []*post.Post, tags []string) ([]byte, error) {
	var urls []SitemapURL

	// Home page
	urls = append(urls, SitemapURL{
		Loc:        fmt.Sprintf("%s/", site.AbsoluteBaseURL),
		ChangeFreq: "daily",
		Priority:   1.0,
	})

	// Archives
	urls = append(urls, SitemapURL{
		Loc:        fmt.Sprintf("%s/archives.html", site.AbsoluteBaseURL),
		ChangeFreq: "weekly",
		Priority:   0.8,
	})

	// Posts
	for _, p := range posts {
		urls = append(urls, SitemapURL{
			Loc:        fmt.Sprintf("%s/%s/", site.AbsoluteBaseURL, p.Path),
			LastMod:    p.Date.Format("2006-01-02"),
			ChangeFreq: "monthly",
			Priority:   0.6,
		})
	}

	// Tags
	for _, t := range tags {
		urls = append(urls, SitemapURL{
			Loc:        fmt.Sprintf("%s/tag/%s/", site.AbsoluteBaseURL, t),
			ChangeFreq: "weekly",
			Priority:   0.4,
		})
	}

	set := URLSet{
		XMLNS: "http://www.sitemaps.org/schemas/sitemap/0.9",
		URLs:  urls,
	}

	var buf bytes.Buffer
	buf.WriteString("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n")
	enc := xml.NewEncoder(&buf)
	enc.Indent("", "  ")
	if err := enc.Encode(set); err != nil {
		return nil, err
	}
	buf.WriteString("\n")

	return buf.Bytes(), nil
}
