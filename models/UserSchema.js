const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    firstname: String,
    lastname: String,
    contactnumber:String,
    email: String,
    password: String
})

module.exports = mongoose.model("users", userSchema);