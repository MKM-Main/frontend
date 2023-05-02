<script>
    export let comment;
</script>

<div class="comment">
    <a href="/profile/{comment.commentAuthor}">{comment.commentAuthor}</a>
    <p>Comment: {comment.commentBody}</p>
    <p>{comment.timeStamp}</p>
    <p>rating: {comment.rating}</p>
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
