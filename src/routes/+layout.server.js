export const load = async ({fetch, cookies}) => {
    const jwt = cookies.get("jwt")
    const userDataResponse = await fetch("http://localhost:8080/profile", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })
    const userData = await userDataResponse.json()
    if (!jwt) return

    const postResponse = await fetch("http://localhost:8080/api/posts", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    const postData = await postResponse.json()

    const usersDataResponse = await fetch("http://localhost:8080/api/users", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    const usersData = await usersDataResponse.json()

    const responseConversation = await fetch("http://localhost:8080/api/conversations", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })
    if(userDataResponse.status === 401) return
    const conversationData = await responseConversation.json()
    

    return {
        jwt,
        userData,
        conversationData,
        postData,
        usersData
    }
}