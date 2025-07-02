function showContent(index) {
  document.querySelectorAll('.content').forEach(el => el.classList.add('hidden'));
  document.getElementById(`content-${index}`).classList.remove('hidden');
}

// Показываем первый блок по умолчанию
showContent(1);
