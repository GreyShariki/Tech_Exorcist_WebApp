import https from "https";
import fetch from "node-fetch";
const agent = new https.Agent({
  rejectUnauthorized: false,
});
export const networkRequest = async (data) => {
  const response = await fetch("https://87.228.82.41:3000/api/addNetwork", {
    agent,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ networkRequest: data }),
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const notifyNetworkMasters = async (application) => {
  const response = await fetch(
    "https://87.228.82.41:3000/api/notify/notify-network",
    {
      agent,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ application }),
    }
  );
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};
