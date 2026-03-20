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
    income: {},
    order: {},
    orders: [],
    test: [],
    search: "",
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
      const data = Array.isArray(action.payload) ? action.payload : [];
      return {
        ...store,
        incomes: data.filter((i) => {
          if (i.state === "Alta")
            return (new Date() - new Date(i.created_at)) / 60000 < 720;
          return true;
        }),
      };

    case "get_income":
      return {
        ...store,
        income: action.payload,
      };

    case "update_incomes_order":
      return {
        ...store,
        incomes: action.payload,
      };
    case "clear_income":
      return {
        ...store,
        income: {},
      };
    case "add_order":
      return {
        ...store,
        orders: [...store.orders, action.payload],
      };
    case "get_order":
      return {
        ...store,
        order: action.payload,
      };
    case "remove_order":
      return {
        ...store,
        orders: store.orders.filter((order) => order !== action.payload),
      };
    case "clear_orders":
      return {
        ...store,
        orders: [],
      };
    case "get_incomes_test":
      return {
        ...store,
        test: action.payload,
      };
    case "search":
      return {
        ...store,
        search: action.payload,
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
