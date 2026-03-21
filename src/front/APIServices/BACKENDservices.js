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
  const profile = await getProfile();
  const rol = localStorage.getItem("rol");

  navigate(
    rol === "Administrativo"
      ? "/admission"
      : rol === "Enfermero"
        ? "/control-panel/triage"
        : rol === "Médico"
          ? "/control-panel/consultation"
          : rol === "admin"
            ? "/register-user"
            : "/",
  );
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
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();

  if (response.ok) {
    dispatch({ type: "get_users", payload: data });
    return;
  } else {
    dispatch({ type: "get_users", payload: [] });
    return data;
  }
};

// region:getIncomes
export const getIncomes = async (dispatch) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/incomes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();

  if (response.ok) {
    dispatch({ type: "get_incomes", payload: data });
    return;
  } else {
    dispatch({ type: "get_incomes", payload: [] });
    return data;
  }
};

export const getIncome = async (dispatch, id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/income/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();

  if (response.ok) {
    dispatch({ type: "get_income", payload: data });
    return data;
  } else {
    dispatch({ type: "get_income", payload: [] });
    return data;
  }
};
export const getOrder = async (dispatch, id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/order/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();

  if (response.ok) {
    dispatch({ type: "get_order", payload: data });
    return data;
  } else {
    dispatch({ type: "get_order", payload: [] });
    return data;
  }
};

export const getIncomeAlta = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/income-alta/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  return data;
};

export const updateIncome = async (id, incomeForm, triageTime, navigate) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/incomes-triage/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ ...incomeForm, checkpoint_triage: triageTime }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return data;
  } else {
    navigate("/triage");
    return data;
  }
};
// region:getPatients
export const getPatients = async (dispatch) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/patients`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
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
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/patient/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();

  if (response.ok) {
    dispatch({ type: "get_patient", payload: data });
    return data;
  } else {
    dispatch({ type: "get_patient", payload: null });
    return data;
  }
};

// region: registerUser
export const registerUser = async (user) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/register/user`,
    {
      method: "POST",
      body: JSON.stringify(user),
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

// region:createAdmission
export const createAdmission = async (admission, navigate) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/admission`,
    {
      method: "POST",
      body: JSON.stringify(admission),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!response.ok) {
    return { Error: "La admisión no ha podido crearse correctamente" };
  }
  navigate("/admission");
  return { ok: true };
};

// region:deleteUser
export const deleteUser = async (user_id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/delete/${user_id}`,
    {
      method: "DELETE",
      headers: {
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

export const loadNewOrder = async (orderIds) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/reorder-incomes`,
    {
      method: "PATCH",
      body: JSON.stringify({ ordered_ids: orderIds }),
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

// region: Diagnosis

export const addDiagnosis = async (consult, income_id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/incomes-consult/${income_id}`,
    {
      method: "PUT",
      body: JSON.stringify(consult),
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

// region: postOrders
export const postOrders = async (id, orders) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
    {
      method: "POST",
      body: JSON.stringify({
        id: id,
        orders: orders,
      }),
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

// region: getIncomeTest
export const getIncomeTest = async (dispatch) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/order-panel`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();

  if (response.ok) {
    dispatch({ type: "get_incomes_test", payload: data });
    return;
  } else {
    dispatch({ type: "get_incomes_test", payload: [] });
    return data;
  }
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return false;
  }
  console.log(data);

  localStorage.setItem("email", data.email);
  localStorage.setItem("firstname", data.firstname);
  localStorage.setItem("lastname", data.lastname);
  localStorage.setItem("rol", data.rol);
};
export const changeStatus = async (id, status) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/orders/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status: status }),
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
