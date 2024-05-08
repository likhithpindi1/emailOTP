require("../db/connection");
let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, "please enter emil id"],
  },
  password: {
    type: String,
    require: [true, "please enter password"],
  },
});
userSchema.statics.signup = async function (email, password) {
  let user = { email, password };
  return user;
};
userSchema.statics.login = async function (email, password) {
  try {
    let match = await Model.findOne({ email });
    if (!match) {
      // throw new Error("Email is not valid");
      console.log("email is not valid");
      return null;
    } else {
      return match;
    }
  } catch (e) {
    throw new Error(e);
  }
};

let Model = new mongoose.model("user", userSchema);

module.exports = Model;
