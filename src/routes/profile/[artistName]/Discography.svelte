<script>
    export let artistName;
    export let jwt;
    export let updateDiscographySection

    let selectedService = '';
    let album = false;
    let songs = [];
    let mainTitle = "";
    let title = "";
    let mainUrl = "";
    let url = "";
    let formData = new FormData();

    const handleChange = (event) => {
        selectedService = event.target.value;
    };

    const handleAlbum = () => {
        album = !album;
        songs = [];
    };

    const handleAddItem = () => {
        songs = [...songs, {title, url}];
        title = '';
        url = '';
    };

    const handleRemoveItem = (index) => {
        songs = songs.filter((_, i) => i !== index);
    };

    const handleSubmit = async () => {
        document.getElementById("loading-spinner").style.display = "flex";

        formData.append("selectedService", selectedService)
        formData.append("mainTitle", mainTitle)
        formData.append("mainUrl", mainUrl)
        formData.append("album", album)
        formData.append("songs", JSON.stringify(songs))


        await fetch(`http://localhost:8080/api/users/${artistName}/discography`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${jwt}`
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                document.getElementById("loading-spinner").style.display = "none";
                updateDiscographySection(data)
            })
    }

    const handleFileInput = (event) => {
        const file = event.target.files[0];
        formData.append('file', file);
    }
</script>

<div class="form-container">
    <form on:submit|preventDefault={handleSubmit}>
        <label for="music-service">Streaming Service</label>
        <select bind:value={selectedService} id="music-service" name="music-service" on:change={handleChange} required>
            <option value="">Select streaming service</option>
            <option value="apple">Apple Music</option>
            <option value="spotify">Spotify</option>
        </select>

        <label for="title">Title</label>
        <input bind:value={mainTitle} id="title" placeholder="My awesome title" required type="text">

        <label for="main-url">URL</label>
        <input bind:value={mainUrl} id="main-url" name="mainUrl" placeholder="link" type="url">

        <label for="album">Album</label>
        <input id="album" name="album" on:change={handleAlbum} type="checkbox">

        <label for="file">Image:</label>
        <input accept=".pdf, .jpeg, .jpg, .png" id="file" multiple on:change={handleFileInput} type="file">

        {#if album}
            {#each songs as song, index (index)}
                <div class="item-container">
                    <label for="item-title-{index}">Title</label>
                    <input id="item-title-{index}" type="text" bind:value={song.title}>

                    <label for="item-url-{index}">URL</label>
                    <input id="item-url-{index}" type="url" bind:value={song.url}>

                    <button class="remove-song" type="button" on:click={() => handleRemoveItem(index)}>Remove</button>
                </div>
            {/each}
            <button on:click={handleAddItem} type="button">Add Song</button>
        {/if}
        <button type="submit">Submit</button>
    </form>
</div>


<style lang="scss">
  .form-container {
    width: 35em;
    margin: 0 auto;
    background-color: #0D1B2A;
    padding: 20px;
    border-radius: 8px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  label {
    color: #E0E1DD;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input,
  select,
  button {
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 16px;
    width: 100%;
    font-size: 16px;
    color: #E0E1DD;

    &::placeholder {
      color: #E0E1DD;
      opacity: 0.5;
    }
  }

  select {
    background-color: #0D1B2A;
    cursor: pointer;
  }

  input[type="url"] {
    resize: none;
  }

  button {
    background-color: #778DA9;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #415A77;

    }
  }

  .item-container {
    .remove-song {
      background-color: red;

      &:hover {
        background-color: darkred;
      }

    }
  }

</style>
