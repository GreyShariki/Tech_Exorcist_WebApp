export const accessRequest = async (data) => {
  const response = await fetch(
    "https://cors-anywhere.herokuapp.com/https://87.228.82.41:3000/api/addAccess",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ accessRequest: data }),
    }
  );
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const notifyAdmins = async (application) => {
  const response = await fetch(
    "https://cors-anywhere.herokuapp.com/https://87.228.82.41:3000/api/notify/notify-access",
    {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ application }),
    }
  );
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};
