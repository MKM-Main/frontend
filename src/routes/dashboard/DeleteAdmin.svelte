<script>
    export let id;
    export let apiUrl;
    export let jwt;
   // export let deleteComments;
    export const deleteFunction = async () => {
            await fetch(`http://localhost:8080/api/admin/${apiUrl}/${id}`, {
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