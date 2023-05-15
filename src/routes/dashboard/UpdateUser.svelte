<script>
    export let artistName;
    // export let refreshUser;
    export let userBody;
    export let currentRole;
    export let jwt;
    export const updateUser = async () => {
        Object.keys(userBody).forEach(key => userBody[key] = userBody[key].trim());
        Object.keys(userBody).forEach(key => userBody[key] === "" ? delete userBody[key] : {});
        if(userBody.role === currentRole){
            delete userBody.role
        }
        if(Object.keys(userBody).length !== 0){ 
        await fetch(`http://localhost:8080/api/admin/users/${artistName}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify({userBody})
    }).then((res) => { 

    });
    }}
</script>

<button type="submit" on:click={() => updateUser()}>Update button</button>