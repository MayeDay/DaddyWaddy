const mongoose = require("mongoose");

exports = productSchema = mongoose.Schema({
   
    category: String,
    name: String,
    description: String,
    price: Number,
    rating: String

})

module.exports.model = mongoose.model("prod-dbs", productSchema);
module.exports.Schema = productSchema;