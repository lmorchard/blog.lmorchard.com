package main

import (
	"flag"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"blog-ssg/pkg/build"
	"blog-ssg/pkg/imageutil"
	"blog-ssg/pkg/post"
	"blog-ssg/pkg/search"
	"blog-ssg/pkg/template"
	"blog-ssg/pkg/watch"
)

func main() {
	if len(os.Args) < 2 {
		printUsage()
		os.Exit(1)
	}

	command := os.Args[1]

	switch command {
	case "build":
		runBuild(os.Args[2:])
	case "new":
		runNew(os.Args[2:])
	case "eject":
		runEject(os.Args[2:])
	case "serve":
		runServe(os.Args[2:])
	case "watch":
		runWatch(os.Args[2:])
	case "dither":
		runDither(os.Args[2:])
	case "optimize-images":
		runOptimizeImages(os.Args[2:])
	case "clean-empty-drafts":
		runCleanEmptyDrafts(os.Args[2:])
	case "info":
		runInfo(os.Args[2:])
	case "doctor", "lint":
		runDoctor(os.Args[2:])
	case "search-test":
		runSearchTest(os.Args[2:])
	case "help", "-h", "--help":
		printUsage()
	default:
		fmt.Fprintf(os.Stderr, "Unknown command: %s\n\n", command)
		printUsage()
		os.Exit(1)
	}
}

func printUsage() {
	fmt.Println("Easy-Blog Oven v2.0 - Static site generator for blog.lmorchard.com")
	fmt.Println("Usage: easy-blog-oven <command> [options]")
	fmt.Println("\nCommands:")
	fmt.Println("  build               Build posts, pages, indexes, feeds, and assets")
	fmt.Println("  new                 Scaffold a new blog post with frontmatter and timestamp")
	fmt.Println("  info                Display detailed metadata and word count for a post file or bundle")
	fmt.Println("  doctor              Diagnose post frontmatter, missing assets, and draft hygiene")
	fmt.Println("  search-test         Query the Pagefind search index directly from the CLI")
	fmt.Println("  watch               Watch directories and rebuild automatically on change")
	fmt.Println("  serve               Start a local static web server to preview the build (supports -w)")
	fmt.Println("  eject               Extract embedded default templates to disk for customization")
	fmt.Println("  clean-empty-drafts  Find and clean up draft posts that contain only placeholder text")
	fmt.Println("  dither              Apply retro Floyd-Steinberg dithering and pixelation to images")
	fmt.Println("  optimize-images     Resize and compress JPEG/PNG images")
}

func runBuild(args []string) {
	fs := flag.NewFlagSet("build", flag.ExitOnError)
	postsDir := fs.String("posts", "content/posts", "Path to posts directory")
	pagesDir := fs.String("pages", "content/pages", "Path to static pages directory")
	buildDir := fs.String("build", "build", "Path to output build directory")
	publicDir := fs.String("public", "content/public", "Path to static public assets directory")
	uploadsDir := fs.String("uploads", "content/uploads", "Path to uploads directory")
	templatesDir := fs.String("templates", "templates", "Path to template overrides directory")
	baseURL := fs.String("baseurl", "", "Site base URL path prefix (e.g. /blog)")
	absBaseURL := fs.String("abs-baseurl", "https://blog.lmorchard.com", "Site absolute base URL")
	showDrafts := fs.Bool("drafts", false, "Include draft posts")
	clean := fs.Bool("clean", false, "Clean build directory before building")
	search := fs.Bool("search", true, "Run Pagefind search indexer after build")
	concurrency := fs.Int("concurrency", 0, "Worker concurrency (0 = CPU count)")
	_ = fs.Parse(args)

	cfg := build.Config{
		PostsPath:     *postsDir,
		PagesPath:     *pagesDir,
		BuildPath:     *buildDir,
		PublicPath:    *publicDir,
		UploadsPath:   *uploadsDir,
		TemplatesPath: *templatesDir,
		ShowDrafts:    *showDrafts,
		Clean:         *clean,
		Concurrency:   *concurrency,
		Site:          defaultSiteConfig(*baseURL, *absBaseURL),
	}

	buildSite(cfg, *search)
}

func buildSite(cfg build.Config, search bool) {
	fmt.Printf("Building site: posts=%s -> build=%s\n", cfg.PostsPath, cfg.BuildPath)

	builder, err := build.NewBuilder(cfg)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to initialize builder: %v\n", err)
		return
	}

	stats, err := builder.Build()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Build failed: %v\n", err)
		return
	}

	fmt.Printf("✓ Built %d posts, %d pages, %d tag indexes in %v\n",
		stats.PostsBuilt, stats.PagesBuilt, stats.TagsBuilt, stats.Duration)

	if search {
		runPagefind(cfg.BuildPath)
	}
}

