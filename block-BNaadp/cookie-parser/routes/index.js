var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.cookie("name", "Chirag").send("cookie set"); //Sets name = Chirag
});

module.exports = router;
