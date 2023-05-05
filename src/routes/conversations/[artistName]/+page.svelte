<script>
    import { onMount } from "svelte";
    import { io } from "socket.io-client";
    import Modal from '../../../lib/components/modal/Modal.svelte';
    import {env} from "$env/dynamic/public";

    export let data;
    const loggedInUser = data?.userData?.customMessage?._id;
    const loggedInUserArtistName = data?.userData?.customMessage?.artistName;
    const jwt = data.jwt;
    let conversations = data?.conversations;
    let conversationsMessages = data?.conversationMessages;
    
    let params = data.params;

    let userData;
    const fetchUserData = async () => {
      const res = await fetch(`http://localhost:8080/api/users/${loggedInUserArtistName}`)
        const result = await res.json();
        userData = result;
    }
    
    onMount(async () => {
        await fetchUserData()
    });
    
    const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX
    
    $: conversationsMessages = data?.conversationMessages
    $: params = data.params;

    let modal = false
    let socket = io(`http://localhost:8080/`);
    let bodyArea;
    let messages = []
    

    const emptySocketArray = () => {
        messages = []
    };

    const sendMessage = (params) => {
        socket.emit("new message", [bodyArea, params, loggedInUser])
    }
    socket.on("new message", data => {
        messages = [...messages, data.data]
    })
    
    let userModalFollowArray = [];

    //Fetches the followers and following depending on the fetch action
    const fetchPageUser = async () => {
        const res = await fetch(`http://localhost:8080/api/users/following/${loggedInUserArtistName}`);
        const result = await res.json();
        userModalFollowArray = result;
    };

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
        })
    };

    let newConversationId;
    const postNewConversation = async (action) => {
        await fetch(`http://localhost:8080/api/conversations/${action}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${data.cookie}`,
            }
        }).then(res => res.json())
        .then(result => {
          newConversationId = result.insertedId
        })
    }
   
</script>
<div class="conversation-main">
    <div class="left-column">
        <div class="send-div"><button on:click={() => { modal = true; fetchPageUser(); }}>
          <i class="material-icons" style="font-size:36px">chat</i>
        </button>
      </div>
        {#each conversations as conversation}
        <a on:click={emptySocketArray} href="/conversations/{conversation._id}">
            <div class="horizontal-div">
                <p>{conversation.participants}</p>
            </div>
        </a>
        {/each}
    </div>
    {#if conversationsMessages.length !== 0}
    <div class="right-column">
        <div class="message-list">
          {#each conversationsMessages.messages as message}
            <div class="message-container">
              {#if message.sender !== loggedInUserArtistName}
                <div class="left-message">
                  <p>{message.body}</p>
                  <p>{message.timeStamp}</p>
                </div>
              {:else}
              <div class="right-message">
                <p>{message.body}</p>
                <p>{message.timeStamp}</p>
              </div>
                
              {/if}
            </div>
          {/each}
          {#each messages as msg}
            <div class="message-container">
              {#if msg.params === params}
                {#if msg.loggedInUser !== loggedInUser}
                  <p class="left-message">{msg.dataMessage}</p>
                {:else}
                  <p class="right-message">{msg.dataMessage}</p>
                {/if}
              {/if}
            </div>
          {/each}
        </div>
        <div class="input-message">
          <form on:submit|preventDefault={patchMessages(params)}>
            <div class="input-div">
              <textarea bind:value={bodyArea} class="area" name="" id="{params}" cols="40" rows="1" key={params}></textarea>
              <button class="btn" on:click={sendMessage(params)} type="submit">Send</button>
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
                        <div class="div-btn-modal">
                            <a class="btn" href="/inbox" on:click={() => { postNewConversation(user.artistName); }}>Send message</a>
                        </div>
                </div>
            {/each}
        </div>
    </Modal>
{/if}

<style lang="scss">
    .message-list {
    height: 440px;
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

  .input-div{
    display: flex;
  }

  .send-div{
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid black;
    margin-bottom: 5px;
  }
</style>
