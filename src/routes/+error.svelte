<script>
  import { page } from "$app/stores";
  let urlPath = $page.url.pathname.split("/")[1];
  urlPath === "artists" ? (urlPath = "Artist") : "";
  const urlFullPath = $page.url.pathname.split("/")[2] || "URL";
</script>

<div class="error">
  {#if $page.status === 404}
    <h1>An error occurred: {$page.status} Page not found</h1>
    <h2>{urlPath} <i>{urlFullPath}</i> {$page.error.message}</h2>
    <button type="button" on:click={() => history.back()}>Go back</button>
  {:else}
    <h1>An error occurred: {$page.status}</h1>
    <button type="button" on:click={() => history.back()}>Go back</button>
  {/if}
</div>
<svelte:head>
  <title>{$page.status}: {$page.error.message}</title>
</svelte:head>

<style lang="scss">
  .error {
    display: flex;
    align-items: center;
    flex-direction: column;

    h1,
    h2 {
      margin-top: 1.25em;

      i {
        color: orange;
      }
    }

    button {
      margin: 0.75em;
      background-color: orange;
      padding: 1.75em;
      border-radius: 100px;

      &:hover {
        background-color: rgba(232, 155, 12, 0.83);
      }
    }
  }
</style>
