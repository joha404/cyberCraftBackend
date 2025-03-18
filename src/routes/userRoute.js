const express = require("express");
const { CreateUser, LoginUser } = require("../controllers/userController");
const userRoute = express.Router();

userRoute.post("/signup", CreateUser);
userRoute.post("/signin", LoginUser);

module.exports = userRoute;
