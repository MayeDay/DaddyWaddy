const mongoose = require("mongoose");
const user_model = require("../models/user-model");

//Saves the user information knowing what user is logged in
var accountLoggedInto = mongoose.Document;

//Creating a new user provide the following in JSON format firstname, lastname, contactnumber, email, password
exports.signup = ((req, res, next)=>{
    
    const person = new user_model({
        
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        contactnumber: req.body.contact,
        email: req.body.email,
        password: req.body.password
    })
    person.save();
    res.send(person);
})

//Post Funtion to login provide the email and password that is inside the users Collection in MongoDB inside of 
//JSON format
exports.login = ((req, res, next) =>{

    user_model.findOne({email: req.body.email, password: req.body.password}, (err, person)=>{
        if(err){
            res.send("No User Found!")
        }else{
            accountLoggedInto = person;
            userId = person.get("_id");
            //res.write(accountLoggedInto.get("firstname") + " " + accountLoggedInto.get("lastname") + " has logged in to WaddyDaddy succesfully!");
            res.send(accountLoggedInto);
        }
      
    })
})

   