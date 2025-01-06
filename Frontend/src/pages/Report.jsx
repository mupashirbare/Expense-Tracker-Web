import React, { useState, useEffect } from "react";
import { FaChartBar, FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import axios from "axios";

const Report = ({ isCollapsed }) => {
  const [reportData, setReportData] = useState({
    totalExpenses: 0,
    totalIncome: 0,
    highestExpenseTitle: "",
    monthlyTrend: "",
  });

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch transactions from the database
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(
          "http://localhost:5000/api/transactions",
          config
        );

        setTransactions(response.data);
        calculateReport(response.data);
      } catch (err) {
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const calculateReport = (data) => {
    // Total expenses and income
    const totalExpenses = data
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalIncome = data
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);

    // Find the highest expense title
    const highestExpense = data
      .filter((t) => t.type === "Expense")
      .reduce(
        (max, t) => (t.amount > (max.amount || 0) ? t : max),
        {}
      );

    const highestExpenseTitle = highestExpense?.title || "N/A";

    // Monthly trend (simple logic: "Increasing", "Decreasing", "Stable")
    const currentMonth = new Date().getMonth();
    const lastMonthExpenses = data
      .filter(
        (t) =>
          t.type === "Expense" &&
          new Date(t.date).getMonth() === currentMonth - 1
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const currentMonthExpenses = data
      .filter(
        (t) =>
          t.type === "Expense" &&
          new Date(t.date).getMonth() === currentMonth
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyTrend =
      currentMonthExpenses > lastMonthExpenses
        ? "Increasing"
        : currentMonthExpenses < lastMonthExpenses
        ? "Decreasing"
        : "Stable";

    setReportData({
      totalExpenses,
      totalIncome,
      highestExpenseTitle,
      monthlyTrend,
    });
  };

  return (
    <div
      className={`transition-all duration-300 bg-gray-150 min-h-screen p-6 ${
        isCollapsed ? "md:pl-20 pl-16" : "md:pl-72 pl-64"
      }`}
    >
      <h2 className="text-3xl font-bold text-gray-700 mb-6">
        Expense Tracker Report
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Expenses Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-700">
              <div className="flex items-center space-x-4">
                <FaChartBar className="text-blue-700 text-3xl" />
                <h3 className="text-2xl font-semibold text-gray-700">
                  Total Expenses
                </h3>
              </div>
              <p className="text-xl font-bold text-gray-700 mt-4">
                ${reportData.totalExpenses.toFixed(2)}
              </p>
            </div>

            {/* Total Income Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-700">
              <div className="flex items-center space-x-4">
                <FaChartBar className="text-blue-700 text-3xl" />
                <h3 className="text-2xl font-semibold text-gray-700">
                  Total Income
                </h3>
              </div>
              <p className="text-xl font-bold text-gray-700 mt-4">
                ${reportData.totalIncome.toFixed(2)}
              </p>
            </div>

            {/* Highest Expense Title Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-700">
              <div className="flex items-center space-x-4">
                <FaClipboardList className="text-blue-700 text-3xl" />
                <h3 className="text-2xl font-semibold text-gray-700">
                  Highest Expense
                </h3>
              </div>
              <p className="text-xl font-bold text-gray-700 mt-4">
                {reportData.highestExpenseTitle}
              </p>
            </div>

            {/* Monthly Expense Trend Section */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-700">
              <div className="flex items-center space-x-4">
                <FaCalendarAlt className="text-blue-700 text-3xl" />
                <h3 className="text-2xl font-semibold text-gray-700">
                  Monthly Trend
                </h3>
              </div>
              <p className="text-xl font-bold text-gray-700 mt-4">
                {reportData.monthlyTrend}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">
            <button className="w-full md:w-auto px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-gray-700 transition-all">
              View Detailed Reports
            </button>
            <button className="w-full md:w-auto px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-gray-700 transition-all">
              Export to CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
