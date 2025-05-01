export const otherRequest = async (data) => {
  const response = await fetch("https://apikazakovm.ru/api/addOther", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ otherRequest: data }),
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const notifyManagers = async (application) => {
  const response = await fetch(
    "https://apikazakovm.ru/api/notify/notify-other",
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
