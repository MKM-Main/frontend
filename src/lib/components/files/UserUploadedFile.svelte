<script>
    import {env} from "$env/dynamic/public";
    export let keyReference
    export let artistName

</script>

{#if
    keyReference?.endsWith(".mp3") ||
    keyReference?.endsWith(".m4a")}
    <audio controls="controls">
        <source src="{env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX}{artistName}/posts/{keyReference}" type="audio/mp3">
    </audio>
{/if}

{#if keyReference?.endsWith(".mp4")}
    <div class="video-container">
        <video controls="controls">
            <source src="{env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX}{artistName}/posts/{keyReference}" type="video/mp4">
        </video>
    </div>

{/if}

{#if
    keyReference?.endsWith(".jpeg") ||
    keyReference?.endsWith(".jpg") ||
    keyReference?.endsWith(".png") ||
    keyReference?.endsWith(".pdf")}
    <div class="image-container">
        <img src="{env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX}{artistName}/posts/{keyReference}" alt="image">
    </div>
{/if}

<style>
    img {
        max-width: 500px;
    }

    video {
        max-width: 500px;
    }


</style>
