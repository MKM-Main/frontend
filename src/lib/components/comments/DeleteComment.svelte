<script>
    export let postid;
    export let commentid;
    export let deleteComments;

    export const deleteFunction = async () => {
        await fetch(`http://localhost:8080/api/posts/comments/${postid}/${commentid}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(async (res) => {
            deleteComments(commentid);
        });
    }
</script>
<i class="fa-solid fa-trash fa-xl" on:click={deleteFunction}></i>

<style lang="scss">
  .fa-trash {

    &:hover {
      color: red;
      cursor: pointer;
    }
  }

</style>
