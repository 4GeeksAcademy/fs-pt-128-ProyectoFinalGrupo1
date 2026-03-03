export const login = async (user, navigate) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/login`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    },
  );

  const data = await response.json();
  if (!response.ok) {
    return data;
  }
  localStorage.setItem("token", data.token);
  navigate("/");
  console.log(data);
  return data;
};

export const activateCount = async (password, token) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/activate`,
    {
      method: "PATCH",
      body: JSON.stringify({ password: password }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return data;
  }
  return { success: true };
};
