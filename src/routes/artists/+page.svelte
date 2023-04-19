<script>
    export let data
    const artists = data.artists

</script>

<div class="container">
    {#each artists as artist}
        <div class="artist">
            <p>{artist.artistName}</p>
            <a href="profile/{artist.artistName}">Link</a>
            <img src="{artist.image}" alt="artist">
        </div>
    {/each}
</div>


<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: repeat(4, auto);

    .artist {
      height: fit-content;
      margin: 5px 2px;
      background-color: teal;
    }
  }
</style>
