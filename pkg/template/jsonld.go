package template

import (
	"encoding/json"
	htmlTemplate "html/template"
	"strings"
	"time"

	"blog-ssg/pkg/post"
)

type jsonLdGraph struct {
	Context string        `json:"@context"`
	Graph   []interface{} `json:"@graph"`
}

type jsonLdRef struct {
	ID string `json:"@id"`
}

type jsonLdWebSite struct {
	Type        string    `json:"@type"`
	ID          string    `json:"@id"`
	Name        string    `json:"name"`
	URL         string    `json:"url"`
	Description string    `json:"description,omitempty"`
	Publisher   jsonLdRef `json:"publisher"`
}

type jsonLdPerson struct {
	Type        string   `json:"@type"`
	ID          string   `json:"@id"`
	Name        string   `json:"name"`
	URL         string   `json:"url,omitempty"`
	Image       string   `json:"image,omitempty"`
	JobTitle    string   `json:"jobTitle,omitempty"`
	Description string   `json:"description,omitempty"`
	SameAs      []string `json:"sameAs,omitempty"`
}

type jsonLdBlogPosting struct {
	Type             string    `json:"@type"`
	ID               string    `json:"@id"`
	MainEntityOfPage string    `json:"mainEntityOfPage"`
	Headline         string    `json:"headline"`
	Description      string    `json:"description,omitempty"`
	Image            string    `json:"image,omitempty"`
	DatePublished    string    `json:"datePublished,omitempty"`
	DateModified     string    `json:"dateModified,omitempty"`
	Keywords         []string  `json:"keywords,omitempty"`
	Author           jsonLdRef `json:"author"`
	Publisher        jsonLdRef `json:"publisher"`
	IsPartOf         jsonLdRef `json:"isPartOf"`
}

// BuildJSONLD constructs schema.org JSON-LD graph metadata for a page or post.
func BuildJSONLD(site SiteConfig, p *post.Post) htmlTemplate.HTML {
	base := strings.TrimRight(site.AbsoluteBaseURL, "/")

	website := jsonLdWebSite{
		Type:        "WebSite",
		ID:          base + "/#website",
		Name:        site.Title,
		URL:         base,
		Description: site.Subtitle,
		Publisher:   jsonLdRef{ID: base + "/#person"},
	}

	author := site.Author
	person := jsonLdPerson{
		Type:        "Person",
		ID:          base + "/#person",
		Name:        author.FullName,
		URL:         author.URL,
		Image:       site.Avatar,
		JobTitle:    author.JobTitle,
		Description: author.Description,
		SameAs:      author.SameAs,
	}

	nodes := []interface{}{website, person}

	if p != nil {
		postURL := base + "/" + p.Path + "/"
		postID := base + "/" + p.Path + "/#article"

		var img string
		if p.Thumbnail != "" {
			if strings.HasPrefix(p.Thumbnail, "http://") || strings.HasPrefix(p.Thumbnail, "https://") {
				img = p.Thumbnail
			} else {
				img = base + "/" + strings.TrimLeft(p.Thumbnail, "/")
			}
		}

		pub := p.Date.Format(time.RFC3339)
		mod := pub

		posting := jsonLdBlogPosting{
			Type:             "BlogPosting",
			ID:               postID,
			MainEntityOfPage: postURL,
			Headline:         p.Title,
			Description:      p.Summary,
			Image:            img,
			DatePublished:    pub,
			DateModified:     mod,
			Keywords:         p.Tags,
			Author:           jsonLdRef{ID: base + "/#person"},
			Publisher:        jsonLdRef{ID: base + "/#person"},
			IsPartOf:         jsonLdRef{ID: base + "/#website"},
		}
		nodes = append(nodes, posting)
	}

	graph := jsonLdGraph{
		Context: "https://schema.org",
		Graph:   nodes,
	}

	raw, err := json.Marshal(graph)
	if err != nil {
		return ""
	}

	return htmlTemplate.HTML("<script type=\"application/ld+json\">" + string(raw) + "</script>")
}
