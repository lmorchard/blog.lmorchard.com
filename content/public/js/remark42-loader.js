class Remark42Loader {
  constructor() {
    this.commentsSection = document.getElementById('comments');
    if (!this.commentsSection) return;

    this.loaded = false;
    this.observer = new IntersectionObserver(
      this.handleIntersections.bind(this)
    );
    this.observer.observe(this.commentsSection);
  }

  handleIntersections(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!this.commentsSection) return; // Safety check
        this.loadComments();
        this.observer.unobserve(this.commentsSection);
      }
    });
  }

  loadComments() {
    if (this.loaded) return;
    this.loaded = true;

    console.log("Remark42 loading triggered by intersection observer");

    try {
      let theme = "light";
      if (document.body.classList.contains("theme-dark")) {
        theme = "dark";
      } else if (document.body.classList.contains("theme-light")) {
        theme = "light";
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches) {
        theme = "dark";
      }
      console.log("Remark42 initial theme:", theme);

      const url = document
        .querySelector("meta[property='og:url']")
        .getAttribute("content");

      const remark_config = window.remark_config = {
        host: "https://remark42.lmorchard.com",
        site_id: "remark",
        theme: theme,
        url: url,
        show_email_subscription: false,
      };

      const components = remark_config.components || ["embed"];
      for (let o = 0; o < components.length; o++) {
        let c = ".js";
        const r = document.createElement("script");
        const d = document.head || document.body;
        if ("noModule" in r) {
          r.type = "module";
          c = ".mjs";
        } else {
          r.async = true;
          r.defer = true;
        }
        r.src = remark_config.host + "/web/" + components[o] + c;
        d.appendChild(r);
      }

      window.matchMedia('(prefers-color-scheme:dark)')
        .addEventListener('change', event => {
          const newColorScheme = event.matches ? "dark" : "light";
          console.log("Remark42 detected color scheme change, updating theme to:", newColorScheme);
          window.REMARK42.changeTheme(newColorScheme);
        });

      window.addEventListener("themechange", ({ detail: { scheme } }) => {
        console.log("Remark42 detected themechange event, updating theme to:", scheme);
        window.REMARK42.changeTheme(scheme === "dark" ? "dark" : "light");
      });
    } catch (error) {
      console.error("Error loading Remark42 comments:", error);
    }
  }
};

const manager = new Remark42Loader();