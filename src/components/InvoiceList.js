import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchInvoices } from "../redux/actions";

const InvoiceList = ({ invoices, fetchInvoices, selectedCustomers }) => {
  const submitInvoices = () => {
    invoices.forEach((invoice) => {
      console.log(`Submitting invoice ${invoice.id} to API...`);
      // Simulate API call
    });
    alert("Invoices submitted!");
  };

  const handleFetchInvoices = () => {
    fetchInvoices(selectedCustomers);
  };

  return (
    <div>
      <h2>Invoice List</h2>
      <button onClick={handleFetchInvoices}>Fetch Invoices</button>
      {invoices.length === 0 ? (
        <p>No invoices to display</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Customer Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.status}</td>
                <td>{invoice.customer}</td>
                <td>{invoice.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={submitInvoices}>Submit Invoices</button>
    </div>
  );
};

InvoiceList.propTypes = {
  invoices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      customer: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    })
  ).isRequired,
  fetchInvoices: PropTypes.func.isRequired,
  customers: PropTypes.array.isRequired,
  selectedCustomers: PropTypes.arrayOf(PropTypes.string).isRequired, // Added propTypes validation
};

const mapStateToProps = (state) => ({
  invoices: state.invoices,
  selectedCustomers: state.selectedCustomers,
  customers: state.customers,
});

const mapDispatchToProps = {
  fetchInvoices,
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceList);
