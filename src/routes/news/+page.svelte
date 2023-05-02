<script>
    import ShowComment from "../../lib/components/comments/ShowComment.svelte";
    import File from "../../lib/components/files/UserUploadedFile.svelte";
    export let data

    const posts = data.allPosts
</script>


<div>
    {#each posts as post}
        <div class="post">
            <h2>Post</h2>
            <p>Artist name: {post.artistName}</p>
            <p>Body: {post.body}</p>
            <p>Timestamp: {post.timeStamp}</p>
            <br>
            <File keyReference={post.keyReference}/>
            <h4>Comments</h4>
            <div class="comment">
                {#each post?.comments as comment}
                    <ShowComment comment={comment}/>
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
