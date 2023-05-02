<script>
    export let jwt
    export let finalEndPoint = "wallpost"

    let formData = new FormData();
    let postBody

    const createNewPost = async () => {
        formData.append("body", postBody)
        await fetch(`http://localhost:8080/api/posts/wallpost}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${jwt}`
            },
            body: formData
        })
    }
    const handleFileInput = (event) => {
        const file = event.target.files[0];
        formData.append('fileType', file);
    }
</script>
<div class="new-post">
    <form on:submit|preventDefault={createNewPost}>
                <textarea bind:value={postBody} cols="5" id="body" name="body"
                          placeholder="Share your news!"></textarea>
        <input id="fileType" on:change={handleFileInput} type="file">
        <button class="btn-new-post" type="submit">Share!</button>
    </form>
</div>

<style lang="scss">
  .new-post {
    form {
      textarea {
        resize: none;
        width: 100%;
      }
    }
  }
</style>
