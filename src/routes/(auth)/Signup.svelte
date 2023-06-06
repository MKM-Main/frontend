<script>

    import {PUBLIC_BASE_URL} from "$env/static/public";
    let firstName, lastName, artistName, email, password
    export let cookiesAccepted


    const handleSignup = async () => {
        const data = {
            firstName,
            lastName,
            artistName,
            email,
            password
        }
        await fetch(`${PUBLIC_BASE_URL}api/auth/signup`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status === 200) {
                    // goto(`/profile`)
                    location.href = "/news"
                }
            })

    }


</script>

<div class="signup">
    <form on:submit|preventDefault={handleSignup}>
        <label for="firstName">First name</label>
        <input bind:value={firstName} id="firstName" type="text">

        <label for="lastName">Last name</label>
        <input bind:value={lastName} id="lastName" type="text">

        <label for="artistName">Artist name</label>
        <input bind:value={artistName} id="artistName" type="text">

        <label for="email">Email</label>
        <input bind:value={email} id="email" type="email">

        <label for="password">Password</label>
        <input bind:value={password} id="password" minlength="8" type="password">

        <button class:cookies-accepted={cookiesAccepted === false} type="submit">Sign up!</button>
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

    .cookies-accepted {
      pointer-events: none;
      background-color: darkgrey;
    }
  }


</style>
