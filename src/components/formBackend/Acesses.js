import https from "https";
import fetch from "node-fetch";
const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const accessRequest = async (data) => {
  const response = await fetch("https://87.228.82.41:3000/api/addAccess", {
    agent,
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ accessRequest: data }),
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const notifyAdmins = async (application) => {
  const response = await fetch(
    "https://87.228.82.41:3000/api/notify/notify-access",
    {
      agent,
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ application }),
    }
  );
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};
