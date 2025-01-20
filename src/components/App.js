import React from "react";
import { Provider } from "react-redux";
import CustomerList from "./CustomerList";
import InvoiceList from "./InvoiceList";
import store from "../redux/sore";
import "../styles/App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Customer Invoice Processor</h1>
        <CustomerList />
        <InvoiceList />
      </div>
    </Provider>
  );
};

export default App;
