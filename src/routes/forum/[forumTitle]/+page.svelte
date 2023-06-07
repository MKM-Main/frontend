<script>


    import Report from "../../../lib/components/util/Report.svelte";
    import CreatePost from "$lib/components/posts/CreatePost.svelte";
    import Modal from "../../../lib/components/Modal/Modal.svelte";

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


<div class="forum-container">
    <div class="posts-container">
        <h1>{forumTitle}</h1>
        {#each filteredForums as forum}
            <div class="posts">
                <a href="/forum/{replaceSpacesWithHyphens(forum.referenceName)}/{replaceSpacesWithHyphens(forum.postTitle)}">
                    <h2>{forum?.postTitle}</h2>
                    <h3>Author: {forum?.artistName} </h3>
                    <p>Date: {forum?.timeStamp}</p>
                    <p>Rating: {forum?.rating?.length}</p>
                    {#if forum?.tags}
                        <p>Tags: {forum?.tags}</p>
                    {/if}
                </a>
                <Report jwt={jwt} collection={"posts"} id={forum?._id}
                        title={replaceSpacesWithHyphens(forum?.postTitle)}/>
            </div>
        {/each}
        {#if jwt}
            <div class="btn-container">
                <button class="btn-create-post" on:click={() => modal = !modal}>Create new post!</button>
            </div>
        {/if}
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
        </div>
    </Modal>
{/if}


<style lang="scss">
  .forum-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 20px;

    .posts-container {
      text-align: center;
      flex: 1;

      .posts {
        margin: 1em 5% 1.35em 5%;
        border-radius: 20px;
        -webkit-box-shadow: -1px -1px 15px 8px #E0E1DD;
        box-shadow: -1px -1px 15px 8px #E0E1DD;

        &:hover {
          background-color: #E0E1DD;
        }

        a {
          text-decoration: none;
          color: #333333;

          p {
            margin: 0;
          }
        }
      }
    }

    .filter {
      flex: 0 0 200px;
      margin-left: 20px;

      .filter-search,
      .filter-tags {
        margin-bottom: 20px;

        h1 {
          color: #333333;
          margin-bottom: 10px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          color: #666666;
        }

        input[type="text"],
        input[type="radio"] {
          padding: 5px;
          border: 1px solid #cccccc;
          border-radius: 5px;
        }
      }
    }
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
