<script>
    import {env} from "$env/dynamic/public";
    export let data

    const artists = data.artists.data
    const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX

    artists.forEach(artist => {
        artist.profilePictureKey = `${imageSourcePrefix}${artist.profilePictureKey}`
    })
    let searchFilter
    let filteredArtists = null
    $: filteredArtists = artists.filter(artist => {
        return !searchFilter ||
            artist?.artistName.toLowerCase().includes(searchFilter.toLowerCase()) ||
            artist?.userTags.some(tag => tag.toLowerCase().includes(searchFilter.toLowerCase()))
    })


</script>
<div class="filter-search">
    <h1>Search</h1>
    <label for="post-search">Search for users!</label>
    <input bind:value={searchFilter} id="post-search" placeholder="tag / username" type="text">
</div>

<div class="container">
    {#each filteredArtists as artist}
        <div class="artist">
            <a href="profile/{artist.artistName}">{artist.artistName}</a>
            <img src={artist.profilePictureKey} alt="artist">
            {#if artist.biography}
                <p>{artist.biography}</p>
            {/if}
            {#each artist.userTags as tag }
                <li>{tag}</li>
            {/each}
        </div>
    {/each}
</div>


<style lang="scss">
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .artist {
      width: 18em;
      margin-bottom: 1.25em;
      background-color: #f7f7f7;
      padding: 1.25em;
      border-radius: 0.25em;
      box-shadow: 0 0.125em 0.25em rgba(0, 0, 0, 0.1);

      a {
        display: block;
        text-decoration: none;
        color: #333;
        font-weight: bold;
        margin-bottom: 0.625em;

        &:hover {
          text-decoration: underline;
        }
      }

      img {
        max-width: 100%;
        height: auto;
        margin-bottom: 0.625em;
      }

      p {
        font-size: 0.875em;
        line-height: 1.4;
        margin-bottom: 0.625em;
      }

      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }

      li {
        font-size: 0.875em;
        line-height: 1.2;
        padding: 0.25em 0.5em;
        border-radius: 0.25em;
        background-color: #eee;
        display: inline-block;
        margin-right: 0.375em;
        margin-bottom: 0.375em;
      }
    }
  }


</style>
