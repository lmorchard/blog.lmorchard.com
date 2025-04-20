import lightGallery from "../../vendor/lightgallery/lightgallery.es5.js";
import lgThumbnail from "../../vendor/lightgallery/plugins/thumbnail/lg-thumbnail.es5.js";
// import lgZoom from "../../vendor/lightgallery/plugins/zoom/lg-zoom.es5.js";
import lgVideo from "../../vendor/lightgallery/plugins/video/lg-video.es5.js";
import lgRotate from "../../vendor/lightgallery/plugins/rotate/lg-rotate.es5.js";
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

  setupGallery() {
    this.classList.add("connected");

    // Scoop up all the images to supply to the gallery
    const images = this.querySelectorAll("img");
    const dynamicEl = Array.from(images).map((img) => ({
      src: img.src,
      thumb: img.dataset.thumb || img.src,
      subHtml: img.dataset.subHtml || "",
    }));

    // Create a container for the gallery
    const galleryContainer = document.createElement("div");
    galleryContainer.classList.add("gallery-container");
    this.prepend(galleryContainer);

    // Instantiate the lightGallery
    this.gallery = lightGallery(galleryContainer, {
      container: galleryContainer,
      plugins: [
        lgThumbnail,
        //lgZoom,
        lgVideo,
        lgRotate,
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
