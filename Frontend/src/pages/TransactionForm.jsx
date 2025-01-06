import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionForm = ({ isCollapsed, closeDialog }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [remainingBalance, setRemainingBalance] = useState(0);

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get("http://localhost:5000/api/transactions", config);

        const transactions = response.data;
        const totalIncome = transactions
          .filter((t) => t.type === "Income")
          .reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = transactions
          .filter((t) => t.type === "Expense")
          .reduce((sum, t) => sum + t.amount, 0);

        setRemainingBalance(totalIncome - totalExpense);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate expense against remaining balance
    if (type === "Expense" && remainingBalance - amount < 0) {
      alert("You cannot add an expense that exceeds your remaining balance.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const transactionData = { title, type, amount: parseFloat(amount), date };

      await axios.post("http://localhost:5000/api/transactions", transactionData, config);
      setMessage("Transaction added successfully!");
      setTitle("");
      setType("");
      setAmount("");
      setDate("");

      // Recalculate remaining balance after adding a transaction
      const updatedTransactions = await axios.get("http://localhost:5000/api/transactions", config);
      const transactions = updatedTransactions.data;
      const totalIncome = transactions
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = transactions
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + t.amount, 0);

      setRemainingBalance(totalIncome - totalExpense);
    } catch (error) {
      console.error("Error adding transaction:", error);
      setMessage("Failed to add transaction.");
    }
  };

  const isFormValid = title && type && amount && date;

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setAmount(value);
    } else {
      alert("Amount cannot be negative.");
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    if (selectedDate < sevenDaysAgo) {
      alert("Date cannot be earlier than one week ago.");
      setDate("");
    } else {
      setDate(e.target.value);
    }
  };

  return (
    <div className="p-4 border rounded-md bg-gray-100 px-4 lg:px-8">
      <h3 className="text-lg font-bold mb-2">Add Transaction</h3>
      {message && <p className="text-sm text-red-500 mb-2">{message}</p>}
      <p className="text-sm mb-2">Remaining Balance: ${remainingBalance}</p>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="p-2 border rounded-md w-full"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              className="p-2 border rounded-md w-full"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              className="p-2 border rounded-md w-full"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              className="p-2 border rounded-md w-full"
              value={date}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md"
            disabled={!isFormValid}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={closeDialog}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
