<script>
  import ShowPost from "../../lib/components/posts/ShowPost.svelte";
  import ShowComment from "../../lib/components/comments/ShowComment.svelte";
  import CreateComment from "../../lib/components/comments/CreateComment.svelte";
  import Report from "../../lib/components/util/Report.svelte";
  import DeleteComment from "../../lib/components/comments/DeleteComment.svelte";
  export let data;

  const jwt = data.jwt;
  const loggedInUser = data?.userData?.customMessage?.artistName;
  let posts = data?.allPosts;

  let shownCommentAmounts = {};
  let showCommentAmountTexts = {};

  //Function that handles the show more and less option on the comments
  const handleShowAllComments = (postId) => {
    shownCommentAmounts[postId] = shownCommentAmounts[postId] === 100 ? 2 : 100;
    showCommentAmountTexts[postId] =
      showCommentAmountTexts[postId] === "Show less comments"
        ? "Show more comments"
        : "Show less comments";
  };

  //Updates the comments dynamically after one comment is created
  const updateComments = (newComment, search) => {
    const arrayObject = posts.findIndex((post) => post._id === search);
    posts[arrayObject].comments = [
      newComment.message,
      ...posts[arrayObject].comments,
    ];
  };

  //Update the comments dynamically after a comment is deleted
  const deleteComments = (commentId) => {
    const newPosts = posts.map((post) => {
      // Copy the post object to avoid modifying the original
      const updatedPost = { ...post };

      // Check if the comments array exists in the current post object
      if (updatedPost.comments) {
        // Filter the comments array to remove the comment with the given commentId
        updatedPost.comments = updatedPost.comments.filter(
          (comment) => comment._id !== commentId
        );
      }
      return updatedPost;
    });

    // Update the posts array with the modified version
    posts = newPosts;
  };
</script>

<div class="post-container">
  {#if posts.length === 0}
    <h1>My Dear Friend</h1>
    <h3>
      Either you are not following anyone, or it looks like the people you are
      following haven't posted anything yet.
    </h3>
    <h3>Go to the artist page and find more interesting artists.</h3>
    <h2><a href="http://localhost:5173/artists">ARTISTS</a></h2>
  {:else}
    {#each posts as post}
      <div class="post">
        <ShowPost {jwt} {loggedInUser} {post} />
        <h4>Comments</h4>
        <CreateComment
          {jwt}
          reference={"wallposts"}
          search={post?._id}
          {updateComments}
        />
        {#each post?.comments.slice(0, shownCommentAmounts[post._id] || 2) as comment}
          <div class="comment" id={comment._id}>
            <ShowComment {comment} {jwt} {loggedInUser} />
            <Report
              {jwt}
              collection={"posts"}
              postId={post._id}
              id={comment._id}
            />
            {#if comment.commentAuthor === loggedInUser}
              <DeleteComment
                postid={post._id}
                commentid={comment._id}
                {deleteComments}
              />
            {/if}
          </div>
        {/each}
        <button
          class="btn-show-comments"
          on:click={() => handleShowAllComments(post._id)}
          type="button"
        >
          {showCommentAmountTexts[post._id] || "Show more comments"}
        </button>
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
    -webkit-box-shadow: -1px -1px 15px 8px #e0e1dd;
    box-shadow: -1px -1px 15px 8px #e0e1dd;

    .post {
      width: 100%;
    }

    .comment {
      border-radius: 15px;
      padding: 10px;
      background-color: #f0f2f5;
      margin-top: 15px;
      -webkit-box-shadow: -1px -1px 15px 8px #e0e1dd;
      box-shadow: -1px -1px 15px 8px #e0e1dd;
      width: 100%;
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
        color: #415a77;
        text-decoration: none;

        &:hover {
          color: #1b263b;
        }
      }
    }

    .btn-show-comments {
      font-size: 1em;
      padding: 0.5em 1em;
      background-color: #415a77;
      color: #e0e1dd;
      border: none;
      border-radius: 0.75em;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #778da9;
      }
    }
  }
</style>
