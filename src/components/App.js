import React from "react";
import { Provider } from "react-redux";
import CustomerList from "./CustomerList";
import InvoiceList from "./InvoiceList";
import store from "../redux/sore";
import "../styles/App.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <div className="App">
        <h1>Customer Invoice Processor</h1>
        <CustomerList />
        <InvoiceList />
      </div>
    </Provider>
  );
};

export default App;
