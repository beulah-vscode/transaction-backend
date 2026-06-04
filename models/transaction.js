const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        txnType: {
            type: String,
            enum: ['CREDIT', 'DEBIT'],
            required: true
        },
        description: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Transaction", transactionSchema);