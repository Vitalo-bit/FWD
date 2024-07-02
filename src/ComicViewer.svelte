<script>
  let comicData = null;
  let loading = true;
  let error = null;

  async function loadComic() {
    const email = 'n.shaydullin@innopolis.university';
    try {
      const response = await fetch(`https://fwd.innopolis.university/api/hw2?email=${email}`);
      const comicID = await response.json();
      const comicResponse = await fetch(`https://fwd.innopolis.university/api/comic?id=${comicID}`);
      comicData = await comicResponse.json();
      loading = false;
    } catch (err) {
      error = 'Failed to load comic. Please try again later.';
      loading = false;
    }
  }

  loadComic();
</script>

{#if loading}
  <p>Loading comic...</p>
{:else if error}
  <p>{error}</p>
{:else}
  <div class="comic-container">
    <h1>XKCD Comic Viewer</h1>
    <div class="comic-content">
      <img src={comicData.img} alt={comicData.alt}>
      <h2>{comicData.safe_title}</h2>
      <p>Published: {new Date(comicData.year, comicData.month - 1, comicData.day).toLocaleDateString()}</p>
    </div>
  </div>
{/if}

<style>
  .comic-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .comic-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .comic-content img {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
</style>
