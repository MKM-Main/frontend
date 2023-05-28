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

    const forumResponse = await fetch(`http://localhost:8080/api/forum/${params.forumTitle}`);
    const forumData = await forumResponse.json();
    const forumTitle = replaceHyphensWithSpaces(params.forumTitle)

    const allForumResponse = await fetch(`http://localhost:8080/api/forum/`);
    const allForumData = await allForumResponse.json();

    if (forumResponse.status === 404) {
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
