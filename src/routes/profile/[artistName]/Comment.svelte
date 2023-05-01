<script>
    export let comment;
  </script>
  
  <div class="comment">
    <b><p>{comment.commentedBy}</p></b>
    <p>Comment: {comment.body}</p>
    <p>{comment.timeStamp}</p>
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