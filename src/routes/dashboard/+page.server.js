import { redirect } from "@sveltejs/kit";
import { PUBLIC_BASE_URL } from "$env/static/public";

let userRole;


export const load = async ({ fetch, cookies }) => {
  const jwt = cookies.get("jwt");
  
  //Checkning for admin role 
  const adminResponse = await fetch(`${PUBLIC_BASE_URL}api/admin`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      userRole = data.userRole;
    });

  //Restricted so only admins can access 
  if (userRole !== "admin") throw redirect(302, "/");
  const userResponse = await fetch(`${PUBLIC_BASE_URL}api/users`);
  const users = await userResponse.json();

  const forumResponse = await fetch(`${PUBLIC_BASE_URL}api/forum`);
  const forums = await forumResponse.json();

  const postsResponse = await fetch(`${PUBLIC_BASE_URL}api/posts`);
  const posts = await postsResponse.json();

  return {
    users,
    forums,
    posts,
  };
};
