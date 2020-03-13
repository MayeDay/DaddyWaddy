const express = require("express");
const router = express.Router();
const http = require("http");

const mongoose = require("mongoose");

const orderModel = require("../models/OrderModel");
const productModel = require("../models/ProductModel");
const cartModel = require("../models/CartSchema");
const userModel = require("../models/UserSchema");
const produce = productModel.model;
var accountLoggedInto = mongoose.Document;
var userId = 0;


router.get("/product/:id", (req, res)=>{
    produce.findById({_id: req.params.id}).then((product)=>{
        const price = product.get("price").toString();
        res.send(price);
      
        
    }).catch(err =>{
        res.send(err);
    })
});

router.get("/order/:id", (req, res)=>{
    orderModel.findById({_id: req.params.id}).then((order)=>{
        res.send(order);
    })
});

router.post("/order/product/:userId", (req, res, next)=>{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    produce.findOne({name: req.body.name}, (err, item)=>{  
        var totalPrice = item.get("price") * req.body.amount;
        console.log("Inputed information: " + item);

        userModel.findById({_id: req.params.userId}).then((person) =>{

            addOrder = new orderModel({

                item: item,
                date: date,
                time: time,
                Total_Price: totalPrice,
                Dining_Option: req.body.orderOption,
                Payment_Method: req.body.paymentMethod,
                quantity: req.body.amount,
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

router.post("/cart/:id", (req, res)=>{
    orderModel.find({userId: req.params.id}, (err, order)=>{
        if(err){
            res.send(err);
        }else{
            cart = new cartModel({
                orders: order
                
            })
           cart.save();
           res.send(cart);
        } 
    }) 
})

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