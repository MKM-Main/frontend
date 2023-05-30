<script>
    export let id;
    export let jwt;
    export let collection;
    export let postId;
    export let title;

    import Modal from '$lib/components/modal/Modal.svelte';
    let modal = false;

    const reasons = [
        "Spam",
        "Harassment",
        "Hate speech",
        "Inappropriate content",
        "Other"
    ];
    let selectedReason = reasons[0];
    let description = "";

    export const report = async () => {
        const currentURL = window.location.href + "/" + title;
        await fetch(`http://localhost:8080/api/report/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
                id,
                collection,
                postId,
                link: currentURL,
                reason: selectedReason,
                description: description
            })
        }).then(res => {
            if (res.ok) {
                modal = false;
            }
        });
    };
</script>

{#if modal}
    <Modal on:close={() => (modal = false)}>
        <form on:submit|preventDefault={report} class="modal-form">
            <div class="form-group">
                <label for="reason">Reason:</label>
                <select id="reason" bind:value={selectedReason} class="form-select">
                    {#each reasons as reason}
                        <option value={reason}>{reason}</option>
                    {/each}
                </select>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" bind:value={description} class="form-textarea"></textarea>
            </div>
            <button type="submit" class="btn-submit">Report</button>
        </form>
    </Modal>
{/if}


<button on:click={() => (modal = true)}>Report</button>

<style lang="scss">
  button {
    margin: 10px;
    font-size: 1em;
    padding: 0.5em 1em;
    background-color: #1B263B;
    color: #E0E1DD;
    border: none;
    border-radius: 0.75em;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #778DA9;
    }
  }

  .modal-form {
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-group {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 5px;
        color: #333333;
      }

      .form-select,
      .form-textarea {
        padding: 5px;
        border: 1px solid #cccccc;
        border-radius: 5px;
        width: 100%;
      }

      .form-select {
        height: 30px;
        text-align: center;

        &:hover {
          cursor: pointer;
        }
      }

      .form-textarea {
        height: 5em;

        resize: none;
      }
    }

    .btn-submit {
      padding: 10px 20px;
      background-color: #333333;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #666666;
      }
    }
  }
</style>
