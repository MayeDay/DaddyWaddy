const mongoose = require("mongoose");

//Connect to MongoDB Atlas 
mongoose.connect("mongodb+srv://User:P@$$W0rd@cluster0-efwmb.mongodb.net/sample_db?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true } );

//Assigning the connection to a variable
var database = mongoose.connection;

//Once the database is connected log the connection as connected
database.once('open', ()=>{
    console.log("Database connected");
})

