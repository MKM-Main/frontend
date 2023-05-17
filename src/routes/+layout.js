import Header from "../lib/components/Header.svelte";
import Footer from "../lib/components/Footer.svelte";
//KAN IKKE HENTE COOKIES HER
export const load = async ({data}) => {

    const hypedPost = await fetch("http://localhost:8080/api/posts/hyped", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    const hypedPostData = await hypedPost.json()
    return {
        Header: Header,
        Footer: Footer,
        ...data,
        hypedPostData
    }
}
