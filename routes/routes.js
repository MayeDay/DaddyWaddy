//import need modules
const express = require("express");
const router = express.Router();
const http = require("http");

const mongoose = require("mongoose");

//Imports created Models for the mongoDB being used
const orderModel = require("../models/OrderModel");
const productModel = require("../models/ProductModel");
const cartModel = require("../models/CartSchema");
const userModel = require("../models/UserSchema");

//assigns the model of product to a variable
const produce = productModel.model;

//Saves the user information knowing what user is logged in
var accountLoggedInto = mongoose.Document;


//Get Function for getting a product Provide the Product _id in the search bar
//May need to be updated
router.get("/product/:id", (req, res)=>{
    produce.findById({_id: req.params.id}).then((product)=>{
        res.send(product);
      
        
    }).catch(err =>{
        res.send(err);
    })
});

//Get Function for finding orders by inputing the order _id into the search bar
router.get("/order/:id", (req, res)=>{
    orderModel.findById({_id: req.params.id}).then((order)=>{
        res.send(order);
    })
});

//Post Function for creating a new order after the user has logged in their user _id should be displayed in the 
//the search bar JSON parameters need for this are name, and quantity
//needs updating
router.post("/order/product/:userId", (req, res, next)=>{
  
    
    produce.findOne({name: req.body.name}, (err, item)=>{  
        console.log("Inputed information: " + item);

        userModel.findById({_id: req.params.userId}).then((person) =>{

            addOrder = new orderModel({

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
})

//Post funtion for adding user orders to the cart after they are finished provide the user _id in the search 
//bar to add all that users orders into the cart then provide the following JSON data 
// orderOption and paymentMethod
router.post("/cart/:id", (req, res)=>{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    orderModel.find({userId: req.params.id}, (err, order)=>{
        if(err){
            res.send(err);
        }else{
            var totalPrice = 0
           order.forEach((item)=>{
            var cost = item.item.price;
            var quantity = item.quantity;
            var itemTotal = cost * quantity;
            totalPrice = totalPrice + itemTotal;
           })

            cart = new cartModel({
                orders: order,
                date: date,
                time: time,
                Total_Price: totalPrice,
                Dining_Option: req.body.Dining_Option,
                Payment_Method: req.body.Payment_Method,
                
            })
           cart.save();
           res.send(cart);
        } 
    }) 
})

//Post Funtion to login provide the email and password that is inside the users Collection in MongoDB inside of 
//JSON format
router.post("/login", (req, res) =>{

    userModel.findOne({email: req.body.email, password: req.body.password}, (err, person)=>{
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

//Creating a new user provide the following in JSON format firstname, lastname, contactnumber, email, password
router.post("/newuser", (req, res)=>{
    
    const person = new userModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        contactnumber: req.body.contact,
        email: req.body.email,
        password: req.body.password
    })
    person.save();
    res.send(person);
})

//Creating a new Product provide the following in JSON format category, name, description, price and rating
//needs updating
router.post("/newProduct", (req, res)=>{
    product = new produce({
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating
    })
    product.save();
    res.send(product);

});

module.exports = router;