<script>
    export let artistName
    export let userData
    export let jwt

    let tags = []
    let firstName, lastName, age, email, biography
    let userBody = {firstName, lastName, age, email, biography}
    let newTagValue


    const handleNewTag = () => {
        tags = [...tags, {name: newTagValue, checked: true}]
    }


    const updateUser = async () => {
        Object.keys(userBody).forEach(key => userBody[key] = userBody[key]?.trim());
        Object.keys(userBody).forEach((key) => {
            if (userBody.hasOwnProperty(key) && userBody[key] === "") {
                delete userBody[key];
            }
        })

        await fetch(`http://localhost:8080/api/admin/users/${artistName}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify({userBody})
        })
            .then(() => {
                location.href = `/profile/${userData.artistName}`

            })
    }


</script>
<div>

    <form on:submit|preventDefault={updateUser}>
        <label for="artist-name">Artist Name:</label>
        <input bind:value={userBody.artistName} id="artist-name" placeholder="{userData.artistName}" type="text">

        <label for="first-name">First Name:</label>
        <input bind:value={userBody.firstName} id=first-name placeholder="{userData.firstName}" type="text">

        <label for="last-name">Last Name:</label>
        <input bind:value={userBody.lastName} id="last-name" name="last-name" placeholder="{userData.lastName}"
               type="text">

        <label for="age">Age</label>
        <input bind:value={userBody.age} id="age" placeholder="" type="number">

        <label for="email">Email:</label>
        <input bind:value={userBody.email} id="email" name="email" placeholder="{userData.email}" type="email">

        <label for="biography">Biography:</label>
        <textarea bind:value={userBody.biography} id="biography" name="biography" placeholder="My awesome bio!"
                  rows="5"></textarea>

        <label for="tags">Tags:</label>
        <input id="tags" name="tags" type="text">

        <label for="new-tag">New tag:</label>
        <input bind:value={newTagValue} id="new-tag" placeholder="my cool tag!" type="text">
        <p on:click={handleNewTag}>Add tag</p>

        {#each tags as tag, idx}
            <label for="tag-{idx}">{tag.name}</label>
            <input id="tag-{idx}" on:change={() => tag.checked = !tag.checked} checked={tag.checked} type="checkbox">
        {/each}

        <button type="submit">Submit</button>
    </form>
</div>

<style>

</style>
