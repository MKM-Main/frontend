<script>

</script>

<div id="loading-spinner" style="display: none;">
    <div class="spinner"></div>
    <div>Uploading post!</div>
</div>


<style lang="scss">
  #loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 40%;
    left: 45%;
    z-index: 9999;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #ccc;
    border-top-color: #333;
    border-radius: 50%;
    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>
