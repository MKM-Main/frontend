<script>
  import { onMount } from "svelte";
  import { io } from "socket.io-client";
  import PostConversation from "../../../lib/components/conversations/PostConversation.svelte";
  import DeleteConversation from "../../../lib/components/conversations/DeleteConversation.svelte";
  import { env } from "$env/dynamic/public";
  import Modal from "../../../lib/components/Modal/Modal.svelte";
  import { PUBLIC_BASE_URL } from "$env/static/public";

  let userData;
  //This function is created for getting the loggedin users information
  const fetchUserData = async () => {
    const res = await fetch(
      `${PUBLIC_BASE_URL}api/users/${loggedInUserArtistName}`
    );
    const result = await res.json();
    userData = result;
  };

  export let data;
  const loggedInUser = data?.userData?.customMessage?._id;
  const loggedInArtistname = data?.userData?.customMessage?.artistName;
  const loggedInUserArtistName = data?.userData?.customMessage?.artistName;
  const jwt = data.jwt;
  let conversations = data?.conversations;
  let conversationsMessages = data?.conversationMessages;
  let params = data.params;
  let messageList;

  const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX;

  $: conversationsMessages = data?.conversationMessages;
  $: params = data.params;
  $: conversations = data?.conversations;

  let modal = false;
  let socket = io(`${PUBLIC_BASE_URL}`);
  let bodyArea;
  let socketMessages = [];

  let profilePictureKey;
  //Check if a user has a profilepicture key and if not then they will receive the blank.webp
  const checkForProfilePicture = (artistId, profilePictureKey) => {
    if (profilePictureKey === "blank_profile.webp") {
      return `${imageSourcePrefix}${profilePictureKey}`;
    } else {
      return `${imageSourcePrefix}${artistId}/profile/${profilePictureKey}`;
    }
  };

  //Empties the socket array
  const emptySocketArray = () => {
    socketMessages = [];
  };

  //Empties the socket version of the conversation array
  const emptySocketConversationArray = () => {
    socketConversationArray = [];
  };

  //Sends message with sockets
  const sendMessage = (params) => {
    if (bodyArea.trim() !== "") {
      socket.emit("new message", [
        bodyArea,
        params,
        loggedInUser,
        loggedInArtistname,
      ]);
    }
  };

  //Listens for the event new message
  let userProfiles = {};
  socket.on("new message", async (data) => {
    const res = await fetch(
      `${PUBLIC_BASE_URL}api/users/${data.data.loggedInArtistname}`
    );
    const result = await res.json();
    userProfiles[result.user.artistName] = [
      result.user._id,
      result.user.profilePictureKey,
    ];

    socketMessages = [...socketMessages, data.data];
    await emptySocketConversationArray();
    await updateConversations();
  });

  //Sends conversation to server
  const createConversation = async (action) => {
    socket.emit("new conversation", action);
  };

  //Creates array with new socket conversation
  let socketConversationArray = [];
  socket.on("new conversation", async (data) => {
    socketConversationArray = data.conversation;
  });

  //Array create for the modal with following
  let userModalFollowArray = [];

  //Fetches who the loggedin user is following
  const fetchUserFollowing = async () => {
    const res = await fetch(
      `${PUBLIC_BASE_URL}api/users/following/${loggedInUserArtistName}`
    );
    const result = await res.json();
    userModalFollowArray = result;
  };

  //Updates messages on the database
  const patchMessages = async (params) => {
    await fetch(`${PUBLIC_BASE_URL}api/conversations/messages/${params}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${data.cookie}`,
      },
      body: JSON.stringify({
        body: bodyArea,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        bodyArea = "";
        messageList.scrollTop = messageList.scrollHeight;
      });
  };

  //Fetches all conversations the loggedin user has
  const updateConversations = async () => {
    const res = await fetch(`${PUBLIC_BASE_URL}api/conversations`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const result = await res.json();
    conversations = result;
  };

  //Updates if a user opens a conversation. Then the conversation is marked as read
  const patchReadConversation = async (action) => {
    try {
      await fetch(`${PUBLIC_BASE_URL}api/conversations/read/${action}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      await updateConversations();
    } catch (error) {
      console.error("Error updating conversation:", error);
    }
  };

  //Fetches all message on a conversation_id, which updates the messages
  const updateMessages = async (action) => {
    const res = await fetch(`${PUBLIC_BASE_URL}api/conversations/${action}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const result = await res.json();
    conversationsMessages = result;
    messageList.scrollTop = messageList.scrollHeight;
  };

  //If the loggedin user have an ongoing conversation with another user, the loggedin user will not be able to see the other user in the modal
  function conversationExists(artistName) {
    let exists = false;
    conversations.forEach((conversation) => {
      if (conversation.participants.includes(artistName)) {
        exists = true;
      }
    });
    return exists;
  }

  onMount(async () => {
    await fetchUserData();
  });
</script>

<!-- Button to open modal and create new conversation -->
<div class="conversation-main">
  <div class="left-column">
    <div class="send-div">
      <h3>Start a conversation</h3>
      <button
        on:click={() => {
          modal = true;
          fetchUserFollowing();
        }}
      >
        <i class="material-icons" style="font-size:36px">chat</i>
      </button>
    </div>

    <!-- Conversation -->
    {#each conversations as conversation}
      {#if conversation.read === false && conversation.sender !== loggedInArtistname}
        <a
          on:click={() => {
            emptySocketArray();
            patchReadConversation(conversation._id);
            updateMessages(conversation._id);
          }}
          href="/conversations/{conversation._id}"
        >
          <div class="horizontal-div">
            <span class="notification-dot" />
            <img
              alt=""
              class="conversations-pic"
              src={checkForProfilePicture(
                conversation.participantId,
                conversation.profilePictureKey
              )}
            />
            <p>{conversation.participants}</p>
            <p>{conversation.timeStamp}</p>
            <DeleteConversation
              {conversation}
              updateDeletedConversation={updateConversations}
              {jwt}
            />
          </div>
        </a>
      {:else}
        <a
          on:click={() => {
            emptySocketArray();
            updateMessages(conversation._id);
          }}
          href="/conversations/{conversation._id}"
        >
          <div class="horizontal-div">
            <img
              alt=""
              class="conversations-pic"
              src={checkForProfilePicture(
                conversation.participantId,
                conversation.profilePictureKey
              )}
            />
            <p>{conversation.participants}</p>
            <p>{conversation.timeStamp}</p>
            <DeleteConversation
              {conversation}
              updateDeletedConversation={updateConversations}
              {jwt}
            />
          </div>
        </a>
      {/if}
    {/each}

    <!-- Socketconversations -->
    {#each socketConversationArray as socketConversation}
      {#if socketConversation?.receiver[0] !== loggedInArtistname}
        <div />
      {:else}
        <a
          on:click={() => {
            emptySocketConversationArray();
            emptySocketArray();
            updateMessages(socketConversation._id);
            patchReadConversation(socketConversation._id);
          }}
          href="/conversations/{socketConversation._id}"
        >
          <div class="horizontal-div">
            <span class="notification-dot" />
            <img
              alt=""
              class="conversations-pic"
              src={checkForProfilePicture(
                socketConversation.senderId,
                socketConversation.profilePictureKeySender
              )}
            />
            <p>{socketConversation.sender}</p>
            <p>{socketConversation.timeStamp}</p>
            <DeleteConversation conversation={socketConversation} {jwt} />
          </div>
        </a>
      {/if}
    {/each}
  </div>

  <!-- Messages -->
  {#if conversationsMessages.length !== 0}
    <div class="right-column">
      <div class="message-list" bind:this={messageList}>
        {#each conversationsMessages.messages as message}
          <div class="message-container">
            {#if message.sender !== loggedInUserArtistName}
              <div class="left-message">
                <div>
                  <a href="/profile/{message.sender}">
                    <img
                      alt=""
                      class="conversations-pic"
                      src={checkForProfilePicture(
                        message.senderId,
                        message.profilePictureKey
                      )}
                    />
                  </a>
                </div>
                <div class="horizontal-socketmessage">
                  <p>{message.body}</p>
                  <p class="timestamp-msg">{message.timeStamp}</p>
                </div>
              </div>
            {:else}
              <div class="right-message">
                <p>{message.body}</p>
                <p class="timestamp-msg">{message.timeStamp}</p>
              </div>
            {/if}
          </div>
        {/each}

        <!-- Socket messages -->
        {#each socketMessages as msg}
          <div class="message-container">
            {#if msg.params === params}
              {#if msg.loggedInUser !== loggedInUser}
                <div class="left-message">
                  <div>
                    <a href="/profile/{msg.loggedInArtistname}">
                      <img
                        alt=""
                        class="conversations-pic"
                        src={checkForProfilePicture(
                          userProfiles[msg.loggedInArtistname][0],
                          userProfiles[msg.loggedInArtistname][1]
                        )}
                      />
                    </a>
                  </div>
                  <div class="horizontal-socketmessage">
                    <p>{msg.dataMessage}</p>
                    <p class="timestamp-msg">{msg.timeStamp}</p>
                  </div>
                </div>
              {:else}
                <div class="right-message">
                  <p>{msg.dataMessage}</p>
                  <p class="timestamp-msg">{msg.timeStamp}</p>
                </div>
              {/if}
            {/if}
          </div>
        {/each}
      </div>

      <div class="input-message">
        <form on:submit|preventDefault={patchMessages(params)}>
          <div class="input-div">
            <textarea
              bind:value={bodyArea}
              class="area"
              name=""
              id={params}
              cols="40"
              rows="1"
              key={params}
              required
            />
            <button
              class="btn"
              on:click={() => {
                sendMessage(params);
              }}
              type="submit">Send</button
            >
          </div>
        </form>
      </div>
    </div>
  {:else}
    <div class="right-column">
      <div class="message-list">
        <div class="message-container" />
      </div>
    </div>
  {/if}
</div>

{#if modal}
  <Modal on:close={() => (modal = false)}>
    <div class="modal">
      {#each userModalFollowArray as user}
        {#if !conversationExists(user.artistName)}
          <div class="modal-each-div">
            <div class="modal-profile-picture">
              <img
                alt=""
                class="img-pic-modal"
                src={checkForProfilePicture(user._id, user.profilePictureKey)}
              />
            </div>
            <div class="modal-artistname">
              {user.artistName}
            </div>
            <PostConversation
              {updateConversations}
              {createConversation}
              user={user.artistName}
              on:close={() => (modal = false)}
              {jwt}
            />
          </div>
        {/if}
      {/each}
    </div>
  </Modal>
{/if}

<style lang="scss">
  .message-list {
    height: 26.25em;
    overflow-y: auto;
  }

  .message-container {
    margin: 0.5em;
    padding: 0.5em;
    border-radius: 0.5em;
  }

  .conversation-main {
    display: flex;
    flex-direction: row;

    .left-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      border-radius: 20px;
      -webkit-box-shadow: -1px -1px 15px 8px #e0e1dd;
      box-shadow: -1px -1px 15px 8px #e0e1dd;
      padding: 1.7em;
      width: 50%;
      margin-bottom: 0.625em;
      margin-left: 5%;
      height: 31.25em;
      overflow-y: auto;
    }

    .right-column {
      flex: 1;
      border-radius: 20px;
      -webkit-box-shadow: -1px -1px 15px 8px #e0e1dd;
      box-shadow: -1px -1px 15px 8px #e0e1dd;
      padding: 0.625em;
      width: 50%;
      margin-bottom: 0.625em;
      height: 31.25em;
      margin-right: 5%;
    }
  }

  a {
    text-decoration: none;
    color: white;
    position: relative;

    .horizontal-div {
      display: flex;
      height: 3.125em;
      margin-bottom: 0.625em;
      background-color: #1b263b;
      align-items: center;
      border-radius: 0.625em;
      padding: 0.625em;
      cursor: pointer;
      justify-content: space-between;
      transition: background-color 0.3s ease;

      .notification-dot {
        position: relative;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #e0e1dd;
        margin: 5px;
      }

      &:hover {
        background-color: #778da9;
      }

      &::selection {
        background-color: #e6f2ff;
      }
    }
  }

  textarea {
    flex: 1;
    padding: 0.5em;
    font-size: 1em;
    border: 1px solid #778da9;
    border-radius: 0.75em;
    margin-right: 0.2em;
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

  .message-container {
    display: flex;
    flex-direction: column;
    max-width: 90%;
    margin: 0 auto;
  }

  .left-message {
    display: flex;
    margin-bottom: 0.125em;
    border-radius: 2.5em;
    padding: 1em;
    align-self: flex-start;
    background-color: #e0e1dd;
    align-items: center;
    word-wrap: break-word;
    word-break: break-all;
    max-width: 70%;

    .horizontal-socketmessage {
      display: flex;
      flex-direction: column;
    }
  }

  .right-message {
    margin-bottom: 0.125em;
    padding: 1em;
    border-radius: 2.5em;
    align-self: flex-end;
    background-color: #415a77;
    color: white;
    word-wrap: break-word;
    word-break: break-all;
    max-width: 70%;
  }

  .modal-each-div {
    display: flex;
    align-items: center;
    margin-bottom: 0.625em;
    width: 100%;
    justify-content: space-between;
  }

  .img-pic-modal {
    height: 6.25em;
    border-radius: 6.25em;
  }

  .conversations-pic {
    height: 2.5em;
    border-radius: 7.5em;
    margin-right: 0.625em;
  }

  .input-div {
    display: flex;
  }

  .send-div {
    display: flex;
    justify-content: flex-end;
    border-bottom: 0.0625em solid #000000;
    margin-bottom: 0.3125em;
    padding-bottom: 0.5em;

    h3 {
      margin: auto;
    }
  }

  .timestamp-msg {
    font-size: small;
  }
</style>
