<script>
    import toast from "svelte-french-toast";
    const logOut = async () => {
        await fetch("http://localhost:8080/api/auth/logout", {
            method: "GET",
            credentials: "include"
        }).then(() => {
            toast.success("Logging out...")
            setTimeout(() => {
                location.href = "/"
            }, 1500)
        })
    }
</script>


<form on:submit|preventDefault={logOut}>
    <button type="submit">Logout</button>
</form>

<style lang="scss">
  form {
    button {
      color: #E0E1DD;
      margin-right: 0.625em;
      text-decoration: none;
      font-weight: bold;
      font-size: 1em;

      &:hover {
        color: #778DA9;
      }
    }
  }

</style>

