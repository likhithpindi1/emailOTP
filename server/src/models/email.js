require("../db/connection");
let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let emailValidator = require("email-validator");

let userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "please enter name"],
    trim: [true, "please enter name"],
  },

  email: {
    type: String,
    require: [true, "please enter emil id"],
    unique: [true, "email id already present"],
  },
  password: {
    type: String,
    require: [true, "please enter password"],
    minlength: [3, "mininum length should be more then 3"],
  },
  phone_number: {
    type: Number,
  },
  city: {
    type: String,
  },
  dob: {
    type: String,
  },
});

//signup
userSchema.statics.signup = async function (
  name,
  email,
  password,
  phone_number,
  city,
  dob
) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  if (name === " ") {
    throw Error("please provide name");
  }
  if (!emailValidator.validate(email)) {
    throw Error("please provide email id");
  }

  if (name === "" || email === "" || password === "") {
    throw Error("please provide name email password");
  }
  let match = await Model.findOne({ email });
  if (match) {
    throw Error("email id already present");
  }
  let user = { name, email, password: hash, phone_number, city, dob };

  return user;
};

//login
userSchema.statics.login = async function (email, password) {
  let present = await Model.findOne({ email });

  if (!present) {
    throw new Error("Email is not valid");
  }

  let checkPassword = await bcrypt.compare(password, present.password);

  if (!checkPassword) {
    throw new Error("password is not valid");
  }

  return present;
};

//mailing

userSchema.statics.otpcheck = async function (email) {
  let check = await Model.findOne({ email });

  if (!check) {
    throw new Error("Email is not valid");
  } else {
    return check;
  }
};

let Model = new mongoose.model("user", userSchema);

module.exports = Model;
