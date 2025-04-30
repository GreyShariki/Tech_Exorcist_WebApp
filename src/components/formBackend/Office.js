export const officeRequest = async (data) => {
  const response = await fetch("https://87.228.82.41:3000/api/addOffice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ officeRequest: data }),
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const notifyOfficeManagers = async (application) => {
  const response = await fetch(
    "https://87.228.82.41:3000/api/notify/notify-office",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ application }),
    }
  );
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};
