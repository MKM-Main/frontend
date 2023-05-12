<script>


    let forumTitle;
    export let jwt;

    export const requestForum = async () => {
        await fetch(`http://localhost:8080/api/forum`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify({forumTitle})
        }).then((res) => {

        });
    }
</script>

<div class="forum-create">
    <form on:submit|preventDefault={requestForum}>
        <label for="forumTitle">Forum Request</label>
        <input bind:value={forumTitle} id="forumTitle" type="forumTitle">
        <button id="submit" type="submit">Request Forum</button>
    </form>

</div>
<!-- <button type="submit" on:click={() => requestForum()}>Request Forum</button> -->
