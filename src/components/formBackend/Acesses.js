import axios from "axios";

export const accessRequest = async (data) => {
  const response = axios.get("http://87.228.82.85:3000/api/addAccess", {
    method: "POST",
    credentials: "omit",
    referrerPolicy: "strict-origin-when-cross-origin",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({ accessRequest: data }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    alert(`API Error:${errorText}`);
    throw new Error(errorText);
  }

  return await response.json();
};

export const notifyAdmins = async (application) => {
  const response = await fetch(
    "http://87.228.82.85:3000/api/notify/notify-access",
    {
      method: "POST",
      credentials: "omit",
      referrerPolicy: "strict-origin-when-cross-origin",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ application }),
    }
  );
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};
