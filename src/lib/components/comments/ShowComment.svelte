<script>
    import Hype from "../posts/Hype.svelte";
    export let comment;
    export let jwt
    export let loggedInUser
</script>

<div class="comment">
    <a href="/profile/{comment?.commentAuthor}">{comment?.commentAuthor}</a>
    <p>Comment: {comment?.commentBody}</p>
    <p>{comment?.timeStamp}</p>
    <Hype
            jwt="{jwt}"
            loggedInUser="{loggedInUser}"
            postId="{comment._id}"
            postType="comments"
            rating="{comment.rating.length}"
    />

</div>

<style>
    .comment {
        border: 2px solid black;
        border-radius: 15px;
        padding: 10px;
        background-color: #F0F2F5;
        margin-top: 5px;
    }
</style>
