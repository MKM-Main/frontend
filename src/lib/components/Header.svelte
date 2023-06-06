<script>
    import {env} from "$env/dynamic/public";
    import Logout from "../../routes/(auth)/Logout.svelte";
    let pages = ["forum", "artists"]

    export let artistName
    export let userRole
    export let jwt
    export let imageSource
    export let conversation
</script>


<div class="header">
    <div>
        <a href="/">
            <img alt="HOME" class="home" src="{env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX}note.svg">
        </a>
    </div>

    <div>
        {#if jwt}
            <a href="/news">News</a>
            {#if conversation}
                {#if conversation[0]?.read === false && conversation[0]?.sender !== artistName}
                    <a href="/conversations/inbox">Messages (new message)</a>
                {/if}
                <a href="/conversations/inbox">Messages</a>
            {/if}
        {/if}
        {#each pages as page}
            <a href="/{page}">
                <span class="capitalize">{page}</span>
            </a>
        {/each}
    </div>
    {#if !jwt}
        <div>
            <a href="/signup">Sign up!</a>
            <a href="/login">Login</a>
        </div>
    {/if}

    {#if userRole === "admin"}
        <div>
            <a href="/dashboard">Dashboard
            </a>
        </div>
    {/if}


    {#if jwt}
        <Logout/>
        <div>
            <a href="/profile/{artistName}">
                <img class="profile-image" alt="{artistName}" src="{imageSource}">
            </a>
        </div>
    {/if}


</div>


<style lang="scss">

  .header {
    background-color: #0D1B2A;
    color: #E0E1DD;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25em;
    -webkit-box-shadow: 5px 5px 15px 5px #0D1B2A;
    box-shadow: 5px 5px 15px 5px #0D1B2A;
    margin-bottom: 2.75em;

    a {
      color: #E0E1DD;
      margin-right: 0.625em;
      text-decoration: none;
      font-weight: bold;
      font-size: 1em;
      text-transform: capitalize;

      &:hover {
        color: #778DA9;
      }
    }

    .home {
      height: 3.75em;
    }

    .messages {
      position: relative;

      &::after {
        content: 'new message';
        position: absolute;
        top: -0.625em;
        right: -0.625em;
        background-color: #415A77;
        color: #E0E1DD;
        font-size: 0.625em;
        padding: 0.125em 0.25em;
        border-radius: 0.25em;
      }
    }

    .profile-image {
      height: 2.5em;
      width: 2.5em;
      border-radius: 50%;
      margin-left: 0.625em;
    }

    .dashboard-link {
      margin-left: 0.625em;
    }

    .logout {
      margin-right: 0.625em;
    }
  }

</style>
