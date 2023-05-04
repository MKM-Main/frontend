<script>
    import Modal from "../../profile/[artistName]/Modal.svelte";
    import Spinner from "../../../lib/components/helpers/Spinner.svelte";
    import CreatePost from "../../../lib/components/posts/CreatePost.svelte";
    export let data;
    const loggedInUser = data.userData?.customMessage?.artistName
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


    const updatePostSection = (data) => {
        forums = [...forums, data.newPost]
    }
</script>


<h1>{forums[0]?.referenceName}</h1>

<div class="forum-container">
    {#each forums as forum}
        <div class="posts">
            <a href="/forum/{replaceSpacesWithHyphens(forum.referenceName)}/{replaceSpacesWithHyphens(forum.postTitle)}">
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
            <CreatePost
                    jwt="{jwt}"
                    formIsForForum="{true}"
                    reference="{forumTitle}"
                    updatePostSection="{updatePostSection}"
                    on:postCreated={() => modal = false}>
            </CreatePost>
            <Spinner/>
        </div>
    </Modal>
{/if}


<style lang="scss">
  .forum-container {
    border-bottom: 1px solid black;
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


