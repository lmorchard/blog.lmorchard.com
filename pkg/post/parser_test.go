package post

import (
	"os"
	"path/filepath"
	"testing"
	"time"
)

func TestParseSinglePost(t *testing.T) {
	tmpDir := t.TempDir()
	postFile := filepath.Join(tmpDir, "2024-05-12-hello-world.md")
	content := `---
title: Hello World
tags: [go, ssg, test]
type: entry
---

Welcome to the new blog generator! Here is a #cool feature.

<!--more-->

This is the extended content.
`
	if err := os.WriteFile(postFile, []byte(content), 0644); err != nil {
		t.Fatalf("failed to write test post: %v", err)
	}

	posts, err := ParsePostFile(postFile, "https://example.com")
	if err != nil {
		t.Fatalf("ParsePostFile failed: %v", err)
	}
	if len(posts) != 1 {
		t.Fatalf("expected 1 post, got %d", len(posts))
	}

	p := posts[0]
	if p.Title != "Hello World" {
		t.Errorf("expected title 'Hello World', got %q", p.Title)
	}
	if p.Slug != "hello-world" {
		t.Errorf("expected slug 'hello-world', got %q", p.Slug)
	}
	if p.Path != "2024/05/12/hello-world" {
		t.Errorf("expected path '2024/05/12/hello-world', got %q", p.Path)
	}
	if len(p.Tags) != 3 || p.Tags[0] != "go" {
		t.Errorf("expected tags [go ssg test], got %v", p.Tags)
	}
	if p.Summary == "" {
		t.Errorf("expected non-empty summary")
	}
}

func TestMultipartPost(t *testing.T) {
	tmpDir := t.TempDir()
	postFile := filepath.Join(tmpDir, "2024-06-01.md")
	content := `8<--- {"type": "aside", "tags": ["micro"]}
Quick micro thought here.

8<--- {"type": "entry", "title": "Main Event"}
# Main Event
This is the second part of the day.
`
	if err := os.WriteFile(postFile, []byte(content), 0644); err != nil {
		t.Fatalf("failed to write test file: %v", err)
	}

	posts, err := ParsePostFile(postFile, "https://example.com")
	if err != nil {
		t.Fatalf("ParsePostFile failed: %v", err)
	}
	if len(posts) != 2 {
		t.Fatalf("expected 2 posts, got %d", len(posts))
	}

	if posts[0].Type != "aside" {
		t.Errorf("expected post 0 type 'aside', got %q", posts[0].Type)
	}
	if posts[1].Title != "Main Event" {
		t.Errorf("expected post 1 title 'Main Event', got %q", posts[1].Title)
	}
}

func TestPostLinking(t *testing.T) {
	p1 := &Post{Title: "Oldest", Date: time.Date(2024, 1, 1, 12, 0, 0, 0, time.UTC), Path: "2024/01/01/oldest"}
	p2 := &Post{Title: "Middle", Date: time.Date(2024, 1, 2, 12, 0, 0, 0, time.UTC), Path: "2024/01/02/middle"}
	p3 := &Post{Title: "Newest", Date: time.Date(2024, 1, 3, 12, 0, 0, 0, time.UTC), Path: "2024/01/03/newest"}

	posts := []*Post{p3, p2, p1} // descending order

	var laterPost *Post
	for _, post := range posts {
		if laterPost != nil {
			laterPost.PrevPostPath = post.Path
			laterPost.PrevPostTitle = post.Title
			post.NextPostPath = laterPost.Path
			post.NextPostTitle = laterPost.Title
		}
		laterPost = post
	}

	// Newest (p3): prev should be Middle (p2), next should be empty
	if p3.PrevPostTitle != "Middle" || p3.NextPostTitle != "" {
		t.Errorf("p3 link error: prev=%q, next=%q", p3.PrevPostTitle, p3.NextPostTitle)
	}
	// Middle (p2): prev should be Oldest (p1), next should be Newest (p3)
	if p2.PrevPostTitle != "Oldest" || p2.NextPostTitle != "Newest" {
		t.Errorf("p2 link error: prev=%q, next=%q", p2.PrevPostTitle, p2.NextPostTitle)
	}
	// Oldest (p1): prev should be empty, next should be Middle (p2)
	if p1.PrevPostTitle != "" || p1.NextPostTitle != "Middle" {
		t.Errorf("p1 link error: prev=%q, next=%q", p1.PrevPostTitle, p1.NextPostTitle)
	}
}
