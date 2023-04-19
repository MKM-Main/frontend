<script>
    import {BASE_URL_LOCAL} from "../../stores.js";
    import {goto} from "$app/navigation";
    let email, password

    const handleLogin = async () => {
        const data = {
            email,
            password
        }
        await fetch(`${$BASE_URL_LOCAL}/api/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                const artistName = data.data[0].artistName
                goto(`/profile/${artistName}`)
            })

    }


</script>

<div class="login">
    <form on:submit|preventDefault={handleLogin}>
        <label for="email">Email</label>
        <input bind:value={email} id="email" type="email">

        <label for="password">Password</label>
        <input bind:value={password} id="password" type="password">

        <button type="submit">Login</button>

    </form>
</div>

<style lang="scss">
  .login {
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
