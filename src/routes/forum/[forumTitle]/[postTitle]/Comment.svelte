<script>

export let jwt
export let commentAuthor
export let postTitle
let comment

const addCommentToPost = async () => {
        await fetch(`http://localhost:8080/forum/forumtitle/${postTitle}}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify({commentAuthor, comment})
        }).then(async res =>{
            console.log("In patch request")
            console.log(await res.json())
        })
    }

</script>

<form on:submit|preventDefault={addCommentToPost}>
    <div class="comment-post-field">
        <label for="comment">Comment: </label>
        <input bind:value={comment} id="comment" type="text">
        <button type="submit">Save comment</button>
    </div>
</form>