<script>
    import { onMount } from "svelte";
    import { io } from "socket.io-client";
    import Modal from '../../../lib/components/modal/Modal.svelte';
    import PostConversation from '../../../lib/components/conversations/PostConversation.svelte';
    import DeleteConversation from "../../../lib/components/conversations/DeleteConversation.svelte";
    import {env} from "$env/dynamic/public";

    let userData;
    const fetchUserData = async () => {
      const res = await fetch(`http://localhost:8080/api/users/${loggedInUserArtistName}`)
        const result = await res.json();
        userData = result;
    }
    
    export let data;
    const loggedInUser = data?.userData?.customMessage?._id;
    const loggedInArtistname = data?.userData?.customMessage?.artistName;
    const loggedInUserArtistName = data?.userData?.customMessage?.artistName;
    const jwt = data.jwt;
    let conversations = data?.conversations;
    let conversationsMessages = data?.conversationMessages;
    let params = data.params;

    
    
    const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX
    
    $: conversationsMessages = data?.conversationMessages
    $: params = data.params;
    $: conversations = data?.conversations


    let modal = false
    let socket = io(`http://localhost:8080/`);
    let bodyArea;
    let messages = []
    

    const emptySocketArray = () => {
        messages = []
    };

    const emptySocketConversationArray = () => {
      socketConversationArray = []
    };

    const sendMessage = (params) => {
        socket.emit("new message", [bodyArea, params, loggedInUser, loggedInArtistname])
    }

    let userProfiles = {};

    socket.on("new message", async data => {
        const res = await fetch(`http://localhost:8080/api/users/${data.data.loggedInArtistname}`);
        const result = await res.json();
        userProfiles[result.user.artistName] = result.user.profilePictureKey;
        messages = [...messages, data.data];
        await sortConversations();
    });


    const createConversation = async (action) => {
      const socketId = await socket.id;
      socket.emit("new conversation", [action, socketId]);
    }

    let socketConversationArray = []
      socket.on("new conversation", async data => {
        socketConversationArray = data.conversation;
      // if (data?.socketId === socket.id) {
      //   socketConversationArray = data.conversation;
      //   console.log(socketConversationArray)
      // }
    })

    let userModalFollowArray = [];

    //Fetches the followers and following depending on the fetch action
    const fetchPageUser = async () => {
        const res = await fetch(`http://localhost:8080/api/users/following/${loggedInUserArtistName}`);
        const result = await res.json();
        userModalFollowArray = result;
    };

    let timeStampUpdate;
    let messageList;
    const patchMessages = async (params) => {
        await fetch(`http://localhost:8080/api/conversations/messages/${params}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${data.cookie}`,
            },
            body: JSON.stringify({
                body: bodyArea
            }),
        }).then(res => res.json())
        .then(data => {
            timeStampUpdate = data.message.timeStamp;
            bodyArea = "";
            messageList.scrollTop = messageList.scrollHeight;
        })
    };

    const sortConversations = async () => {
      const res = await fetch(`http://localhost:8080/api/conversations`,{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
      });
      const result = await res.json();
      conversations = result;
    }

    const updateConversations = async () => {
      const res = await fetch(`http://localhost:8080/api/conversations`,{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
      });
      const result = await res.json();
      conversations = result;
    }

    const patchReadConversation = async (action) => {
    try {
        await fetch(`http://localhost:8080/api/conversations/read/${action}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
        });
        await updateConversations();
    } catch (error) {
        console.error("Error updating conversation:", error);
    }
}

    onMount(async () => {
        await fetchUserData();
    });
</script>
<div class="conversation-main">
    <div class="left-column">
        <div class="send-div"><button on:click={() => { modal = true; fetchPageUser(); }}>
          <i class="material-icons" style="font-size:36px">chat</i>
        </button>
      </div>
        {#each conversations as conversation}
        {#if conversation.read === false && conversation.sender !== loggedInArtistname}
          <a on:click={ () => {emptySocketArray(); patchReadConversation(conversation._id)}} href="/conversations/{conversation._id}">
            <p>unread message</p>
            <div class="horizontal-div">
                <img alt="" class="conversations-pic" src="{imageSourcePrefix}{conversation.profilePictureKey}"/>
                <p>{conversation.participants}</p>
                <p>{conversation.timeStamp}</p>
                <DeleteConversation conversation={conversation} updateDeletedConversation={updateConversations} jwt={jwt}/>
            </div>
          </a>
          {:else}
          <a on:click={emptySocketArray} href="/conversations/{conversation._id}">
            <div class="horizontal-div">
                <img alt="" class="conversations-pic" src="{imageSourcePrefix}{conversation.profilePictureKey}"/>
                <p>{conversation.participants}</p>
                <p>{conversation.timeStamp}</p>
                <DeleteConversation conversation={conversation} updateDeletedConversation={updateConversations} jwt={jwt}/>
            </div>
        </a>
        {/if}
          
        {/each}
        
        {#each socketConversationArray as socketConversation}
        {#if socketConversation?.sender[0] !== loggedInArtistname}
        <a on:click={emptySocketConversationArray} href="/conversations/{socketConversation._id}">
        <div class="horizontal-div">
            <img alt="" class="conversations-pic" src="{imageSourcePrefix}{socketConversation.profilePictureKeySender}"/>
            <p>{socketConversation.sender}</p>
            <p>{socketConversation.timeStamp}</p>
            <DeleteConversation conversation={socketConversation} jwt={jwt}/>
        </div>
        </a>
        {:else}
        <div></div>
        {/if}
        {/each}
    </div>
    {#if conversationsMessages.length !== 0}
    <div class="right-column">
      <div><p>{conversationsMessages.participants}</p></div>
        <div class="message-list" bind:this={messageList}>
          {#each conversationsMessages.messages as message}
            <div class="message-container">
              {#if message.sender !== loggedInUserArtistName}
                <div class="left-message">
                  <a href="/profile/{message.sender}"><img alt="" class="conversations-pic" src="{imageSourcePrefix}{message.profilePictureKey}"/></a>
                  <p>{message.body}</p>
                  <p class="timestamp-msg">{message.timeStamp}</p>
                </div>
              {:else}
              <div class="right-message">
                <p>{message.body}</p>
                <p class="timestamp-msg">{message.timeStamp}</p>
              </div>
                
              {/if}
            </div>
          {/each}
          {#each messages as msg}
            <div class="message-container">
              {#if msg.params === params}
                {#if msg.loggedInUser !== loggedInUser}
                <div class="left-message">
                  <a href="/profile/{msg.loggedInArtistname}"><img alt="" class="conversations-pic" src="{imageSourcePrefix}{userProfiles[msg.loggedInArtistname]}"/></a>
                  <p >{msg.dataMessage}</p>
                  <p class="timestamp-msg">{msg.timeStamp}</p>
                </div>
                {:else}
                <div class="right-message">
                  <p >{msg.dataMessage}</p>
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
              <textarea bind:value={bodyArea} class="area" name="" id="{params}" cols="40" rows="1" key={params}></textarea>
              <button class="btn" on:click={ () => {sendMessage(params); sortConversations()}} type="submit">Send</button>
            </div>
          </form>
        </div>
    </div>
    {:else}
    <div class="right-column">
      <div class="message-list">
          <div class="message-container">
          </div>
      </div>
    </div>
    {/if}
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
                        <PostConversation updateConversations={updateConversations} createConversation={createConversation} user={user} on:close={() => modal = false} jwt={jwt} />
                </div>
            {/each}
        </div>
    </Modal>
{/if}

<style lang="scss">
    .message-list {
    height: 420px;
    overflow-y: auto;
  }

  .btn {
    border: 2px solid black;
    border-radius: 15px;
    width: 20%;
    padding: 10px;
  }

  .message-container {
    margin: 8px;
    padding: 8px;
    border-radius: 8px;
  }
    .conversation-main {
        display: flex;
        flex-direction: row;
        margin: 20px;
        border: 2px solid black;
        border-radius: 10px;
        padding: 10px;
    }
    .left-column {
        flex: 1;
        display: flex;
        flex-direction: column;
        border: 2px solid black;
        border-radius: 10px;
        padding: 10px;
        width: 50%;
        margin-bottom: 10px;
        height: 500px;
        overflow-y: auto;
    }
    .right-column {
        flex: 1;
        border: 2px solid black;
        border-radius: 10px;
        padding: 10px;
        width: 50%;
        margin-bottom: 10px;
        height: 500px;
    }

    .horizontal-div {
        display: flex;
        height: 50px;
        margin-bottom: 10px;
        background-color: gray;
        align-items: center;
        border-radius: 10px;
        padding: 10px;
        cursor: pointer;
        justify-content: space-between;
    }
    .horizontal-div:hover {
        background-color: #f2f2f2;
    }
    .horizontal-div::selection {
        background-color: #e6f2ff;
    }
    .area{
        border: 2px solid black;
        border-radius: 10px;
        padding: 5px;
    }

    .message-container {
    display: flex;
    flex-direction: column;
    max-width: 90%;
    margin: 0 auto;
  }

  .left-message {
    margin-bottom: 2px;
    border-radius: 40px;
    padding: 16px;
    align-self: flex-start;
    background-color: #f2f2f2;
  }

  .right-message {
    margin-bottom: 2px;
    padding: 16px;
    border-radius: 40px;
    align-self: flex-end;
    background-color: #4CAF50;
    color: white;
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

  .conversations-pic{
    height: 40px;
    border-radius: 120px;
    margin-right: 10px;
  }

  .input-div{
    display: flex;
  }

  .send-div{
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid black;
    margin-bottom: 5px;
  }
  .timestamp-msg{
    font-size: small;
  }
</style>