func runNew(args []string) {
	fs := flag.NewFlagSet("new", flag.ExitOnError)
	postsDir := fs.String("posts", "../../blog.lmorchard.com/content/posts", "Path to posts directory")
	slug := fs.String("slug", "", "Custom URL slug (optional, default auto-generated from title)")
	tagsStr := fs.String("tags", "", "Comma-separated list of tags")
	draft := fs.Bool("draft", true, "Mark post as draft")
	bundle := fs.Bool("bundle", true, "Create post as directory bundle with index.md")
	_ = fs.Parse(args)

	title := strings.TrimSpace(strings.Join(fs.Args(), " "))
	if title == "" {
		fmt.Fprintf(os.Stderr, "Error: post title is required.\n\nUsage: blog-ssg new [options] <title>\n\nFlags:\n")
		fs.PrintDefaults()
		os.Exit(1)
	}

	var tags []string
	if *tagsStr != "" {
		for _, t := range strings.Split(*tagsStr, ",") {
			t = strings.TrimSpace(t)
			if t != "" {
				tags = append(tags, t)
			}
		}
	}

	opts := post.NewPostOptions{
		PostsDir: *postsDir,
		Title:    title,
		Slug:     *slug,
		Tags:     tags,
		Draft:    *draft,
		Bundle:   *bundle,
	}

	path, err := post.CreateNewPost(opts)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to create post: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("✓ Created new post: %s\n", path)
}

func runWatch(args []string) {
	fs := flag.NewFlagSet("watch", flag.ExitOnError)
	postsDir := fs.String("posts", "content/posts", "Path to posts directory")
	pagesDir := fs.String("pages", "content/pages", "Path to static pages directory")
	buildDir := fs.String("build", "build", "Path to output build directory")
	publicDir := fs.String("public", "content/public", "Path to static public assets directory")
	uploadsDir := fs.String("uploads", "content/uploads", "Path to uploads directory")
	templatesDir := fs.String("templates", "templates", "Path to template overrides directory")
	baseURL := fs.String("baseurl", "", "Site base URL path prefix (e.g. /blog)")
	absBaseURL := fs.String("abs-baseurl", "https://blog.lmorchard.com", "Site absolute base URL")
	showDrafts := fs.Bool("drafts", true, "Include draft posts in watch mode")
	_ = fs.Parse(args)

	cfg := build.Config{
		PostsPath:     *postsDir,
		PagesPath:     *pagesDir,
		BuildPath:     *buildDir,
		PublicPath:    *publicDir,
		UploadsPath:   *uploadsDir,
		TemplatesPath: *templatesDir,
		ShowDrafts:    *showDrafts,
		Site:          defaultSiteConfig(*baseURL, *absBaseURL),
	}

	startWatchLoop(cfg, false, nil)
}

func startWatchLoop(cfg build.Config, runSearch bool, hub *watch.LiveReloadHub) *watch.Watcher {
	// 1. Initial build
	buildSite(cfg, runSearch)

	watchDirs := []string{
		cfg.PostsPath,
		cfg.PagesPath,
		cfg.PublicPath,
	}
	if _, err := os.Stat(cfg.TemplatesPath); err == nil {
		watchDirs = append(watchDirs, cfg.TemplatesPath)
	}

	watcher, err := watch.NewWatcher(watchDirs, 400*time.Millisecond, func(changed []string) {
		fmt.Printf("\n[watch] File change detected (%d file(s)), rebuilding...\n", len(changed))
		for _, f := range changed {
			fmt.Printf("  • %s\n", filepath.Base(f))
		}
		buildSite(cfg, false)
		if hub != nil {
			hub.Broadcast()
		}
		fmt.Println("[watch] Ready.")
	})

	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to start watcher: %v\n", err)
		return nil
	}

	watcher.Start()
	fmt.Printf("[watch] Watching for changes in %s (Ctrl+C to stop)\n", strings.Join(watchDirs, ", "))
	return watcher
}

