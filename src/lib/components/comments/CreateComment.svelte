<script>
    export let jwt;
    export let search;
    export let updateComments;
    export let reference;

    let commentBody;

    const addCommentToPost = async () => {
        await fetch(`http://localhost:8080/api/posts/comments/${reference}/${search}`, {
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
            updateComments(newComment, search);
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
