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


    function isRecentSignup(creationDate) {
        const currentDate = new Date();
        const parts = creationDate.split(', ')[0].split('/');
        const creationTimestamp = new Date(
            `${parts[2]}-${parts[1]}-${parts[0]}`
        ).getTime();
        const sevenDaysAgo = currentDate.getTime() - 7 * 24 * 60 * 60 * 1000;
        return creationTimestamp >= sevenDaysAgo;
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
                    <input bind:value={userBody.firstName} name="firstname" type="text"
                           placeholder={selectedUser.firstName}>
                    <label for="lastname">Lastname: </label>
                    <input bind:value={userBody.lastName} name="lastname" type="text"
                           placeholder={selectedUser.lastName}>
                    <label for="artistName">Artist Name: </label>
                    <input bind:value={userBody.artistName} name="artistName" type="text"
                           placeholder={selectedUser.artistName}>
                    <label for="email">E-mail: </label>
                    <input bind:value={userBody.email} type="text" placeholder={selectedUser.email} name="email">
                    <label for="role">Role: </label>
                    <select bind:value={userBody.role} name="role" placeholder={selectedUser.role}>
                        <option value="admin" selected={selectedUser.role === 'admin'}>Admin</option>
                        <option value="user" selected={selectedUser.role === 'user'}>User</option>
                    </select>
                    <UpdateUser jwt={jwt} artistName={selectedUser.artistName} userBody={userBody}
                                currentRole={selectedUser.role}/>
                    <DeleteAdmin id={selectedUser._id} apiUrl={"users"} jwt={jwt}/>
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
                    <p><a href="http://localhost:5173/profile/{user.artistName}">{user.artistName}</a> - Joined
                        on: {user.creationDate}</p>
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
<div class="report">
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
                    <a href={post.reported[0].link} target="_blank">Link</a>
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
        {#each post.comments as a }
            {#if a?.reported?.length >= 3}
                <div class="high-report">
                    <p> User who created comment: {a.commentAuthor}</p>
                    <p> Reference: {post.referenceName}</p>
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
<style lang="scss">
  .container {
    background-color: #0d1b2a;
    color: #e0e1dd;
    padding: 20px;
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
    background-color: #0d1b2a;
    color: #e0e1dd;
    padding: 20px;
    margin-bottom: 20px;
  }

  .recent-signups {
    margin-bottom: 20px;
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
    background-color: #1b263b;
    color: #e0e1dd;
    padding: 20px;
  }

  .totals h1 {
    color: #e0e1dd;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .totals h2 {
    color: #e0e1dd;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .totals h3 {
    color: #e0e1dd;
    font-size: 16px;
    margin-bottom: 5px;
  }

  .totals p {
    color: #e0e1dd;
    margin-bottom: 5px;
  }
</style>
