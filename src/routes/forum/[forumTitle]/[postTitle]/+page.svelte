<script>
    import CreateComment from '../../../../lib/components/comments/CreateComment.svelte';
    import ShowComment from '../../../../lib/components/comments/ShowComment.svelte';
    import DeleteComment from '../../../../lib/components/comments/DeleteComment.svelte';


    export let data;
    const posts = data.json.post
    const jwt = data.jwt
    const loggedInUser = data?.userData?.customMessage?.artistName;

    const updateComments = (newComment) => {
        posts.comments = [...posts.comments, newComment];
    }

    const deleteComments = (commentId) => {
        posts.comments = posts.comments.filter((comment) => comment._id !== commentId);
    }

</script>

<h1>TITEL: {posts.postTitle}</h1>
<p>POST: {posts.body}</p>
<br>
<h3>Comments</h3>
{#each posts.comments as comment}
    <ShowComment comment={comment}/>
    {#if comment.commentAuthor === loggedInUser}
    <DeleteComment postid={posts._id} commentid={comment._id} deleteComments={deleteComments}/>
    {/if}
{/each}
{#if jwt}
    <CreateComment jwt={jwt} reference={"forum"} search={posts.postTitle}
             updateComments={updateComments}/>
{/if}

