<script>
    import {env} from "$env/dynamic/public";
    export let keyReference
    export let artistId
    export let className

</script>

{#if
    keyReference?.endsWith(".mp3") ||
    keyReference?.endsWith(".m4a") ||
    keyReference?.endsWith(".x-m4a") ||
    keyReference?.endsWith(".mpeg")}
    <audio controls="controls">
        <source src="{env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX}{artistId}/posts/{keyReference}" type="audio/mp3">
    </audio>
{/if}

{#if keyReference?.endsWith(".mp4")}
    <div class="video-container">
        <video class="{className}" controls="controls">
            <source src="{env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX}{artistId}/posts/{keyReference}" type="video/mp4">
        </video>
    </div>

{/if}

{#if
    keyReference?.endsWith(".jpeg") ||
    keyReference?.endsWith(".jpg") ||
    keyReference?.endsWith(".png") ||
    keyReference?.endsWith(".pdf")}
    <div class="image-container">
        <img class="{className}" src="{env.PUBLIC_AWS_S3_IMAGE_SOURCE_PREFIX}{artistId}/posts/{keyReference}"
             alt="image">
    </div>
{/if}

<style>
    .frontpage-media-top5 {
        max-width: 200px;
    }

    img {
        max-width: 500px;
    }

    video {
        max-width: 500px;
    }

</style>
