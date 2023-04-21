import {redirect} from "@sveltejs/kit";
export const load = async ({fetch, cookies}) => {
    const jwt = cookies.get("jwt")
    const allPostsResponse = await fetch("http://localhost:8080/api/posts", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })

    if (!jwt) throw redirect(302, "/")

    const allPosts = await allPostsResponse.json()


    return {
        allPosts
    }

}