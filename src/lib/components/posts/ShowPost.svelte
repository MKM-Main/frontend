<script>
    import UserUploadedFile from "../files/UserUploadedFile.svelte";
    import Hype from "./Hype.svelte";
    export let post = null
    export let jwt
    export let loggedInUser

</script>

<h2>Post</h2>
<div class="artist-div">
    <b>{post?.artistName}</b>
</div>
{#if post?.body}
    <div class="post-body">
        <p>{post?.body}</p>
        <p>Timestamp: {post?.timeStamp}</p>
    </div>
    <Hype
            jwt="{jwt}"
            loggedInUser="{loggedInUser}"
            postId="{post._id}"
            rating="{post?.rating?.length}"
    />
{/if}
<div class="post-file">
    <UserUploadedFile keyReference="{post?.keyReference}"/>
</div>
