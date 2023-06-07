<script>
    import Signup from "../Signup.svelte";
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


<Signup cookiesAccepted="{cookiesAccepted}"/>
{#if !cookiesAccepted}
    <div style="text-align: center">
        <h3>Please accept cookies before continuing</h3>
    </div>
{/if}

