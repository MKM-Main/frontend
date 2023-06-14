import { PUBLIC_BASE_URL } from "$env/static/public";
export const load = async ({ fetch, params }) => {
  const artistResponse = await fetch(`${PUBLIC_BASE_URL}api/users`);
  const artists = await artistResponse.json();

  return {
    artists,
  };
};
