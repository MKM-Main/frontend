<script>
    export let data
    import CreateForum from './CreateForum.svelte';
    const forums = data?.forumData
    const jwt = data?.jwt


    function replaceSpacesWithHyphens(title) {
        if (title.includes(" ")) {
            return title.replace(/ /g, "-");
        }
        return title;
    }

</script>


<div class="forum-container">
    <h1>Forums</h1>
    {#each forums.forum as forum}
        {#if forum.verified === true}
            <a class="forum" href="/forum/{replaceSpacesWithHyphens(forum.forumTitle)}">
                <div>
                    <p>{forum.forumTitle}</p>
                </div>
            </a>
        {/if}
    {/each}
    {#if jwt}
        <CreateForum jwt={jwt}/>
    {/if}
</div>

<style lang="scss">
  .forum-container {
    h1 {
      font-size: 3em;
      text-align: center;
    }

    a {
      font-size: 2em;
      text-decoration: none;
      color: #0D1B2A;
      font-weight: bold;

      &:hover {
        color: #778DA9;
      }
    }

    .forum {
      width: 50%;
      margin: 25px 25%;
      padding: 0.5em;
      border-radius: 0.75em;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      box-shadow: -1px -1px 15px 8px #e0e1dd;
      background-color: #ffffff;

      .forum-title {
        text-align: center;
        margin-bottom: 0.5em;
      }
    }
  }
</style>
