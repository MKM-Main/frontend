<script>
    export let comment;
  </script>
  
  <div class="comment">
    <b><p>{comment.commentAuthor}</p></b>
    <p>Comment: {comment.body}</p>
    <p>{comment.timeCreated}</p>
  </div>

<style>
    .comment{
        border: 2px solid black;
        border-radius: 15px;
        padding: 10px;
        background-color: #F0F2F5;
        margin-top: 5px;
    }
</style>