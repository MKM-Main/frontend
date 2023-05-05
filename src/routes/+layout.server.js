export const load = async ({fetch, cookies}) => {
    const jwt = cookies.get("jwt")
    const userDataResponse = await fetch("http://localhost:8080/profile", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    })
    if (!jwt) return


    const userData = await userDataResponse.json()

    return {
        jwt,
        userData,
    }
}
