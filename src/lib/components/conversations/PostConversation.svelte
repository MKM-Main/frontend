<script>
    import {createEventDispatcher} from "svelte"
    import toast from "svelte-french-toast";
    import {PUBLIC_BASE_URL} from "$env/static/public";
    const dispatch = createEventDispatcher()

    export let jwt;
    export let updateConversations;
    export let user;
    export let createConversation;

    const close = () => dispatch("close")

    const postNewConversation = async (action) => {
        await fetch(`${PUBLIC_BASE_URL}api/conversations/${action}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${jwt}`,
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Login success")
                }
                return res.json();
            })
            .then((data) => {
                updateConversations(data);
                createConversation(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
</script>

<div class="div-btn-modal">
    <a class="btn" href="/conversations/inbox" on:click={() => { postNewConversation(user), close()}}>Send message</a>
</div>

<style lang="scss">
  a {
    font-size: 1em;
    padding: 0.5em 1em;
    background-color: #1B263B;
    color: #E0E1DD;
    border: none;
    border-radius: 0.75em;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-decoration: none;

    &:hover {
      background-color: #778DA9;
    }
  }
</style>
