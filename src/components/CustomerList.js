import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCustomers } from "../redux/actions";
import "../styles/App.css";

const CustomerList = ({
  customers,
  selectedCustomers,
  onSelectCustomer,
  fetchCustomers,
  loading,
  error,
}) => {
  const [filter, setFilter] = useState("");

  const handleCheckboxChange = (id) => {
    if (selectedCustomers.includes(id)) {
      onSelectCustomer(
        selectedCustomers.filter((customerId) => customerId !== id)
      );
    } else {
      onSelectCustomer([...selectedCustomers, id]);
    }
  };

  const getFilteredCustomers = () => {
    if (!filter) return customers;
    return customers.filter((customer) =>
      customer.country.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredCustomers = getFilteredCustomers();

  // Extract unique countries for the dropdown
  const uniqueCountries = [
    ...new Set(customers.map((customer) => customer.country)),
  ].sort();

  return (
    <div>
      <h2>Customer List</h2>

      {loading && <p>Loading customers...</p>}
      {error && <p className="error">Error: {error}</p>}

      <button onClick={fetchCustomers} disabled={loading}>
        {loading ? "Loading..." : "Load Customers"}
      </button>

      <select
        className="Filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All Countries</option>
        {uniqueCountries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <ul>
        {filteredCustomers.map((customer) => (
          <li key={customer.id}>
            <input
              type="checkbox"
              checked={selectedCustomers.includes(customer.id)}
              onChange={() => handleCheckboxChange(customer.id)}
            />
            {customer.name} ({customer.country})
          </li>
        ))}
      </ul>
    </div>
  );
};

CustomerList.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCustomers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
  fetchCustomers: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

CustomerList.defaultProps = {
  error: null,
};

const mapStateToProps = (state) => ({
  customers: state.customers,
  selectedCustomers: state.selectedCustomers,
  loading: state.loadingCustomers,
  error: state.errorCustomers,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCustomers: () => dispatch(fetchCustomers()),
  onSelectCustomer: (selectedCustomers) =>
    dispatch({ type: "SELECT_CUSTOMER", payload: selectedCustomers }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
