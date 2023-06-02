<script>
    import {createEventDispatcher} from 'svelte';
    import {PUBLIC_BASE_URL} from "$env/static/public";
    const dispatch = createEventDispatcher();

    export let jwt
    export let posts
    export let postId


    const deletePost = async (postId) => {
        await fetch(`${PUBLIC_BASE_URL}api/posts/${postId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
            .then(() => {
                // dispatch event with filtered posts array
                const filteredPosts = posts?.filter(post => post._id !== postId);
                dispatch('postDeleted', filteredPosts);
            })
    }
</script>

<i class="fa-solid fa-trash fa-xl" on:click={deletePost(postId)}></i>

<style lang="scss">
  .fa-trash {
    position: relative;

    &:hover {
      color: red;
      cursor: pointer;
    }
  }

</style>
