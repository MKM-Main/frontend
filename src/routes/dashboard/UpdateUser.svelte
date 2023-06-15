<script>
    import {PUBLIC_BASE_URL} from "$env/static/public";
    import toast from "svelte-french-toast";
    export let artistName;
    export let userBody;
    export let currentRole;
    export let jwt;

    export const updateUser = async () => {
        Object.keys(userBody).forEach(
            (key) => (userBody[key] = userBody[key].trim())
        );
        Object.keys(userBody).forEach((key) =>
            userBody[key] === "" ? delete userBody[key] : {}
        );
        if (userBody.role === currentRole) {
            delete userBody.role;
        }
        if (Object.keys(userBody).length !== 0) {
            await toast.promise(fetch(`${PUBLIC_BASE_URL}api/admin/users/${artistName}`, {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({userBody}),
                }).then((res) => {
                    setTimeout(() => {
                        location.reload();
                    }, 1500);
                }),
                {
                    loading: "Updating user...",
                    error: "Error happened during update",
                    success: "User updated"
                }
            )
        }
    };
</script>

<button on:click={() => updateUser()} type="submit">Update button</button>


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
