<script>
    import Hype from "../posts/Hype.svelte";
    export let comment;
    export let jwt
    export let loggedInUser
    console.log(comment)
</script>

<div class="comment">
    <a href="/profile/{comment?.commentAuthor}">{comment?.commentAuthor}</a>
    <p>{comment?.commentBody}</p>
    <p>{comment?.timeStamp}</p>
    <Hype
            jwt="{jwt}"
            loggedInUser="{loggedInUser}"
            postId="{comment._id}"
            postType="comments"
            rating="{comment.rating.length}"
    />

</div>

<style lang="scss">
  .comment {
    border-radius: 15px;
    padding: 10px;
    background-color: #F0F2F5;
    margin-top: 15px;
    -webkit-box-shadow: -1px -1px 15px 8px #E0E1DD;
    box-shadow: -1px -1px 15px 8px #E0E1DD;

    a {
      text-decoration: none;
      color: #0D1B2A;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }

    }

  }
</style>
