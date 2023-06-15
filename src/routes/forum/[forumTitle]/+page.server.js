import { error } from "@sveltejs/kit";
import { PUBLIC_BASE_URL } from "$env/static/public";

export const load = async ({ fetch, params, cookies }) => {

  //Replace "-" with spaces. Used for URL handling
  function replaceHyphensWithSpaces(str) {
    return str.replace(/-/g, " ");
  }

  const tagsResponse = await fetch(`${PUBLIC_BASE_URL}api/posts/tags`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const tagsJson = await tagsResponse.json();

  const forumResponse = await fetch(
    `${PUBLIC_BASE_URL}api/forum/${params.forumTitle}`
  );
  const forumData = await forumResponse.json();
  const forumTitle = replaceHyphensWithSpaces(params.forumTitle);

  if (forumResponse.status === 404) {
    throw error(404, {
      message: "not found",
    });
  }
  return {
    json: forumData,
    forumTitle,
    tagsJson,
  };
};
