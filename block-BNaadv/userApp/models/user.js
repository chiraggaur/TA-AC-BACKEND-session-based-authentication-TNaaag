var express = require("express");
var mongoose = require("mongoose");
var schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new schema({
  name: { type: String },
  email: { type: String, match: /@/, require: true, unique: true },
  password: { type: String, min: 5 },
});

// pre save for hashing password
userSchema.pre("save", async function (next) {
  try {
    if (this.password && this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (err) {
    next(err);
  }
});

// create model == collection

var User = mongoose.model("User", userSchema);
module.exports = User;
