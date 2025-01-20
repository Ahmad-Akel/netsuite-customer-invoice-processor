const initialState = {
  customers: [],
  selectedCustomers: [],
  invoices: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CUSTOMERS":
      return { ...state, customers: action.payload };
    case "SET_SELECTED_CUSTOMERS":
      return { ...state, selectedCustomers: action.payload };
    case "SET_INVOICES":
      return { ...state, invoices: action.payload };
    case "FETCH_CUSTOMERS_SUCCESS":
      return { ...state, customers: action.payload };
    case "FETCH_INVOICES_SUCCESS":
      return { ...state, invoices: action.payload };
    case "SELECT_CUSTOMER":
      return { ...state, selectedCustomers: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
