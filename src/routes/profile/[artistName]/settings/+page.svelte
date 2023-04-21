<script>
    import Settings from "./Settings.svelte";
    export let data
    const jwt = data.jwt
    const userFields = data.json.user
    let fields = Object.keys(userFields)

    const filteredField = fields.map(field => {
        if (field === "_id" || field === "creationDate" || field === "password" || field === "followers" || field === "following") {
            return null
        } else {
            return field
        }
    }).filter(field => field !== null)

</script>

<Settings jwt={jwt} userFields={filteredField}/>



