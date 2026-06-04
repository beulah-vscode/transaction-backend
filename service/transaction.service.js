const Transaction = require("../models/transaction");

class TransactionService {
    async list() {
        try {
            const transaction = await Transaction.find().sort({createdAt: 1});
            let balance = 0;
            let creditAmt = 0;
            let debitAmt = 0;
            const passbook = transaction.map((txn) => {
                if(txn.txnType == "CREDIT") {
                    balance += txn.amount
                    creditAmt = txn.amount
                    debitAmt = null;
                } else {
                    balance -= txn.amount
                    debitAmt = txn.amount
                    creditAmt = null;
                }
                return {
                    id: txn._id,
                    type: txn.txnType,
                    amount: txn.amount,
                    description: txn.description,
                    date: txn.createdAt,
                    balanceAfterTxn: balance,
                    creditAmount: creditAmt,
                    debitAmount: debitAmt
                }
            })
            return passbook.reverse();
            } catch (err) {
                throw err;
            }
        
    }

    async create(txnType, description, amount) {
        try {
            if(!txnType || !description || !amount) {
                return res.status(400).json({
                    message: "type, amount, description is mandatory"
                })
            }
            if(!["CREDIT", "DEBIT"].includes(txnType)) {
                return res.status(400).json({
                    message: "invalid transaction type"
                })
            }
            const txn = await Transaction.create({
                txnType,amount, description
            });
            return {
                data: {
                    txnType,
                    amount, 
                    description
                }
            }
        } catch(err) {
            throw err;
        }
    }
}

module.exports = new TransactionService();