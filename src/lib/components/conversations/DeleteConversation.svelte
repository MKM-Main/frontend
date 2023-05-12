<script>
    export let conversation;
    export let jwt;
    export let updateDeletedConversation
    const deleteConversation = async (action) => {
        await fetch(`http://localhost:8080/api/conversations/${action}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${jwt}`,
            }
        })
        updateDeletedConversation()
    }
</script>

<div>
    <a href="/conversations/inbox" on:click={() => {deleteConversation(conversation?._id); updateDeletedConversation();}}>X</a>
</div>