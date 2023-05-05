<script>
    import UserUploadedFile from "../files/UserUploadedFile.svelte";
    export let post
</script>

<div class="artist-div">
    <b>{post?.artistName}</b>
</div>
{#if post?.body}
    <div class="post-body">
        <p>{post?.body}</p>
    </div>
{/if}
<div class="post-file">
    <UserUploadedFile keyReference="{post?.keyReference}"/>
</div>
