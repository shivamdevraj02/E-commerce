
const { check, validationResult } = require("express-validator");
const express = require("express");
const app = express();


app.set("view engine", "ejs");

const userrouter = express.Router();
const User_Ecommerce = require("../model/main");
const shop = require('../controller/shop')
const authController = require("../controller/auth");
const auth = require("../middleware/auth");
const { signupValidation } = require("../middleware/validation");


userrouter.get("/products", auth, shop.product);
userrouter.get("/cart", auth, shop.cart);
userrouter.get("/orders", auth, shop.orders);


userrouter.get("/signup", authController.getsignup);
userrouter.post("/signup", signupValidation, authController.postsignup);
userrouter.get("/login", authController.getlogin);
userrouter.post("/login", authController.postlogin);
userrouter.post("/logout", authController.postlogout);




module.exports = userrouter;
