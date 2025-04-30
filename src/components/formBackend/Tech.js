import https from "https";
import fetch from "node-fetch";
const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const techRequest = async (data) => {
  const response = await fetch("https://87.228.82.41:3000/api/addtech", {
    agent,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ techRequest: data }),
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const notifyMasters = async (application) => {
  const response = await fetch(
    "https://87.228.82.41:3000/api/notify/notify-tech",
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
