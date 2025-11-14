import lightGallery from "../../vendor/lightgallery/lightgallery.es5.js";
import lgThumbnail from "../../vendor/lightgallery/plugins/thumbnail/lg-thumbnail.es5.js";
// import lgZoom from "../../vendor/lightgallery/plugins/zoom/lg-zoom.es5.js";
import lgVideo from "../../vendor/lightgallery/plugins/video/lg-video.es5.js";
// import lgRotate from "../../vendor/lightgallery/plugins/rotate/lg-rotate.es5.js";
import lgAutoplay from "../../vendor/lightgallery/plugins/autoplay/lg-autoplay.es5.js";

const stylesheets = [
  "/vendor/lightgallery/css/lightgallery-bundle.min.css",
  "/js/components/image-gallery.css",
];
stylesheets.forEach((href) => {
  const linkElement = document.createElement("link");
  linkElement.rel = "stylesheet";
  linkElement.href = href;
  document.head.appendChild(linkElement);
});

export class ImageGallery extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("ImageGallery connected", this);
    manager.register(this);
  }

  onVisible() {
    console.log("ImageGallery onVisible", this);
    this.setupGallery();
  }

  async setupGallery() {
    this.classList.add("connected");

    // Scoop up all the images to supply to the gallery
    const images = this.querySelectorAll("img");
    const dynamicEl = Array.from(images).map((img) => ({
      src: img.src || img.dataset.src,
      thumb: img.dataset.thumb || img.src || img.dataset.src,
      subHtml: img.dataset.subHtml || "",
    }));

    // Create a container for the gallery
    const galleryContainer = document.createElement("div");
    galleryContainer.classList.add("gallery-container");
    this.prepend(galleryContainer);

    // Wait for layout to be complete and container to have dimensions
    await new Promise(resolve => {
      // Use double RAF to ensure layout is fully complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Also ensure container has non-zero dimensions
          const checkDimensions = () => {
            const rect = galleryContainer.getBoundingClientRect();
            console.log("ImageGallery checkDimensions:", {
              width: rect.width,
              height: rect.height,
              ready: rect.width > 0 && rect.height > 0
            });
            if (rect.width > 0 && rect.height > 0) {
              resolve();
            } else {
              requestAnimationFrame(checkDimensions);
            }
          };
          checkDimensions();
        });
      });
    });

    console.log("ImageGallery about to initialize lightGallery, container dimensions:",
      galleryContainer.getBoundingClientRect());

    // Instantiate the lightGallery
    this.gallery = lightGallery(galleryContainer, {
      container: galleryContainer,
      plugins: [
        lgThumbnail,
        //lgZoom,
        lgVideo,
        //lgRotate,
        lgAutoplay,
      ],
      // TODO: tie some of these options to attributes
      hash: false,
      closable: false,
      showMaximizeIcon: true,
      thumbnail: true,
      zoom: true,
      dynamic: true,
      dynamicEl,
      autoplayControls: false,
      autoplay: true,
      slideShowAutoplay: true,
      slideShowInterval: 5000,
      loop: true,
      appendSubHtmlTo: ".lg-item",
    });

    this.gallery.openGallery();

    console.log("ImageGallery lightGallery initialized", this);

    // Force a refresh after a short delay to handle any layout shifts
    // This is especially important for Firefox which may calculate sizes differently
    setTimeout(() => {
      if (this.gallery) {
        console.log("ImageGallery forcing refresh");
        this.gallery.refresh();
      }
    }, 100);
  }

  disconnectedCallback() {
    if (this.gallery) {
      this.gallery.closeGallery();
      this.gallery.destroy(true);
      this.gallery = null;
    }
  }
}

class ImageGalleryManager {
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

const manager = new ImageGalleryManager();

customElements.define("image-gallery", ImageGallery);
