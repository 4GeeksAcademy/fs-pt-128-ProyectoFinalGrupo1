// region:login
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

// region: activateCount
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
  return { ok: true };
};

// region:getUser
export const getUser = async (dispatch) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`);
  const data = await response.json();

  if (response.ok) {
    dispatch({ type: "get_users", payload: data });
  } else {
    dispatch({ type: "get_users", payload: [] });
    return data;
  }
};

// region:getPatients
export const getPatients = async (dispatch) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/patients`);
  const data = await response.json();

   if (response.ok) {
    dispatch({ type: "get_patients", payload: data });
  } else {
    dispatch({ type: "get_patients", payload: [] });
    return data;
  }
};

// region:getPatient
export const getPatient = async (dispatch, id) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/patient/${id}`);
  const data = await response.json();

   if (response.ok) {
    dispatch({ type: "get_patient", payload: data });
  } else {
    dispatch({ type: "get_patient", payload: null });
    return data;
  }
};

// region: registerUser
export const registerUser = async (user) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/register/user`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return data;
  }
  return { ok: true };
};

// region:createAdmission
export const createAdmission = async (admission, navigate) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/admission`,
    {
      method: "POST",
      body: JSON.stringify(admission),
      headers:{
        "Content-Type": "application/json",
      }
    }
  )
  if(!response.ok){
    return {"Error": "La admisión no ha podido crearse correctamente"};
  }
  navigate("/admission")
  return {ok: true};

}

// region:deleteUser
export const deleteUser = async (user_id) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/delete/${user_id}`,
    {
      method: "DELETE",
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return data;
  }
  return { ok: true };
};

// region:signUp
export const signup = async (user) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/register`,
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return data;
  }
  return { ok: true };
};
