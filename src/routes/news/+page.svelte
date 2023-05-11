<script>
    import ShowComment from "$lib/components/comments/ShowComment.svelte";
    import ShowPost from "../../lib/components/posts/ShowPost.svelte";
    export let data

    const jwt = data.jwt
    const loggedInUser = data?.userData?.customMessage?.artistName
    const posts = data?.allPosts
    console.log(data.allPosts.message)
    
</script>


<div>
    {#if data.allPosts.message === "no posts" || posts.length === 0}
    <h1>My Dear Friend</h1>
    <h3>Either you are not following anyone, or it looks like the people you are following haven't posted anything yet.</h3>
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
  .post {
    border: 2px solid black;
    margin: 5px;

    .comment {
      border: 2px solid teal;
      margin: 5px;
    }
  }

</style>
