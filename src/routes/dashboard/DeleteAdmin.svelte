<script>
  import { PUBLIC_BASE_URL } from "$env/static/public";
  export let id;
  export let apiUrl;
  export let jwt;
  
  export const deleteFunction = async () => {
    await fetch(`${PUBLIC_BASE_URL}api/admin/${apiUrl}/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
  };
</script>

<button on:click={() => deleteFunction()}>Delete button</button>
