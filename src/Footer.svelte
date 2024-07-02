<script>
  export let githubUrl = 'https://github.com/Vitalo-bit';
  export let telegramUrl = 'https://t.me/gotterkiller';
  export let emailUrl = 'mailto:nijaz.shaidullin@yandex.ru';
</script>

<footer class="footer-style">
  <div class="contacts-head">
    <h2>Contact me</h2>
  </div>
  <div class="social-links">
    <a id="gh-link" href={githubUrl}><img src="images/github.png" alt="GitHub"></a>
    <a id="tg-link" href={telegramUrl}><img src="images/telegram.png" alt="Telegram"></a>
    <a id="email" href={emailUrl}><img src="images/yandex.png" alt="Email"></a>
  </div>
</footer>

<style>
  /* Стили перенесены из вашего файла styles.css */
  .footer-style {
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 -2px 5px rgba(0,0,0,0.1);
    text-align: center;
    padding-bottom: 20px;
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
  .contacts-head {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
