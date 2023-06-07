<script>
    import {imageHeight, imageWidth} from "../../stores.js";
    import {createEventDispatcher} from 'svelte'
    import {PUBLIC_BASE_URL} from "$env/static/public";
    import toast, {Toaster} from "svelte-french-toast";
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
    const height = $imageHeight
    const width = $imageWidth
    let currentWidth
    let currentHeight

    const dispatch = createEventDispatcher()


    const handleNewTag = () => {
        if (newTagValue === undefined) return
        tags = [...tags, {name: newTagValue, checked: true}]
    }


    const createNewPost = async () => {
        formData.append("body", postBody)
        formData.append("postTitle", postTitle)

        tags.forEach(tag => {
            if (tag.checked) {
                postTags = [...postTags, tag.name]
            }
        })
        formData.append("tags", JSON.stringify(postTags))

        await toast.promise(
            fetch(`${PUBLIC_BASE_URL}api/posts/${reference}`, {
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
                }),
            {
                loading: "Creating post...",
                success: "Post created",
                error: "Error creating post"
            }
        )
    }

    const handleFileInput = (event) => {
        const file = event.target.files[0]
        formData.append('fileType', file)

        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                currentWidth = img.width
                currentHeight = img.height
                canUpload = img.width <= width && img.height <= height;
            }
            img.src = e.target.result;
        }
        if (!file) canUpload = true
        reader.readAsDataURL(file);
    }
</script>
<div class="new-post">
    <Toaster/>
    <form on:submit|preventDefault={createNewPost}>
        {#if formIsForForum}
            <label for="postTitle">Title:</label>
            <input bind:value={postTitle} name="postTitle" id="postTitle" type="text" required>
        {/if}

        <textarea bind:value={postBody} cols="5" id="body" name="body"
                  placeholder="Share your news!" required></textarea>
        <label for="fileType"
               style="{canUpload === false ? 'color: red' : ''}">{canUpload === false ? `Must not exceed ${height}px * ${width}px | Current size: ${currentHeight} * ${currentWidth} ` : ""}</label>
        <input accept=".pdf, .jpeg, .jpg, .png, .mp4, .m4a, .mp3" id="fileType"
               on:change={handleFileInput} type="file">
        <button class="btn-new-post" class:btn-block-submit={canUpload === false} type="submit">Share!</button>
        <br>
        <div class="tags-container">
            {#each tags as tag, idx}
                <label for="tag-{idx}">{tag.name}</label>
                <input id="tag-{idx}" on:change={() => tag.checked = !tag.checked} checked={tag.checked}
                       type="checkbox">
            {/each}
        </div>
    </form>
    <label for="new-tag">New tag:</label>
    <input bind:value={newTagValue} id="new-tag" placeholder="my cool tag!" required type="text">
    <button on:click={handleNewTag}>Add tag</button>
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

    .tags-container {
      display: grid;
    }

    .btn-block-submit {
      pointer-events: none;
      background-color: darkgrey;
    }
  }
</style>
