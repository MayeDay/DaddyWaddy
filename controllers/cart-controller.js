const mongoose = require("mongoose");
const cart_model = require("../models/cart-model");
const order_model = require("../models/order-model");
const user_model = require("../models/user-model");


//Post funtion for adding user orders to the cart after they are finished provide the user _id in the search 
//bar to add all that users orders into the cart then provide the following JSON data 
// orderOption and paymentMethod
exports.addToCart = ((req, res, next)=>{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    order_model.find({userId: req.params.id}, (err, order)=>{
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

            cart = new cart_model({
                orders: order,
                date: date,
                time: time,
                Total_Price: totalPrice,
                Dining_Option: req.body.Dining_Option,
                Payment_Method: req.body.Payment_Method,
                
            })
           cart.save()
        
           res.send(cart);
        } 
    }) 
})