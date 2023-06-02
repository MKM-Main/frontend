<script>
    import {createEventDispatcher} from 'svelte';
    import {PUBLIC_BASE_URL} from "$env/static/public";

    export let jwt;
    export let artistId;
    export let discoId;

    const dispatch = createEventDispatcher();

    const deleteMerch = async () => {
        await fetch(`${PUBLIC_BASE_URL}api/users/${artistId}/discography/${discoId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
            .then(() => {
                dispatch('discoDeleted', {discoId});
            });
    };
</script>

<i class="fa-solid fa-trash fa-xl" on:click={deleteMerch}></i>

<style lang="scss">
  .fa-trash {
    position: relative;
    left: 97%;

    &:hover {
      color: red;
      cursor: pointer;
    }
  }

</style>
