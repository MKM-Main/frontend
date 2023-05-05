<script>
    import ForumVerification from './ForumVerification.svelte';
    import UpdateUser from './UpdateUser.svelte';
    import DeleteAdmin from './DeleteAdmin.svelte';
    
    export let data;
    const userRole = data?.userData?.customMessage?.role

    
    const users = data?.users?.data;
    const jwt = data?.jwt
  
    const forums = data?.forums.forum
    let selectedUser
    let firstName, lastName, artistName, email, role;
    let userBody = {firstName, lastName, artistName, email, role};
    
    
    Object.keys(userBody).forEach(key => userBody[key] === undefined ? delete userBody[key] : {});

    function selectUser(event) {
      event.preventDefault();
      const userId = event.target.elements.userSelect.value;
      selectedUser = users.find(user => user._id === userId);
    }


  </script>
  {#if userRole === "admin"}
    
  

  <div class="container">
    <form on:submit={selectUser}>
      <label for="userSelect">Select user:</label>
      <select id="userSelect" name="userSelect" required>
        <option value="">Find user</option>
        {#each users as user}
          <option value={user._id}>{user.firstName} {user.lastName}</option>
        {/each}
      </select>
      <button type="submit">Select user</button>
    </form>
    
    <form on:submit|preventDefault>
    {#if selectedUser}
      <div class="user-container">
        <p>Editing: {selectedUser.firstName} {selectedUser.lastName}</p>
        <label for="firstname">Firstname: </label>
        <input bind:value={userBody.firstName} name="firstname" type="text" placeholder={selectedUser.firstName}>
        <label for="lastname">Lastname: </label>
        <input bind:value={userBody.lastName} name="lastname" type="text" placeholder={selectedUser.lastName}>
        <label for="artistName">Artist Name: </label>
        <input bind:value={userBody.artistName} name="artistName" type="text" placeholder={selectedUser.artistName}>
        <label for="email">E-mail: </label>
        <input bind:value={userBody.email} type="text" placeholder={selectedUser.email} name="email">
        <label for="role">Role: </label>
        <select bind:value={userBody.role} name="role" placeholder={selectedUser.role}>
          <option value="admin" selected={selectedUser.role === 'admin'}>Admin</option>
          <option value="user" selected={selectedUser.role === 'user'}>User</option>
        </select>
        <UpdateUser jwt={jwt} id={selectedUser._id} userBody={userBody} currentRole={selectedUser.role}/>
        <DeleteAdmin id={selectedUser._id} apiUrl={"users"} jwt={jwt}/>
      </div>
      
    {:else}
      <p>No user selected.</p>
      {/if}
    </form>

  </div>
  <div class="user-container">
    {#each forums as forum}
    <br>
    <p>{forum.forumTitle}</p>
    <p>{forum.creationDate}</p>
    {#if forum.verified === true}
    <ForumVerification id={forum._id} jwt={jwt} isVeryfied={"Undo Verification"}/>
    {/if}
    {#if forum.verified === false}
    <ForumVerification id={forum._id} jwt={jwt} isVeryfied={"Verify Forum"}/>
    {/if}
    <DeleteAdmin id={forum._id} apiUrl={"forum"} jwt={jwt}/>
    {/each}
  </div>

  {/if}
<style>
    .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    }

    .user-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    label {
        margin-right: 10px;
    }

    input {
        margin-bottom: 10px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    button {
        margin-top: 10px;
        padding: 5px 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
</style>