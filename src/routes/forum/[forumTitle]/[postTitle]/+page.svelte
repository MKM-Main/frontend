<script>
    import Comment from './Comment.svelte';
    export let data;
    const posts = data.json.post
    const commentsArray = posts.comments
    const loggedInUser = data?.userData?.customMessage?.artistName
    const jwt = data.jwt

    const updateComments = (newComment) => {
        posts.comments = [...posts.comments, newComment];
    }

</script>

<h1>TITEL: {posts.postTitle}</h1>
<p>POST: {posts.body}</p>
<br>
<h3>Comments</h3>
{#each posts.comments as comment}
    <div class="post-container">
        <a href="/profile/{comment.commentAuthor}">{comment.commentAuthor}</a>
        <p>{comment.commentBody}</p>
        <p>{comment.rating}</p>
    </div>
    <br>
{/each}
{#if jwt}
    <Comment jwt={jwt} commentAuthor={loggedInUser} postTitle={posts.postTitle}
             updateComments={updateComments}/>
{/if}


<style>
    .post-container {
        border-bottom: 1px solid black;
        border-top: 1px solid black;
    }

    input {
        background-color: black;
        color: white;
    }

</style>
