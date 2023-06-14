import { PUBLIC_BASE_URL } from "$env/static/public";

export const load = async ({ fetch, cookies }) => {
  const jwt = cookies.get("jwt");
  const userDataResponse = await fetch(`${PUBLIC_BASE_URL}profile`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const userData = await userDataResponse.json();
  //if (!jwt) return

  const responseConversation = await fetch(
    `${PUBLIC_BASE_URL}api/conversations`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  //if(userDataResponse.status === 401) return
  const conversationData = await responseConversation.json();

  return {
    jwt,
    userData,
    conversationData,
  };
};
