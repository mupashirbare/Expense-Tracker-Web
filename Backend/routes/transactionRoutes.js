const express = require("express");
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getsingleTransaction,
} = require("../controllers/transactionController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, addTransaction);
router.get("/", protect, getTransactions);
router.get("/:id", protect, getsingleTransaction);

router.delete("/:id", protect, deleteTransaction);
router.put("/:id", protect, updateTransaction); // Update route added

module.exports = router;
