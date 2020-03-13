const mongoose = require("mongoose");

//creates a Schema for products
exports = productSchema = mongoose.Schema({
   
    category: String,
    name: String,
    description: String,
    price: Number,
    rating: String

})

//exports the model of the product schema
module.exports.model = mongoose.model("prod-dbs", productSchema);
//exports the product schema
module.exports.Schema = productSchema;