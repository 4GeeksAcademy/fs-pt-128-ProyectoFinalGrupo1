export async function postPreTriaje(visitreason) {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/pre-triage`,
    {
      method: "POST",
      body: JSON.stringify({ visitreason: visitreason }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();
  if (!response.ok) {
    return data.error;
  }
  return data;
}
