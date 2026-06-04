const transactionService = require("../service/transaction.service");
const {validationResult} = require("express-validator");
class TransactionContoller {
    async list(req, res) {
       try {
        const passbook = await transactionService.list();
        res.status(200).json({data: passbook});
    } catch(err) {
        console.log(err)
        res.status(500).json({messgae: "Something went wrong"});
    } 
    }

    async create(req, res) {
        const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: errors.array()
                });
            }
        try {
            
            const {txnType, description, amount} = req.body;
            const txn = await transactionService.create(txnType, description, amount);
            res.json({
                message: "Transaction Successful",
                transaction: txn
            })
        }catch(err) {
            res.status(500).json({
                message: "Something went wrong"
            })
        }
    }
}

module.exports = new TransactionContoller();