export const networkRequest = async (data) => {
  const response = await fetch("https://apikazakovm.ru/api/addNetwork", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ networkRequest: data }),
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const notifyNetworkMasters = async (application) => {
  const response = await fetch(
    "https://apikazakovm.ru/api/notify/notify-network",
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
