<script>
    let title = '';
    let description = '';
    let sizes = [];
    let price = '';
    let canUpload
    const height = 2048
    const width = 2048
    let currentWidth
    let currentHeight

    export let loggedInUserId;
    export let jwt;
    export let updateMerchSection;
    let formData = new FormData();


    const handleSubmit = async () => {

        document.getElementById("loading-spinner").style.display = "flex";

        formData.append('title', title);
        formData.append('description', description);
        formData.append('sizes', JSON.stringify(sizes));
        formData.append('price', price);

        await fetch(`http://localhost:8080/api/users/${loggedInUserId}/merch`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                document.getElementById("loading-spinner").style.display = "none";
                title = "";
                description = "";
                price = "";
                sizes = [];
                updateMerchSection(data);
            });
    }

    const handleSizeSelection = (event) => {
        const selectedSize = event.target.value;

        if (event.target.checked) {
            sizes.push(selectedSize);
        } else {
            const index = sizes.indexOf(selectedSize);
            if (index > -1) {
                sizes.splice(index, 1);
            }
        }
    }


    const handleFileInput = (event) => {
        const file = event.target.files[0]
        formData.append('profilePicture', file)

        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                currentWidth = img.width
                currentHeight = img.height
                canUpload = img.width <= 420 && img.height <= 420;
            }
            img.src = e.target.result;
        }
        if (!file) canUpload = true
        reader.readAsDataURL(file);
    }
</script>

<form on:submit={handleSubmit}>
    <label for="title">Merch Title:</label>
    <input bind:value={title} id="title" placeholder="Title" required type="text"/>

    <label for="description">Merch Description:</label>
    <textarea bind:value={description} id="description" placeholder="Description" required></textarea>

    <label>Sizes:</label>
    <div>
        <input id="size-xs" on:change={handleSizeSelection} type="checkbox" value="xs"/>
        <label for="size-xs">XS</label>
    </div>
    <div>
        <input id="size-s" on:change={handleSizeSelection} type="checkbox" value="s"/>
        <label for="size-s">S</label>
    </div>
    <div>
        <input id="size-m" on:change={handleSizeSelection} type="checkbox" value="m"/>
        <label for="size-m">M</label>
    </div>
    <div>
        <input id="size-l" on:change={handleSizeSelection} type="checkbox" value="l"/>
        <label for="size-l">L</label>
    </div>
    <div>
        <input id="size-xl" on:change={handleSizeSelection} type="checkbox" value="xl"/>
        <label for="size-xl">XL</label>
    </div>

    <label for="price">Price:</label>
    <input bind:value={price} id="price" placeholder="****" required type="number"/>

    <label for="file" style="{canUpload === false ? 'color: red' : ''}">Image
        : {canUpload === false ? `Must not exceed ${height}px * ${width}px | Current size: ${currentHeight} * ${currentWidth} ` : ""}</label>
    <input accept=".pdf, .jpeg, .jpg, .png" id="file" on:change={handleFileInput} type="file">
    <button class:btn-block-submit={canUpload === false} type="submit">Submit</button>
</form>

<style lang="scss">

  form {
    background-color: #0D1B2A;
    padding: 20px;
    width: 35em;

    label {
      color: #E0E1DD;
      display: block;
      margin-bottom: 10px;
    }

    input[type="text"],
    textarea,
    input[type="number"],
    input[type="file"] {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      color: #E0E1DD;
      margin-bottom: 10px;

      &::placeholder {
        color: #E0E1DD;
        opacity: 0.5;
      }

      &:focus {
        border-color: #aaa;
      }
    }

    textarea {
      resize: none;
    }

    div {
      display: flex;
      align-items: center;

      input[type="checkbox"] {
        margin-right: 5px;
      }
    }

    button[type="submit"] {
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
      background-color: black;
    }


  }


</style>
