var express = require("express");
var router = express.Router();
let User = require("../models/User");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// get User Form
router.get("/register", function (req, res, next) {
  res.render("register");
});
// create User

router.post("/register", function (req, res, next) {
  User.create(req.body); // before this data travel through pre save hook middle ware
  res.redirect("/");
});

module.exports = router;
