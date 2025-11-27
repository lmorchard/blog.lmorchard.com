const stylesheets = [
  "/js/components/youtube-embed.css",
];
stylesheets.forEach((href) => {
  const linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.href = href;
  document.head.appendChild(linkElement);
});

class YouTubeEmbed extends HTMLElement {
  constructor() {
    super();
    this.loaded = false;
  }

  connectedCallback() {
    const videoId = this.getAttribute("video-id");
    const title = this.getAttribute("title") || "YouTube video";
    const time = this.getAttribute("time");

    if (!videoId) {
      console.error("YouTubeEmbed: video-id attribute is required");
      return;
    }

    this.videoId = videoId;
    this.videoTitle = title;
    this.startTime = time;

    // Create placeholder with thumbnail
    const timeParam = this.startTime ? `&t=${this.startTime}` : "";
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}${timeParam}`;

    this.innerHTML = `
      <a href="${videoUrl}" class="youtube-wrapper" aria-label="Play video">
        <img
          src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg"
          alt="${title}"
          class="youtube-thumbnail"
        >
        <div class="youtube-play-button">
          <svg viewBox="0 0 68 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
            <path d="M 45,24 27,14 27,34" fill="#fff"></path>
          </svg>
        </div>
      </a>
    `;

    manager.register(this);
  }

  onVisible() {
    // Wait for user interaction before loading the iframe
    const link = this.querySelector(".youtube-wrapper");
    if (link) {
      link.addEventListener("click", (e) => {
        // Only prevent default and load video if it's a regular click
        // Allow cmd/ctrl-click and right-click to open in new tab
        if (!e.metaKey && !e.ctrlKey && e.button === 0) {
          e.preventDefault();
          this.loadVideo();
        }
      }, { once: true });
    }
  }

  loadVideo() {
    if (this.loaded) return;
    this.loaded = true;

    const timeParam = this.startTime ? `&start=${this.startTime}` : "";
    const wrapper = this.querySelector(".youtube-wrapper");
    wrapper.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${this.videoId}?autoplay=1${timeParam}"
        title="${this.videoTitle}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    `;
  }
}

class YouTubeEmbedManager {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersections.bind(this)
    );
  }

  handleIntersections(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const instance = entry.target;
        this.observer.unobserve(instance);
        instance.onVisible();
      }
    });
  }

  register(instance) {
    this.observer.observe(instance);
  }
}

const manager = new YouTubeEmbedManager();

customElements.define("youtube-embed", YouTubeEmbed);
