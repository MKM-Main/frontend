<script>
    import Comment from './Comment.svelte';
    export let data;
    const posts = data.json.post
    console.log()
    console.log("wwe" ,posts)
    console.log("wehere")
    const loggedInUser = data?.userData?.customMessage?.artistName
    const jwt = data.jwt
    console.log(posts)
</script>

<h1>TITEL: {posts.postTitle}</h1>
<p>POST: {posts.body}</p>

    {#each posts.comments as comment}
    <div class="post-container">
    <a href="/profile/{comment.author}">{comment.author}</a>
    <p>{comment.body}</p>
    <p>{comment.rating}</p>
    </div>
    {/each}
    {#if jwt}
    <Comment jwt={jwt} commentAuthor={loggedInUser} postTitle={posts.postTitle}/>
    {/if}


<style>
    .post-container {
        border-bottom: 1px solid black;
        border-top: 1px solid black;
    }
    input{
        background-color: black;
        color: white;
    }
    
    </style>
