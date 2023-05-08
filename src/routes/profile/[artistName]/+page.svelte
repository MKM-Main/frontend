<script>
    import {onMount} from "svelte";
    import Modal from './Modal.svelte';
    import ShowComment from "../../../lib/components/comments/ShowComment.svelte";
    import CreateComment from "../../../lib/components/comments/CreateComment.svelte"
    import {env} from "$env/dynamic/public";
    import Spinner from "../../../lib/components/helpers/Spinner.svelte";
    import CreatePost from "../../../lib/components/posts/CreatePost.svelte";
    import Hype from "../../../lib/components/posts/Hype.svelte";
    import ShowPost from "../../../lib/components/posts/ShowPost.svelte";
    import DeletePost from "../../../lib/components/posts/DeletePost.svelte";


    export let data;
    const jwt = data.jwt
    let wallposts = data.wallposts;
    const pageArtistName = data.json.user.artistName;
    let followersInCount = data.json.user.followers.length;
    let followingInCount = data.json.user.following.length;
    const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX
    const profilePictureKey = data.json.user.profilePictureKey
    const imageSource = `${imageSourcePrefix}${profilePictureKey}`


    let modalNewPost
    let modal = false
    let modalHype = false

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

    const updateComments = (newComment, search) => {
        const arrayObject = wallposts.findIndex(wallpost => wallpost._id === search)
        wallposts[arrayObject].comments = [...wallposts[arrayObject].comments, newComment.message]
    }
    const updatePostSection = (data) => {
        wallposts = [...wallposts, data.newPost]
    }

    const handlePostDeleted = (event) => {
        wallposts = event.detail
    }


</script>


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
            {#if loggedInUser && loggedInUser !== pageArtistName}
                <div class="follow-div">
                    <button class="btn-follow" on:click={patchFollowing(followingState)}>{followingState}</button>
                </div>
            {/if}
            <div class="message-div">
                <button class="btn-message">Message</button>
            </div>
            {#if loggedInUser === pageArtistName}
                <div class="new-post">
                    <button class="btn-new-post" on:click={() => modalNewPost = true}>Post</button>
                </div>
            {/if}
        </div>
    </div>
</div>

<div class="main-div">
    <div>
        {#each wallposts as wallpost}
            <div class="wallpost-div">
                {#if loggedInUser === pageArtistName }
                    <DeletePost
                            jwt="{jwt}"
                            postId="{wallpost._id}"
                            posts="{wallposts}"
                            on:postDeleted="{handlePostDeleted}"
                    />
                {/if}
                <ShowPost post="{wallpost}"/>

                <div class="splitter"/>
                <Hype
                        jwt="{jwt}"
                        postId="{wallpost._id}"
                        loggedInUser="{loggedInUser}"
                        rating="{wallpost.rating.length}"
                />
                <div class="rated-users" style="display: none">
                    {#each wallpost.rating as user }
                        <p>{user}</p>
                    {/each}

                </div>
                {#if modalHype}
                    <Modal on:close={() => modalHype = false}>
                        {#each wallpost.rating as user }
                            <p>{user}</p>
                        {/each}
                    </Modal>
                {/if}
                <div>
                    {#if jwt}
                        <CreateComment jwt={jwt} reference={"wallposts"} search={wallpost?._id}
                                       updateComments={updateComments}/>
                    {/if}
                    {#each wallpost.comments as comment}
                        <ShowComment comment={comment}/>
                    {/each}
                </div>
            </div>
            <br/>
        {/each}
    </div>
</div>

{#if modalNewPost}
    <Modal on:close={() => modalNewPost = false}>
        <div class="new-post">
            <CreatePost
                    jwt="{jwt}"
                    reference="wallpost"
                    updatePostSection="{updatePostSection}"
                    on:postCreated={() => modalNewPost = false}
                    tags="{data.tagsJson.tags}"
            />
            <Spinner/>
        </div>
    </Modal>

{/if}

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

  .new-post {
    form {
      textarea {
        resize: none;
        width: 100%;
      }
    }

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
    width: 100%;
    padding: 10px;
  }

  .btn-message,
  .btn-new-post {
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

    .btn-comment {
      border: 2px solid black;
      border-radius: 15px;
      padding: 10px;
      margin-left: 5px;
    }
  }

</style>
