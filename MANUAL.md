# Blog Static Site Generator Manual

This manual explains how to use the static site generator for your blog, focusing on how to create and format posts.

## Table of Contents

1. [Overview](#overview)
2. [Post File Format](#post-file-format)
3. [Frontmatter Attributes](#frontmatter-attributes)
4. [Post Types](#post-types)
5. [Multipart Posts](#multipart-posts)
6. [Special Formatting](#special-formatting)
7. [Images and Attachments](#images-and-attachments)
8. [Post Organization](#post-organization)
9. [Building the Site](#building-the-site)

## Overview

This static site generator converts Markdown files into HTML pages for your blog. It processes post files, extracts metadata, renders content, and builds a complete site with indexes, archives, and RSS feeds.

## Post File Format

Posts are written in Markdown with YAML frontmatter. The basic structure is:

```markdown
---
title: My Post Title
date: 2024-05-12
tags: [tag1, tag2]
type: entry
---

Post content goes here. You can use **Markdown** formatting.

<!--more-->

Content after this marker won't appear in summaries.
```

## Frontmatter Attributes

The following attributes can be specified in the frontmatter:

| Attribute | Description | Default |
|-----------|-------------|---------|
| `title` | Post title | Extracted from first heading if not specified |
| `date` | Publication date | Derived from filename |
| `time` | Publication time | "12:00:00-07:00" |
| `type` | Post type (entry, aside, miscellanea) | "entry" |
| `slug` | URL slug | Derived from title or filename |
| `tags` | Array of tags | [] |
| `thumbnail` | Path to thumbnail image | First image in post |
| `summary` | Custom summary text | Text before `<!--more-->` marker |
| `draft` | If true, comments are disabled | false |
| `comments_archived` | If true, comments are disabled | false |

## Post Types

The generator supports different post types that affect how content is displayed:

- **entry**: Standard blog post with title and content
- **aside**: Short post, often without a title
- **miscellanea**: Collection of miscellaneous thoughts or links

## Multipart Posts

You can include multiple posts in a single file by separating them with `8<---`. Each section can have its own attributes specified in JSON format on the first line:

```markdown
{"type": "aside", "tags": ["thoughts"]}
This is a short aside.

8<---

{"type": "entry", "title": "Main Post"}
This is the main post content.

8<---

{"type": "aside"}
Another short note.
```

## Special Formatting

### Summaries

Add a `<!--more-->` marker to indicate where the summary ends. Content before this marker will be used as the post summary on index pages.

### Hashtags

You can use hashtags like `#tag` in your content. They'll be automatically converted to links to the corresponding tag page.

### File Includes

Include content from other files using the syntax `{{path/to/file}}`. The path is relative to the post file.

## Images and Attachments

### Obsidian-style Attachments

You can use Obsidian-style image syntax: `![[image.jpg]]`. These will be automatically converted to standard Markdown images and the files will be copied to the output directory.

### Directory-based Posts

For posts with many assets, create a directory with an `index.md` file and place assets in the same directory. The entire directory will be copied to the output.

To control which files are copied, create a `.copyfilter` file in the directory with glob patterns (one per line).

## Post Organization

Posts should follow this filename convention:

```
YYYY-MM-DD-slug.md
```

Or for directory-based posts:

```
YYYY-MM-DD-slug/index.md
```

The date and slug are extracted from the filename, though they can be overridden in the frontmatter.

## Building the Site

Use the command-line interface to build the site:

```bash
# Build the entire site
./index.js build

# Clean and rebuild everything
./index.js build --clean

# Build specific posts
./index.js build-posts "content/posts/2024/**/*.md"

# Build just the indexes
./index.js build-indexes

# Build just the assets
./index.js build-assets
```

The built site will be placed in the directory specified by `config.buildPath`.
