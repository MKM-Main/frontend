<script>
    import CreateComment from '../../../../lib/components/comments/CreateComment.svelte';
    import ShowComment from '../../../../lib/components/comments/ShowComment.svelte';
    import DeleteComment from '../../../../lib/components/comments/DeleteComment.svelte';
    import UserUploadedFile from "../../../../lib/components/files/UserUploadedFile.svelte";
    import DeletePost from "../../../../lib/components/posts/DeletePost.svelte";
    import {goto} from "$app/navigation";
    import {page} from "$app/stores";


    export let data;
    const post = data.json.post
    const jwt = data.jwt
    const loggedInUser = data?.userData?.customMessage?.artistName;

    const updateComments = (newComment) => {
        post.comments = [...post.comments, newComment];
    }

    const deleteComments = (commentId) => {
        post.comments = post.comments.filter((comment) => comment._id !== commentId);
    }

    const handleDeletedPostRedirect = () => {
        goto($page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/')));
    }

</script>

<h1>TITEL: {post.postTitle}</h1>
{#if loggedInUser === post.artistName}
    <DeletePost
            jwt="{jwt}"
            on:postDeleted={handleDeletedPostRedirect}
            postId="{post._id}"
    />
{/if}
<p>POST: {post.body}</p>
<UserUploadedFile keyReference="{post.keyReference}"/>
<br>
<h3>Comments</h3>
{#each post.comments as comment}
    <ShowComment comment={comment}/>
    {#if comment.commentAuthor === loggedInUser}
        <DeleteComment postid={post._id} commentid={comment._id} deleteComments={deleteComments}/>
    {/if}
{/each}
{#if jwt}
    <CreateComment jwt={jwt} reference={"forum"} search={post.postTitle}
                   updateComments={updateComments}/>
{/if}

