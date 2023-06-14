<script>
  import ForumVerification from "./ForumVerification.svelte";
  import UpdateUser from "./UpdateUser.svelte";
  import DeleteAdmin from "./DeleteAdmin.svelte";
  import Modal from "../../lib/components/Modal/Modal.svelte";

  let modal = false;

  export let data;

  const userRole = data?.userData?.customMessage?.role;
  const posts = data?.posts.posts;
  const comments = posts?.map((post) => post.comments);

  const users = data?.users?.data;

  const jwt = data?.jwt;

  let forums = data?.forums.forum;

  const updateForums = (forumToUpdate) => {
    forums = forums.map((forum) => {
      if (forum._id === forumToUpdate._id) {
        return forumToUpdate; // Update the existing forum
      }
      return forum; // Keep the forum unchanged
    });
  };

  let selectedUser;
  let firstName, lastName, artistName, email, role;
  let userBody = { firstName, lastName, artistName, email, role };

  Object.keys(userBody).forEach((key) =>
    userBody[key] === undefined ? delete userBody[key] : {}
  );

  function selectUser(event) {
    event.preventDefault();
    const userId = event.target.elements.userSelect.value;
    selectedUser = users.find((user) => user._id === userId);
  }

  const totalComments = posts.reduce(
    (count, post) => count + post.comments.length,
    0
  );

  function isRecentSignup(creationDate) {
    const currentDate = new Date();
    const parts = creationDate.split(", ")[0].split("/");
    const creationTimestamp = new Date(
      `${parts[2]}-${parts[1]}-${parts[0]}`
    ).getTime();
    const sevenDaysAgo = currentDate.getTime() - 7 * 24 * 60 * 60 * 1000;
    return creationTimestamp >= sevenDaysAgo;
  }
</script>

