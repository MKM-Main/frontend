<script>
    export let id;
    export let jwt;
    export let isVeryfied
    export const verifyForum = async () => {
        console.log(isVeryfied)
        await fetch(`http://localhost:8080/api/admin/verify/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify({id})
    }).then((res) => { 

    });
    }
</script>

<button type="submit" on:click={() => verifyForum()}>{isVeryfied}</button>