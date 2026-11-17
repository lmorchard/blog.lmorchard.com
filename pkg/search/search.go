package search

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

// SearchResult represents a single Pagefind match.
type SearchResult struct {
	Index   int    `json:"index"`
	Title   string `json:"title"`
	URL     string `json:"url"`
	Excerpt string `json:"excerpt"`
}

// QueryIndex queries a built Pagefind index using a local Node-based bridge.
func QueryIndex(buildDir string, query string, maxResults int) ([]SearchResult, error) {
	pagefindDir := filepath.Join(buildDir, "pagefind")
	if _, err := os.Stat(filepath.Join(pagefindDir, "pagefind.js")); err != nil {
		return nil, fmt.Errorf("Pagefind index not found in %s (run 'make build' or 'make search' first)", pagefindDir)
	}

	nodePath, err := exec.LookPath("node")
	if err != nil {
		return nil, fmt.Errorf("node not found on PATH (required to execute Pagefind search bridge)")
	}

	absBuildDir, err := filepath.Abs(buildDir)
	if err != nil {
		absBuildDir = buildDir
	}
	absPagefindDir := filepath.Join(absBuildDir, "pagefind")

	if maxResults <= 0 {
		maxResults = 10
	}

	script := fmt.Sprintf(`
import fs from "fs/promises";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const pagefindDir = %q;
const buildDir = %q;
const query = %q;
const maxResults = %d;

globalThis.fetch = async (url) => {
  let p = url.toString();
  if (p.startsWith("file://")) p = fileURLToPath(p);
  p = p.split("?")[0];
  if (!path.isAbsolute(p)) p = path.join(pagefindDir, path.basename(p));
  const data = await fs.readFile(p);
  return {
    ok: true,
    status: 200,
    arrayBuffer: async () => data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength),
    json: async () => JSON.parse(data.toString()),
    text: async () => data.toString(),
  };
};

try {
  const pagefind = await import(pathToFileURL(path.join(pagefindDir, "pagefind.js")).href);
  await pagefind.options({ basePath: pathToFileURL(pagefindDir).href + "/" });
  await pagefind.init();

  const search = await pagefind.search(query);
  const count = Math.min(search.results.length, maxResults);
  const output = [];

  for (let i = 0; i < count; i++) {
    const d = await search.results[i].data();
    let url = d.url || "";
    // Clean up file:// URLs if pagefind emits absolute filesystem paths
    if (url.includes(buildDir)) {
      url = url.substring(url.indexOf(buildDir) + buildDir.length);
    }
    url = url.replace(/^\/file:/, "").replace(/index\.html$/, "");
    if (!url.startsWith("/")) url = "/" + url;

    const excerpt = (d.excerpt || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    output.push({
      index: i + 1,
      title: d.meta?.title || "(untitled)",
      url: url,
      excerpt: excerpt
    });
  }

  process.stdout.write(JSON.stringify({ total: search.results.length, results: output }));
} catch (e) {
  process.stderr.write(e.stack || e.toString());
  process.exit(1);
}
`, absPagefindDir, absBuildDir, query, maxResults)

	cmd := exec.Command(nodePath, "--input-type=module", "-e", script)
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	if err := cmd.Run(); err != nil {
		return nil, fmt.Errorf("search query failed: %v (stderr: %s)", err, stderr.String())
	}

	var parsed struct {
		Total   int            `json:"total"`
		Results []SearchResult `json:"results"`
	}
	if err := json.Unmarshal(stdout.Bytes(), &parsed); err != nil {
		return nil, fmt.Errorf("failed to parse search response: %w", err)
	}

	return parsed.Results, nil
}
