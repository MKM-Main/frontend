<script>
  import DeletePost from "../../../../lib/components/posts/DeletePost.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import ShowPost from "../../../../lib/components/posts/ShowPost.svelte";
  import ShowComment from "../../../../lib/components/comments/ShowComment.svelte";
  import DeleteComment from "../../../../lib/components/comments/DeleteComment.svelte";
  import Report from "../../../../lib/components/util/Report.svelte";
  import CreateComment from "../../../../lib/components/comments/CreateComment.svelte";

  export let data;
  const post = data.json.post;

  const jwt = data.jwt;
  const loggedInUser = data?.userData?.customMessage?.artistName;

  
  const updateComments = (newComment) => {
    post.comments = [newComment, ...post.comments];
  };

  const deleteComments = (commentId) => {
    post.comments = post.comments.filter(
      (comment) => comment._id !== commentId
    );
  };

  //Post gets deleted. Must redirect to prevent crash
  const handleDeletedPostRedirect = () => {
    goto($page.url.pathname.substring(0, $page.url.pathname.lastIndexOf("/")));
  };
</script>

<div class="post-container">
  <div class="container">
    <ShowPost {jwt} {loggedInUser} {post} />
    {#if loggedInUser === post.artistName}
      <DeletePost
        {jwt}
        on:postDeleted={handleDeletedPostRedirect}
        postId={post._id}
      />
    {/if}
  </div>

  {#if jwt}
    <CreateComment
      {jwt}
      reference={"forum"}
      search={post._id}
      {updateComments}
    />
  {/if}
  {#each post.comments as comment}
    <div id={comment._id} class="comment">
      <ShowComment {comment} {jwt} {loggedInUser} />
      {#if comment.commentAuthor === loggedInUser}
        <DeleteComment
          postid={post._id}
          commentid={comment._id}
          {deleteComments}
        />
      {/if}
      {#if jwt}
        <Report
          {jwt}
          collection={"posts"}
          postId={post._id}
          id={comment._id}
          title={post.postTitle}
        />
      {/if}
    </div>
  {/each}
</div>

<style lang="scss">
  .post-container {
    justify-content: center;
    width: 70%;
    margin: 0 15%;

    .comment {
      border-radius: 15px;
      padding: 10px;
      background-color: #f0f2f5;
      margin-top: 15px;
      -webkit-box-shadow: -1px -1px 15px 8px #e0e1dd;
      box-shadow: -1px -1px 15px 8px #e0e1dd;
      width: 100%;
    }
  }
</style>
