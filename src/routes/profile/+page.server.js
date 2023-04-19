import {redirect} from "@sveltejs/kit";
export const load = async ({cookies, fetch}) => {

    let responseData

    const cookie = cookies.get("jwt")
    const response = await fetch("http://localhost:8080/profile", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${cookie}`
        }
    })
        .then(res => res.json())
        .then(data => {
            responseData = data.customMessage
            throw redirect(302, `/profile/${responseData.artistName}`)
        })

    return {
        responseData
    }

}
