const mongoose = require("mongoose");
const product_model = require("./product-model");

//Creates a order Schema
const order_schema = mongoose.Schema({
    //the item Required will be another Schema of Product
    
    item:{
        type: product_model.Schema,
        required: [true, "First name field is required!"]
    },
    quantity: {
        type: Number,
        required: [true, "Must provide amount of produce"]
    },
    
    userId: String
})

//exports order Model
module.exports = mongoose.model("orders", order_schema);