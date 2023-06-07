<script>
    import Login from "../Login.svelte";
    import {onMount} from "svelte";
    let cookiesAccepted = false
    let intervalId;

    onMount(() => {
        intervalId = setInterval(() => {
            const cookie = localStorage.getItem("cookie_consent_accepted");
            if (cookie) {
                cookiesAccepted = true;
                clearInterval(intervalId);
            } else {
                cookiesAccepted = false;
            }
        }, 1000);
    })


</script>

<Login
        cookiesAccepted="{cookiesAccepted}"
/>
<div style="text-align: center">
    {#if !cookiesAccepted}
        <h3>Please accept cookies before continuing</h3>
    {/if}
    <p>Don't have an account? <a href="signup">Sign up!</a></p>
</div>

