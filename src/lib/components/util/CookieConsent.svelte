<script>
    import {onMount} from 'svelte';

    export let options = {
        message: 'This website uses cookies to ensure you get the best experience.',
        buttonLabel: 'Accept',
        storageKey: 'cookie_consent_accepted',
        expirationDays: 30
    };

    let showConsent = false;

    const acceptConsent = () => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + options.expirationDays);
        localStorage.setItem(options.storageKey, JSON.stringify({accepted: true, expires: expirationDate}));
        showConsent = false;
    };

    onMount(() => {
        const storedData = localStorage.getItem(options.storageKey);
        if (!storedData) {
            showConsent = true;
        } else {
            const {accepted, expires} = JSON.parse(storedData);
            if (!accepted || new Date(expires) < new Date()) {
                localStorage.removeItem(options.storageKey);
                showConsent = true;
            }
        }
    });
</script>

{#if showConsent}
    <div class="cookie-consent">
        <p>{options.message}</p>
        <button on:click={acceptConsent}>{options.buttonLabel}</button>
    </div>
{/if}

<style>
    .cookie-consent {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 16px;
        background-color: #f0f0f0;
        color: #333;
        font-size: 14px;
        text-align: center;
        z-index: 9999;
    }

    .cookie-consent p {
        margin: 0;
        padding: 0;
    }

    .cookie-consent button {
        margin-top: 8px;
        padding: 8px 16px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
