const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
require('dotenv').config();
// const path = require("path");
// const { requireLogin, requireLogout } = require("./middleware");

//Load Model
require("../model");
const Users = mongoose.model("users");

//nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  },
});

//render signup page
router.get("/signup", (req, res) => {
  res.render("pages/signup");
});

//process signup page
router.post("/signup", async (req, res) => {
  try{
    const { name, email, password, confirmPassword } = req.body;

  //all fields required
  if (
    !name.trim() ||
    !email.trim() ||
    !password.trim() ||
    !confirmPassword.trim()
  ) {
    return console.log("All fields required");
  }

  //check password length
  if (password.trim().length < 4) {
    return console.log("password length is less than 4");
  }

  //if passwords do not match return an error alert
  if (password.trim() !== confirmPassword.trim()) {
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

  //create secretToken
  const secretToken = await randomstring.generate();

  //if everything passes store the User as newUser 
  const newUser = new Users({
    fullname: name,
    email,
    password: hash,
    secretToken,
    active: false
  });

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const mail_options = {
    from: '"TechDev" <madcodein@gmail.com>',
    to: email,
    subject: "TechDev Account Verification",
    text: `http://localhost:3001/verify_email/${secretToken}`,
    html: `<h1>Click this link to verify your email</h1><a href="http://localhost:3001/verify_email/${secretToken}">http://localhost:3001/verify_email </a>`
  };

  await transporter.sendMail(mail_options, async function(err, info) {
    if (err) {
      console.log(err);
      // res.status(401).send({ success: false });
      return res.render('pages/signup',{
        alertTitle: "Signup Error",
        alertMessage: `Seems there is a problem in sending you an email. Please check your connection and try again`,
        alertType: "info"
      });
    } else {
      console.log(info);
      
      // save newUser detail into the database
      await newUser.save();
      
      res.render('pages/signup',{
        alertTitle: "Signup Successful",
        alertMessage: `We have sent you a verification link at "${email}". Please verify account`,
        alertType: "success"
      });
    }
  });
  }catch(err){
    throw err;
  }
});

//   return res.redirect("/verify_email");
// });

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

    //if user account is not verified by email
    if (!User.active) {
      return res.render("pages/login", {
        alertTitle: "Error",
        alertMessage: "You need to verify email first.",
        alertType: "error"
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

router.get("/verify_email/:id", async (req, res, next) => {
  try {
    const user = await Users.findOne({ secretToken: req.params.id });
    if (!user) {
      return res.render("pages/verify_email", {
        alertType: "Error",
        alertMessage: "Invalid Verification Code",
        alertType: "error",
        alertTimer: 2500
      });
    }
    
    user.active = true;
    user.secretToken = "";
    
    await user.save();
    
    console.log(user)
    return res.render("pages/verify_email", {
      alertMessage: "Verification Successful",
      alertType: "success",
      alertTimer: 1500
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;