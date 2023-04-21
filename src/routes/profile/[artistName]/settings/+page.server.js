export const load = async ({params, cookies, fetch}) => {
    const artistName = params.artistName
    const jwt = cookies.get("jwt")

    const response = await fetch(`http://localhost:8080/api/users/${artistName}`);
    const jsonData = await response.json();

    return {
        json: jsonData,
        jwt
    }

}
