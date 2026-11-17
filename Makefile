BIN := easy-blog-oven
PORT ?= 9980
CONTENT_DIR := ./content
POSTS_DIR := $(CONTENT_DIR)/posts
PAGES_DIR := $(CONTENT_DIR)/pages
PUBLIC_DIR := $(CONTENT_DIR)/public
UPLOADS_DIR := $(CONTENT_DIR)/uploads
BUILD_DIR ?= ./build

COMMON_FLAGS := -posts $(POSTS_DIR) -pages $(PAGES_DIR) -public $(PUBLIC_DIR) -uploads $(UPLOADS_DIR) -build $(BUILD_DIR)

.PHONY: all build-bin build build-dev dev start serve search search-test info doctor new clean-empty-drafts clean-empty-drafts-force test clean help

all: build

help:
	@echo "blog.lmorchard.com - Easy-Blog Oven v2.0 (Go)"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  make build                     Full production build with Pagefind search indexing"
	@echo "  make build-dev                 Fast build without search indexing (includes drafts)"
	@echo "  make dev / make start          Start dev server on http://localhost:$(PORT) with live reload"
	@echo "  make serve                     Static preview server without watcher"
	@echo "  make new TITLE=\"Post Title\"    Scaffold a new post bundle"
	@echo "  make search                    Run Pagefind search indexer on build directory"
	@echo "  make search-test QUERY=\"term\"  Query Pagefind search index directly from CLI"
	@echo "  make info POST=\"path\"          Display metadata and word count for a post"
	@echo "  make doctor                    Diagnose metadata, broken assets, and draft hygiene"
	@echo "  make test                      Run all Go unit tests"
	@echo "  make clean-empty-drafts        Find empty placeholder drafts (dry-run)"
	@echo "  make clean-empty-drafts-force  Permanently remove empty placeholder drafts"
	@echo "  make clean                     Remove build directory and binary"

build-bin:
	go build -o $(BIN) ./cmd/blog-ssg
	@ln -sf $(BIN) blog-ssg

build: build-bin
	./$(BIN) build $(COMMON_FLAGS) -clean -search=true

build-dev: build-bin
	./$(BIN) build $(COMMON_FLAGS) -drafts -search=false

dev start: build-bin
	./$(BIN) serve -w $(COMMON_FLAGS) -drafts -port $(PORT)

serve: build-bin
	./$(BIN) serve -build $(BUILD_DIR) -port $(PORT)

search:
	@if command -v pagefind >/dev/null 2>&1; then \
		pagefind --site $(BUILD_DIR); \
	elif [ -x "./node_modules/.bin/pagefind" ]; then \
		./node_modules/.bin/pagefind --site $(BUILD_DIR); \
	else \
		echo "❌ pagefind not found on PATH or in ./node_modules/.bin"; \
		exit 1; \
	fi

new: build-bin
	@if [ -z "$(TITLE)" ]; then \
		echo "Usage: make new TITLE=\"Your Post Title\" [TAGS=\"tag1,tag2\"]"; \
		exit 1; \
	fi
	./$(BIN) new -posts $(POSTS_DIR) $(if $(TAGS),-tags "$(TAGS)") "$(TITLE)"

search-test: build-bin
	@if [ -z "$(QUERY)" ]; then \
		echo "Usage: make search-test QUERY=\"search term\""; \
		exit 1; \
	fi
	./$(BIN) search-test -build $(BUILD_DIR) "$(QUERY)"

info: build-bin
	@if [ -z "$(POST)" ]; then \
		echo "Usage: make info POST=\"path/to/post/or/bundle\""; \
		exit 1; \
	fi
	./$(BIN) info "$(POST)"

doctor lint: build-bin
	./$(BIN) doctor -posts $(POSTS_DIR)

clean-empty-drafts: build-bin
	./$(BIN) clean-empty-drafts -posts $(POSTS_DIR)

clean-empty-drafts-force: build-bin
	./$(BIN) clean-empty-drafts -posts $(POSTS_DIR) -delete

test:
	go test -v ./pkg/...

clean:
	rm -rf $(BUILD_DIR) $(BIN) blog-ssg
