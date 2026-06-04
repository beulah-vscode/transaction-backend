const express = require("express");
const router = express.Router();
const transactionController = require('../controller/transaction.controller');
const {body} = require("express-validator");

const transactionValidation = [
    body("txnType")
        .notEmpty().withMessage("Type is required")
        .isIn(["CREDIT", "DEBIT"]).withMessage("Invalid Txn Type"),
    
    body("amount")
        .notEmpty().withMessage("amount is required")
        .isNumeric().withMessage("amount must be number"),
    
    body("description")
        .notEmpty().withMessage("description is required")
        .isLength({min:1}).withMessage("Description too short")
];

router.get("/list", transactionController.list)
router.post("/", transactionValidation, transactionController.create)
module.exports = router;