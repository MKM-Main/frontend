<script>
    import {createEventDispatcher} from "svelte"
    const dispatch = createEventDispatcher()
    const close = () => dispatch("close")
    const handleKeyClose = (e) => {
        if (e.key === "q") {
            close()
        }
    }
</script>


<svelte:window on:keydown={handleKeyClose}/>
<div class="modal-container">
    <div class="modal">
        <div class="modal-header">
            <button on:click={close}>Close</button>
        </div>
        <div class="modal-body">
            <slot></slot>
        </div>

    </div>
</div>

<style lang="scss">
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }

  .modal {
    background-color: white;
    border-radius: 20px;
    width: 80%;
    max-width: 600px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .modal-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 20px;
  }

  .modal-header h2 {
    margin: 0;
  }

  .modal-header button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  }

  .modal-body {
    padding: 0 10px;
  }
</style>
