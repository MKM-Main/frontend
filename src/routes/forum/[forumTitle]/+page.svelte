<script>
    import Modal from "../../profile/[artistName]/Modal.svelte";
    import DeletePost from "../../../lib/components/posts/DeletePost.svelte";
    export let data;
    const forumTitle = data.forumTitle
    const jwt = data.jwt
    let forums = data?.json?.forum
    let modal = false
    let formData = new FormData();
    let postBody
    let postTitle

    function replaceSpacesWithHyphens(title) {
        if (title.includes(" ")) {
            return title.replace(/ /g, "-");
        }
        return title;
    }


    const createNewPost = async () => {
        document.getElementById("loading-spinner").style.display = "flex"
        formData.append("body", postBody)
        formData.append("postTitle", postTitle)
        await fetch(`http://localhost:8080/api/posts/${forumTitle}`, {
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
                modal = !modal
                forums = [...forums, data.newPost]
            })
    }
    const handleFileInput = (event) => {
        const file = event.target.files[0];
        formData.append('fileType', file);
    }
    const deletePost = async (postId) => {
        await fetch(`http://localhost:8080/api/posts/${postId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
            .then(() => {
                forums = forums.filter(post => post._id !== postId)
            })
    }

</script>


<h1>{forums[0]?.referenceName}</h1>

<div class="forum-container">
    {#each forums as forum}
        <!-- <a href="/forum/{replaceSpacesWithHyphens(forum.referenceName)}/{replaceSpacesWithHyphens(forum.postTitle)}"> -->
        <div class="posts">
            <DeletePost
                    jwt="{jwt}"
                    posts="{forums}"
                    postId="{forum._id}"
            />
            <a href="/forum/{forum.referenceName}/{forum.postTitle}">
                <p>Post Title: {forum.postTitle}</p>
                <p>Body: {forum.body} </p>
                <p>User who created post: {forum.artistName} </p>
                <p>Created at: {forum.timeStamp}</p>
                <p>Rating: {forum.rating}</p>
                <p>Number of comments: {forum.comments.length}</p>
            </a>
        </div>
        <div class="splitter"/>
    {/each}
</div>
<div class="btn-container">
    <button class="btn-create-post" on:click={() => modal = !modal}>Create new post!</button>
</div>
{#if modal}
    <Modal on:close={() => modal = false}>
        <div class="new-post">
            <form on:submit|preventDefault={createNewPost}>
                <label for="postTitle">Title:</label>
                <input bind:value={postTitle} name="postTitle" id="postTitle" type="text">
                <hr>
                <textarea bind:value={postBody} placeholder="Share your news!" name="body" id="body"
                          cols="5"></textarea>
                <input type="file" accept=".mp3,.m4a,.mp4,image/jpeg,image/jpg,image/png,application/pdf"
                       on:change={handleFileInput} id="fileType">
                <button class="btn-new-post" type="submit">Share!</button>
            </form>
            <div id="loading-spinner" style="display: none;">
                <div class="spinner"></div>
                <div>Uploading post!</div>
            </div>
        </div>

    </Modal>
{/if}


<style lang="scss">
  .forum-container {
    border-bottom: 1px solid black;

    i {
      position: relative;
      left: 97%;

      &:hover {
        color: red;
        cursor: pointer;
        scale: 1.25;
      }
    }
  }

  a {
    color: black;
    text-decoration: none;
  }

  .posts:hover {
    background-color: grey;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    margin-top: 1.25em;

    .btn-create-post {
      background-color: orange;
      padding: 1.75em;
      border-radius: 100px;

      &:hover {
        background-color: darkorange;
      }
    }
  }

  .new-post {
    form {
      textarea {
        resize: none;
        width: 100%;
      }
    }

    #loading-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 40%;
      left: 45%;
      z-index: 9999;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid #ccc;
      border-top-color: #333;
      border-radius: 50%;
      animation: spin 1s infinite linear;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  .splitter {
    border: 1px solid #000;
    margin: 10px;
  }


</style>


