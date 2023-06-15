import { PUBLIC_BASE_URL } from "$env/static/public";
export const load = async ({ fetch, params, cookies }) => {
  const conversationId = params.conversationId;
  const jwt = cookies.get("jwt");

  //Fetches all the conversations for the logged in user
  const conversations = await fetch(`${PUBLIC_BASE_URL}api/conversations`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });
  const conversationsJson = await conversations.json();

  let jsonData = [];
  //This if statement makes the /inbox available with no data, otherwise it would try to fetch data and crash
  if (conversationId !== "inbox") {
    //Fetches conversations with id from the params
    const conversationMessages = await fetch(
      `${PUBLIC_BASE_URL}api/conversations/${conversationId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    jsonData = await conversationMessages.json();
  }

  return {
    cookie: jwt,
    conversations: conversationsJson,
    conversationMessages: jsonData,
    params: conversationId,
  };
};
