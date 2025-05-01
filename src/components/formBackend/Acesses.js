import axios from "axios";

export const accessRequest = async (data) => {
  try {
    const response = await axios.post(
      "http://87.228.82.85:3000/api/addAccess",
      {
        accessRequest: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );

    return response.data;
  } catch (error) {
    const errorText = error.response?.data || error.message;
    alert(`API Error: ${errorText}`);
    throw new Error(errorText);
  }
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
