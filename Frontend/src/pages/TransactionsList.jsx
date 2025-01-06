import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditForm from "./Editform"; // Import EditForm
import TransactionForm from "./TransactionForm"; // Import TransactionForm

const TransactionsList = ({ isCollapsed }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to toggle the dialog
  const [dialogType, setDialogType] = useState(null); // Type of dialog ('add', 'edit', 'delete')
  const [transactionToEdit, setTransactionToEdit] = useState(null); // Transaction to edit
  const [transactionToDelete, setTransactionToDelete] = useState(null); // Transaction to delete
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get("http://localhost:5000/api/transactions", config);
        setTransactions(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTransactions();
  }, []);

  const openDialog = (type, transaction = null) => {
    setDialogType(type);
    if (type === "edit") setTransactionToEdit(transaction);
    if (type === "delete") setTransactionToDelete(transaction);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogType(null);
    setTransactionToEdit(null);
    setTransactionToDelete(null);
  };

  const deleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/transactions/${id}`, config);
      setTransactions((prev) => prev.filter((transaction) => transaction._id !== id));
      closeDialog();
    } catch (error) {
      console.error(error.message);
    }
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  return (
    <div className={`p-4 transition-all duration-300 ${isCollapsed ? "pl-16" : "pl-72"}`}>
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search by type or title"
          className="p-2 border rounded-md w-full max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => openDialog("add")} // Open dialog for adding a transaction
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Add Transaction
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-gray-100">
                <td className="p-2 border">{transaction.type}</td>
                <td className="p-2 border">${transaction.amount}</td>
                <td className="p-2 border">{transaction.title}</td>
                <td className="p-2 border">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="p-2 border flex items-center justify-center space-x-2">
                  <button onClick={() => openDialog("edit", transaction)} className="text-blue-600">
                    <FaEdit />
                  </button>
                  <button onClick={() => openDialog("delete", transaction._id)} className="text-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-l-md"
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-gray-100">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-r-md"
        >
          Next
        </button>
      </div>

      {/* Dialog for Adding or Editing Transaction */}
      {isDialogOpen && (dialogType === "add" || dialogType === "edit") && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-xl">
            {dialogType === "add" && <TransactionForm closeDialog={closeDialog} />}
            {dialogType === "edit" && (
              <EditForm transaction={transactionToEdit} closeDialog={closeDialog} />
            )}
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {isDialogOpen && dialogType === "delete" && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p>Are you sure you want to delete this transaction?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={closeDialog} className="px-4 py-2 bg-gray-300 text-black rounded-md">
                Cancel
              </button>
              <button
                onClick={() => deleteTransaction(transactionToDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
