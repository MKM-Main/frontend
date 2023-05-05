<script>
    import {env} from "$env/dynamic/public";
    import Logout from "../../routes/(auth)/Logout.svelte";
    let pages = ["forum", "artists", "login"]

    export let artistName
    export let jwt
    export let imageSource


</script>


<div class="header">
    <div>
        <a href="/">
            <img alt="HOME" class="home" src="{env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX}note.svg">
        </a>
    </div>

    <div>
        {#if jwt}
            <a href="/news">News</a>
        {/if}
        {#each pages as page}
            <a href="/{page}">{page}</a>
        {/each}
    </div>


    {#if jwt}
        <Logout/>
        <div>
            <a href="/profile/{artistName}">
                <img alt="{artistName}" src="{imageSource}">
            </a>
        </div>
    {/if}

</div>


<style lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: orange;
    padding: 3em;

    a {
      margin: 0 2em;
      text-transform: capitalize;

      .home {
        height: 6.5em;
      }

      img {
        height: 2.75em;
        border-radius: 100px;
      }
    }
  }
</style>
