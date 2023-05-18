<script>
    export let artistName
    export let userData
    export let jwt
    export let userTags

    let tags = []
    let firstName, lastName, age, email, biography
    let userBody = {firstName, lastName, age, email, biography, userTags}
    let newTagValue
    let showCurrentTags = false
    let formData = new FormData()
    let artistId = userData._id

    const handleNewTag = (e) => {
        e.preventDefault()
        tags = [...tags, {name: newTagValue, checked: true}]
    }
    const handleDeleteTag = (tagIndex) => {
        userTags.splice(tagIndex, 1)
    }

    const handleFileInput = (event) => {
        const file = event.target.files[0]
        formData.append('profilePicture', file)
    }


    export const updateUser = async () => {
        if (!Number) {
            Object.keys(userBody).forEach((key) => (userBody[key] = userBody[key]?.trim()));
        }
        Object.keys(userBody).forEach((key) => (userBody[key] === "" ? delete userBody[key] : {}));

        tags.forEach((tag) => {
            if (tag.checked) {
                userTags.push(tag.name);
            }
        });

        const fetchRequests = [];

        if (formData.get("profilePicture")) {
            const profilePictureRequest = fetch(`http://localhost:8080/api/admin/users/${artistId}/profile-picture`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                body: formData,
            })
                .then((res) => res.json())

            fetchRequests.push(profilePictureRequest)
        }
        //TODO: Kig på rækkefølge af de to kald her ift. jwt sign i backend

        if (Object.keys(userBody).length !== 0) {
            const updateUserRequest = fetch(`http://localhost:8080/api/admin/users/${artistName}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({userBody}),
            })
                .then((res) => res.json())
                .then((data) => {
                    location.href = data.data.artistName
                });
            fetchRequests.push(updateUserRequest)
        }

        await Promise.all(fetchRequests)
    };


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

        <label for="profilePicture">Profile Picture:</label>
        <input accept=".jpeg, .jpg, .png," id="profilePicture" on:change={handleFileInput}
               type="file">


        <label for="new-tag">New tag:</label>
        <input bind:value={newTagValue} id="new-tag" placeholder="my cool tag!" type="text">
        <button class="btn-add-tag" on:click={handleNewTag}>Add tag</button>

        {#each tags as tag, idx}
            <label for="tag-{idx}">{tag.name}</label>
            <input id="tag-{idx}" on:change={() => tag.checked = !tag.checked} checked={tag.checked} type="checkbox">
        {/each}

        <button on:click={() => showCurrentTags = !showCurrentTags} type="button">See current user tags</button>


        {#if showCurrentTags}
            <div class="current-tags">
                {#each userTags as currentTag, idx}
                    <label for="currentTag-{idx}">{currentTag}</label>
                    <input id="currentTag-{idx}" on:change={() => currentTag.checked = !currentTag.checked}
                           checked={currentTag.checked} type="checkbox">
                    <button type="submit" on:click={() => handleDeleteTag(idx)}>Delete</button>
                {/each}
            </div>
        {/if}
        <button type="submit">Submit</button>
    </form>
</div>

<style lang="scss">
  div {
    form {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: #0D1B2A;

      label {
        color: #E0E1DD;
        display: flex;
        align-items: center;
        margin-bottom: 0.5em;
      }

      input[type="text"],
      input[type="number"],
      input[type="email"],
      input[type="file"],
      textarea {
        width: 100%;
        padding: 0.5em;
        margin-bottom: 1em;
        border: 1px solid #ccc;
        border-radius: 4px;
        color: #E0E1DD;

        &::placeholder {
          color: #E0E1DD;
          opacity: 0.5;
        }
      }

      input[type="checkbox"] {
        margin-right: 0.25em;
        vertical-align: middle;
      }

      button[type="submit"],
      button[type="button"] {
        padding: 0.75em 1em;
        background-color: #415A77;
        color: #fff;
        border: none;
        border-radius: 0.75em;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #778DA9;
        }
      }

      .btn-add-tag {
        font-size: 1em;
        padding: 0.5em 1em;
        background-color: #415A77;
        color: #E0E1DD;
        border: none;
        border-radius: 0.75em;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #778DA9;
        }
      }

      .current-tags {
        display: flex;
        gap: 20px;

      }
    }
  }
</style>
