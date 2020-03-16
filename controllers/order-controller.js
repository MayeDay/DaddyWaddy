const mongoose = require("mongoose");
const order_model = require("../models/order-model");
const product = require("../models/product-model");
const user_model = require("../models/user-model");
const product_model = product.model;



//Get Function for finding orders by inputing the order _id into the search bar
exports.getOrder = ((req, res, next)=>{
    order_model.findById({_id: req.params.id}).then((order)=>{
        res.send(order);
    })
});


//Post Function for creating a new order after the user has logged in their user _id should be displayed in the 
//the search bar JSON parameters need for this are name, and quantity
//needs updating
exports.newOrder = ((req, res, next)=>{
  
    product_model.findOne({name: req.body.name}, (err, item)=>{  
        console.log("Inputed information: " + item);

        user_model.findById({_id: req.params.userId}).then((person) =>{

            addOrder = new order_model({

                item: item,
               
                quantity: req.body.quantity,
                userId: req.params.userId
            })
           
            addOrder.save();
            res.send(addOrder);

        }).catch((err)=>{
            res.send(err);
        })   
    }).catch(err =>{
        res.send(err);
    })
});