<script>
    import {createEventDispatcher} from 'svelte';
    import {PUBLIC_BASE_URL} from "$env/static/public";

    export let jwt;
    export let artistId;
    export let merchId;

    const dispatch = createEventDispatcher();

    const deleteMerch = async () => {
        await fetch(`${PUBLIC_BASE_URL}api/users/${artistId}/merch/${merchId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
            .then(() => {
                dispatch('merchDeleted', {merchId});
            });
    };
</script>

<i class="fa-solid fa-trash fa-xl" on:click={deleteMerch}></i>

<style lang="scss">
  .fa-trash {
    position: relative;
    left: 97%;
    color: #E0E1DD;

    &:hover {
      color: red;
      cursor: pointer;
    }
  }

</style>
