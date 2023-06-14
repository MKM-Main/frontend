<script>
  import { PUBLIC_BASE_URL } from "$env/static/public";
  export let conversation;
  export let jwt;
  export let updateDeletedConversation;
  const deleteConversation = async (action) => {
    await fetch(`${PUBLIC_BASE_URL}api/conversations/${action}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    updateDeletedConversation();
  };
</script>

<div>
  <a
    href="/conversations/inbox"
    on:click={() => {
      deleteConversation(conversation?._id);
      updateDeletedConversation();
    }}>X</a
  >
</div>
