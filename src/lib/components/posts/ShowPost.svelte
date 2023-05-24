<script>
  import UserUploadedFile from "../files/UserUploadedFile.svelte";
  import Hype from "./Hype.svelte";
  import {env} from "$env/dynamic/public";
  export let post = null
  export let jwt
  export let loggedInUser

  const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX;

</script>


{#if post?.body}
  <div id="{post._id}" class="main-container">
    <div class="img-container">
      {#if post?.profilePictureKey === "blank_profile.webp"}
        <a href="/profile/{post?.artistName}"><img class="profile-picture"
                                                      src="{imageSourcePrefix}{post?.profilePictureKey}" alt=""></a>
      {:else}
        <a href="/profile/{post?.artistName}"><img class="profile-picture"
                                                      src="{imageSourcePrefix}{post?.artistId}/profile/{post?.profilePictureKey}"
                                                      alt=""></a>
      {/if}
      <a href="/profile/{post?.artistName}"><h3>{post?.artistName}</h3></a>
    </div>

    <div class="content">
      {#if post.postTitle}
        <h2>{post.postTitle}</h2>
      {/if}
      <p>{post?.body}</p>
    </div>

    <div class="post-file">
      <UserUploadedFile
              artistId="{post.artistId}"
              keyReference="{post?.keyReference}"
      />
    </div>

    <Hype
            jwt="{jwt}"
            loggedInUser="{loggedInUser}"
            postId="{post._id}"
            rating="{post?.rating?.length}"
    />
    <p>{post?.timeStamp}</p>
  </div>
{/if}

<style lang="scss">
  .main-container {
    width: 100%;
    padding: 1em;
    margin: 1em 0;
    border-radius: 0.75em;
    display: flex;
    flex-direction: column;
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

    h3 {
      margin-left: 0.3em;
    }
  }

  .content {
    margin-bottom: 1em;
  }

  .artist-div {
    margin-bottom: 1.25em;
  }

  .profile-picture {
    width: 4em;
    height: 4em;
    border-radius: 20px;
  }

  .img-container {
    display: flex;
    align-items: center;
  }
</style>
