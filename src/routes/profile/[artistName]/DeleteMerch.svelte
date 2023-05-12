<script>
    import {createEventDispatcher} from 'svelte';

    export let jwt;
    export let artistName;
    export let merchId;

    const dispatch = createEventDispatcher();

    const deleteMerch = async () => {
        await fetch(`http://localhost:8080/api/users/${artistName}/merch/${merchId}`, {
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

    &:hover {
      color: red;
      cursor: pointer;
      scale: 1.25;
    }
  }

</style>
