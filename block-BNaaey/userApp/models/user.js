let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let bcrypt = require("bcrypt");

let userRegister = new Schema(
  {
    username: { type: String, require: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

// pre save hook middleware
userRegister.pre("save", function (next) {
  //   console.log(this, "inside pre save");

  if (this.password && this.isModified("password")) {
    // hash password
    console.log(this.password);
    bcrypt.hash(this.password, 10, function (err, hash) {
      // Store hash in your password DB.
      if (err) return next(err);
      this.password = hash;
      console.log(this.password, "inside pre save"); // hashed password loggining in but not gettin in database
      next();
    });
  } else {
    next();
  }
});

// compare password of login user

// userRegister.methods.verifyPassword = function (password, cb) {
//   bcrypt.compare(password, this.password, (err, result) => {
//     return cb(err, result);
//   });
// };

let User = mongoose.model("User", userRegister); // equal to collection

module.exports = User;
