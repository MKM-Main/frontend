import {PUBLIC_BASE_URL} from "$env/static/public";
export const load = async ({fetch, cookies}) => {

    const postResponse = await fetch(`${PUBLIC_BASE_URL}api/posts`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    const postData = await postResponse.json()

    const usersDataResponse = await fetch(`${PUBLIC_BASE_URL}api/users`, {
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
