const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb://127.0.0.1/transaction");
    console.log("MongoDB connected");
}

module.exports = connectDB;