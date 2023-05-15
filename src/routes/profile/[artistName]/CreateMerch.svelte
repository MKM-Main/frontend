<script>
    let title = '';
    let description = '';
    let sizes = [];
    let price = '';

    export let loggedInUser;
    export let jwt;
    export let updateMerchSection;
    let formData = new FormData();


    const handleSubmit = async () => {

        document.getElementById("loading-spinner").style.display = "flex";

        formData.append('title', title);
        formData.append('description', description);
        formData.append('sizes', JSON.stringify(sizes));
        formData.append('price', price);

        await fetch(`http://localhost:8080/api/users/${loggedInUser}/merch`, {
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
        const file = event.target.files[0];
        formData.append('file', file);
    }
</script>

<form on:submit={handleSubmit}>
    <label for="title">Merch Title:</label>
    <input bind:value={title} id="title" required type="text"/>

    <label for="description">Merch Description:</label>
    <textarea bind:value={description} id="description" required></textarea>

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
    <input bind:value={price} id="price" required type="number"/>

    <label for="file">Image:</label>
    <input accept=".pdf, .jpeg, .jpg, .png" id="file" on:change={handleFileInput} type="file">
    <button type="submit">Submit</button>
</form>

<style lang="scss">

  form {
    background-color: #f5f5f5;
    padding: 20px;
    width: 300px;

    label {
      color: #333;
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
      color: #555;
      margin-bottom: 10px;

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
      background-color: #007bff;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }


</style>
