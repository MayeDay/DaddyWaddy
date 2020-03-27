const mongoose = require("mongoose");
const conts = require("./const");

const DB_NAME = conts.database.DATABASE.DB_NAME;
const PASSWORD = conts.database.DATABASE.PASSWORD;

var mongodb = conts.database.DATABASE.DB_LINK;

mongodb = mongodb.replace("auth", PASSWORD);
mongodb = mongodb.replace("dbname", DB_NAME);

//Connect to MongoDB Atlas 
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true } );
//Assigning the connection to a variable
var database = mongoose.connection;



//Once the database is connected log the connection as connected
database.on('error', console.error.bind(console, 'MongoDB connection error:'));

database.once('open', ()=>{
    console.log("Database connected");
})



