import { useAsyncValue } from "react-router-dom";

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
  navigate("/admission");
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
    return;
  } else {
    dispatch({ type: "get_users", payload: [] });
    return data;
  }
};

// region:getIncomes
export const getIncomes = async (dispatch) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/incomes`,
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
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/income/${id}`,
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

export const updateIncome = async (id, incomeForm, navigate) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/incomes-triage/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(incomeForm),
      headers: {
        "Content-type": "application/json",
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
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/patients`,
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
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/patient/${id}`,
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
      headers: {
        "Content-Type": "application/json",
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

export const loadNewOrder = async (orderIds) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/reorder-incomes`,
    {
      method: "PATCH",
      body: JSON.stringify({ ordered_ids: orderIds }),
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

// region: Diagnosis

export const addDiagnosis = async (consult, income_id) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/incomes-consult/${income_id}`,
    {
      method: "PUT",
      body: JSON.stringify(consult),
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

export const postOrders = async (id, orders) => {
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
      },
    },
  );
  const data = await response.json();
  if (!response.ok) {
    return data;
  }
  return { ok: true };
};

export const getIncomeTest = async (dispatch) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/order-panel`,
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
