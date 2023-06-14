<script>
    import {PUBLIC_BASE_URL} from "$env/static/public";
    export let jwt;
    export let search;
    export let updateComments;
    export let reference;

    let commentBody;

    const addCommentToPost = async () => {
        await fetch(`${PUBLIC_BASE_URL}api/posts/comments/${reference}/${search}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify({commentBody})
        }).then(async (res) => {
            const newComment = await res.json();
            commentBody = ""
            updateComments(newComment, search);
        });
    }
</script>

<form on:submit|preventDefault={addCommentToPost}>
    <div class="comment-post-field">
        <textarea bind:value={commentBody} id="comment" placeholder="Comment" required></textarea>
        <button type="submit">Save comment</button>
    </div>
</form>

<style lang="scss">
  form {
    margin-top: 1em;

    .comment-post-field {
      display: flex;
      align-items: center;

      label {
        font-size: 1em;
        font-weight: bold;
        margin-right: 0.5em;
      }

      textarea {
        flex: 1;
        padding: 0.5em;
        font-size: 1em;
        border: 1px solid #778DA9;
        border-radius: 0.75em;
        resize: none;
        margin-right: 0.75em;
        text-align: center;
      }

      button {
        font-size: 1em;
        padding: 0.5em 1em;
        background-color: #1B263B;
        color: #E0E1DD;
        border: none;
        border-radius: 0.75em;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #778DA9;
        }
      }
    }
  }


</style>
