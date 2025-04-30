const https = require("https");
const fetch = require("node-fetch");
const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const otherRequest = async (data) => {
  const response = await fetch("https://87.228.82.41:3000/api/addOther", {
    agent,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ otherRequest: data }),
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const notifyManagers = async (application) => {
  const response = await fetch(
    "https://87.228.82.41:3000/api/notify/notify-other",
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
