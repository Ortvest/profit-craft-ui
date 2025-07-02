function showContent(contentNumber) {
    const buttons = document.querySelectorAll('.showConten');
    const contents = document.querySelectorAll('.content');
    const currentActive = document.querySelector('.content:not(.hidden)');
    
    // Анимация исчезновения текущего контента
    if (currentActive) {
        currentActive.classList.add('slide-out');
        
        setTimeout(() => {
            currentActive.classList.add('hidden');
            currentActive.classList.remove('slide-out');
        }, 300);
    }
    
    // Убираем активный класс со всех кнопок
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Добавляем активный класс к нажатой кнопке
    buttons[contentNumber - 1].classList.add('active');
    
    // Показываем новый контент с анимацией
    setTimeout(() => {
        contents.forEach(content => content.classList.add('hidden'));
        
        const selectedContent = document.getElementById(`content-${contentNumber}`);
        selectedContent.classList.add('slide-in');
        selectedContent.classList.remove('hidden');
        
        setTimeout(() => {
            selectedContent.classList.remove('slide-in');
        }, 50);
        
        // Анимация прогресс-бара для первого контента
        if (contentNumber === 1) {
            setTimeout(() => {
                const progressRing = document.getElementById('progress-ring');
                const stepCounter = document.getElementById('step-counter');
                
                if (progressRing && stepCounter) {
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
                    
                    progressRing.style.strokeDashoffset = '100';
                }
            }, 400);
        }
    }, 300);
}