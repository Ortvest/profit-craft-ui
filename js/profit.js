const items = document.querySelectorAll(".profit-text-item");

const cards = [
  document.getElementById("profit-card-1"),
  document.getElementById("profit-card-2"),
  document.getElementById("profit-card-3"),
];

const iconGroups = [
  ["profit-card-icon-1--tl", "profit-card-icon-1--bl", "profit-card-icon-1--br"],
  ["profit-card-icon-2--tr", "profit-card-icon-2--bl"],
  ["profit-card-icon-3--tl", "profit-card-icon-3--br"],
];

function showCard(index) {
  cards.forEach((card) => (card.style.display = "none"));
  cards[index].style.display = "flex";

  iconGroups.forEach((group) =>
      group.forEach((cls) => {
        const el = document.getElementsByClassName(cls)[0];
        if (el) el.style.display = "none";
      })
  );

  iconGroups[index].forEach((cls) => {
    const el = document.getElementsByClassName(cls)[0];
    if (el) el.style.display = "flex";
  });
}

items.forEach((item, index) => {
  item.addEventListener("click", () => {
    items.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    showCard(index);
  });
});

showCard(0);