<script>
    import toast from "svelte-french-toast";
    import {PUBLIC_BASE_URL} from "$env/static/public";
    let email, password
    export let cookiesAccepted


    const handleLogin = async () => {
        const data = {
            email,
            password
        }
        await fetch(`${PUBLIC_BASE_URL}api/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(async res => {
                if (res.status === 200) {
                    const data = await res.json()
                    toast.success(`Welcome ${data.artistName}`, {
                        style:
                            `padding: 2em;
                             border: 2px solid #E0E1DD;
                             border-radius: 25px;
                             -webkit-box-shadow: -1px -1px 15px 8px #E0E1DD;
                             box-shadow: -1px -1px 15px 8px #E0E1DD;`
                    })
                    setTimeout(() => {
                        location.href = "/news"
                    }, 1500)
                }
                if (res.status === 401) {
                    toast.error("Login failed. \n Please try again.")
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

        <button class:cookies-accepted={cookiesAccepted === false} id="submit" type="submit">Login</button>
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

    .cookies-accepted {
      pointer-events: none;
      background-color: darkgrey;
    }
  }


</style>
