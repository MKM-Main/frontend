export const load = async ({fetch, params, cookies}) => {
    const jwt = cookies.get("jwt")
    
    function replaceHyphensWithSpaces(str) {
        return str.replace(/-/g, " ");
      } 

      const postTitle = replaceHyphensWithSpaces(params.postTitle)
      const postResponse = await fetch(`http://localhost:8080/api/forum/post/${postTitle}`);
    
    const postData = await postResponse.json()
    return {
        json: postData,
        cookie: jwt
    }
}