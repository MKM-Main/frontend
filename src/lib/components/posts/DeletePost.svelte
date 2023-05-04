<script>
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    export let jwt
    export let posts
    export let postId


    const deletePost = async (postId) => {
        await fetch(`http://localhost:8080/api/posts/${postId}`, {
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
  i {
    position: relative;
    left: 97%;

    &:hover {
      color: red;
      cursor: pointer;
      scale: 1.25;
    }
  }

</style>
