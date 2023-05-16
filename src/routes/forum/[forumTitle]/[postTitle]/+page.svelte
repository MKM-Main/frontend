<script>
    import DeletePost from "../../../../lib/components/posts/DeletePost.svelte";
    import {goto} from "$app/navigation";
    import {page} from "$app/stores";
    import ShowPost from "../../../../lib/components/posts/ShowPost.svelte";
    import ShowComment from "../../../../lib/components/comments/ShowComment.svelte";
    import DeleteComment from "../../../../lib/components/comments/DeleteComment.svelte";
    import Report from "../../../../lib/components/util/Report.svelte";
    import CreateComment from "../../../../lib/components/comments/CreateComment.svelte";


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

{#if loggedInUser === post.artistName}
    <DeletePost
            jwt="{jwt}"
            on:postDeleted={handleDeletedPostRedirect}
            postId="{post._id}"
    />
{/if}
<div class="post-container">
    <ShowPost
            jwt="{jwt}"
            loggedInUser="{loggedInUser}"
            post="{post}"
    />
    {#each post.comments as comment}
        <div class="comment">
            <ShowComment
                    comment={comment}
                    jwt="{jwt}"
                    loggedInUser="{loggedInUser}"

            />
            {#if comment.commentAuthor === loggedInUser}
                <DeleteComment postid={post._id} commentid={comment._id} deleteComments={deleteComments}/>
            {/if}
            {#if jwt}
                <Report jwt={jwt} collection={"posts"} postId={post._id} id={comment._id} title={post.postTitle}/>
            {/if}
        </div>
    {/each}
    {#if jwt}
        <CreateComment jwt={jwt} reference={"forum"} search={post.postTitle}
                       updateComments={updateComments}/>
    {/if}
</div>

<style lang="scss">
  .post-container {
    justify-content: center;
    width: 70%;
    margin: 0 15%;
  }
</style>

