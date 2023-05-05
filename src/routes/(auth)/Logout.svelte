<script>
    const logOut = async () => {
        await fetch("http://localhost:8080/api/auth/logout", {
            method: "GET",
            credentials: "include"
        }).then(() => {
            location.href = "/"
        })
    }
</script>


<form on:submit|preventDefault={logOut}>
    <button type="submit">Logout</button>
</form>
