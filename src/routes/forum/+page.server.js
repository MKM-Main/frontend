import { PUBLIC_BASE_URL } from "$env/static/public";
export const load = async ({ fetch, cookies }) => {
  const response = await fetch(`${PUBLIC_BASE_URL}api/forum`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const forumData = await response.json();

  return {
    forumData,
  };
};
