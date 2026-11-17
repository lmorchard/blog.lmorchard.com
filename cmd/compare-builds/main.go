package main

import (
	"flag"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

func main() {
	nodeBuild := flag.String("node", "../../blog.lmorchard.com/build", "Path to Node build output")
	goBuild := flag.String("go", "build-test", "Path to Go build output")
	flag.Parse()

	fmt.Printf("Comparing builds:\n  Node: %s\n  Go:   %s\n\n", *nodeBuild, *goBuild)

	// 1. Collect all index.html files in both builds
	nodeFiles := collectHTMLFiles(*nodeBuild)
	goFiles := collectHTMLFiles(*goBuild)

	fmt.Printf("Total HTML files: Node=%d, Go=%d\n", len(nodeFiles), len(goFiles))

	// Check missing files
	var missingInGo []string
	var missingInNode []string

	for rel := range nodeFiles {
		if !goFiles[rel] {
			missingInGo = append(missingInGo, rel)
		}
	}
	for rel := range goFiles {
		if !nodeFiles[rel] {
			missingInNode = append(missingInNode, rel)
		}
	}

	if len(missingInGo) > 0 {
		fmt.Printf("⚠ Files in Node but missing in Go: %d\n", len(missingInGo))
		for i, f := range missingInGo {
			if i < 5 {
				fmt.Printf("   - %s\n", f)
			}
		}
		if len(missingInGo) > 5 {
			fmt.Printf("   ... and %d more\n", len(missingInGo)-5)
		}
	} else {
		fmt.Println("✓ All Node HTML files exist in Go build!")
	}

	if len(missingInNode) > 0 {
		fmt.Printf("ℹ Files in Go but not in Node: %d\n", len(missingInNode))
	}

	// 2. Deep Structural Parity Checks
	fmt.Println("\nRunning Deep Structural Parity QA on Post Pages...")
	postCount := 0
	titleMatches := 0
	wordDiscrepancies := 0

	tocChecked := 0
	tocDirectChildMatched := 0
	tocDiscrepancies := 0

	headerTagMatches := 0
	headerTagDiscrepancies := 0

	headerDateMatches := 0
	headerDateDiscrepancies := 0

	redundantThumbsFound := 0

	commentsChecked := 0
	commentsMatches := 0
	commentsDiscrepancies := 0

	codeBlocksChecked := 0
	codeBlocksCorrectDirectChild := 0
	codeBlocksTrappedInWrapper := 0

	for rel := range nodeFiles {
		// Only check post permalinks: YYYY/MM/DD/.../index.html
		parts := strings.Split(rel, string(filepath.Separator))
		if len(parts) < 4 || len(parts[0]) != 4 || parts[len(parts)-1] != "index.html" {
			continue
		}

		postCount++
		nodePath := filepath.Join(*nodeBuild, rel)
		goPath := filepath.Join(*goBuild, rel)

		if _, err := os.Stat(goPath); err != nil {
			continue
		}

		nodeDoc, err1 := readDoc(nodePath)
		goDoc, err2 := readDoc(goPath)
		if err1 != nil || err2 != nil {
			continue
		}

		// A. Title check
		nodeTitle := strings.TrimSpace(nodeDoc.Find("article.post header .title, article.post h1.title, article.post .title").First().Text())
		goTitle := strings.TrimSpace(goDoc.Find("article.post header .title, article.post h1.title, article.post .title").First().Text())
		if nodeTitle == goTitle {
			titleMatches++
		}

		// B. Body text word count check
		nodeArticle := nodeDoc.Find("article.post").Clone()
		nodeArticle.Find("header, .meta, .posts-nav").Remove()
		nodeText := nodeArticle.Text()

		goArticle := goDoc.Find("article.post").Clone()
		goArticle.Find("header, .meta, .posts-nav").Remove()
		goText := goArticle.Text()

		nodeWordCount := len(strings.Fields(nodeText))
		goWordCount := len(strings.Fields(goText))

		diff := nodeWordCount - goWordCount
		if diff < 0 {
			diff = -diff
		}
		if nodeWordCount > 20 && float64(diff)/float64(nodeWordCount) > 0.20 {
			wordDiscrepancies++
		}

		// C. Table of Contents check
		nodeHasToC := nodeDoc.Find("article nav.table-of-contents").Length() > 0
		goHasToCDirect := goDoc.Find("article.post > nav.table-of-contents").Length() > 0
		if nodeHasToC {
			tocChecked++
			if goHasToCDirect {
				tocDirectChildMatched++
			} else {
				tocDiscrepancies++
				if tocDiscrepancies <= 3 {
					fmt.Printf("  • ToC issue in %s: Node has ToC, but Go is missing direct child article > nav.table-of-contents\n", rel)
				}
			}
		}

		// D. Header Tag Links check
		nodeTagsCount := nodeDoc.Find("article.post header ul.tags li a").Length()
		goTagsCount := goDoc.Find("article.post header ul.tags li a").Length()
		if nodeTagsCount == goTagsCount {
			headerTagMatches++
		} else {
			headerTagDiscrepancies++
			if headerTagDiscrepancies <= 3 {
				fmt.Printf("  • Header tag link discrepancy in %s: Node=%d, Go=%d\n", rel, nodeTagsCount, goTagsCount)
			}
		}

		// E. Header Date Links check (e.g. Year and Month links)
		nodeDateLinks := nodeDoc.Find("article.post header time .postdate a").Length()
		goDateLinks := goDoc.Find("article.post header time .postdate a").Length()
		if nodeDateLinks == goDateLinks {
			headerDateMatches++
		} else {
			headerDateDiscrepancies++
		}

		// F. Redundant Cover Image Check (Must be 0 in single posts)
		if goDoc.Find("article.post .thumb").Length() > 0 {
			redundantThumbsFound++
			if redundantThumbsFound <= 3 {
				fmt.Printf("  • Redundant .thumb found in Go post: %s\n", rel)
			}
		}

		// G. Comments section check
		nodeHasComments := nodeDoc.Find("article.post #comments, #comments").Length() > 0
		goHasComments := goDoc.Find("article.post #comments, #comments").Length() > 0
		if nodeHasComments {
			commentsChecked++
			if goHasComments {
				commentsMatches++
			} else {
				commentsDiscrepancies++
				if commentsDiscrepancies <= 3 {
					fmt.Printf("  • Missing #comments in Go post: %s\n", rel)
				}
			}
		}

		// H. Monospace code blocks check
		goPreCount := goDoc.Find("article.post pre").Length()
		if goPreCount > 0 {
			codeBlocksChecked += goPreCount
			// Must be direct child of .content-grid OR inside figure
			validPreCount := goDoc.Find("article.content-grid > pre, article.content-grid figure pre").Length()
			codeBlocksCorrectDirectChild += validPreCount
			if validPreCount < goPreCount {
				trapped := goPreCount - validPreCount
				codeBlocksTrappedInWrapper += trapped
				if codeBlocksTrappedInWrapper <= 10 {
					goDoc.Find("article.post pre").Each(func(i int, s *goquery.Selection) {
						if !s.Parent().Is("article.content-grid") && !(s.ParentsFiltered("figure").Length() > 0) {
							parentTag := s.Parent().Get(0).Data
							parentClass, _ := s.Parent().Attr("class")
							fmt.Printf("  • Code block in %s trapped inside: <%s class=%q>\n", rel, parentTag, parentClass)
						}
					})
				}
			}
		}
	}

	fmt.Printf("\n=======================================================\n")
	fmt.Printf("DEEP QA COMPARISON RESULTS (%d post pages analyzed)\n", postCount)
	fmt.Printf("=======================================================\n")
	fmt.Printf("1. Titles:              %d / %d matched (%.1f%%)\n", titleMatches, postCount, float64(titleMatches)/float64(postCount)*100)
	fmt.Printf("2. Body Content:        %d discrepancies (0 expected)\n", wordDiscrepancies)
	fmt.Printf("3. Table of Contents:   %d / %d valid direct children (article > nav.table-of-contents)\n", tocDirectChildMatched, tocChecked)
	fmt.Printf("4. Header Tags:         %d / %d matched (discrepancies: %d)\n", headerTagMatches, postCount, headerTagDiscrepancies)
	fmt.Printf("5. Header Dates:        %d / %d matched (discrepancies: %d)\n", headerDateMatches, postCount, headerDateDiscrepancies)
	fmt.Printf("6. Redundant Thumbs:    %d found across all single posts (0 expected)\n", redundantThumbsFound)
	fmt.Printf("7. Comments Embed:      %d / %d matched (#comments present)\n", commentsMatches, commentsChecked)
	fmt.Printf("8. Monospace Blocks:    %d / %d correctly placed for .content-grid > pre (trapped: %d)\n",
		codeBlocksCorrectDirectChild, codeBlocksChecked, codeBlocksTrappedInWrapper)
	fmt.Printf("=======================================================\n")

	// 3. Link and Asset Integrity Verification
	parityRegressions := checkBrokenLinks(*goBuild, *nodeBuild, goFiles)
	if parityRegressions > 0 {
		fmt.Fprintf(os.Stderr, "\n❌ Parity verification failed: %d link/asset regressions found between Node and Go\n", parityRegressions)
		os.Exit(1)
	}
	fmt.Printf("\n✓ Parity verification passed: 100%% asset and link parity achieved!\n")
}

func checkBrokenLinks(buildDir, nodeDir string, files map[string]bool) int {
	fmt.Printf("\nRunning Internal Link & Asset Integrity Check (%d pages in %s)...\n", len(files), buildDir)
	parityRegressions := 0
	legacyBrokenCount := 0

	for rel := range files {
		doc, err := readDoc(filepath.Join(buildDir, rel))
		if err != nil {
			continue
		}

		currDir := filepath.Dir(filepath.Join(buildDir, rel))
		nodeCurrDir := filepath.Dir(filepath.Join(nodeDir, rel))

		checkAttr := func(sel string, attr string) {
			doc.Find(sel).Each(func(i int, s *goquery.Selection) {
				val, exists := s.Attr(attr)
				if !exists || val == "" {
					return
				}
				cleanVal := val
				if idx := strings.IndexAny(cleanVal, "?#"); idx != -1 {
					cleanVal = cleanVal[:idx]
				}
				cleanVal = strings.TrimSpace(cleanVal)
				if cleanVal == "" {
					return
				}

				if strings.HasPrefix(cleanVal, "//") || strings.HasPrefix(cleanVal, "http://") ||
					strings.HasPrefix(cleanVal, "https://") || strings.HasPrefix(cleanVal, "mailto:") ||
					strings.HasPrefix(cleanVal, "javascript:") || strings.HasPrefix(cleanVal, "data:") ||
					strings.HasPrefix(cleanVal, "aim:") || strings.HasPrefix(cleanVal, "irc:") ||
					strings.HasPrefix(cleanVal, "xmpp:") || strings.HasPrefix(cleanVal, "magnet:") {
					return
				}

				var goTargetPath string
				var nodeTargetPath string
				if strings.HasPrefix(cleanVal, "/") {
					goTargetPath = filepath.Join(buildDir, cleanVal)
					nodeTargetPath = filepath.Join(nodeDir, cleanVal)
				} else {
					goTargetPath = filepath.Join(currDir, cleanVal)
					nodeTargetPath = filepath.Join(nodeCurrDir, cleanVal)
				}

				resolvePath := func(p string) bool {
					if info, err := os.Stat(p); err == nil {
						if info.IsDir() {
							_, err2 := os.Stat(filepath.Join(p, "index.html"))
							return err2 == nil
						}
						return true
					}
					_, err := os.Stat(p + ".html")
					return err == nil
				}

				goExists := resolvePath(goTargetPath)
				if !goExists {
					nodeExists := resolvePath(nodeTargetPath)
					if nodeExists {
						parityRegressions++
						if parityRegressions <= 10 {
							fmt.Printf("  ❌ Parity regression in %s: %s (resolves in Node but missing in Go: %s)\n", rel, val, goTargetPath)
						}
					} else {
						legacyBrokenCount++
					}
				}
			})
		}

		checkAttr("a", "href")
		checkAttr("img", "src")
		checkAttr("link[rel='stylesheet']", "href")
		checkAttr("script[src]", "src")
	}

	fmt.Printf("✓ Legacy dead links (broken in Node build too): %d\n", legacyBrokenCount)
	if parityRegressions == 0 {
		fmt.Println("✓ Zero parity regressions! Every valid link and asset in Node resolves in Go.")
	} else if parityRegressions > 10 {
		fmt.Printf("  ... and %d more parity regression(s)\n", parityRegressions-10)
	}

	return parityRegressions
}

func collectHTMLFiles(root string) map[string]bool {
	files := make(map[string]bool)
	_ = filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return nil
		}
		if filepath.Ext(path) == ".html" {
			rel, err := filepath.Rel(root, path)
			if err == nil {
				files[rel] = true
			}
		}
		return nil
	})
	return files
}

func readDoc(path string) (*goquery.Document, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	return goquery.NewDocumentFromReader(f)
}
