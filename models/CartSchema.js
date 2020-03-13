const moongose = require("mongoose");

const cartSchema = moongose.Schema({

    orders:[],

})

module.exports = moongose.model("cart-collection", cartSchema);