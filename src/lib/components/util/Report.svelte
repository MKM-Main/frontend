<script>
    export let id;
    export let jwt;
    export let collection;
    export let postId;
    export let title;

    import Modal from "../modal/Modal.svelte";
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
        <form on:submit|preventDefault={report}>
            <div>
                <label for="reason">Reason:</label>
                <select id="reason" bind:value={selectedReason}>
                    {#each reasons as reason}
                        <option value={reason}>{reason}</option>
                    {/each}
                </select>
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea id="description" bind:value={description}></textarea>
            </div>
            <button type="submit">Report</button>
        </form>
    </Modal>
{/if}

<button on:click={() => (modal = true)}>Report</button>
