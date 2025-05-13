// Получаем элементы
const chatButton = document.getElementById("chatButton");
const chatPopup = document.getElementById("chatPopup");
const rollUpButton = document.getElementById("rollUpButton");
const closeBtn = document.getElementById("closeBtn");

// Открытие окна при клике на кнопку
chatButton.addEventListener("click", function () {
  chatPopup.style.display = "block"; // Показать окно
  chatPopup.style.transform = "translateY(0)"; // Плавно появляется
  chatPopup.style.opacity = "1"; // Сделать окно видимым
  chatButton.style.display = "none"; // Скрыть кнопку при открытии окна
});

// Закрытие окна при клике на кнопку "Roll up Service"
rollUpButton.addEventListener("click", function () {
  chatPopup.style.transform = "translateY(100%)"; // Плавное скрытие окна вниз
  chatPopup.style.opacity = "0"; // Сделать окно прозрачным
  setTimeout(() => {
    chatPopup.style.display = "none"; // Скрыть окно окончательно
    chatButton.style.display = "block"; // Показать кнопку после закрытия окна
  }, 300); // Задержка для плавного скрытия
});
