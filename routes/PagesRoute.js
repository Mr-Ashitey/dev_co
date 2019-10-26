const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/landing");
});

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.get("/contact", (req, res) => {
  res.render("pages/contact");
});

router.get("/works", (req, res) => {
  res.render("pages/works");
});

router.get("/about-login", (req, res) => {
  res.render("works/login/about-login");
});

router.get("/about-signup", (req, res) => {
  res.render("works/signup/about-signup");
});

module.exports = router;
