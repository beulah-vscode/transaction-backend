const express = require('express');
const cors = require('cors');

const connectDB = require('./db');
const transactionRoutes = require("./routes/transaction.routes")

const app = express();

app.use(cors());
app.use(express.json());


connectDB();

app.use("/api/transactions", transactionRoutes)

app.listen(3000, () => {
    console.log("Server running on port 3000");
});