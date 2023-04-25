export const load = async ({fetch, params, cookies}) => {
    const artistName = params.artistName
    const jwt = cookies.get("jwt")

    const response = await fetch(`http://localhost:8080/api/users/${artistName}`);
    const jsonData = await response.json();

    const wallpostResponse = await fetch(`http://localhost:8080/api/posts/wallposts/${artistName}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })
    const wallPostJson = await wallpostResponse.json()

    return {
        cookie: jwt,
        json: jsonData,
        wallposts: wallPostJson
    }
}
