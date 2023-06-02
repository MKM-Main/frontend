<script>
    import {PUBLIC_BASE_URL} from "$env/static/public";
    export let id;
    export let jwt;
    export let isVeryfied
    export const verifyForum = async () => {
        await fetch(`${PUBLIC_BASE_URL}api/admin/verify/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify({id})
        }).then((res) => {

        })
    }
</script>

<button on:click={() => verifyForum()} type="submit">{isVeryfied}</button>
