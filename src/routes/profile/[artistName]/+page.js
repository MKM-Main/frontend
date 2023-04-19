export const load = async ({fetch, params}) => {
    const artistName = params.artistName

    const response = await fetch(`http://localhost:8080/api/users/${artistName}`)
    const jsonData = await response.json()

    return {
        json: jsonData
    }
}
