const mongoose = require("mongoose");
const ProductModel = require("./ProductModel");

orderSchema = mongoose.Schema({

    item: ProductModel.Schema,

    date: String,
    time: String,
    Total_Price: Number,
    Dining_Option: String,
    Payment_Method: String,
    quantity: Number,
    userId: String
})


module.exports = mongoose.model("orders", orderSchema);