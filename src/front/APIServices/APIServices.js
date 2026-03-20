// region:Cloudinary
export const uploadFile = async (id, formData) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/order/${id}/result`,
    {
      method: "POST",
      body: formData,
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return data;
  }
  return { ok: true };
};

export const reloadFile = async (id, formData) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/order/${id}/result`,
    {
      method: "PATCH",
      body: formData,
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return data;
  }
  return { ok: true };
};

export const getFile = async () =>{
  
}