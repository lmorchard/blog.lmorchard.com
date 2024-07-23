export async function init() {
  window.addEventListener('DOMContentLoaded', (event) => {
    new PagefindUI({
      element: "#search",
      showSubResults: false,
      showImages: false,
    });
  });
}
