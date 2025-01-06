import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditForm = ({ transaction, closeDialog }) => {
  const navigate = useNavigate();

  const [updatedTransaction, setUpdatedTransaction] = useState({
    type: transaction.type,
    title: transaction.title,
    amount: transaction.amount,
    date: transaction.date,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [remainingBalance, setRemainingBalance] = useState(0);

  // Fetch transactions and calculate remaining balance
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("User not authenticated. Please log in again.");
          navigate("/login");
          return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(
          "http://localhost:5000/api/transactions",
          config
        );

        const transactions = response.data;
        const totalIncome = transactions
          .filter((t) => t.type === "Income")
          .reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = transactions
          .filter((t) => t.type === "Expense")
          .reduce((sum, t) => sum + t.amount, 0);

        setRemainingBalance(totalIncome - totalExpense);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount" && value < 0) {
      alert("Amount cannot be negative.");
      return;
    }

    if (name === "date") {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 7);

      if (selectedDate < sevenDaysAgo) {
        alert("Date cannot be earlier than one week ago.");
        return;
      }
    }

    setUpdatedTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { type, amount } = updatedTransaction;
    const newAmount = parseFloat(amount);

    // Validate expense against remaining balance
    if (type === "Expense" && remainingBalance - newAmount < 0) {
      alert("You cannot add an expense that exceeds your remaining balance.");
      return;
    }

    const previousAmount = parseFloat(transaction.amount);
    const previousImpact =
      transaction.type === "Expense" ? -previousAmount : previousAmount;
    const newImpact = type === "Expense" ? -newAmount : newAmount;

    const adjustedBalance = remainingBalance - previousImpact + newImpact;

    if (adjustedBalance < 0) {
      alert(
        "You cannot update this transaction because the remaining balance would become negative."
      );
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in again.");
        navigate("/login");
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(
        `http://localhost:5000/api/transactions/${transaction._id}`,
        updatedTransaction,
        config
      );

      alert("Transaction updated successfully!");
      closeDialog();
      navigate("/dashboard/transactions");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to update transaction."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4 p-4 border rounded-md bg-gray-100 max-w-xl mx-auto">
      <h3 className="text-lg font-bold mb-2 text-center">Edit Transaction</h3>
      {message && <p className="text-sm text-red-500 mb-2">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={updatedTransaction.title}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
              placeholder="Enter title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="type"
              value={updatedTransaction.type}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
              required
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
              name="amount"
              value={updatedTransaction.amount}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
              placeholder="Enter amount"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={updatedTransaction.date}
              onChange={handleChange}
              className="p-2 border rounded-md w-full"
              required
            />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
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

export default EditForm;
