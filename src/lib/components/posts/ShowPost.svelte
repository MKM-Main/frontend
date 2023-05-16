<script>
    import UserUploadedFile from "../files/UserUploadedFile.svelte";
    import Hype from "./Hype.svelte";
    export let post = null
    export let jwt
    export let loggedInUser

</script>


{#if post?.body}
    <div class="post-body">
        {#if post.postTitle}
            <h2>{post.postTitle}</h2>
        {/if}
        <h3>{post?.artistName}</h3>
        <p>{post?.body}</p>
        <p>Timestamp: {post?.timeStamp}</p>
        <Hype
                jwt="{jwt}"
                loggedInUser="{loggedInUser}"
                postId="{post._id}"
                rating="{post?.rating?.length}"
        />
    </div>
{/if}
<div class="post-file">
    <UserUploadedFile keyReference="{post?.keyReference}"/>
</div>

<style lang="scss">
  .post-body {
    width: 100%;
    padding: 1em;
    margin: 1em 0;
    border-radius: 0.75em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    -webkit-box-shadow: -1px -1px 15px 8px #E0E1DD;
    box-shadow: -1px -1px 15px 8px #E0E1DD;
  }

  .artist-div {
    margin-bottom: 1.25em;
  }

</style>
