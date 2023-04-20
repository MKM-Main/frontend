<script>

    import {BASE_URL_LOCAL} from "../../lib/stores.js";
    import {goto} from "$app/navigation";
    let firstName, lastName, artistName, email, password


    const handleSignup = async () => {
        const data = {
            firstName,
            lastName,
            artistName,
            email,
            password
        }
        await fetch(`${$BASE_URL_LOCAL}/api/auth/signup`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 200) {
                    goto(`/profile`)
                }
            })

    }


</script>

<div class="signup">
    <form on:submit|preventDefault={handleSignup}>
        <label for="firstName">First name</label>
        <input bind:value={firstName} id="firstName" type="text">

        <label for="lastName">First name</label>
        <input bind:value={lastName} id="lastName" type="text">

        <label for="artistName">Arist name</label>
        <input bind:value={artistName} id="artistName" type="text">

        <label for="email">Email</label>
        <input bind:value={email} id="email" type="email">

        <label for="password">Password</label>
        <input bind:value={password} id="password" minlength="8" type="password">

        <button type="submit">Sign up!</button>
    </form>
</div>

<style lang="scss">
  .signup {
    margin: auto;
    width: 25%;
    text-align: center;

    input,
    button {
      width: 100%;
      padding: 1em;
      margin: 8px 0;
      border: 1px solid #ccc;
      border-radius: 0.7em;
    }
  }


</style>
