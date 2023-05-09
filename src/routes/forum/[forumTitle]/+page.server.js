import {error} from '@sveltejs/kit';

export const load = async ({fetch, params, cookies}) => {


    function replaceHyphensWithSpaces(str) {
        return str.replace(/-/g, " ");
    }

    const tagsResponse = await fetch("http://localhost:8080/api/posts/tags", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const tagsJson = await tagsResponse.json()

    const forumTitle = replaceHyphensWithSpaces(params.forumTitle)
    const forumResponse = await fetch(`http://localhost:8080/forum/${params.forumTitle}`);
    const forumData = await forumResponse.json();
    //See lists of posts
    //const jwt = cookies.get("jwt")
    // const response = await fetch(`http://localhost:8080/forum/${forumTitle}`);
    // const jsonData = await response.json();

    if (!forumData.forum[0]) {
        throw error(404, {
            message: "not found"
        })
    }
    return {
        json: forumData,
        forumTitle,
        tagsJson,
    }
}
