<script>
    export let postid;
    export let commentid;
    export let deleteComments;

    export const deleteFunction = async () => {
            await fetch(`http://localhost:8080/api/posts/comments/${postid}/${commentid}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(async (res) => {
            deleteComments(commentid);
        });
        }
    </script>
    <button on:click={() => deleteFunction()}>Delete button</button>