func runServe(args []string) {
	fs := flag.NewFlagSet("serve", flag.ExitOnError)
	postsDir := fs.String("posts", "content/posts", "Path to posts directory")
	pagesDir := fs.String("pages", "content/pages", "Path to static pages directory")
	buildDir := fs.String("build", "build", "Path to output build directory")
	publicDir := fs.String("public", "content/public", "Path to static public assets directory")
	uploadsDir := fs.String("uploads", "content/uploads", "Path to uploads directory")
	templatesDir := fs.String("templates", "templates", "Path to template overrides directory")
	baseURL := fs.String("baseurl", "", "Site base URL path prefix (e.g. /blog)")
	absBaseURL := fs.String("abs-baseurl", "https://blog.lmorchard.com", "Site absolute base URL")
	port := fs.String("port", "9980", "Port to listen on")
	showDrafts := fs.Bool("drafts", true, "Include draft posts")
	doWatch := fs.Bool("watch", false, "Watch for changes and rebuild automatically")
	fs.BoolVar(doWatch, "w", false, "Alias for -watch")
	_ = fs.Parse(args)

	cfg := build.Config{
		PostsPath:     *postsDir,
		PagesPath:     *pagesDir,
		BuildPath:     *buildDir,
		PublicPath:    *publicDir,
		UploadsPath:   *uploadsDir,
		TemplatesPath: *templatesDir,
		ShowDrafts:    *showDrafts,
		Site:          defaultSiteConfig(*baseURL, *absBaseURL),
	}

	var handler http.Handler = http.FileServer(http.Dir(*buildDir))

	if *doWatch {
		hub := watch.NewLiveReloadHub()
		w := startWatchLoop(cfg, false, hub)
		if w != nil {
			defer w.Close()
		}
		handler = hub.InjectLiveReload(*buildDir, handler)
	} else {
		if _, err := os.Stat(*buildDir); os.IsNotExist(err) {
			fmt.Printf("Build directory not found, running initial build...\n")
			buildSite(cfg, false)
		}
	}

	addr := ":" + *port
	fmt.Printf("\nServing %s on http://localhost%s (Ctrl+C to stop)\n", *buildDir, addr)

	if err := http.ListenAndServe(addr, handler); err != nil {
		fmt.Fprintf(os.Stderr, "Server failed: %v\n", err)
		os.Exit(1)
	}
}

func runPagefind(buildDir string) {
	var pagefindBin string

	candidates := []string{
		"pagefind",
		"./node_modules/.bin/pagefind",
		"../blog.lmorchard.com/node_modules/.bin/pagefind",
		"../../blog.lmorchard.com/node_modules/.bin/pagefind",
	}

	for _, cand := range candidates {
		if path, err := exec.LookPath(cand); err == nil {
			pagefindBin = path
			break
		}
		if _, err := os.Stat(cand); err == nil {
			pagefindBin = cand
			break
		}
	}

	if pagefindBin == "" {
		fmt.Println("ℹ pagefind not found on PATH or node_modules (skipping search index)")
		return
	}

	fmt.Printf("Running search indexer (%s --site %s)...\n", pagefindBin, buildDir)
	cmd := exec.Command(pagefindBin, "--site", buildDir)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	startTime := time.Now()
	if err := cmd.Run(); err != nil {
		fmt.Fprintf(os.Stderr, "⚠ Pagefind failed: %v\n", err)
		return
	}
	fmt.Printf("✓ Pagefind search indexing completed in %v\n", time.Since(startTime))
}

func runEject(args []string) {
	fs := flag.NewFlagSet("eject", flag.ExitOnError)
	force := fs.Bool("force", false, "Overwrite existing files on disk")
	_ = fs.Parse(args)

	targetDir := "templates"
	if len(fs.Args()) > 0 {
		targetDir = fs.Args()[0]
	}

	fmt.Printf("Ejecting embedded templates to: %s (force=%v)\n", targetDir, *force)

	ejected, err := template.Eject(targetDir, *force)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Eject failed: %v\n", err)
		os.Exit(1)
	}

	if len(ejected) == 0 {
		fmt.Println("No files ejected (templates already exist, use -force to overwrite).")
	} else {
		fmt.Printf("✓ Ejected %d template(s):\n", len(ejected))
		for _, f := range ejected {
			fmt.Printf("  - %s\n", filepath.Join(targetDir, f))
		}
	}
}

