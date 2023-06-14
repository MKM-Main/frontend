import Header from "../lib/components/Header.svelte";
import Footer from "../lib/components/Footer.svelte";
//KAN IKKE HENTE COOKIES HER
export const load = async ({ data }) => {
  return {
    Header: Header,
    Footer: Footer,
    ...data,
  };
};
