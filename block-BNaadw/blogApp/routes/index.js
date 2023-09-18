var express = require("express");
var router = express.Router();
var Article = require("../models/articles"); // collection name imported from schema

/* GET home page. */
router.get("/", async function (req, res, next) {
  var data = await Article.find({});
  res.render("index", { articles: data });
});
router.post("/", async function (req, res, next) {
  await Article.create(req.body);
  res.redirect("/");
});

module.exports = router;

//  all the other registration and other task are done already