func runDither(args []string) {
	fs := flag.NewFlagSet("dither", flag.ExitOnError)
	outPath := fs.String("o", "", "Output path (defaults to <name>-dithered.png)")
	maxWidth := fs.Int("max-width", 1024, "Maximum width before downscaling")
	downscale := fs.Float64("downscale", 0.33, "Downscale factor")
	upscale := fs.Float64("upscale", 3.0, "Upscale factor")
	colors := fs.Int("colors", 32, "Number of colors for palette quantization")
	lofi := fs.Bool("lofi", false, "Extra coarse lo-fi retro effect")
	_ = fs.Parse(args)

	files := fs.Args()
	if len(files) == 0 {
		fmt.Fprintln(os.Stderr, "Usage: blog-ssg dither [options] <input-file> [more-files...]")
		os.Exit(1)
	}

	opts := imageutil.DitherOptions{
		MaxWidth:  *maxWidth,
		Downscale: *downscale,
		Upscale:   *upscale,
		NumColors: *colors,
		LoFi:      *lofi,
	}

	for _, file := range files {
		dest := *outPath
		if dest == "" || len(files) > 1 {
			ext := filepath.Ext(file)
			dest = strings.TrimSuffix(file, ext) + "-dithered.png"
		}

		fmt.Printf("Dithering: %s -> %s (colors=%d, down=%.2f, up=%.2f)\n", file, dest, *colors, *downscale, *upscale)
		if err := imageutil.DitherImage(file, dest, opts); err != nil {
			fmt.Fprintf(os.Stderr, "⚠ Dither failed for %s: %v\n", file, err)
		} else {
			fmt.Printf("✓ Created %s\n", dest)
		}
	}
}

func runOptimizeImages(args []string) {
	fs := flag.NewFlagSet("optimize-images", flag.ExitOnError)
	maxDim := fs.Int("max-dim", 1400, "Maximum dimension (width or height)")
	quality := fs.Int("quality", 75, "JPEG quality (1-100)")
	_ = fs.Parse(args)

	files := fs.Args()
	if len(files) == 0 {
		fmt.Fprintln(os.Stderr, "Usage: blog-ssg optimize-images [options] <file-or-dir...>")
		os.Exit(1)
	}

	for _, target := range files {
		info, err := os.Stat(target)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Cannot stat %s: %v\n", target, err)
			continue
		}

		if info.IsDir() {
			_ = filepath.WalkDir(target, func(path string, d os.DirEntry, err error) error {
				if err != nil || d.IsDir() {
					return nil
				}
				ext := strings.ToLower(filepath.Ext(path))
				if ext == ".jpg" || ext == ".jpeg" || ext == ".png" {
					optimizeOneFile(path, *maxDim, *quality)
				}
				return nil
			})
		} else {
			optimizeOneFile(target, *maxDim, *quality)
		}
	}
}

func optimizeOneFile(file string, maxDim, quality int) {
	origInfo, _ := os.Stat(file)
	tmpFile := file + ".tmp"
	if err := imageutil.OptimizeImage(file, tmpFile, maxDim, quality); err != nil {
		fmt.Fprintf(os.Stderr, "⚠ Optimize failed for %s: %v\n", file, err)
		_ = os.Remove(tmpFile)
		return
	}

	newInfo, err := os.Stat(tmpFile)
	if err == nil && origInfo != nil && newInfo.Size() < origInfo.Size() {
		_ = os.Rename(tmpFile, file)
		savings := float64(origInfo.Size()-newInfo.Size()) / float64(origInfo.Size()) * 100
		fmt.Printf("✓ Optimized %s (%.1f%% smaller: %d -> %d bytes)\n", file, savings, origInfo.Size(), newInfo.Size())
	} else {
		_ = os.Remove(tmpFile)
		fmt.Printf("⊘ Kept %s (already optimal)\n", file)
	}
}

func runCleanEmptyDrafts(args []string) {
	fs := flag.NewFlagSet("clean-empty-drafts", flag.ExitOnError)
	postsDir := fs.String("posts", "content/posts", "Path to posts directory")
	deleteFlag := fs.Bool("delete", false, "Actually delete files (default is dry-run)")
	forceFlag := fs.Bool("force", false, "Alias for -delete")
	fFlag := fs.Bool("f", false, "Alias for -delete")
	dryRunFlag := fs.Bool("dry-run", true, "Perform dry-run without deleting")
	_ = fs.Parse(args)

	doDelete := *deleteFlag || *forceFlag || *fFlag
	// If explicit -dry-run=false was passed
	isDryRunExplicit := false
	fs.Visit(func(f *flag.Flag) {
		if f.Name == "dry-run" {
			isDryRunExplicit = true
		}
	})
	if isDryRunExplicit && !*dryRunFlag {
		doDelete = true
	}

	dryRun := !doDelete

	if dryRun {
		fmt.Printf("Scanning for empty drafts in %s (dry-run mode)...\n", *postsDir)
	} else {
		fmt.Printf("Scanning and deleting empty drafts in %s...\n", *postsDir)
	}

	results, err := post.CleanEmptyDrafts(*postsDir, dryRun)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}

	if len(results) == 0 {
		fmt.Println("No empty draft posts found.")
		return
	}

	for _, d := range results {
		rel, err := filepath.Rel(*postsDir, d.Path)
		if err != nil {
			rel = d.Path
		}
		if dryRun {
			fmt.Printf("  [dry-run] Would delete: %s (%s)\n", rel, d.Reason)
		} else {
			fmt.Printf("  ✓ Deleted: %s\n", rel)
		}
	}

	if dryRun {
		fmt.Printf("\nFound %d empty draft(s). Run with -delete or -force to remove them.\n", len(results))
	} else {
		fmt.Printf("\nSuccessfully removed %d empty draft(s).\n", len(results))
	}
}