<div class="dashboard-container">
  {#if userRole === "admin"}
    <div class="container">
      <h1>UPDATE USER</h1>
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
            <input
              bind:value={userBody.firstName}
              name="firstname"
              type="text"
              placeholder={selectedUser.firstName}
            />
            <label for="lastname">Lastname: </label>
            <input
              bind:value={userBody.lastName}
              name="lastname"
              type="text"
              placeholder={selectedUser.lastName}
            />
            <label for="artistName">Artist Name: </label>
            <input
              bind:value={userBody.artistName}
              name="artistName"
              type="text"
              placeholder={selectedUser.artistName}
            />
            <label for="email">E-mail: </label>
            <input
              bind:value={userBody.email}
              type="text"
              placeholder={selectedUser.email}
              name="email"
            />
            <label for="role">Role: </label>
            <select
              bind:value={userBody.role}
              name="role"
              placeholder={selectedUser.role}
            >
              <option value="admin" selected={selectedUser.role === "admin"}
                >Admin</option
              >
              <option value="user" selected={selectedUser.role === "user"}
                >User</option
              >
            </select>
            <UpdateUser
              {jwt}
              artistName={selectedUser.artistName}
              {userBody}
              currentRole={selectedUser.role}
            />
            <DeleteAdmin id={selectedUser._id} apiUrl={"users"} {jwt} />
          </div>
        {:else}
          <p>No user selected.</p>
        {/if}
      </form>
    </div>

    <div class="total-signup">
      <div class="recent-signups">
        <h1>Recent signups</h1>
        <h3>Last 7 days:</h3>
        {#each users as user}
          {#if isRecentSignup(user.creationDate)}
            <p>
              <a
                href="https://tunetower-6o9e.onrender.com/profile/{user.artistName}"
                >{user.artistName}</a
              >
              - Joined on: {user.creationDate}
            </p>
          {/if}
        {/each}
      </div>
    </div>

    <div class="totals">
      <div class="stats">
        <h1>Total:</h1>
        <h3>Users : {users.length}</h3>
        <h3>Total Posts : {posts.length}</h3>
        <h3>Total comments : {totalComments}</h3>
        <h3>Total forums: {forums.length}</h3>
      </div>
      <div class="active-forums">
        <h2 style="color: green;">Active forums:</h2>
        {#each forums as forum}
          {#if forum.verified === true}
            <p>{forum.forumTitle}</p>
          {/if}
        {/each}
        <h2 style="color: red;">Not activated</h2>
        {#each forums as forum}
          {#if forum.verified === false}
            <p>{forum.forumTitle}</p>
          {/if}
        {/each}
      </div>
    </div>

    <div class="forum-main">
      <h1>Forum management</h1>
      <div class="forum-container">
        {#each forums as forum}
          <div
            class="single-forum"
            data-verified={forum.verified ? "true" : "false"}
          >
            <div class="forum-title">
              <p>{forum.forumTitle}</p>
            </div>
            <div class="forum-creation">
              <p>{forum.creationDate}</p>
            </div>
            <div class="forum-verification">
              {#if forum.verified === true}
                <ForumVerification
                  id={forum._id}
                  {jwt}
                  isVeryfied={"Undo Verification"}
                  {updateForums}
                />
              {/if}

              {#if forum.verified === false}
                <ForumVerification
                  id={forum._id}
                  {jwt}
                  isVeryfied={"Verify Forum"}
                  {updateForums}
                />
              {/if}
            </div>
            <div class="forum-delete">
              <DeleteAdmin id={forum._id} apiUrl={"forum"} {jwt} />
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <div class="report">
    <h1>Report Section</h1>
    <div class="report-post">
      <h2>Post Reports</h2>
      {#each posts as post}
        {#if post?.reported?.length >= 3}
          <div class="high-report">
            <p>User who created post: {post.artistName}</p>
            <p>Post Titel: {post.postTitle}</p>
            <p>Reference: {post.referenceName}</p>
            <p>Number of reports: {post.reported.length}</p>
            <p>Number of comments: {post.comments.length}</p>
            <button on:click={() => (post.open = true)}>Get reports</button>
            <a href={post.reported[0].link} target="_blank">Go to subject</a>
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
    {#each posts as post}
      {#each post.comments as a}
        {#if a?.reported?.length >= 3}
          <div class="high-report">
            <p>User who created comment: {a.commentAuthor}</p>
            <p>Reference: {post.referenceName}</p>
            <p>{a.commentBody}</p>
            <p>Comment's rating: {a.rating.length}</p>
            <p>Number of Reports: {a.reported.length}</p>
            <button on:click={() => (a.open = true)}>Get reports</button>
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
</div>

<style lang="scss">
  .dashboard-container {
    margin: 5em;
    border-radius: 20px;
    border: 2px solid;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }

  .forum-main {
    background-color: #0d1b2a;
    margin-top: 2em;
    width: 50%;
    margin-left: 30%;

    h1 {
      margin-left: 25%;
      padding-top: 1em;
      color: white;
    }
  }

  .container {
    background-color: #0d1b2a;
    color: #e0e1dd;
    padding: 20px;
    margin-top: 2em;
    width: 50%;
    margin-left: 25%;
    border-radius: 4px;
  }

  form {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  select,
  input[type="text"] {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: none;
    background-color: #1b263b;
    color: #e0e1dd;
  }

  button {
    padding: 8px 16px;
    background-color: #415a77;
    color: #e0e1dd;
    border: none;
    cursor: pointer;
  }

  .user-container {
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 5px;
  }

  p:first-child {
    font-weight: bold;
  }

  p:last-child {
    color: #778da9;
  }

  p a {
    color: #778da9;
    text-decoration: none;
  }

  p a:hover {
    text-decoration: underline;
  }

  p a:visited {
    color: #778da9;
  }

  .total-signup {
    border-radius: 4px;
    background-color: #0d1b2a;
    color: #e0e1dd;
    padding: 20px;
    margin-bottom: 20px;
    width: 50%;
    margin-left: 25%;
    height: auto;
  }

  .recent-signups h1 {
    color: #e0e1dd;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .recent-signups h3 {
    color: #778da9;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .recent-signups p {
    color: #e0e1dd;
    margin-bottom: 5px;
  }

  .recent-signups a {
    color: #778da9;
    text-decoration: none;
  }

  .recent-signups a:hover {
    text-decoration: underline;
  }

  .totals {
    border-radius: 4px;
    width: 50%;
    background-color: #0d1b2a;
    color: #e0e1dd;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-left: 25%;
  }

  .stats {
    flex: 1;
    margin-right: 20px;
    height: auto;
  }

  .active-forums {
    flex: 1;
  }

  .totals h1 {
    color: #e0e1dd;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .totals h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .totals p {
    color: #e0e1dd;
    margin-bottom: 5px;
  }

  .totals p:first-child {
    font-weight: bold;
  }

  .totals p a {
    color: #778da9;
    text-decoration: none;
  }

  .totals p a:hover {
    text-decoration: underline;
  }

  .totals p a:visited {
    color: #778da9;
  }

  .forum-main {
    width: 50%;
    margin-left: 25%;
    border-radius: 5px;
  }

  .forum-container {
    background-color: #0d1b2a;
    padding: 20px;
    border-radius: 4px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
  }

  .forum-container h1 {
    color: #333333;
    font-size: 24px;
    margin-bottom: 20px;
    margin: auto;
  }

  .single-forum {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .forum-title p {
    color: #333333;
    margin: 0;
    font-weight: bold;
  }

  .forum-creation p {
    color: #333333;
    margin: 0;
    font-size: 14px;
    margin-top: 5px;
  }

  .forum-verification,
  .forum-delete {
    margin-top: 10px;
  }

  .forum-delete button,
  .forum-verification button {
    padding: 8px 16px;
    background-color: #415a77;
    color: #ffffff;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }

  .forum-delete button:hover,
  .forum-verification button:hover {
    background-color: #354e6e;
  }

  .single-forum[data-verified="true"] {
    background-color: green; /* Green */
  }

  .single-forum[data-verified="false"] {
    background-color: #ff0000; /* Red */
  }

  .report {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #0d1b2a;

    h1,
    h2 {
      color: white;
    }
  }

  .report-post {
    margin-top: 20px;
  }

  .high-report {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: white;
  }

  .high-report p {
    margin: 5px 0;
  }

  .high-report button {
    margin-top: 10px;
    background-color: #415a77;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }

  .high-report a {
    display: inline-block;
    margin-top: 10px;
    color: #0066cc;
    text-decoration: none;
  }

  .high-report a:hover {
    text-decoration: underline;
  }
</style>
