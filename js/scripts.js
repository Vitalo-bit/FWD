document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');

    if (overlay) {
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                const description = card.querySelector('.skill-description');
                const isVisible = card.classList.contains('active');

                document.querySelectorAll('.skill-card').forEach(c => {
                    c.classList.remove('active');
                    c.querySelector('.skill-description').style.display = 'none';
                });
                overlay.classList.remove('active');

                if (!isVisible) {
                    card.classList.add('active');
                    description.style.display = 'block';
                    overlay.classList.add('active');
                }
            });
        });

        overlay.addEventListener('click', () => {
            document.querySelectorAll('.skill-card').forEach(card => {
                card.classList.remove('active');
                card.querySelector('.skill-description').style.display = 'none';
            });
            overlay.classList.remove('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.skill-card')) {
                document.querySelectorAll('.skill-card').forEach(card => {
                    card.classList.remove('active');
                    card.querySelector('.skill-description').style.display = 'none';
                });
                overlay.classList.remove('active');
            }
        });
        
        
        
        
        
        
        document.querySelectorAll('.meme-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const link = card.querySelector('.meme-description a');
                if (link) {
                    window.location.href = link.href;
                }
            });

            card.addEventListener('mouseover', () => {
                card.style.transform = 'scale(1.05)';
                const fire = card.querySelector('.fire');
                if (fire) {
                    fire.style.opacity = '1';
                }
            });

            card.addEventListener('mouseout', () => {
                card.style.transform = 'scale(1)';
                const fire = card.querySelector('.fire');
                if (fire) {
                    fire.style.opacity = '0';
                }
            });
        });
    }

    if (document.getElementById('comic')) {
        const email = 'n.shaydullin@innopolis.university';
        const comicContainer = document.getElementById('comic');

        const createSafeElement = (tag, textContent) => {
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
