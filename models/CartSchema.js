const moongose = require("mongoose");

//creates cart schema
const cartSchema = moongose.Schema({

    
    orders:[],
    date: String,
    time: String,
    Total_Price: Number,
    Dining_Option: String,
    Payment_Method: String,

})

module.exports = moongose.model("cart-collection", cartSchema);