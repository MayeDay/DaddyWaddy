const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://User:P@$$W0rd@cluster0-efwmb.mongodb.net/sample_db?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true } );

var database = mongoose.connection;

database.once('open', ()=>{
    console.log("Database connected");
})

