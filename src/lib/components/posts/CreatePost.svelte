<script>
    export let jwt
    export let reference
    export let updatePostSection
    export let formIsForForum
    export let tags = []

    let formData = new FormData()
    let postTitle
    let postBody
    let postTags = []
    let newTagValue
    let canUpload
    const height = 2048
    const width = 2048
    let currentWidth
    let currentHeight

    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()


    const handleNewTag = () => {
        tags = [...tags, {name: newTagValue, checked: true}]
    }


    const createNewPost = async () => {
        document.getElementById("loading-spinner").style.display = "flex"
        formData.append("body", postBody)
        formData.append("postTitle", postTitle)

        tags.forEach(tag => {
            if (tag.checked) {
                postTags = [...postTags, tag.name]
            }
        })
        formData.append("tags", JSON.stringify(postTags))


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
                postBody = ""
                dispatch('postCreated')
                updatePostSection(data)
            })
    }

    const handleFileInput = (event) => {
        const file = event.target.files[0]
        formData.append('profilePicture', file)

        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                currentWidth = img.width
                currentHeight = img.height
                canUpload = img.width <= 420 && img.height <= 420;
            }
            img.src = e.target.result;
        }
        if (!file) canUpload = true
        reader.readAsDataURL(file);
    }
</script>
<div class="new-post">
    <form on:submit|preventDefault={createNewPost}>
        {#if formIsForForum}
            <label for="postTitle">Title:</label>
            <input bind:value={postTitle} name="postTitle" id="postTitle" type="text" required>
        {/if}

        <textarea bind:value={postBody} cols="5" id="body" name="body"
                  placeholder="Share your news!"></textarea>
        <label for="fileType"
               style="{canUpload === false ? 'color: red' : ''}">{canUpload === false ? `Must not exceed ${height}px * ${width}px | Current size: ${currentHeight} * ${currentWidth} ` : ""}</label>
        <input accept=".pdf, .jpeg, .jpg, .png, .mp4, .m4a, .mp3" id="fileType"
               on:change={handleFileInput} type="file">
        <button class="btn-new-post" class:btn-block-submit={canUpload === false} type="submit">Share!</button>
        <br>
        {#each tags as tag, idx}
            <label for="tag-{idx}">{tag.name}</label>
            <input id="tag-{idx}" on:change={() => tag.checked = !tag.checked} checked={tag.checked} type="checkbox">
        {/each}
    </form>
    <label for="new-tag">New tag:</label>
    <input bind:value={newTagValue} id="new-tag" placeholder="my cool tag!" required type="text">
    <p on:click={handleNewTag}>Add tag</p>
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

    .btn-block-submit {
      pointer-events: none;
      background-color: darkgrey;
    }
  }
</style>
