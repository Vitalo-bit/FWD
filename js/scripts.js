// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    
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
});
