const express = require("express");
const { auth } = require("../authentication/Auth");
const {
  userLogin,
  userLogout,
  userRegister,
} = require("../controller/UserController");

const userRoute = new express.Router();

userRoute.route("/api/login").post(auth, userLogin);
userRoute.route("/api/register").post(auth, userRegister);
userRoute.route("/api/logout").post(auth, userLogout);

module.exports = userRoute;
