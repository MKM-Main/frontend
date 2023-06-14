<script>
  import { env } from "$env/dynamic/public";
  export let data;

  const artists = data.artists.data;
  const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX;

  artists.forEach((artist) => {
    if (artist.profilePictureKey === "blank_profile.webp") {
      artist.profilePictureKey = `${imageSourcePrefix}${artist.profilePictureKey}`;
    } else {
      artist.profilePictureKey = `${imageSourcePrefix}${artist._id}/profile/${artist.profilePictureKey}`;
    }
  });
  let searchFilter;
  let filteredArtists = null;
  $: filteredArtists = artists.filter((artist) => {
    return (
      !searchFilter ||
      artist?.artistName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      artist?.userTags.some((tag) =>
        tag.toLowerCase().includes(searchFilter.toLowerCase())
      )
    );
  });
</script>

<div class="filter-search">
  <h1>Find an artist</h1>
  <input
    bind:value={searchFilter}
    id="post-search"
    placeholder="Search user"
    type="text"
  />
</div>

<div class="container">
  {#each filteredArtists as artist}
    <a class="artist" href="profile/{artist.artistName}">
      <div>
        <h2>{artist.artistName}</h2>
        <img src={artist.profilePictureKey} alt="artist" />
        {#if artist.biography}
          <p>{artist.biography}</p>
        {/if}
        {#each artist.userTags as tag}
          <li>{tag}</li>
        {/each}
      </div>
    </a>
  {/each}
</div>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    a {
      text-decoration: none;
    }

    .artist {
      margin: 2em auto;
      width: 25em;
      background-color: #f7f7f7;
      padding: 1.25em;
      border-radius: 0.75em;
      -webkit-box-shadow: -1px -1px 15px 8px #e0e1dd;
      box-shadow: -1px -1px 15px 8px #e0e1dd;

      &:hover {
        filter: brightness(90%);
      }

      h2 {
        text-decoration: none;
        text-align: center;
        color: #0d1b2a;
      }

      p {
        display: block;
        color: #333;
        font-weight: bold;
        margin-bottom: 0.625em;
      }

      img {
        max-width: 100%;
        height: auto;
        margin-bottom: 0.625em;
        border-radius: 0.75em;
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
        color: #0d1b2a;
      }
    }
  }

  .filter-search {
    text-align: center;

    input[type="text"] {
      text-align: center;
      flex: 1;
      padding: 0.5em;
      font-size: 1em;
      border: 1px solid #778da9;
      border-radius: 0.75em;
      resize: none;
      margin-right: 0.75em;
    }
  }
</style>
