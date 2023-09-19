var express = require("express");
var router = express.Router();
var User = require("../models/user");
var bcrypt = require("bcrypt");
/* GET users listing. */

// register
router.get("/", function (req, res, next) {
  console.log(req.session);
});
router.get("/register", function (req, res, next) {
  res.render("register");
});

// take form data
router.post("/register", async function (req, res, next) {
  // unique email only
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      res.redirect("/users/register");
    } else {
      User.create(req.body);
    }
  } catch (err) {
    next(err);
  }
});

// login

// show form
router.get("/login", function (req, res, next) {
  res.render("login");
});

// take form data

router.post("/login", function (req, res, next) {
  // doubt
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

      function verifyPassword(password) {
        bcrypt.compare(password, user.password, (result) => {
          console.log(result);
        });
      }
      verifyPassword(password);
      // password logged in user information
      req.session.userid = user._id;
      res.redirect("/users");
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
