<script>
    import DeletePost from "../../../../lib/components/posts/DeletePost.svelte";
    import {goto} from "$app/navigation";
    import {page} from "$app/stores";
    import ShowPost from "../../../../lib/components/posts/ShowPost.svelte";
    import ShowComment from "../../../../lib/components/comments/ShowComment.svelte";
    import DeleteComment from "../../../../lib/components/comments/DeleteComment.svelte";
    import Report from "../../../../lib/components/util/Report.svelte";
    import CreateComment from "../../../../lib/components/comments/CreateComment.svelte";
    import UserUploadedFile from "$lib/components/files/UserUploadedFile.svelte";


    export let data;
    const post = data.json.post

    const jwt = data.jwt
    const loggedInUser = data?.userData?.customMessage?.artistName;

    const updateComments = (newComment) => {
        post.comments = [newComment, ...post.comments];
    }

    const deleteComments = (commentId) => {
        post.comments = post.comments.filter((comment) => comment._id !== commentId);
    }

    const handleDeletedPostRedirect = () => {
        goto($page.url.pathname.substring(0, $page.url.pathname.lastIndexOf('/')));
    }

</script>


<div class="post-container">
    <div class="container">
    <ShowPost
        jwt="{jwt}"
        loggedInUser="{loggedInUser}"
        post="{post}"
    />
    {#if loggedInUser === post.artistName}
    <DeletePost
            jwt="{jwt}"
            on:postDeleted={handleDeletedPostRedirect}
            postId="{post._id}"
    />
    {/if}
    </div>
    
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
        <CreateComment jwt={jwt} reference={"forum"} search={post._id}
                       updateComments={updateComments}/>
    {/if}
</div>

<style lang="scss">
  .post-container {
    justify-content: center;
    width: 70%;
    margin: 0 15%;
    .comment {
    border-radius: 15px;
    padding: 10px;
    background-color: #F0F2F5;
    margin-top: 15px;
    -webkit-box-shadow: -1px -1px 15px 8px #E0E1DD;
    box-shadow: -1px -1px 15px 8px #E0E1DD;
    width: 100%;
    }
  }
</style>

