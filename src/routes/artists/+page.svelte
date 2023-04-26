<script>
    import {env} from "$env/dynamic/public";
    export let data
    const artists = data.artists.data
    const imageSourcePrefix = env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX

    artists.forEach(artist => {
        artist.profilePictureKey = `${imageSourcePrefix}${artist.profilePictureKey}`
    })

</script>

<div class="container">
    {#each artists as artist}
        <div class="artist">
            <p>{artist.artistName}</p>
            <a href="profile/{artist.artistName}">Link</a>
            <img src={artist.profilePictureKey} alt="artist">
        </div>
    {/each}
</div>


<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: repeat(3, auto);
    background-color: red;

    .artist {
      height: fit-content;
      margin: 5px 2px;

      img {
        width: 150px;
        height: 100px;
      }
    }
  }
</style>
