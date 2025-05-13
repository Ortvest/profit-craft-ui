const headers = document.querySelectorAll(".accordion-header");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    const icon = header.querySelector(".accordion-icon");
    const isOpen = content.style.height && content.style.height !== "0px";

    // Закриваємо всі
    document.querySelectorAll(".accordion-content").forEach((c) => {
      c.style.height = "0px";
      c.previousElementSibling.querySelector(".accordion-icon").textContent =
        "+";
    });

    // Якщо поточний був закритий — відкриваємо
    if (!isOpen) {
      const inner = content.querySelector(".accordion-content-inner");
      content.style.height = inner.scrollHeight + "px";
      icon.textContent = "−";
    }
  });
});
