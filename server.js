const express = require("express");
const http = require("http");
const body_parser = require("body-parser");
const router = require("./routes/routes");
const apps = express();
const server = http.createServer(apps);
const port = 3000;

apps.use(body_parser.urlencoded({extended: true}));
apps.use(body_parser.json());

apps.use("/", router);
const database = require("./database");

server.listen(process.env.port || port, ()=>{
    console.log(`Port ${port} now connected!`);
});


