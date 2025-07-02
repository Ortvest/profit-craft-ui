function toggleProfile(element) {
            const expandedContent = element.querySelector('.expanded-content');
            const isExpanded = element.classList.contains('expanded');
            
            // Закрываем все остальные профили
            document.querySelectorAll('.profile-item').forEach(item => {
                if (item !== element) {
                    item.classList.remove('expanded', 'profile-expanded');
                    const content = item.querySelector('.expanded-content');
                    if (content) {
                        content.style.display = 'none';
                    }
                }
            });
            
            if (isExpanded) {
                // Закрываем текущий профиль
                element.classList.remove('expanded', 'profile-expanded');
                expandedContent.style.display = 'none';
            } else {
                // Открываем текущий профиль
                element.classList.add('expanded', 'profile-expanded');
                expandedContent.style.display = 'block';
            }
        }