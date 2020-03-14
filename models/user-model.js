const mongoose = require("mongoose");

//Information for the user
const user_schema = mongoose.Schema({

    firstname: String,
    lastname: String,
    contactnumber:String,
    email: String,
    password: String
})

//exports the model of the schema
module.exports = mongoose.model("users", user_schema);