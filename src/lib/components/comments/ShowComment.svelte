<script>
  import Hype from "../posts/Hype.svelte";
  import {env} from "$env/dynamic/public";
  import DeleteComment from "./DeleteComment.svelte";
  export let comment;
  export let jwt
  export let loggedInUser
  export let postId
  export let deleteComments

  const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX;

</script>
<div class="main-container">
    <div class="img">
        {#if comment?.profilePictureKey === "blank_profile.webp"}
            <a href="/profile/{comment?.commentAuthor}"><img class="profile-picture"
                                                             src="{imageSourcePrefix}{comment?.profilePictureKey}"
                                                             alt=""></a>
        {:else}
            <a href="/profile/{comment?.commentAuthor}"><img class="profile-picture"
                                                             src="{imageSourcePrefix}{comment?.artistId}/profile/{comment?.profilePictureKey}"
                                                             alt=""></a>
        {/if}
    </div>

    <div class="comment">
        <div>
            <a href="/profile/{comment?.commentAuthor}"><b><p>{comment?.commentAuthor}</p></b></a>
        </div>
        <div>
            <p>{comment?.commentBody}</p>
        </div>
        <Hype
                jwt="{jwt}"
                loggedInUser="{loggedInUser}"
                postId="{comment._id}"
                postType="comments"
                rating="{comment.rating.length}"
        />
        <div>
            <p>{comment?.timeStamp}</p>
        </div>

    </div>
</div>


<style lang="scss">
  .main-container {
    display: flex;
    align-items: flex-end;
  }

  .comment {
    border-radius: 15px;
    padding: 10px;
    background-color: #F0F2F5;
    margin-top: 15px;
    -webkit-box-shadow: -1px -1px 15px 8px #E0E1DD;
    box-shadow: -1px -1px 15px 8px #E0E1DD;
    width: 100%;

    a {
      text-decoration: none;
      color: #0D1B2A;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }

    }
  }

  .profile-picture {
    width: 4em;
    height: 4em;
    border-radius: 20px;
    margin-right: 1em;
  }
</style>
