const Transaction = require('../models/Transaction');

// Add a Transaction
exports.addTransaction = async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;

    const transaction = new Transaction({ 
      userId: req.user.id, 
      amount, 
      type, 
      category, 
      description, 
      date 
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get Transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a Transaction
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