func defaultSiteConfig(baseURL, absBaseURL string) template.SiteConfig {
	return template.SiteConfig{
		Title:           "blog.lmorchard.com",
		Subtitle:        "It's all spinning wheels & self-doubt until the first pot of coffee.",
		BaseURL:         baseURL,
		AbsoluteBaseURL: absBaseURL,
		Domain:          "blog.lmorchard.com",
		Avatar:          "https://www.gravatar.com/avatar/b45c48fc9e05922e2f368a9d7d7d8de1.jpg?s=128",
		Author: template.AuthorConfig{
			FullName:    "Les Orchard",
			Email:       "me@lmorchard.com",
			URL:         "https://lmorchard.com",
			JobTitle:    "Software developer",
			Description: "he / him; old adhd cat dad; tinkerer; serial enthusiast",
			SameAs: []string{
				"https://lmorchard.com",
				"https://masto.hackers.town/@lmorchard",
				"https://bsky.app/profile/lmorchard.com",
				"https://github.com/lmorchard",
				"https://twitch.tv/lmorchard",
				"https://www.youtube.com/@LesOrchard",
			},
		},
	}
}

func runInfo(args []string) {
	if len(args) < 1 {
		fmt.Println("Usage: easy-blog-oven info <path-to-post-or-bundle>")
		os.Exit(1)
	}
	targetPath := args[0]
	infos, err := post.InspectPost(targetPath, "https://blog.lmorchard.com")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error inspecting post: %v\n", err)
		os.Exit(1)
	}
	for _, info := range infos {
		fmt.Println(post.FormatPostInfo(info))
	}
}

func runDoctor(args []string) {
	fs := flag.NewFlagSet("doctor", flag.ExitOnError)
	postsDir := fs.String("posts", "content/posts", "Path to posts directory")
	fs.Parse(args)

	fmt.Printf("Diagnosing posts in %s...\n", *postsDir)
	report, err := post.RunDoctor(*postsDir, "https://blog.lmorchard.com")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Doctor failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("Scanned %d file(s) (%d post(s), %d draft(s))\n", report.TotalFiles, report.TotalPosts, report.TotalDrafts)
	if len(report.Issues) == 0 {
		fmt.Println("✓ No issues found. Site content is healthy!")
		return
	}

	fmt.Printf("\nFound %d issue(s):\n", len(report.Issues))
	for _, issue := range report.Issues {
		var icon string
		switch issue.Severity {
		case post.SeverityError:
			icon = "❌ ERROR"
		case post.SeverityWarn:
			icon = "⚠️  WARN "
		case post.SeverityInfo:
			icon = "ℹ️  INFO "
		}
		fmt.Printf("  %s [%s]: %s\n", icon, issue.FilePath, issue.Message)
	}
}

func runSearchTest(args []string) {
	fs := flag.NewFlagSet("search-test", flag.ExitOnError)
	buildDir := fs.String("build", "build", "Path to build output directory")
	maxResults := fs.Int("max", 10, "Maximum number of results to display")
	fs.Parse(args)

	queryArgs := fs.Args()
	if len(queryArgs) == 0 {
		fmt.Println("Usage: easy-blog-oven search-test [options] <query>")
		os.Exit(1)
	}
	query := strings.Join(queryArgs, " ")

	fmt.Printf("Searching Pagefind index in %s for %q...\n\n", *buildDir, query)
	results, err := search.QueryIndex(*buildDir, query, *maxResults)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Search failed: %v\n", err)
		os.Exit(1)
	}

	if len(results) == 0 {
		fmt.Printf("No results found for %q.\n", query)
		return
	}

	fmt.Printf("Found %d result(s):\n\n", len(results))
	for _, r := range results {
		fmt.Printf("  %d. %s\n", r.Index, r.Title)
		fmt.Printf("     URL:  %s\n", r.URL)
		if r.Excerpt != "" {
			fmt.Printf("     Text: \"%s\"\n", r.Excerpt)
		}
		fmt.Println()
	}
}
