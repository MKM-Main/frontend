import {error} from "@sveltejs/kit";
import {PUBLIC_BASE_URL} from "$env/static/public";
export const load = async ({fetch, params, cookies}) => {
    const artistName = params.artistName
    const jwt = cookies.get("jwt")
    const response = await fetch(`${PUBLIC_BASE_URL}api/users/${artistName}`);
    const jsonData = await response.json();

    const wallpostResponse = await fetch(`${PUBLIC_BASE_URL}api/posts/wallposts/${artistName}`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })
    const tagsResponse = await fetch(`${PUBLIC_BASE_URL}api/posts/tags`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const tagsJson = await tagsResponse.json()

    const wallPostJson = await wallpostResponse.json()

    if (!jsonData.user) {
        throw error(404, {
            message: "not found"
        })
    }

    return {
        cookie: jwt,
        json: jsonData,
        wallposts: wallPostJson,
        tagsJson,
    }
}
