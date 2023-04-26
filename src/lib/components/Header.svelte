<script>
    let pages = ["/forum", "/artists", "/login"]

    export let artistName = ""
    export let jwt

</script>


<div class="header">
    {#if jwt}
        <a href="/profile/{artistName}">
            <img alt={artistName} src="">
        </a>
    {/if}

    <a href="/">
        <img alt="HOME" class="home" src="">
    </a>

    {#each pages as page}
        <a href="{page}">{page.substring(1)}</a>
    {/each}

</div>


<style lang="scss">
  .header {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: orange;
    padding: 3em;

    a {
      margin: 0 2em;
      text-transform: capitalize;

      .home {
        height: 2em;
      }
    }
  }
</style>
