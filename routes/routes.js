const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const path = require("path");
// const { requireLogin, requireLogout } = require("./middleware");

//Load Model
require("../model");
const Users = mongoose.model("users");

//render signup page
router.get("/signup", (req, res) => {
  res.render("pages/signup");
});

//process signup page
router.post("/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  //all fields required
  if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
    return console.log("All fields required");
  }

  //check password length
  if (password.length < 4) {
    return console.log("password length is less than 4");
  }
  //if passwords do not match return an error alert
  if (password !== confirmPassword) {
    return console.log("passwords do not match");
  }

  //find a User by email
  const foundUser = await Users.findOne({ email });

  //if User already exists return error alert
  if (foundUser) {
    return res.render("pages/signup", {
      alertTitle: "Signup Error",
      alertMessage: `The email "${email}" already exists`,
      alertType: "error"
    });
  }

  //encrypt the password
  const hash = await bcrypt.hashSync(password, 10);

  //if everything passes store the User as newUser and save
  const newUser = new Users({
    fullname: name,
    email,
    password: hash
  });
  await newUser.save();

  return res.redirect("/login");
});

//render login page
router.get("/login", (req, res) => {
  res.render("pages/login");
});

//process login page
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //all fields required
    if (!email.trim() || !password.trim()) {
      return console.log("All fields required");
    }

    //find User by email
    const User = await Users.findOne({ email });

    //if User does not exist return error alert
    if (!User) {
      return res.render("pages/login", {
        alertTitle: "Login Error",
        alertMessage: `No user exists with the email "${email}"`,
        alertType: "error",
        alertTimer: 3500
      });
    }

    //check if passwords match
    const matching = await bcrypt.compareSync(password, User.password);

    //if they don't match, return error alert
    if (!matching) {
      return res.render("pages/login", {
        alertTitle: "Login Error",
        alertMessage: "Incorrect Password",
        alertType: "error",
        alertTimer: 1800
      });
    }

    return res.render("pages/login", {
      alertMessage: "Successfully logged in to your account",
      alertType: "success",
      alertTimer: 1500
    });

  } catch (error) {
    return next(error);
  }
});

module.exports = router;
