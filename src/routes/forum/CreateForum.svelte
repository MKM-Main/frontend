<script>
    let forumTitle;
    export const requestForum = async () => {
        console.log()
        await fetch(`http://localhost:8080/api/forum`, {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
        body: JSON.stringify({forumTitle})
    }).then((res) => { 
        
    });
    }
</script>

<div class="login">
    <form on:submit|preventDefault={requestForum}>
        <label for="forumTitle">Forum Request</label>
        <input bind:value={forumTitle} id="forumTitle" type="forumTitle">
        <button id="submit" type="submit">Request Forum</button>
    </form>
</div>
<!-- <button type="submit" on:click={() => requestForum()}>Request Forum</button> -->