<script>
    let pages = ["/login", "/forum", "/artists"]


</script>


<div class="header">
    <img alt="YOU" src="">
    <img alt="HOME" src="">

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
    }
  }
</style>
