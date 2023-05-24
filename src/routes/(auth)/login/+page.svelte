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

<h1>Login</h1>
<Login
        cookiesAccepted="{cookiesAccepted}"
/>
{#if !cookiesAccepted}
    <div style="text-align: center">
        <h3>Please accept cookies before continuing</h3>
        <p>Don't have an account? <a href="signup">Sign up!</a></p>
    </div>
{/if}

