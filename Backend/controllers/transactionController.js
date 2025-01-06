const Transaction = require("../models/Transaction");

// Add Transaction
const addTransaction = async (req, res) => {
  const { title, amount, type,date } = req.body;

  try {
    if (!title || !amount || !type || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      title,
      amount,
      type,
      date,
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error.message);
    res.status(500).json({ message: error.message });
  }
};


// Get All Transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Transaction
const getsingleTransaction= async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error fetching transaction:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


// Delete Transaction
const deleteTransaction = async (req, res) => {
    try {
      const transaction = await Transaction.findById(req.params.id);
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
  
      if (transaction.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to delete this transaction" });
      }
  
      await Transaction.deleteOne({ _id: req.params.id });
      res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Update Transaction
const updateTransaction = async (req, res) => {
  const { title, amount, type } = req.body;

  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this transaction" });
    }

    transaction.title = title || transaction.title;
    transaction.amount = amount || transaction.amount;
    transaction.type = type || transaction.type;

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  

module.exports = { addTransaction, getTransactions, deleteTransaction, updateTransaction,getsingleTransaction };
