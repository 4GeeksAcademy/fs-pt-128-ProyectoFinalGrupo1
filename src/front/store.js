export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
    users: [],
    patients: [],
    patient: {},
    incomes: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "get_users":
      return {
        ...store,
        users: action.payload,
      };

    case "get_patients":
      return {
        ...store,
        patients: action.payload,
      };

    case "get_patient":
      return {
        ...store,
        patient: action.payload,
      };

    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };
    case "get_incomes":
      return {
        ...store,
        incomes: action.payload,
      };

    case "update_incomes_order":
      return {
        ...store,
        incomes: action.payload,
      };
    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo,
        ),
      };

    default:
      throw Error("Unknown action.");
  }
}
