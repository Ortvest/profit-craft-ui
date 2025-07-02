function showContent(contentNumber) {
            // Убираем активный класс со всех кнопок
            const buttons = document.querySelectorAll('.showConten');
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс к нажатой кнопке
            buttons[contentNumber - 1].classList.add('active');
            
            // Скрываем все контенты
            const contents = document.querySelectorAll('.content');
            contents.forEach(content => content.classList.add('hidden'));
            
            // Показываем выбранный контент
            const selectedContent = document.getElementById(`content-${contentNumber}`);
            selectedContent.classList.remove('hidden');
            
            // Анимация прогресс-бара для первого контента
            if (contentNumber === 1) {
                setTimeout(() => {
                    const progressRing = document.getElementById('progress-ring');
                    const stepCounter = document.getElementById('step-counter');
                    
                    // Анимация числа
                    let currentNumber = 0;
                    const targetNumber = 720;
                    const increment = targetNumber / 100;
                    
                    const numberAnimation = setInterval(() => {
                        currentNumber += increment;
                        if (currentNumber >= targetNumber) {
                            currentNumber = targetNumber;
                            clearInterval(numberAnimation);
                        }
                        stepCounter.textContent = Math.floor(currentNumber);
                    }, 20);
                    
                    // Анимация кольца
                    progressRing.style.strokeDashoffset = '100';
                }, 300);
            }
        }
        
        // Инициализация при загрузке
        document.addEventListener('DOMContentLoaded', function() {
            showContent(1);
        });