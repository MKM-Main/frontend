<script>
    import ShowComment from "$lib/components/comments/ShowComment.svelte";
    import ShowPost from "../../lib/components/posts/ShowPost.svelte";
    export let data

    const jwt = data.jwt
    const loggedInUser = data.userData?.customMessage?.artistName
    const posts = data.allPosts
</script>


<div>
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
