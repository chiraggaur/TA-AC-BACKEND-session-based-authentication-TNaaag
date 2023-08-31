var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.cookie("age", 20);
  console.log(req.cookies);
  res.send(req.cookies);
});

module.exports = router;
