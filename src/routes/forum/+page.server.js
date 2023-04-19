import {redirect} from "@sveltejs/kit";
export const load = ({fetch, cookies}) => {
    const cookie = cookies.get("jwt")
    const test = fetch("http://localhost:8080/api/test", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${cookie}`
        }
    })
        .then(res => {
            if (res.status !== 200) {
                throw redirect(302, "/profile")
            }
        })
    const testdata = test


    return {
        testdata
    }
}
