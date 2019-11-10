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

module.exports = router;
