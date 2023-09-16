var express = require("express");
var router = express.Router();
let User = require("../models/user");
let bcrypt = require("bcrypt");

// get User Form
router.get("/", function (req, res, next) {
  console.log(req.session);
});
router.get("/register", function (req, res, next) {
  res.render("register");
});
// create User

router.post("/register", function (req, res, next) {
  try {
    User.create(req.body);
    // .then((user) => {
    //   console.log(user, "after hashing ");
    // });
  } catch (err) {
    return next(err);
  }
  // before this data travel through pre save hook middle ware
  res.redirect("/");
});

// login form
router.get("/login", function (req, res, next) {
  res.render("login");
});

// send credentials to verify login

router.post("/login", function (req, res, next) {
  var { username, password } = req.body;
  //   console.log(username, password);
  if (!username || !password) {
    res.redirect("/users/login");
  }
  try {
    User.findOne({ username: username }).then((user) => {
      console.log(user);
      if (!user) {
        res.redirect("/users/login");
      }

      function verifyPassword(password, cb) {
        // if (password === user.password) {
        //   console.log("true");
        // } else {
        //   console.log("false");
        // }
        bcrypt.compare(password, user.password, (err, result) => {
          return cb(err, result);
        });
      }
      verifyPassword(password, (err, result) => {
        console.log(err, result);
      });
      // persist user information into session
      req.session.userId = user;
      res.redirect("/users");
    });
  } catch (error) {
    return next(err);
  }
});

module.exports = router;
