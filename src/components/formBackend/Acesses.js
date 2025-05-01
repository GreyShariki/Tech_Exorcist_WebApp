export const accessRequest = async (data) => {
  const response = await fetch("http://87.228.82.85:3000/api/addAccess", {
    method: "POST",
    credentials: "omit",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
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
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ application }),
    }
  );
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};
