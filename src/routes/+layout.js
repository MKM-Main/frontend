import Header from "../lib/components/Header.svelte";
import Footer from "../lib/components/Footer.svelte";

export const load = ({data, cookies}) => {

    return {
        Header: Header,
        Footer: Footer,
        ...data
    }
}
