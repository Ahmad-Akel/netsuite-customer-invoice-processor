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

  const filteredCustomers = filter
    ? customers.filter((customer) =>
        customer.country.toLowerCase().includes(filter.toLowerCase())
      )
    : customers;

  const uniqueCountries = [
    ...new Set(customers.map((customer) => customer.country)),
  ].sort();

  return (
    <div>
      <h2>Customer List</h2>
      <button onClick={fetchCustomers}>Load Customers</button>
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
      id: PropTypes.string.isRequired, // Changed from number to string
      name: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCustomers: PropTypes.arrayOf(PropTypes.string).isRequired, // Changed from number to string
  onSelectCustomer: PropTypes.func.isRequired,
  fetchCustomers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  customers: state.customers,
  selectedCustomers: state.selectedCustomers,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCustomers: () => dispatch(fetchCustomers()),
  onSelectCustomer: (selectedCustomers) =>
    dispatch({ type: "SELECT_CUSTOMER", payload: selectedCustomers }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
