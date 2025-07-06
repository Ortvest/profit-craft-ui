const items = document.querySelectorAll(".profit-text-item");
const image = document.getElementById("analyze_your_credit");

items.forEach((item) => {
  item.addEventListener("click", () => {
    items.forEach((i) => i.classList.remove("active"));

    item.classList.add("active");

    const imgPath = item.dataset.img;
    image.src = imgPath;
  });
});
