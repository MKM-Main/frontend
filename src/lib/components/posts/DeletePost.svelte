<script>
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
                posts = posts.filter(post => post._id !== postId)
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
