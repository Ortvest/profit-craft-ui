document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".ambition-section-category a");
  const planItems = document.querySelectorAll(".ambitions-plan-item");
  const categoryContainer = document.querySelector(
    ".ambition-section-category"
  );

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.dataset.target;
      const targetPlan = document.getElementById(targetId);

      const isAlreadyActive = this.classList.contains("active");

      links.forEach((l) => l.classList.remove("active"));
      planItems.forEach((item) => item.classList.remove("active"));

      if (!isAlreadyActive && targetPlan) {
        this.classList.add("active");
        targetPlan.classList.add("active");

        targetPlan.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (!categoryContainer.contains(event.target)) {
      links.forEach((l) => l.classList.remove("active"));
      planItems.forEach((item) => item.classList.remove("active"));
    }
  });
});
