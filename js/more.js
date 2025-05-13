const btn = document.querySelector("#open-btn");
const section = document.querySelector("#section");

btn.addEventListener("click", () => {
  if (section.style.display === "flex") {
    section.style.display = "none";
    btn.innerHTML = "Open";
  } else {
    section.style.display = "flex";
    btn.innerHTML = "Close";
  }
});
