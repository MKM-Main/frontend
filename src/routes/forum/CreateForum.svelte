<script>
  import { PUBLIC_BASE_URL } from "$env/static/public";
  export let jwt;

  let forumTitle;

  export const requestForum = async () => {
    await fetch(`${PUBLIC_BASE_URL}api/forum`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ forumTitle }),
    })
  };
</script>

<div class="forum-create">
  <form on:submit|preventDefault={requestForum}>
    <input
      bind:value={forumTitle}
      id="forumTitle"
      placeholder="Request new forum"
      type="forumTitle"
    />
    <button id="submit" type="submit">Request Forum</button>
  </form>
</div>

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
      border: 1px solid #778da9;
      border-radius: 0.75em;
      resize: none;
      margin-right: 0.75em;
    }

    button {
      font-size: 1em;
      padding: 0.5em 1em;
      background-color: #1b263b;
      color: #e0e1dd;
      border: none;
      border-radius: 0.75em;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #778da9;
      }
    }
  }
</style>
