import {error, json} from "@sveltejs/kit";
export const load = async ({fetch, params, cookies}) => {
    const conversationId = params.artistName
    const jwt = cookies.get("jwt");

    const conversations = await fetch(`http://localhost:8080/api/conversations`,{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })
    const conversationsJson = await conversations.json();

        let jsonData = []
    if(conversationId !== "inbox"){
        const conversationMessages = await fetch(`http://localhost:8080/api/conversations/${conversationId}`,{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        }})
            jsonData = await conversationMessages.json();
    }
    
    
    // if (!jsonData) {
    //     throw error(404, {
    //         message: "not found"
    //     })
    // }
    
    

    return {
        cookie: jwt,
        conversations: conversationsJson,
        conversationMessages: jsonData,
        params: conversationId
    }
}