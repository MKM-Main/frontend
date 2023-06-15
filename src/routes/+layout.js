import Header from "../lib/components/Header.svelte";
import Footer from "../lib/components/Footer.svelte";

export const load = async ({ data }) => {
  return {
    Header: Header,
    Footer: Footer,
    ...data,
  };
};
