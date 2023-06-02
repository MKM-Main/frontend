<script>
    import {PUBLIC_BASE_URL} from "$env/static/public";
    export let id;
    export let apiUrl;
    export let jwt;
    // export let deleteComments;
    export const deleteFunction = async () => {
        await fetch(`${PUBLIC_BASE_URL}api/admin/${apiUrl}/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
        }).then(async (res) => {
            // deleteComments(commentid);
        });
    }
</script>
<button on:click={() => deleteFunction()}>Delete button</button>
