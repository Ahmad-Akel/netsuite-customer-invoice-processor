export const fetchCustomers = () => {
  return (dispatch) => {
    // Simulate API call
    const customersList = [
      { id: "1", name: "Customer A", country: "US" },
      { id: "2", name: "Customer B", country: "UK" },
      { id: "3", name: "Customer C", country: "Canada" },
    ];
    dispatch({ type: "FETCH_CUSTOMERS_SUCCESS", payload: customersList });
  };
};

export const fetchInvoices = (selectedCustomers, customers) => {
  return (dispatch) => {
    // Simulate API call
    const selectedCustomerDetails = customers.filter((customer) =>
      selectedCustomers.includes(customer.id)
    );

    const fetchedInvoices = selectedCustomerDetails.flatMap((customer) => [
      {
        id: `${customer.id}01`,
        amount: 500,
        status: "Paid",
        customer: customer.name,
        country: customer.country,
      },
      {
        id: `${customer.id}02`,
        amount: 1200,
        status: "Open",
        customer: customer.name,
        country: customer.country,
      },
    ]);

    dispatch({ type: "FETCH_INVOICES_SUCCESS", payload: fetchedInvoices });
  };
};
