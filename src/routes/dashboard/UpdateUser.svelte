<script>
  import { PUBLIC_BASE_URL } from "$env/static/public";
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
      await fetch(`${PUBLIC_BASE_URL}api/admin/users/${artistName}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ userBody }),
      }).then((res) => {
        toast.success("User updated");
        setTimeout(() => {
          location.reload();
        }, 1500);
      });
    }
  };
</script>

<button on:click={() => updateUser()} type="submit">Update button</button>
