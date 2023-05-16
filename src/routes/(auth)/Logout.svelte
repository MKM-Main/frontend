<script>
    import Notification from "../../lib/components/util/Notification.svelte";
    let notify = false
    const logOut = async () => {
        notify = true
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
<Notification
        message="Logging out"
        notify="{notify}"
        type="warning"

/>

