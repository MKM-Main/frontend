<script>
    import ShowPost from "../../lib/components/posts/ShowPost.svelte";
    import ShowComment from "../../lib/components/comments/ShowComment.svelte";
    import CreateComment from "../../lib/components/comments/CreateComment.svelte";
    export let data

    const jwt = data.jwt
    const loggedInUser = data?.userData?.customMessage?.artistName
    const posts = data?.allPosts


    let shownCommentAmounts = {}
    let showCommentAmountTexts = {}

    const handleShowAllComments = (postId) => {
        shownCommentAmounts[postId] = shownCommentAmounts[postId] === 10 ? 2 : 10;
        showCommentAmountTexts[postId] = showCommentAmountTexts[postId] === "Show more comments" ? "Show less comments" : "Show more comments";
    }

    const updateComments = (newComment, search) => {
        const arrayObject = posts.findIndex(post => post._id === search)
        posts[arrayObject].comments = [...posts[arrayObject].comments, newComment.message]
    }

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
                <CreateComment jwt={jwt} reference={"wallposts"} search={post?._id} updateComments={updateComments}/>
                <div class="comment">
                    {#each post?.comments.slice(0, shownCommentAmounts[post._id] || 2) as comment}
                        <ShowComment
                                comment={comment}
                                jwt="{jwt}"
                                loggedInUser="{loggedInUser}"
                        />
                    {/each}
                    <button class="btn-show-comments" on:click={() => handleShowAllComments(post._id)} type="button">
                        {"Show more comments"}
                    </button>
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

    .btn-show-comments {
      font-size: 1em;
      padding: 0.5em 1em;
      background-color: #415A77;
      color: #E0E1DD;
      border: none;
      border-radius: 0.75em;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #778DA9;
      }
    }
  }
</style>
