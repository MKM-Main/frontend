<script>
    export let jwt
    export let reference
    export let updatePostSection
    export let formIsForForum
    let formData = new FormData();
    let postTitle
    let postBody

    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    const createNewPost = async () => {
        document.getElementById("loading-spinner").style.display = "flex"
        formData.append("body", postBody)
        formData.append("postTitle", postTitle)
        await fetch(`http://localhost:8080/api/posts/${reference}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${jwt}`
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                postBody = "";
                dispatch('postCreated');
                updatePostSection(data)
            })
    }

    const handleFileInput = (event) => {
        const file = event.target.files[0];
        formData.append('fileType', file);
    }
</script>
<div class="new-post">
    <form on:submit|preventDefault={createNewPost}>
        {#if formIsForForum}
            <label for="postTitle">Title:</label>
            <input bind:value={postTitle} name="postTitle" id="postTitle" type="text">
        {/if}
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

      button {
        border: 2px solid black;
        border-radius: 15px;
        padding: 10px;
        margin-left: 5px;
      }
    }
  }
</style>
