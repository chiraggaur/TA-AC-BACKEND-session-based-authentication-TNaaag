var express = require("express");
var router = express.Router();
let User = require("../models/user");
let bcrypt = require("bcrypt");

// get User Form
router.get("/", function (req, res, next) {
  console.log(req.session);
});
router.get("/register", function (req, res, next) {
  var error = req.flash("Invalid")[0];
  res.render("register", { error });
});
// create User

router.post("/register", function (req, res, next) {
  var { username, password } = req.body;
  if (!username || !password) {
    res.redirect("/users/register");
  }
  try {
    User.findOne({ username: username }).then((user) => {
      // console.log(user.username);
      if (user.username === username && password.length > 4) {
        req.flash("Invalid", "email already exist");
        return res.redirect("/users/register");
      } else if (user.username === username && password.length < 4) {
        req.flash("Invalid", "password cannot be smaller than 4 characters ");
        return res.redirect("/users/register");
      } else {
        User.create(req.body).then((user) => {
          console.log(user, "after hashing ");
        });
        return res.redirect("/");
      }
    });
  } catch (error) {
    return next(err);
  }
});

// login form
router.get("/login", function (req, res, next) {
  var error = req.flash("error")[0];
  res.render("login", { error });
});

// send credentials to verify login

router.post("/login", function (req, res, next) {
  var { username, password } = req.body;
  //   console.log(username, password);
  if (!username || !password) {
    req.flash("error", "email or password missing");
    res.redirect("/users/login");
  }
  try {
    User.findOne({ username: username }).then((user) => {
      // console.log(user);
      if (!user) {
        req.flash("error", " invalid username "); // doubt
        res.redirect("/users/login");
      }

      function verifyPassword(password, cb) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (!result) {
            req.flash("error", " wrong password ");
            res.redirect("/users/login");
          }
          return cb(err, result);
        });
      }
      verifyPassword(password, (err, result) => {
        console.log(err, result);
      });
    });
    //     // password logged in user information
    //     req.session.userid = user._id;
    //     res.redirect("/users");
    //   });
  } catch (error) {
    return next(err);
  }
});
module.exports = router;
