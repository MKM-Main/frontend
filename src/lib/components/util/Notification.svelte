<script>
    export let message
    export let notify
    export let type
    export let opacity


</script>

{#if notify}
    <div class={`notification-${type}`} style="opacity: {opacity}">
        {message}
    </div>
{/if}


<style>
    .notification-success {
        position: absolute;
        top: 20%;
        right: 10%;

        padding: 2em 7em;
        background-color: green;
        color: aliceblue;
        opacity: 0.9;
        border-radius: 15px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-size: 14px;
    }

    .notification-info {
        position: absolute;
        top: 20%;
        right: 10%;

        padding: 2em 7em;
        opacity: 0.5;
        background-color: yellow;
        color: aliceblue;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-size: 14px;
    }

    .notification-warning {
        position: absolute;
        top: 20%;
        right: 10%;

        padding: 2em 7em;
        background-color: red;
        color: aliceblue;
        opacity: 0.9;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-size: 14px;
    }

</style>
