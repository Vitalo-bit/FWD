document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');

    if (overlay) {
        // Обработка кликов по .skill-card элементам
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation(); // Остановка всплытия события
                const description = card.querySelector('.skill-description') as HTMLElement; // Получение .skill-description элемента

                // Удаление активных классов и скрытие описаний у всех .skill-card элементов
                document.querySelectorAll('.skill-card').forEach(c => {
                    c.classList.remove('active');
                    (c.querySelector('.skill-description') as HTMLElement).style.display = 'none';
                });
                overlay.classList.remove('active'); // Удаление класса активности с оверлея

                // Добавление активного класса и отображение описания для текущего .skill-card элемента
                if (!card.classList.contains('active')) {
                    card.classList.add('active');
                    description.style.display = 'block';
                    overlay.classList.add('active');
                }
            });
        });

        // Закрытие всех .skill-card элементов при клике на overlay
        overlay.addEventListener('click', () => {
            document.querySelectorAll('.skill-card').forEach(card => {
                card.classList.remove('active');
                (card.querySelector('.skill-description') as HTMLElement).style.display = 'none';
            });
            overlay.classList.remove('active');
        });

        // Закрытие всех .skill-card элементов при клике вне .skill-card элемента
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.skill-card')) {
                document.querySelectorAll('.skill-card').forEach(card => {
                    card.classList.remove('active');
                    (card.querySelector('.skill-description') as HTMLElement).style.display = 'none';
                });
                overlay.classList.remove('active');
            }
        });
    }

    // Загрузка комикса
    const comicContainer = document.getElementById('comic');
    if (comicContainer) {
        const email = 'n.shaydullin@innopolis.university';

        const createSafeElement = (tag: string, textContent: string): HTMLElement => {
            const element = document.createElement(tag);
            element.textContent = textContent;
            return element;
        };

        const loadComic = async () => {
            try {
                console.log('Fetching comic ID...');
                const response = await fetch(`https://fwd.innopolis.university/api/hw2?email=${email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch comic ID');
                }
                const comicID = await response.json();
                console.log('Comic ID fetched:', comicID);

                console.log('Fetching comic data...');
                const comicResponse = await fetch(`https://fwd.innopolis.university/api/comic?id=${comicID}`);
                if (!comicResponse.ok) {
                    throw new Error('Failed to fetch comic data');
                }
                const comicData = await comicResponse.json();
                console.log('Comic data fetched:', comicData);

                comicContainer.innerHTML = '';

                const img = document.createElement('img');
                img.src = comicData.img;
                img.alt = comicData.alt;
                comicContainer.appendChild(img);

                const safeTitle = createSafeElement('h2', comicData.safe_title);
                comicContainer.appendChild(safeTitle);

                const date = new Date(comicData.year, comicData.month - 1, comicData.day);
                const dateElement = createSafeElement('p', `Published: ${date.toLocaleDateString()}`);
                comicContainer.appendChild(dateElement);
            } catch (error) {
                console.error('Error loading comic:', error);
                comicContainer.textContent = 'Failed to load comic. Please try again later.';
            }
        };

        loadComic();
    }
});
