const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Mock customer data
const customers = [
  { id: "1", name: "Customer A", country: "US" },
  { id: "2", name: "Customer B", country: "UK" },
  { id: "3", name: "Customer C", country: "Germany" },
];

// Mock invoice data
const invoices = [
  {
    id: "101",
    amount: 500,
    status: "Paid",
    customer: "Customer A",
    country: "US",
  },
  {
    id: "102",
    amount: 1200,
    status: "Open",
    customer: "Customer B",
    country: "UK",
  },
  {
    id: "103",
    amount: 700,
    status: "Open",
    customer: "Customer B",
    country: "UK",
  },
  {
    id: "104",
    amount: 700,
    status: "Open",
    customer: "Customer C",
    country: "Germany",
  },
];

// API to get customers
app.get("/api/customers", (req, res) => {
  res.json(customers);
});

// API to get invoices by customer IDs
app.post("/api/invoices", (req, res) => {
  const { customerIds } = req.body;

  // Check if customerIds are names or IDs
  const customerNames = customers
    .filter(
      (customer) =>
        customerIds.includes(customer.id) || customerIds.includes(customer.name)
    )
    .map((customer) => customer.name);

  console.log("Mapped customer names:", customerNames);

  const filteredInvoices = invoices.filter((invoice) =>
    customerNames.includes(invoice.customer)
  );

  console.log("Filtered invoices:", filteredInvoices);
  res.json(filteredInvoices);
});

app.get("/", (req, res) => {
  res.send("Mock server is running. Use /api/customers or /api/invoices.");
});

app.listen(4000, () =>
  console.log("Mock server running on http://localhost:4000")
);
