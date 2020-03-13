//Imports need packages and modules
const express = require("express");
const http = require("http");
const body_parser = require("body-parser");
const router = require("./routes/routes");

//Assigns Express to a variable
const apps = express();

//Creates a server using express
const server = http.createServer(apps);

//Port being accessed
const port = 3000;

//Allows for the display of url code in response statements
apps.use(body_parser.urlencoded({extended: true}));

//Allows for JSON data to be parsed through and displayed in req/ res functions
apps.use(body_parser.json());

//Allows the server to access all information in the router module
apps.use("/", router);
const database = require("./database");

//connects to the Port 
server.listen(process.env.port || port, ()=>{
    console.log(`Port ${port} now connected!`);
});


