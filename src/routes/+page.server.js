export const load = async ({fetch, cookies}) => {

    const postResponse = await fetch("https://tunetower.onrender.com/api/posts", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    const postData = await postResponse.json()

    const usersDataResponse = await fetch("https://tunetower.onrender.com/api/users", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    const usersData = await usersDataResponse.json()


    return {
        postData,
        usersData
    }
}
