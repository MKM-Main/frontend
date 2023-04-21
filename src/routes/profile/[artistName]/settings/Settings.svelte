<script>
    export let userFields = []
    export let jwt

    let firstName
    let lastName


    const handleUpdateUserField = async () => {
        await fetch("http://localhost:8080/api/users", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify({firstName, lastName})
        })
    }


</script>

<form on:submit|preventDefault={handleUpdateUserField}>
    <div class="update-user-field">
        <label for="firstName">First Name</label>
        <input bind:value={firstName} id="firstName" type="text">

        <label for="lastName">Last Name</label>
        <input bind:value={lastName} id="lastName" type="text">

        <button type="submit">Save details</button>
    </div>
</form>

<style lang="scss">
  input, button {
    background-color: black;
    color: aliceblue;
  }


</style>
