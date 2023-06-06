<script>
    import {PUBLIC_BASE_URL} from "$env/static/public";
    export let postId
    export let jwt
    export let loggedInUser
    export let rating
    export let postType = "posts"

    const hypePost = async () => {
        const endpoint = postType === "comments" ? `comments/${postId}` : postId
        await fetch(`${PUBLIC_BASE_URL}api/posts/${endpoint}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify({loggedInUser})
            }
        )
            .then(res => res.json())
            .then(data => {
                rating = data.length
            })
    }


</script>

<div class="hype-container">
    <i aria-hidden="true" class="fa fa-fire fa-2xl" class:block={!jwt} on:click={hypePost}></i>
    <p>{rating}</p>
</div>


<style lang="scss">
  .hype-container {
    display: flex;
    justify-content: right;
    margin: 1.25rem 2rem 0 0;


    .fa-fire, p {
      color: firebrick;
      height: 22px;
      margin: 5px;

      &:hover:not(p) {
        scale: 1.25;
        background-color: orange;
        border-radius: 50%;
        cursor: pointer;
      }
    }

    .block {
      cursor: pointer;
      pointer-events: none;
    }
  }

</style>
