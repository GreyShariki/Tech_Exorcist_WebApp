export const techRequest = async (data) => {
  const response = await fetch("http://87.228.82.85:3000/api/addtech", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ techRequest: data }),
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const notifyMasters = async (application) => {
  const response = await fetch(
    "http://87.228.82.85:3000/api/notify/notify-tech",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ application }),
    }
  );
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};
