const initialState = {
  invoices: [],
  selectedCustomers: [],
  customers: [],
  loadingInvoices: false,
  errorInvoices: null,
  loadingCustomers: false,
  errorCustomers: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_INVOICES_REQUEST":
      return { ...state, loadingInvoices: true, errorInvoices: null };
    case "FETCH_INVOICES_SUCCESS":
      return { ...state, invoices: action.payload, loadingInvoices: false };
    case "FETCH_INVOICES_ERROR":
      return {
        ...state,
        loadingInvoices: false,
        errorInvoices: action.payload,
      };
    case "FETCH_CUSTOMERS_REQUEST":
      return { ...state, loadingCustomers: true, errorCustomers: null };
    case "FETCH_CUSTOMERS_SUCCESS":
      return { ...state, customers: action.payload, loadingCustomers: false };
    case "FETCH_CUSTOMERS_ERROR":
      return {
        ...state,
        loadingCustomers: false,
        errorCustomers: action.payload,
      };
    case "SELECT_CUSTOMER":
      return { ...state, selectedCustomers: action.payload };
    default:
      return state;
  }
};

export default reducer;
