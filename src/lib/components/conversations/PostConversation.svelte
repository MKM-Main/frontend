<script>
    import {createEventDispatcher} from "svelte"
    const dispatch = createEventDispatcher()
    export let jwt;
    export let updateConversations;
    export let user;
    export let createConversation;

    const close = () => dispatch("close")

    const postNewConversation = async (action) => {
        await fetch(`http://localhost:8080/api/conversations/${action}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${jwt}`,
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            updateConversations(data)
            createConversation(data)
        })
    }
</script>

<div class="div-btn-modal">
    <a class="btn" href="/conversations/inbox" on:click={() => { postNewConversation(user?.artistName), close()}}>Send message</a>
</div>

<style>
    .btn {
        border: 2px solid black;
        border-radius: 15px;
        width: 20%;
        padding: 10px;
    }
</style>