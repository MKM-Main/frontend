<script>
    import {onMount} from "svelte";
    import Modal from './Modal.svelte';
    import Comment from "./Comment.svelte";
    import {env} from "$env/dynamic/public";

    export let data;
    let wallposts = data.wallposts;
    const pageArtistName = data.json.user.artistName;
    let followersInCount = data.json.user.followers.length;
    let followingInCount = data.json.user.following.length;
    const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX
    const profilePictureKey = data.json.user.profilePictureKey
    const imageSource = `${imageSourcePrefix}${profilePictureKey}`


    const loggedInUser = data?.userData?.customMessage?.artistName;
    let loggedInUserFollow = [];
    let userModalFollowArray = [];

    //Fetches the followers and following depending on the fetch action
    let fetchAction = "empty";
    const fetchPageUser = async () => {
        const res = await fetch(`http://localhost:8080/api/users/${fetchAction}/${pageArtistName}`);
        const result = await res.json();
        userModalFollowArray = result;
    };

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
        } else {
            followingState = "follow";
        }
    }
    onMount(async () => {
        await checkForFollowing()
        await fetchPageUser()
    });

    const patchFollowing = async (action) => {
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
            if (action === "unfollow") {
                followersInCount--
                followingState = "follow"
            } else {
                followersInCount++
                followingState = "unfollow"
            }
        })
    };

    const patchFollowingModal = async (action) => {
        await fetch(`http://localhost:8080/api/users/unfollow`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${data.cookie}`,
            },
            body: JSON.stringify({
                userId: action,
            }),
        }).then(res => {
            const arrayObject = userModalFollowArray.findIndex(artist => artist._id === action)
            userModalFollowArray.splice(arrayObject, 1)
            userModalFollowArray = [...userModalFollowArray]
            followingInCount--
        })
    }

    let commentBody;
    const patchComments = async (action) => {
        await fetch(`http://localhost:8080/api/posts/comments/wallposts/${action}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${data.cookie}`,
            },
            body: JSON.stringify({
                body: commentBody,
            }),
        }).then(res => res.json())
            .then(res => {
                const arrayObject = wallposts.findIndex(wallpost => wallpost._id === action)
                wallposts[arrayObject].comments.push(res.message)
                wallposts = [...wallposts]
        })
    }

    let modal = false
</script>
<a href="http://localhost:5173/profile/Funch">Funch</a>
<pre>

        {JSON.stringify(data.json.user.artistName)}

</pre>
<div class="header-div">
    <div class="profile-picture">
        <img alt="" class="img-pic"
             src={imageSource}/>
    </div>

    <div class="allign-items">
        <div class="artist-name"><h3>{pageArtistName}</h3></div>
        <div class="follow-div">
            <button on:click={() => { modal = true; fetchAction = "followers"; fetchPageUser(); }}>
                Followers {followersInCount} |
            </button>
            <button on:click={() => { modal = true; fetchAction = "following"; fetchPageUser(); }}>
                Following {followingInCount}</button>
        </div>
        <div class="bio-div">Import bio here: Artist making music</div>
        <div class="btn-div">
            {#if loggedInUser === pageArtistName}
                <div></div>
            {:else}
                <div class="follow-div">
                    <button class="btn-follow" on:click={patchFollowing(followingState)}>{followingState}</button>
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

                <div class="splitter"/>

                <div>
                    <div>
                        <form on:submit|preventDefault={() => patchComments(wallpost._id)}>
                            <input type="text" placeholder="comment" bind:value={commentBody}/>
                            <button class="btn-comment" type="submit">Send comment</button>
                        </form>
                    </div>
                    {#each wallpost.comments as comment}
                        <Comment comment={comment} />
                    {/each}
                </div>
            </div>
            <br/>
        {/each}
    </div>
</div>



{#if modal}
    <Modal on:close={() => modal = false}>
        <div class="modal">
            {#each userModalFollowArray as user}
                <div class="modal-each-div">
                    <div class="modal-profile-picture">
                        <img alt="" class="img-pic-modal"
                             src="{imageSourcePrefix}{user.profilePictureKey}"/>
                    </div>
                    <div class="modal-artistname">
                        {user.artistName}
                    </div>
                    {#if loggedInUser === pageArtistName && fetchAction === "following"}
                        <div class="div-btn-modal">
                            <button class="btn-follow" on:click={patchFollowingModal(user._id)}>unfollow</button>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </Modal>
{/if}

<style lang="scss">
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
    width: 100%;
    padding: 10px;
  }

  .btn-message {
    border: 2px solid black;
    border-radius: 15px;
    padding: 10px;
    margin-left: 5px;
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

  .modal-each-div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
    justify-content: space-between;
  }

  .img-pic-modal {
    height: 100px;
    border-radius: 100px;
  }
  .main-div {
    margin-left: 60px;
    margin-right: 60px;
    
    .wallpost-div {
        border: 2px solid #000;
        border-radius: 15px;
        padding: 50px;
    }

    .wallpost-body {
        margin-bottom: 10px;
    
    }
    .btn-comment{
        border: 2px solid black;
        border-radius: 15px;
        padding: 10px;
        margin-left: 5px;
    }
  }
  
</style>
