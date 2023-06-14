import { redirect } from "@sveltejs/kit";
import { PUBLIC_BASE_URL } from "$env/static/public";
export const load = async ({ fetch, cookies }) => {
  const jwt = cookies.get("jwt");
  const allPostsResponse = await fetch(`${PUBLIC_BASE_URL}api/posts/news`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!jwt || allPostsResponse.status === 401) throw redirect(302, "/");

  const allPosts = await allPostsResponse.json();

  return {
    allPosts,
  };
};
