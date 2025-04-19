import lightGallery from "../../vendor/lightgallery/lightgallery.es5.js";
import lgThumbnail from "../../vendor/lightgallery/plugins/thumbnail/lg-thumbnail.es5.js";
import lgZoom from "../../vendor/lightgallery/plugins/zoom/lg-zoom.es5.js";
import lgVideo from "../../vendor/lightgallery/plugins/video/lg-video.es5.js";
import lgRotate from "../../vendor/lightgallery/plugins/rotate/lg-rotate.es5.js";

// Inject the lightgallery CSS
const linkElement = document.createElement("link");
linkElement.rel = "stylesheet";
linkElement.href = "/vendor/lightgallery/css/lightgallery-bundle.min.css";
document.head.appendChild(linkElement);

export class ImageGallery extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const images = this.querySelectorAll("img");

    const dynamicEl = Array.from(images).map((img) => ({
      src: img.src,
      thumb: img.dataset.thumb || img.src,
      subHtml: img.dataset.subHtml || "",
    }));

    this.gallery = lightGallery(this, {
      plugins: [lgThumbnail, lgZoom, lgVideo, lgRotate],
      //dynamic: true,
      dynamicEl,
      showMaximizeIcon: true,
      thumbnail: false,
      zoom: true,
    });

    console.log("ImageGallery initialized", this.gallery);

    /*
    this.addEventListener("click", (event) => {
      if (event.target.tagName === "IMG") {
        event.preventDefault();
        this.gallery.openGallery();
      }
    });
    */
  }

  connectedCallback_inline() {
    //return;

    this.classList.add("lightgallery");

    console.log("ImageGallery connected");

    // Find all the img children of this element
    const images = this.querySelectorAll("img");

    const dynamicEl = Array.from(images).map((img) => ({
      src: img.src,
      thumb: img.dataset.thumb || img.src,
      subHtml: img.dataset.subHtml || "",
    }));

    // Initialize lightGallery on this element
    this.gallery = lightGallery(this, {
      container: this,
      plugins: [
        lgThumbnail,
        lgZoom,
        lgVideo,
        //lgRotate,
      ],
      hash: false,
      closable: false,
      showMaximizeIcon: true,
      thumbnail: true,
      zoom: true,
      dynamic: true,
      dynamicEl,
      appendSubHtmlTo: ".lg-item",
    });

    this.gallery.openGallery();

    console.log("ImageGallery initialized", this.gallery);
  }
  disconnectedCallback() {
    if (this.gallery) {
      this.gallery.closeGallery();
      this.gallery.destroy(true);
      this.gallery = null;
    }
  }
}

customElements.define("image-gallery", ImageGallery);
