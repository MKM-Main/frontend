<script>
    import UserUploadedFile from "../files/UserUploadedFile.svelte";
    export let post


</script>

{#if post}
    <div class="widget">
        <div class="header">
            <h3>{post?.artistName}</h3>
            <p>{post?.timeStamp}</p>
            <div>
                <i class="fa-solid fa-fire fa-xl"></i>
                <span>{post?.rating.length}</span>
            </div>
        </div>
        <div class="body">
            <div class="body-content">
                <p>{post?.body}</p>
            </div>
            <div>
                <UserUploadedFile keyReference="{post?.keyReference}"/>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
  .widget {
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .fa-fire,
    span {
      color: firebrick;
    }
  }

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
  }

  p {
    margin: 0;
  }

  .body {

  }
</style>
