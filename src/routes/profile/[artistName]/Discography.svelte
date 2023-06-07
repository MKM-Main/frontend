<script>
    import {imageHeight, imageWidth} from "../../../lib/stores.js";
    import {PUBLIC_BASE_URL} from "$env/static/public";
    import toast from "svelte-french-toast";
    export let artistId;
    export let jwt;
    export let updateDiscographySection

    let selectedService = "";
    let album = false;
    let songs = [];
    let mainTitle = "";
    let title = "";
    let mainUrl = "";
    let url = "";
    let isNewRelease = false
    let releaseDate = ""
    let formData = new FormData();
    let canUpload
    let height = $imageHeight
    let width = $imageWidth
    let currentWidth
    let currentHeight

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
        formData.append("isNewRelease", isNewRelease)
        formData.append("releaseDate", releaseDate)

        await toast.promise(
            fetch(`${PUBLIC_BASE_URL}api/users/${artistId}/discography`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    updateDiscographySection(data)
                }),
            {
                loading: "Uploading discography",
                success: "Discography was uploaded",
                error: "Error uploading discography"
            }
        )
    }

    const handleFileInput = (event) => {
        const file = event.target.files[0]
        formData.append('file', file)

        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                currentWidth = img.width
                currentHeight = img.height
                canUpload = img.width <= width && img.height <= height;
            }
            img.src = e.target.result;
        }
        if (!file) canUpload = true
        reader.readAsDataURL(file);
    }
</script>

<div class="form-container">
    <form on:submit|preventDefault={handleSubmit}>
        <label for="music-service">Streaming Service</label>
        <select bind:value={selectedService} id="music-service" name="music-service" on:change={handleChange} required>
            <option value="">Select streaming service</option>
            <option value="apple">Apple Music</option>
            <option value="spotify">Spotify</option>
            <option value="other">Other</option>
        </select>

        <label for="title">Title</label>
        <input bind:value={mainTitle} id="title" placeholder="My awesome title" required type="text">

        <label for="main-url">URL</label>
        <input bind:value={mainUrl} id="main-url" name="mainUrl" placeholder="link" type="url">

        <label for="release-date">Release date</label>
        <input bind:value={releaseDate} id="release-date" type="date">

        <label for="new-release">New Release?</label>
        <input bind:checked={isNewRelease} id="new-release" type="checkbox">

        <label for="album">Album</label>
        <input id="album" name="album" on:change={handleAlbum} type="checkbox">


        <label for="file" style="{canUpload === false ? 'color: red' : ''}">Image
            : {canUpload === false ? `Must not exceed ${height}px * ${width}px | Current size: ${currentHeight} * ${currentWidth} ` : ""}</label>
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
            <button class="add-song" on:click={handleAddItem} type="button">Add Song</button>
        {/if}
        <button class="btn-submit" class:btn-block-submit={canUpload === false} type="submit">Submit</button>
    </form>
</div>


<style lang="scss">
  .form-container {
    width: 35em;
    margin: 0 auto;
    background-color: #0D1B2A;
    padding: 20px;
    border-radius: 8px;

    .add-song {
      padding: 12px;
      border-radius: 4px;
      border: 1px solid #ccc;
      margin-bottom: 16px;
      color: #E0E1DD;
      width: 100%;
      font-size: 16px;
      background-color: green;

      &:hover {
        background-color: rgba(18, 171, 18, 0.99);
      }
    }

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
  {
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

  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  select {
    background-color: #0D1B2A;
    cursor: pointer;
  }

  input[type="url"] {
    resize: none;
  }

  .btn-submit {
    background-color: #778DA9;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 16px;
    width: 100%;
    font-size: 16px;
    color: #E0E1DD;

    &:hover {
      background-color: #415A77;

    }
  }

  .btn-block-submit {
    pointer-events: none;
    background-color: darkgrey;
  }

  .item-container {
    .remove-song {
      background-color: red;
      padding: 12px;
      border-radius: 4px;
      border: 1px solid #ccc;
      margin-bottom: 16px;
      width: 100%;
      font-size: 16px;
      color: #E0E1DD;

      &:hover {
        background-color: darkred;
      }
    }
  }

</style>
