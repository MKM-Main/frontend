export const load = async ({fetch, cookies}) => {

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


    return {
        postData,
        usersData
    }
}