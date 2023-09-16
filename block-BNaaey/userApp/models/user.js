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
userRegister.pre("save", async function (next) {
  //   console.log(this, "inside pre save");

  try {
    if (this.password && this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (err) {
    next(err);
  }
});

let User = mongoose.model("User", userRegister); // equal to collection

module.exports = User;
