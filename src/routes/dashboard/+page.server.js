import {redirect} from "@sveltejs/kit";
let userRole;
export const load = async ({fetch, params, cookies}) => {
    const jwt = cookies.get("jwt")
    const adminResponse = await fetch("http://localhost:8080/api/admin", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${jwt}`
        }}).then(res => res.json()).then(data => {
            console.log(data)
            userRole = data.userRole
        });

    if (userRole !== "admin") throw redirect(302, "/")
    const userResponse = await fetch("http://localhost:8080/api/users")
    const users = await userResponse.json()
    

    const forumResponse = await fetch("http://localhost:8080/forum")
    const forums = await forumResponse.json()

    return {
        users,
        forums
    }

}