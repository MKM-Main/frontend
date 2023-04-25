<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    // const pageParams = $page.params.artistName
    // onMount(() => {
    //     const unsubscribe = page.subscribe(pageParams);
    //     return unsubscribe;
    // });

    export let data;
    const cookie = data.cookie;
    const wallposts = data.wallposts;
    const pageArtistName = data.json.user.artistName;
    let followersInCount = data.json.user.followers.length;
    let followingInCount = data.json.user.following.length;

    const loggedInUser = data?.userData?.customMessage?.artistName;
    let loggedInUserFollow = [];

    const fetchLoggedInUser = async () => {
        const res = await fetch(`http://localhost:8080/api/users/${loggedInUser}`);
        const result = await res.json();
        loggedInUserFollow = result.user.following;
    };

    let followingState = "";
    let checkForFollowing = async () => {
        await fetchLoggedInUser();
        if (loggedInUserFollow.includes(pageArtistName)) {
            followingState = "unfollow";
            return "unfollow";
        } else {
            followingState = "follow";
            return "follow";
        }
    }
    onMount(async () => {
        await checkForFollowing()
    });

    const patchAllFollowing = async (action) => {
        await fetch(`http://localhost:8080/api/users/${action}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${data.cookie}`,
            },
            body: JSON.stringify({
                userId: data.json.user._id,
            }),
        }).then(res => {
            if(action === "unfollow"){
                followersInCount--
                followingState = "follow"
            }else{
                followersInCount++
                followingState = "unfollow"
            }
        })
        
    };
</script>
<a href="http://localhost:5173/profile/Funch">Funch</a>
<pre>
    
        {JSON.stringify(data.json.user.artistName)}
    
</pre>
<div class="header-div">
    <div class="profile-picture">
        <img alt="" class="img-pic" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
    </div>

    <div class="allign-items">
        <div class="artist-name"><h3>{pageArtistName}</h3></div>
        <div class="follow-div">
            <p>{followersInCount} Followers | {followingInCount} Following</p>
        </div>
        <div class="bio-div">Import bio here: Artist making music</div>
        <div class="btn-div">
            {#if loggedInUserFollow === pageArtistName}
            <div></div>
            {:else}
                <div class="follow-div">
                    <button class="btn-follow" on:click={patchAllFollowing(followingState)}>{followingState}</button>
                </div> 
            {/if}
            <div class="message-div">
                <button class="btn-message">Message</button>
            </div>
        </div>
    </div>
</div>

<div class="main-div">
    <div>
        {#each wallposts as wallpost}
            <div class="wallpost-div">
                <div class="artist-div">
                    <b>{wallpost.artistName}</b>
                </div>

                <div class="wallpost-body">
                    <p>{wallpost.body}</p>
                </div>

                <div class="splitter" />

                <div>
                    <div>
                        <input type="text" placeholder="comment" />
                    </div>
                    <div class="wallpost-comment">
                        <p>{wallpost.comments}</p>
                    </div>
                </div>
            </div>
            <br />
        {/each}
    </div>

    <pre>
    <code>
        {cookie}
    </code>
</pre>
</div>

<style lang="scss">
    .main-div {
        margin-left: 60px;
        margin-right: 60px;
    }
    .header-div {
        display: flex;
        align-items: center;
        margin-left: 60px;
        margin-right: 60px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .img-pic {
        height: 250px;
        border-radius: 100px;
    }
    .allign-items {
        margin-left: 40px;
        font-size: 20px;
        width: 50%;
    }
    .artist-name {
        font-size: 50px;
    }

    .follow-div {
        margin-bottom: 10px;
    }

    .bio-div {
        margin-bottom: 10px;
    }

    .btn-div {
        display: flex;
        width: 100%;
    }
    .btn-follow {
        border: 2px solid black;
        border-radius: 15px;
        padding: 2px;
        width: 100%;
        padding: 10px;
    }

    .btn-message {
        border: 2px solid black;
        border-radius: 15px;
        padding: 2px;
        width: 100%;
        padding: 10px;
        margin-left: 5px;
    }

    .wallpost-div {
        border: 2px solid #000;
        border-radius: 15px;
        padding: 50px;
    }
    .wallpost-body {
        margin-bottom: 10px;
    }
    .artist-div {
        padding-bottom: 5px;
    }
    input {
        border: 2px solid #000;
        width: 50%;
        border-radius: 5px;
        padding: 2px;
        padding-left: 5px;
    }
    .splitter {
        border: 1px solid #000;
        margin: 10px;
    }
</style>
