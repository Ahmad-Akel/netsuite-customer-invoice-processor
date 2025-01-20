import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import {
  FETCH_CUSTOMERS_REQUEST,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_ERROR,
  FETCH_INVOICES_REQUEST,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_ERROR,
} from "./actionTypes";

export const fetchCustomers = () => async (dispatch) => {
  dispatch({ type: FETCH_CUSTOMERS_REQUEST });
  try {
    const response = await apiClient.get("/customers");
    dispatch({ type: FETCH_CUSTOMERS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching customers:", error);
    toast.error("Failed to fetch customers. Please try again.");
    dispatch({ type: FETCH_CUSTOMERS_ERROR, payload: error.message });
  }
};

export const fetchInvoices =
  (selectedCustomers) => async (dispatch, getState) => {
    dispatch({ type: FETCH_INVOICES_REQUEST });
    const { customers } = getState();

    const customerNames = customers
      .filter((customer) => selectedCustomers.includes(customer.id))
      .map((customer) => customer.name);

    console.log("Sending customer names:", customerNames);

    try {
      const response = await apiClient.post("/invoices", {
        customerIds: customerNames,
      });
      console.log("Fetched invoices:", response.data);
      dispatch({ type: FETCH_INVOICES_SUCCESS, payload: response.data });
    } catch (error) {
      console.error("Error fetching invoices:", error);
      dispatch({ type: FETCH_INVOICES_ERROR, payload: error.message });
    }
  };
