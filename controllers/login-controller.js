const mongoose = require("mongoose");
const user_model = require("../models/user-model");
const consts = require("../const");
const express = require("express");
//Saves the user information knowing what user is logged in
var accountLoggedInto = mongoose.Document;
mongoose.set('useFindAndModify', false);

//Creating a new user provide the following in JSON format firstname, lastname, contactnumber, email, password
exports.signup = ((req, res, next)=>{
    
    user_model.find((err, people) =>{
        
        if(err){
           res.send(err);
        
        }else{
            var exists = true;
            people.forEach((person)=>{

                if(person.get("email") == req.body.email){
                    exists = true;
                }else{
                    exists = false;
                }


            })

            if(exists){
                res.send(`User with email ${req.body.email} already exists!`);

            }else{
                const new_person = new user_model({
        
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    contactnumber: req.body.contactnumber,
                    email: req.body.email,
                    password: req.body.password,
                    status: true
                })

                new_person.save()
                .then(result =>{
                    console.log(result);
                    res.status(consts.const.STATUS.OK).json({
                        successful: true,
                        message: "User created successfully!"
                    })
                }).catch(err =>{
                    res.status(consts.const.STATUS.INTERNAL_SERVER).json({
                        successful: false,
                        message: "User not created!"
                    })
                })
            }
        }
    })
});


   

//Post Funtion to login provide the email and password that is inside the users Collection in MongoDB inside of 
//JSON format
exports.login = ((req, res, next) =>{

    user_model.findOne({email: req.body.email, password: req.body.password}, (err, person)=>{
        if(err){
            res.send("No User Found!")
        }else{
            accountLoggedInto = person;
            userId = person.get("_id");
            res.write(accountLoggedInto.get("firstname") + " " + accountLoggedInto.get("lastname") + " has logged in to WaddyDaddy succesfully!");
            // res.write(accountLoggedInto);
            res.send();
        }
      
    })
})

//Post funtion for updating a users personal information
exports.updateUser = ((req, res, next) =>{

    user_model.findByIdAndUpdate({_id: req.params.id}, req.body).then(() =>{
        user_model.findOne({_id: req.params.id}).then((person)=>{
            res.send(person);

        })

    }).catch(err =>{
        res.send(err);
    })
});

exports.deactivateUser = ((req, res, next) =>{
    user_model.findByIdAndUpdate({_id: req.body.id}, {status: false}).then(()=>{
        user_model.findOne({_id: req.body.id}).then((person)=>{
            res.send(person);
        })
    }).catch(err =>{
        res.send(err);
    })

});