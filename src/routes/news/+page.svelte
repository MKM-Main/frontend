<script>
    import ShowPost from "../../lib/components/posts/ShowPost.svelte";
    import ShowComment from "../../lib/components/comments/ShowComment.svelte";
    export let data

    const jwt = data.jwt
    const loggedInUser = data?.userData?.customMessage?.artistName
    const posts = data?.allPosts


</script>

<div class="post-container">
    {#if data.allPosts.message === "no posts" || posts.length === 0}
        <h1>My Dear Friend</h1>
        <h3>Either you are not following anyone, or it looks like the people you are following haven't posted anything
            yet.</h3>
        <h3>Go to the artist page and find more interesting artists.</h3>
        <h2><a href="http://localhost:5173/artists">ARTISTS</a></h2>
    {:else}
        {#each posts as post}
            <div class="post">
                <ShowPost
                        jwt="{jwt}"
                        loggedInUser="{loggedInUser}"
                        post="{post}"
                />
                <h4>Comments</h4>
                <div class="comment">
                    {#each post?.comments as comment}
                        <ShowComment
                                comment={comment}
                                jwt="{jwt}"
                                loggedInUser="{loggedInUser}"
                        />
                    {/each}
                </div>
            </div>
        {/each}
    {/if}
</div>

<style lang="scss">
  .post-container {
    width: 50%;
    margin: 0 25%;
    padding: 1em;
    border-radius: 0.75em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    -webkit-box-shadow: -1px -1px 15px 8px #E0E1DD;
    box-shadow: -1px -1px 15px 8px #E0E1DD;

    .post {
      width: 100%;
    }

    .comment {
      width: 75%;
      margin: auto;
    }

    h1 {
      font-size: 1.5em;
      margin-bottom: 0.5em;
    }

    h3 {
      font-size: 1em;
      margin-bottom: 0.5em;
    }

    h2 {
      font-size: 1.25em;
      margin-top: 1em;

      a {
        color: #415A77;
        text-decoration: none;

        &:hover {
          color: #1B263B;
        }
      }
    }
  }
</style>
