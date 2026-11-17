package post

import (
	"time"
)

// Post represents a single blog entry or aside.
type Post struct {
	// Frontmatter / attribute fields
	Title            string   `yaml:"title" json:"title"`
	Date             time.Time `yaml:"date" json:"date"`
	Slug             string   `yaml:"slug" json:"slug"`
	Type             string   `yaml:"type" json:"type"`
	Tags             []string `yaml:"tags" json:"tags"`
	Thumbnail        string   `yaml:"thumbnail" json:"thumbnail"`
	Summary          string   `yaml:"summary" json:"summary"`
	Draft            bool     `yaml:"draft" json:"draft"`
	CommentsArchived bool     `yaml:"comments_archived" json:"comments_archived"`

	// Derived / structural fields
	Year         string   `json:"year"`
	Month        string   `json:"month"`
	Day          string   `json:"day"`
	PostName     string   `json:"postName"`
	IsDir        bool     `json:"isDir"`
	Path         string   `json:"path"`
	Body         string   `json:"body"`
	HTML         string   `json:"html"`
	SourceFile   string   `json:"sourceFile"`
	ParentPath   string   `json:"parentPath"`
	Attachments  []string `json:"attachments,omitempty"`

	// Link fields (prev/next in chronological order)
	PrevPostPath  string `json:"prevPostPath,omitempty"`
	PrevPostTitle string `json:"prevPostTitle,omitempty"`
	NextPostPath  string `json:"nextPostPath,omitempty"`
	NextPostTitle string `json:"nextPostTitle,omitempty"`
}

// FrontmatterData captures raw parsed frontmatter where fields might be loose types.
type FrontmatterData struct {
	Title            string      `yaml:"title"`
	Date             interface{} `yaml:"date"`
	Time             string      `yaml:"time"`
	Slug             string      `yaml:"slug"`
	Type             string      `yaml:"type"`
	Tags             interface{} `yaml:"tags"`
	Thumbnail        string      `yaml:"thumbnail"`
	Summary          string      `yaml:"summary"`
	Draft            bool        `yaml:"draft"`
	CommentsArchived bool        `yaml:"comments_archived"`
}
