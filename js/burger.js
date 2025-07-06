document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger-menu");
  const navList = document.getElementById("header-list");
  const navLinks = document.querySelectorAll(".nav-list-item a");

  const toggleMenu = () => {
    navList.classList.toggle("open");

    const isExpanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!isExpanded));

    document.body.classList.toggle("no-scroll");
  };

  burger.addEventListener("click", toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navList.classList.contains("open")) {
        toggleMenu();
      }
    });
  });
});
