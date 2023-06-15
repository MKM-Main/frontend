<script>
    import {PUBLIC_BASE_URL} from "$env/static/public";
    import toast from "svelte-french-toast";
    export let id;
    export let apiUrl;
    export let jwt;

    export const deleteFunction = async () => {
        await toast.promise(fetch(`${PUBLIC_BASE_URL}api/admin/${apiUrl}/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            }),
            {
                loading: "Deleting in progress..",
                error: "Error deleting ",
                success: "Deletion was a success"
            }
        ).then(() => {
            setTimeout(() => {
                location.reload()
            }, 1500)
        })
    };
</script>

<button on:click={() => deleteFunction()}>Delete button</button>

<style lang="scss">
  button {
    color: #e0e1dd;
    border: 2px solid black;
    border-radius: 15px;
    padding: 10px;
    margin-left: 5px;

    &:hover {
      color: #e0e1dd;
      transition: all 0.5s ease-in-out;
      scale: 1.05;
    }
  }

</style>
