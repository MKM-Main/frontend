<script>
    import { onMount } from "svelte";
    import { io } from "socket.io-client";

    export let data;
    const loggedInUser = data?.userData?.customMessage?._id;
    const loggedInUserArtistName = data?.userData?.customMessage?.artistName;
    const jwt = data.jwt;
    let conversations = data.conversations;
    let conversationsMessages = data?.conversationMessages;
    // let conversationMessagesReceiver = data?.conversationMessages
    let params = data.params;
    
    $: conversationsMessages = data?.conversationMessages
    $: params = data.params;
    
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

    // const disconnect = () => {
    //     socket.on("disconnect", reason => {
    //         console.log(`Client disconnected`);
    //     });
    // }
    

    
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
   
</script>
<div class="conversation-main">
    <div class="left-column">
        <div><button>Create</button></div>
        {#each conversations as conversation}
        <a on:click={emptySocketArray} href="/conversations/{conversation._id}">
            <div class="horizontal-div">
                <p>{conversation.participants}</p>
            </div>
        </a>
        {/each}
    </div>

    <div class="right-column">
        <div class="message-list">
          {#each conversationsMessages.messages as message}
            <div class="message-container">
              {#if message.sender !== loggedInUserArtistName}
                <p class="left-message">{message.body}</p>
              {:else}
                <p class="right-message">{message.body}</p>
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
            {params}
            <textarea bind:value={bodyArea} class="area" name="" id="{params}" cols="40" rows="1" key={params}></textarea>
            <button on:click={sendMessage(params)} type="submit">Send</button>
          </form>
        </div>
    </div>
</div>

<style lang="scss">
    .message-list {
    height: 400px;
    overflow-y: auto;
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
        height: 400px;
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
</style>
