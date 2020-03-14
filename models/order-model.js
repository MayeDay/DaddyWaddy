const mongoose = require("mongoose");
const product_model = require("./product-model");

//Creates a order Schema
const order_schema = mongoose.Schema({
    //the item Required will be another Schema of Product
    item: product_model.Schema,
    quantity: Number,
    userId: String
})

//exports order Model
module.exports = mongoose.model("orders", order_schema);