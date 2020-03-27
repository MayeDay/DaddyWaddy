const mongoose = require("mongoose");

//Information for the user
const user_schema = mongoose.Schema({

    firstname: {
        type: String,
        required: [true, "First name field is required!"]
    },
    lastname: {
        type: String,
        required: [true, "Last name field is required!"]
    },
    contactnumber:String,

    email: {
        type: String,
        required: [true, "Email field is required!"]
    },

    password: {
        type: String,
        required: [true, "Password field is required!"]
    },

    status: {
        type: Boolean,
        
    },

    orderhistory: []
})

//exports the model of the schema
module.exports = mongoose.model("users", user_schema);