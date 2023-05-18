<script>
    import {onMount} from "svelte";
    import Modal from '$lib/components/modal/Modal.svelte';
    import CreateComment from "$lib/components/comments/CreateComment.svelte"
    import {env} from "$env/dynamic/public";
    import Spinner from "$lib/components/helpers/Spinner.svelte";
    import CreatePost from "$lib/components/posts/CreatePost.svelte";
    import ShowPost from "$lib/components/posts/ShowPost.svelte";
    import DeletePost from "$lib/components/posts/DeletePost.svelte";
    import CreateMerch from "./CreateMerch.svelte";
    import DeleteMerch from "./DeleteMerch.svelte";
    import Discography from "./Discography.svelte";
    import DeleteDisco from "./DeleteDisco.svelte";
    import Settings from "./Settings.svelte";
    import ShowComment from "../../../lib/components/comments/ShowComment.svelte";

    export let data;
    const jwt = data.jwt
    let wallposts = data.wallposts;
    let pageArtistName

    $: pageArtistName = data.json?.user?.artistName;
    let followersInCount = data.json?.user?.followers?.length;
    let followingInCount = data.json?.user?.following?.length;
    let merchandise = data.json?.user?.merch
    let discography = data.json?.user?.discography
    let showCreationForm = true
    let collapseBtnValue = "Creation section"


    const handleShowCreationForm = () => {
        showCreationForm = !showCreationForm
    }

    const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX
    const profilePictureKey = data.json?.user?.profilePictureKey
    const imageSource = `${imageSourcePrefix}${profilePictureKey}`
    let modalNewPost
    let modal = false

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
        loggedInUserFollow = result.user?.following;
    };

    let followingState = "";
    let checkForFollowing = async () => {
        await fetchLoggedInUser();
        if (loggedInUserFollow?.includes(pageArtistName)) {
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
    const updateMerchSection = (data) => {
        merchandise = [...merchandise, data.data]
    }

    const handlePostDeleted = (event) => {
        wallposts = event.detail
    }

    let showSection = "posts"
    const handleShownSection = (section) => {
        showSection = section
        showCreationForm = true
    }
    const handleMerchDeleted = (event) => {
        const deletedMerchId = event.detail.merchId;
        merchandise = merchandise.filter(merch => merch._id !== deletedMerchId);
    }

    const updateDiscographySection = (data) => {
        discography = [...discography, data.data]
    }


    const handleDiscoDeleted = (event) => {
        const deletedDiscoId = event.detail.discoId;
        discography = discography.filter(disco => disco._id !== deletedDiscoId);
    }
</script>

<div class="header-div">
    <div class="profile-picture">
        <img alt="" class="img-pic"
             src={imageSource}/>
    </div>

    <div class="allign-items">
        <div class="artist-name">
            <h3>{pageArtistName}</h3>
        </div>
        <div class="options">
            <div>
                <h2 on:click={() => handleShownSection("posts")}>Posts</h2>
            </div>
            <div>
                <h2 on:click={() => handleShownSection("merch")}>Merch</h2>
            </div>
            <div>
                <h2 on:click={() => handleShownSection("discography")}>Discography</h2>
            </div>
            {#if loggedInUser === pageArtistName}
                <div>
                    <h2 on:click={() => handleShownSection("settings")}>Settings</h2>
                </div>
            {/if}
        </div>
        <div class="follow-div">
            <button on:click={() => { modal = true; fetchAction = "followers"; fetchPageUser(); }}>
                Followers {followersInCount} |
            </button>
            <button on:click={() => { modal = true; fetchAction = "following"; fetchPageUser(); }}>
                Following {followingInCount}</button>
        </div>
        <div class="bio-div">Biography: {data.json.user.biography}</div>
        <div class="btn-div">
            {#if loggedInUser && loggedInUser !== pageArtistName}
                <div class="follow-div">
                    <button class="btn-follow" on:click={patchFollowing(followingState)}>{followingState}</button>
                </div>
                <div class="message-div">
                    <a href="/conversations/inbox">
                        <button class="btn-follow">Message</button>
                    </a>
                </div>
            {/if}

            {#if loggedInUser === pageArtistName}
                <div class="new-post">
                    <button class="btn-new-post" on:click={() => modalNewPost = true}>Post</button>
                </div>
                <div>
                    <button class="collapse-btn"
                            on:click={handleShowCreationForm}>{collapseBtnValue}</button>
                </div>
            {/if}
        </div>
    </div>
</div>

{#if showSection === "posts"}
    <div class="main-wallpost">
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
                    <ShowPost
                            post="{wallpost}"
                            jwt="{jwt}"
                            loggedInUser="{loggedInUser}"
                    />
                    <div>
                        {#if jwt}
                            <CreateComment jwt={jwt} reference={"wallposts"} search={wallpost?._id}
                                           updateComments={updateComments}/>
                        {/if}
                        {#each wallpost?.comments as comment}
                            <ShowComment
                                    comment={comment}
                                    jwt="{jwt}"
                                    loggedInUser="{loggedInUser}"
                            />
                        {/each}
                    </div>
                </div>
                <br/>
            {/each}
        </div>
    </div>
{/if}
{#if showSection === "merch"}
    <div class="main-merch">
        <div class="merch-creation">
            {#if loggedInUser === pageArtistName}
                {#if showCreationForm}
                    <CreateMerch
                            loggedInUser="{loggedInUser}"
                            jwt="{jwt}"
                            updateMerchSection="{updateMerchSection}"
                    />
                    <Spinner
                            postType="merch"
                            color="#E0E1DD"
                    />
                {/if}
            {/if}
        </div>
        <h1>See {pageArtistName}'s merchandise!</h1>
        <div class="merch-overview">
            {#each merchandise as merch}
                <div class="merch-item">
                    <img class="merch-image" src="{imageSourcePrefix}{pageArtistName}/merch/{merch._id}" alt="">
                    <p class="merch-title">Title: {merch.title}</p>
                    <p class="merch-description">Description: {merch.description}</p>
                    <p class="merch-price">Price: {merch.price}</p>
                    <p>Avaliable sizes:</p>
                    {#each merch.sizes as size }
                        <p>{size}</p>
                    {/each}
                    {#if loggedInUser === pageArtistName}
                        <DeleteMerch
                                jwt="{jwt}"
                                artistName="{pageArtistName}"
                                merchId="{merch._id}"
                                on:merchDeleted={handleMerchDeleted}
                        />
                    {/if}

                </div>
            {/each}
        </div>
    </div>
{/if}

{#if showSection === "discography"}
    <div class="main-disc">
        {#if loggedInUser === pageArtistName}
            {#if showCreationForm}
                <Discography
                        jwt="{jwt}"
                        artistName="{loggedInUser}"
                        updateDiscographySection="{updateDiscographySection}"
                />
                <Spinner
                        postType="discography"
                        color="#E0E1DD"
                />
            {/if}
        {/if}
        <div class="discography-overview">
            {#each discography as disco }
                <div class="discography-item">
                    {#if disco.referenceKey}
                        <img src="{imageSourcePrefix}{pageArtistName}/discography/{disco.referenceKey}" alt="image">
                    {/if}
                    <p>{disco.album ? "Album" : "Single"} Title: {disco.mainTitle}</p>
                    {#if disco.releaseDate}
                        <p>{disco.releaseDate}</p>
                    {/if}
                    <p>Streaming service: {disco.selectedService}</p>
                    <p>Listen here: <a href="{disco.mainUrl}">{disco.mainTitle}</a></p>
                    <div class="album-container">
                        {#each disco.songs as album }
                            <p>Song: <a href="{album.url}">{album.title}</a></p>
                        {/each}
                    </div>
                    {#if disco.selectedService !== "other"}
                        <img src="{imageSourcePrefix}logos/{disco?.selectedService}.svg" alt="streaming-service">
                    {/if}
                    {#if loggedInUser === pageArtistName}
                        <DeleteDisco
                                jwt="{jwt}"
                                artistName="{pageArtistName}"
                                discoId="{disco._id}"
                                on:discoDeleted={handleDiscoDeleted}
                        />

                    {/if}
                </div>
            {/each}
        </div>
    </div>
{/if}
{#if showSection === "settings"}
    <Settings
            jwt="{jwt}"
            artistName="{loggedInUser}"
            userData="{data?.json?.user}"
            userTags="{data?.json?.user?.userTags}"
    />

{/if}

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
            <Spinner
                    postType="post"
            />
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

    .options {
      display: flex;

      div {
        margin-right: 10px;

        h2 {
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .collapse-btn {
      border: 2px solid black;
      border-radius: 15px;
      padding: 10px;
      margin-left: 5px;
    }
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

  .wallpost-div {
    width: 50%;
    margin: 0 25%;
    padding: 1em;
    border-radius: 0.75em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    -webkit-box-shadow: -1px -1px 15px 8px #E0E1DD;
    box-shadow: -1px -1px 15px 8px #E0E1DD;

    h1 {
      font-size: 1.5em;
      margin-bottom: 0.5em;
    }

    h3 {
      font-size: 1em;
      margin-bottom: 0.5em;
    }

    h2 {
      font-size: 1.25em;
      margin-top: 1em;

      a {
        color: #415A77;
        text-decoration: none;

        &:hover {
          color: #1B263B;
        }
      }
    }
  }

  .main-merch {

    .merch-creation {
      display: flex;
      justify-content: center;

      :first-of-type(button) {
        color: orange;

      }
    }

    .merch-overview {
      margin-top: 1.75em;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .merch-item {
      background-color: #1B263B;
      padding: 20px;
      border-radius: 0.75em;
      -webkit-box-shadow: -1px -1px 15px 8px #E0E1DD;
      box-shadow: -1px -1px 15px 8px #E0E1DD;

      p {
        color: #E0E1DD;
      }

      .merch-title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .merch-description {
        margin-bottom: 10px;
      }

      .merch-price {
        font-weight: bold;
        margin-bottom: 10px;
      }

      .merch-sizes {
        margin-bottom: 10px;
      }

      .merch-image {
        max-width: 10em;
      }
    }
  }

  .discography-overview {
    display: grid;
    grid-template-columns: repeat(4, minmax(auto, 1fr));
    gap: 20px;

    .discography-item {
      width: 18em;
      margin-bottom: 20px;
      padding: 10px;
      background-color: #f0f0f0;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      &:hover {
        filter: brightness(95%);
      }

      img {
        width: 100%;
        border-radius: 5px;
        margin-bottom: 10px;
      }

      p {
        margin-bottom: 5px;
      }

      .album-container {
        margin-top: 10px;
      }

      .album-container p {
        margin-bottom: 3px;
      }

      a {
        color: #0000ee;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }


</style>
