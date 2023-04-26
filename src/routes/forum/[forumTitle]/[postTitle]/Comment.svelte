<script>
    export let jwt;
    export let commentAuthor;
    export let postTitle;
    export let updateComments;

    let commentBody;

    const addCommentToPost = async () => {
        await fetch(`http://localhost:8080/forum/forumtitle/${postTitle}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify({commentAuthor, commentBody})
        }).then(async (res) => {
            const newComment = await res.json();
            updateComments(newComment);
        });
    };
</script>

<form on:submit|preventDefault={addCommentToPost}>
    <div class="comment-post-field">
        <label for="comment">Comment: </label>
        <input bind:value={commentBody} id="comment" required type="text">
        <button type="submit">Save comment</button>
    </div>
</form>
