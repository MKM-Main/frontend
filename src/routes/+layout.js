import Header from "../lib/components/Header.svelte";
import Footer from "../lib/components/Footer.svelte";

export const load = async ({data, cookies}) => {

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
