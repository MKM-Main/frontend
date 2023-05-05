<script>
    export let postId
    export let jwt
    export let loggedInUser
    export let rating

    const hypePost = async () => {
        await fetch(`http://localhost:8080/api/posts/${postId}`, {
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
    <i aria-hidden="true" class="fa fa-fire fa-2xl" on:click={hypePost}></i>
    <p>{rating}</p>
    <p>Hype train!</p>
</div>


<style lang="scss">


  .hype-container {
    position: relative;
    left: 97%;

    .fa-fire, p {
      color: firebrick;
      height: 22px;

      &:hover:not(p) {
        scale: 1.25;
        background-color: orange;
        border-radius: 50%;
      }
    }
  }

</style>
