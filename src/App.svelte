<script>
  import { onMount } from 'svelte';

  let skills = [
    {
      name: 'Pandas',
      description: 'Pandas is a powerful data manipulation library in Python, widely used for data cleaning, transformation, and analysis. It provides data structures like DataFrame and Series for handling structured data efficiently.',
      img: 'images/pnd.png'
    },
    {
      name: 'Sklearn',
      description: 'Scikit-learn (sklearn) is a popular machine learning library in Python, offering a wide range of algorithms for classification, regression, clustering, and more. It is known for its simplicity and ease of integration with other Python libraries like Pandas and NumPy.',
      img: 'images/sklearn.png'
    }
  ];

  let overlayActive = false;
  let comic = null;

  async function loadComic() {
    try {
      const response = await fetch('https://xkcd.com/info.0.json');
      if (!response.ok) {
        throw new Error('Failed to fetch comic');
      }
      comic = await response.json();
    } catch (error) {
      console.error('Error loading comic:', error);
      comic = null;
    }
  }

  function handleSkillClick(e) {
    const card = e.currentTarget;
    const description = card.querySelector('.skill-description');

    if (card.classList.contains('active')) {
      card.classList.remove('active');
      description.style.display = 'none';
      overlayActive = false;
    } else {
      document.querySelectorAll('.skill-card').forEach(c => {
        c.classList.remove('active');
        c.querySelector('.skill-description').style.display = 'none';
      });
      card.classList.add('active');
      description.style.display = 'block';
      overlayActive = true;
    }
  }

  onMount(() => {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.skill-card')) {
        document.querySelectorAll('.skill-card').forEach(card => {
          card.classList.remove('active');
          card.querySelector('.skill-description').style.display = 'none';
        });
        overlayActive = false;
      }
    });
  });
</script>

<div class="container">
  <div class="container-header">
    <div class="image-container">
      <img src="images/avatar.png" alt="My photo">
    </div>
    <h1>Hi, my name is Niyaz!</h1>
  </div>
  <div class="container-header" style="flex-direction: column;">
    <h2>About</h2>
    <p>This is my personal page. Here you can find my achievements, projects and contacts. Enjoy!</p>
    <h2>My skills</h2>
  </div>
  <div class="skills-container">
    {#each skills as skill}
      <div class="skill-card" on:click={handleSkillClick}>
        <img src={skill.img} alt={skill.name}>
        <div class="skill-description">{skill.description}</div>
      </div>
    {/each}
    <div id="overlay" class:overlay-active={overlayActive}></div>
    <div class="meme-card">
      <div class="fire"></div>
      <img src="images/meme.png" alt="meme" on:click={() => window.location.href = 'comic.html'}>
      <div class="meme-description">
        <a href="comic.html"></a>
      </div>
    </div>
  </div>
</div>

<footer class="footer-style">
  <div class="contacts-head">
    <h2>Contact me</h2>
  </div>
  <div class="social-links">
    <a id="gh-link" href="https://github.com/Vitalo-bit"><img src="images/github.png" alt="GitHub"></a>
    <a id="tg-link" href="https://t.me/gotterkiller"><img src="images/telegram.png" alt="Telegram"></a>
    <a id="email" href="mailto:nijaz.shaidullin@yandex.ru"><img src="images/yandex.png" alt="Email"></a>
  </div>
</footer>

<style>
  /* Стили перенесены из styles.css */

  body {
    font-family: 'Titillium Web', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }

  .container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .container-header {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1, h2 {
    color: #333;
  }

  p {
    color: #666;
  }

  .image-container {
    margin-right: 20px;
    max-width: 128px;
    max-height: 128px;
    display: inline-block;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .skills-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative; /* Добавлено */
    z-index: 1;
  }

  .skill-card {
    position: relative;
    height: 30%;
    min-width: 200px;
    padding: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s;
  }

  .skill-card img {
    width: auto;
    height: 200px;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    z-index: 1;
  }

  .skill-description {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 15px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    z-index: 3;
    transition: display 0.3s ease;
  }

  .skill-card.active {
    transform: scale(1.05);
    z-index: 3;
  }

 #overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: none;
    z-index: 2;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .overlay-active {
    display: block;
    pointer-events: auto;
  }

  .meme-card {
    position: relative;
    height: 30%;
    min-width: 200px;
    padding: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s;
    z-index: 2;
  }

  .meme-card img {
    width: auto;
    height: 200px;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    z-index: 2;
    position: relative;
  }

  .meme-description {
    display: none;
  }

  .meme-card .fire {
    position: absolute;
    top: 0;
    left: 0;
    width: 90%;
    height: 90%;
    background: url('/images/fire.gif') center center no-repeat;
    background-size: cover;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.5s;
    pointer-events: none;
  }

  .meme-card:hover .fire {
    opacity: 1;
  }

  .footer-style {
    width: 100%;
    background-color: #fff;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding-bottom: 20px;
    position: relative; /* Добавлено */
    margin-top: 20px; /* Добавлено */
  }

  .contacts-head {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .social-links {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .social-links a {
    margin-right: 10px;
  }

  .social-links img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
</style>
