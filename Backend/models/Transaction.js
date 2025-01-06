const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true }, // Ensure title is required in the form
  amount: { type: Number, required: true },
  type: { type: String, enum: ["Income", "Expense"], required: true }, // Adjusted enum
  date: { type: Date, default: Date.now },
}, { timestamps: true });


module.exports = mongoose.model("Transaction", transactionSchema);