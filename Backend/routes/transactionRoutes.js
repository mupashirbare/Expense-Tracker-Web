const express = require('express');
const { addTransaction, getTransactions, deleteTransaction, updateTransaction } = require('../controllers/transactionController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/', authenticate, addTransaction);
router.get('/', authenticate, getTransactions);
router.put('/:id', authenticate, updateTransaction);
router.delete('/:id', authenticate, deleteTransaction);

module.exports = router;
