// Получаем элементы
const chatButton = document.getElementById("chatButton");
const chatPopup = document.getElementById("chatPopup");
const closeBtn = document.getElementById("closeBtn");
const closePopupBtn = document.getElementById("closePopupBtn");

// Открытие окна при клике на кнопку
chatButton.addEventListener("click", function () {
  chatPopup.style.display = "block"; // Показать окно
  chatPopup.style.transform = "translateY(0)"; // Плавно появляется
  chatPopup.style.opacity = "1"; // Сделать окно видимым
  chatButton.style.display = "none"; // Скрыть кнопку при открытии окна
});

// Закрытие окна при клике на крестик
closeBtn.addEventListener("click", function () {
  chatPopup.style.display = "none"; // Скрыть окно
  chatButton.style.display = "block"; // Показать кнопку после закрытия окна
});

// Закрытие окна при клике на кнопку "Закрыть"
closePopupBtn.addEventListener("click", function () {
  chatPopup.style.display = "none"; // Скрыть окно
  chatButton.style.display = "block"; // Показать кнопку после закрытия окна
});
