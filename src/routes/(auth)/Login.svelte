<script>
    import {BASE_URL_LOCAL} from "../../lib/stores.js";
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
            .then(res => {
                if (res.status === 200) {
                    location.href = "/news"
                }
            })
    }


</script>

<div class="login">
    <form on:submit|preventDefault={handleLogin}>
        <label for="email">Email</label>
        <input bind:value={email} id="email" type="email">

        <label for="password">Password</label>
        <input bind:value={password} id="password" type="password">

        <button id="submit" type="submit">Login</button>
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
