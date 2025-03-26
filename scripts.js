document.addEventListener("DOMContentLoaded", function () {
    const itemsWrap = document.querySelector(".items-wrap");
    const items = document.querySelector(".items");
    let speed = 1;

    items.innerHTML += items.innerHTML;
        function animate() {
            if (items.offsetLeft <= -items.scrollWidth / 2) {
                items.style.left = "0px";
            } else {
                items.style.left = `${items.offsetLeft - speed}px`;
            }
            requestAnimationFrame(animate);
        }

    items.style.position = "relative";
    items.style.left = "0px";
    requestAnimationFrame(animate);
});
