export const load = async ({fetch, cookies}) => {
    

    const response = await fetch("http://localhost:8080/api/forum", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })


    const forumData = await response.json()
    
    return {
        forumData
    }
}
