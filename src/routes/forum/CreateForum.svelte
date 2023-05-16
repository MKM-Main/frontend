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
        <input bind:value={forumTitle} id="forumTitle" placeholder="Request new forum" type="forumTitle">
        <button id="submit" type="submit">Request Forum</button>
    </form>
</div>
<!-- <button type="submit" on:click={() => requestForum()}>Request Forum</button> -->


<style lang="scss">
  form {
    text-align: center;
    margin-top: 1em;


    label {
      font-size: 1em;
      font-weight: bold;
      margin-right: 0.5em;
    }

    input {
      flex: 1;
      padding: 0.5em;
      font-size: 1em;
      border: 1px solid #778DA9;
      border-radius: 0.75em;
      resize: none;
      margin-right: 0.75em;
    }

    button {
      font-size: 1em;
      padding: 0.5em 1em;
      background-color: #1B263B;
      color: #E0E1DD;
      border: none;
      border-radius: 0.75em;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #778DA9;
      }
    }
  }
</style>
