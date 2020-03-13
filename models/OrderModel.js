const mongoose = require("mongoose");
const ProductModel = require("./ProductModel");
//Creates a order Schema
orderSchema = mongoose.Schema({
    //the item Required will be another Schema of Product
    item: ProductModel.Schema,

    
    quantity: Number,
    userId: String
})

//exports order Model
module.exports = mongoose.model("orders", orderSchema);