const mongoose = require("mongoose");
const produce = require("../models/product-model");

//assigns the model of product to a variable
const product_model = produce.model;

//Creating a new Product provide the following in JSON format category, name, description, price and rating
//needs updating
exports.newProduct = ((req, res, next)=>{
    product = new product_model({
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        rating: req.body.rating
    })
    product.save();
    res.send(product);

});


//Get Function for getting a product Provide the Product _id in the search bar
//May need to be updated
exports.product = ((req, res, next)=>{
    product_model.findById({_id: req.params.id}).then((product)=>{
        res.send(product);
      
        
    }).catch(err =>{
        res.send(err);
    })
});
