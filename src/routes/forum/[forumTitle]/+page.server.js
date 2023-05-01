export const load = async ({fetch, params, cookies}) => {


    function replaceHyphensWithSpaces(str) {
        return str.replace(/-/g, " ");
    }

    const forumTitle = replaceHyphensWithSpaces(params.forumTitle)
    const forumResponse = await fetch(`http://localhost:8080/forum/${params.forumTitle}`);
    const forumData = await forumResponse.json();
    //See lists of posts
    //const jwt = cookies.get("jwt")
    // const response = await fetch(`http://localhost:8080/forum/${forumTitle}`);
    // const jsonData = await response.json();


    return {
        json: forumData
    }
}