document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".messenger-toggle");
  const menu = document.querySelector(".messenger-menu");

  toggle.addEventListener("click", () => {
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
    toggle.style.display = toggle.style.display === "none" ? "flex" : "none";
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".messenger-widget")) {
      menu.style.display = "none";
      toggle.style.display = "flex";
    }
  });
});
