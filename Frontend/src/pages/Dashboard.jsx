import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto"; // Automatically register chart components

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated.");

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get("http://localhost:5000/api/transactions", config);

        setTransactions(data);

        const income = data
          .filter((transaction) => transaction.type === "Income")
          .reduce((sum, t) => sum + Number(t.amount), 0);

        const expenses = data
          .filter((transaction) => transaction.type === "Expense")
          .reduce((sum, t) => sum + Number(t.amount), 0);

        setTotalIncome(income);
        setTotalExpenses(expenses);
        setRemainingBalance(income - expenses);
      } catch (error) {
        console.error("Error fetching transactions:", error.message);
      }
    };

    fetchTransactions();
  }, []);

  const barChartData = {
    labels: transactions.map((t) => t.title),
    datasets: [
      {
        label: "Amount",
        data: transactions.map((t) => t.amount),
        backgroundColor: transactions.map((t) =>
          t.type === "Income" ? "rgb(11, 186, 66)" : "rgb(255, 0, 0 )"
        ),
      },
    ],
  };

  const pieChartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [totalIncome, totalExpenses],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  return (
    <div className="ml-64 p-4 space-y-4 overflow-y-auto">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded shadow-md">
          <h3 className="font-bold text-xl">Total Income</h3>
          <p className="text-2xl font-bold">${totalIncome}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow-md">
          <h3 className="font-bold text-xl">Total Expenses</h3>
          <p className="text-2xl font-bold">${totalExpenses}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow-md">
          <h3 className="font-bold text-xl">Remaining Balance</h3>
          <p className="text-2xl font-bold">${remainingBalance}</p>
        </div>
      </div>

      {/* Data Visualization */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-bold mb-4">Transaction Overview</h3>
          <Bar data={barChartData} />
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-lg font-bold mb-4">Income vs Expenses</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
