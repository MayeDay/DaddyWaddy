//import need modules
const express = require("express");

//Imports created Models for the mongoDB being used
const login_controller = require("../controllers/login-controller");
const product_controller = require("../controllers/product-controller");
const order_controller = require("../controllers/order-controller");
const cart_controller = require("../controllers/cart-controller");

const router = express.Router();

//Routes
router.post("/newuser", login_controller.signup);
router.post("/login", login_controller.login);
router.put("/updateuser/:id", login_controller.updateUser);


router.post("/newproduct", product_controller.newProduct);
router.get("/product/:id", product_controller.product);

router.get("/order/:id", order_controller.getOrder);
router.post("/neworder/:userId", order_controller.newOrder);

router.post("/tocart/:id",cart_controller.addToCart);

module.exports = router;