import {PUBLIC_BASE_URL} from "$env/static/public";
export const load = async ({fetch, params, cookies}) => {
    const conversationId = params.artistName
    const jwt = cookies.get("jwt");

    const conversations = await fetch(`${PUBLIC_BASE_URL}api/conversations`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })
    const conversationsJson = await conversations.json();

    let jsonData = []
    if (conversationId !== "inbox") {
        const conversationMessages = await fetch(`${PUBLIC_BASE_URL}api/conversations/${conversationId}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${jwt}`
            }
        })
        jsonData = await conversationMessages.json();
    }
    return {
        cookie: jwt,
        conversations: conversationsJson,
        conversationMessages: jsonData,
        params: conversationId
    }
}
