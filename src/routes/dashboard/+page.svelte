<script>
    import ForumVerification from './ForumVerification.svelte';
    import UpdateUser from './UpdateUser.svelte';
    import DeleteAdmin from './DeleteAdmin.svelte';
    import Modal from '../../lib/components/modal/Modal.svelte';

    let modal = false;
    
    export let data;


    const userRole = data?.userData?.customMessage?.role
    const posts = data?.posts
    const comments = posts.map(post => post.comments)

  
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

    const totalComments = posts.reduce((count, post) => count + post.comments.length, 0);
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
<div class="total-signup">
  <div class="recent-signups" >
    <h1>Recent signups</h1>
    <h3>Last 7 days: </h3>
    {#each users as user }
    {#if new Date(user.creationDate) >= new Date() - 7 * 24 * 60 * 60 * 1000}
    <a href="http://localhost:5173/profile/{user.artistName}">{user.artistName}</a>
    <p>Joined on: {user.creationDate}</p>
    {/if}
    {/each}

  </div>

  
</div>
<div class="totals">
  <h1>Total:</h1>
  <h3>Users : {users.length}</h3>
  <h3>Total Posts : {posts.length}</h3>
  <h3>Total comments : {totalComments}</h3>
  <h3>Total forums: {forums.length}</h3>
  <h2>Active: </h2>
  {#each forums as forum}
    {#if forum.verified === true}
      <p>{forum.forumTitle}</p>
    {/if}
  {/each}
  <h2>Not activated</h2>
  {#each forums as forum}
    {#if forum.verified === false}
      <p>{forum.forumTitle}</p>
    {/if}
  {/each}  
    
</div>


  <div class="forum-container">
    <h1>Forum management</h1>
    {#each forums as forum}
    <div class="single-forum">
    <p>{forum.forumTitle}</p>
    <p>{forum.creationDate}</p>
    {#if forum.verified === true}
    <ForumVerification id={forum._id} jwt={jwt} isVeryfied={"Undo Verification"}/>
    {/if}
    {#if forum.verified === false}
    <ForumVerification id={forum._id} jwt={jwt} isVeryfied={"Verify Forum"}/>
    {/if}
    <DeleteAdmin id={forum._id} apiUrl={"forum"} jwt={jwt}/>
    </div>
    {/each}
  </div>


  {/if}
      <div class="report" >
      <h1>Report Section</h1>
      <div class="report-post">
      <h2>Post Reports</h2>
        {#each posts as post }
        {#if post?.reported?.length >= 3}
    <div class="high-report">
    
    <p>Post Titel: {post.postTitle}</p>
    <p>User who created post: {post.artistName}</p>
    <p>Reference: {post.referenceName}</p>
    <p>Number of reports: {post.reported.length}</p>
    <p>Number of comments: {post.comments.length}</p>
    <button on:click={() =>(post.open = true)}></button>
    <a href={post.reported[0].link} target="_blank" >Link</a>
    </div>
    {#if post.open}
    <Modal on:close={() => (post.open = false)}>
      {#each post.reported as report}
      <p>User who reported: {report.userWhoReported}</p>
      <p>{report.timeStamp}</p>
      <p>{report.reason}</p>
      <p>{report.description}</p>
    {/each}
    </Modal>
    {/if}
      {/if}

    {/each}

  </div>
    <h2>Comment reports</h2>
    {#each comments as comment}
    {#each comment as a }
    {#if a?.reported?.length >= 3}
    <div class="high-report">
      <p> User who created comment: {a.commentAuthor}</p>
      <p> Reference: {comment.referenceName}</p>
      <p>{a.commentBody}</p>
      <p>Comment's rating: {a.rating.length}</p>
      <p>Number of Reports:  {a.reported.length}</p>
      <button on:click={() =>(a.open = true)}></button>
    </div>
    {#if a.open}
    <Modal on:close={() => (a.open = false)}>
      {#each a.reported as report}
      <p>User who reported: {report.userWhoReported}</p>
      <p>{report.timeStamp}</p>
      <p>{report.reason}</p>
      <p>{report.description}</p>
    {/each}
    </Modal>
    {/if}

    {/if}
    {/each}
    
      
    {/each}

</div>
<style>


.total-signup {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .recent-signups {
    flex: 1;
    margin-right: 20px;
  }

  .recent-signups h1,
  .recent-signups h3 {
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: bold;
  }

  .recent-signups h3 {
    margin-top: 10px;
  }

  .recent-signups a {
    text-decoration: none;
    color: #000;
    font-weight: bold;
  }

  .totals {
    flex-shrink: 0;
    text-align: right;
  }

  .totals h1,
  .totals h3 {
    margin: 0;
    padding: 0;
    font-size: 18px;
    font-weight: bold;
  }

  .totals h3 {
    margin-top: 10px;
  }

.recent-signups {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
  }

  .recent-signups h1 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .recent-signups h3 {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .recent-signups p {
    margin: 5px 0;
  }

.report-post {
  margin: 50px 0;
}

.high-report {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
}

.high-report p {
  margin: 10px 0;
}

.high-report a {
  display: inline-block;
  margin-left: 10px;
  color: #fff;
  background-color: #007bff;
  border-radius: 5px;
  padding: 5px 10px;
  text-decoration: none;
}

.high-report button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.high-report button::before,
.high-report button::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 2px;
  background-color: #333;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.high-report button::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.high-report button::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.high-report:hover button::before,
.high-report:hover button::after {
  background-color: #007bff;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

label {
  margin-bottom: 5px;
}

select {
  margin-bottom: 15px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button[type="submit"] {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}

.user-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

p {
  font-size: 20px;
  margin-bottom: 15px;
}

input {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

select {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  cursor: pointer;
}

h1 {
  font-size: 30px;
  margin-top: 30px;
  margin-bottom: 20px;
}

.forum-container {
  margin-top: 50px;
}

.single-forum {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  margin-bottom: 10px;
}

.high-report {
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 10px;
}

a {
  margin-left: 10px;
}

.modal {
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
  max-height: 70vh;
  overflow-y: auto;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>