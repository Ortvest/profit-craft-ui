document.addEventListener("DOMContentLoaded", function () {
  const rollUpTrigger = document.querySelector(".ambitions-roll-up");
  const servicesSection = document.getElementById("services");
  const rollUpText = rollUpTrigger.querySelector(".ambitions-roll-up-text");

  let isExpanded = true;

  rollUpTrigger.addEventListener("click", () => {
    if (isExpanded) {
      servicesSection.style.height = servicesSection.scrollHeight + "px";
      requestAnimationFrame(() => {
        servicesSection.classList.add("hidden");
        servicesSection.style.height = "0px";
      });
      rollUpText.textContent = "Show Services";
    } else {
      servicesSection.classList.remove("hidden");
      servicesSection.style.height = servicesSection.scrollHeight + "px";
      servicesSection.addEventListener("transitionend", function handler() {
        servicesSection.style.height = "auto";
        servicesSection.removeEventListener("transitionend", handler);
      });
      rollUpText.textContent = "Roll up Services";
    }

    isExpanded = !isExpanded;
  });
});
