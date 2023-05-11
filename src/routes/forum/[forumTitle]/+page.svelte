<script>


    import Report from "../../../lib/components/util/Report.svelte";

    import Modal from "$lib/components/Modal/Modal.svelte"
    import Spinner from "$lib/components/helpers/Spinner.svelte";
    import CreatePost from "$lib/components/posts/CreatePost.svelte";

    export let data;

    const loggedInUser = data.userData?.customMessage?.artistName
    const tags = data?.tagsJson?.tags
    const forumTitle = data?.forumTitle
    const jwt = data.jwt
    let forums = data?.json?.forumData
    let modal = false
    let selectedTag = null
    let filteredForums = null
    let searchPost

    function replaceSpacesWithHyphens(title) {
        if (title?.includes(" ")) {
            return title.replace(/ /g, "-");
        }
        return title;
    }

    const updatePostSection = (data) => {
        forums = [...forums, data.newPost]
    }


    // Can search posts by: artistName, tag or postTitle
    $: filteredForums = forums?.filter(forum => {
        const hasSelectedTag = !selectedTag || forum?.tags?.includes(selectedTag);
        const hasSearchedPost = !searchPost ||
            forum?.postTitle?.toLowerCase().includes(searchPost.toLowerCase()) ||
            forum?.tags && forum?.tags.some(tag => tag.toLowerCase().includes(searchPost.toLowerCase())) ||
            forum?.artistName?.toLowerCase().includes(searchPost.toLowerCase());
        return hasSelectedTag && hasSearchedPost;
    });


</script>


<h1>{forumTitle}</h1>
<div class="forum-container">
    <div class="posts-container">
        {#each filteredForums as forum}
            <div class="posts">
                <a href="/forum/{replaceSpacesWithHyphens(forum.referenceName)}/{replaceSpacesWithHyphens(forum.postTitle)}">
                    <p>Post Title: {forum?.postTitle}</p>
                    <p>User who created post: {forum?.artistName} </p>
                    <p>Created at: {forum?.timeStamp}</p>
                    <p>Rating: {forum?.rating?.length}</p>
                    {#if forum?.tags}
                        <p>Tags: {forum?.tags}</p>
                    {/if}
                    <p>Number of comments: {forum?.comments?.length}</p>
                </a>
                <Report jwt={jwt} collection={"posts"} id={forum?._id}
                        title={replaceSpacesWithHyphens(forum?.postTitle)}/>
            </div>
        {/each}
    </div>
    <div class="filter">
        <div class="filter-search">
            <h1>Search</h1>
            <label for="post-search">Search for post!</label>
            <input bind:value={searchPost} id="post-search" placeholder="My awesome post!" type="text">
        </div>

        <div class="filter-tags">
            <h1>Filter</h1>
            <label for="default">Default</label>
            <input id="default" name="tag" on:change={() => selectedTag = ""} type="radio">
            {#each tags as tag, idx}
                <label for="tag-{idx}">{tag.name}</label>
                <input id="tag-{idx}" type="radio" name="tag" value="{tag.name}"
                       on:change={() => selectedTag = tag.name}>
            {/each}
        </div>
    </div>

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
                    on:postCreated={() => modal = false}
                    tags="{tags}"/>
            <Spinner/>
        </div>
    </Modal>
{/if}


<style lang="scss">
  .forum-container {
    display: grid;
    grid-template-columns: 70% 30%;

    .posts-container {
      .posts {
        border: 2px solid lightgrey;
        padding: 20px;

        p {
          margin: 10px 0;
        }

        a {
          text-decoration: none;
          color: black;
        }
      }
    }

    .filter {
      border: 2px solid lightgrey;
      padding: 20px;

      .filter-search {
        margin-bottom: 2rem;
      }

      h1 {
        font-size: 24px;
        font-weight: bold;
      }

      label {
        display: block;
        margin: 10px 0;
        font-size: 16px;
      }

      input[type="radio"] {
        margin-right: 5px;
      }
    }
  }

  .btn-container {
    text-align: center;
    margin-top: 20px;
  }

  .btn-create-post {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  .new-post {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }


  .btn-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;

    .btn-create-post {
      background-color: orange;
      padding: 1.5rem 3rem;
      border-radius: 100px;
      color: #fff;
      font-size: 1.2rem;

      &:hover {
        background-color: darkorange;
      }
    }
  }

</style>
