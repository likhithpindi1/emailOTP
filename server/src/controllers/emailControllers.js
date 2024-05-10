let Model = require("../models/email");
const nodemailer = require("nodemailer");
let { genjwt } = require("../utilities/jwttoken");

let funotp = require("../utilities/otp");
let otp = funotp();

//signup
let signup = async function (req, res) {
  try {
    let { _id, name, email, password, phone_number, city, dob } = req.body;

    let user = await Model.signup(
      name,
      email,
      password,
      phone_number,
      city,
      dob
    );
    let get = await Model.create(user);
    let token = await genjwt(get._id);
    console.log("user", get._id);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "likhith.jolly@gmail.com",
        pass: "rahubmhnhgdhsmhp",
      },
    });

    let mailOptions = {
      from: "likhith.jolly@gmail.com",
      to: email,
      subject: "Sending Email using Node.js",
      text: `passCode ${otp}`,
    };

    try {
      let info = await transporter.sendMail(mailOptions);

      res.status(200).json({ get, token, otp });
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

//login

let login = async function (req, res) {
  try {
    let { _id, email, password } = req.body;
    let user = await Model.login(email, password);
    let token = await genjwt(user._id);
    console.log("user", user._id);
    res.status(200).json({ user, token });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

//mailing

let verify = async function (req, res) {
  try {
    let { email, userotp } = req.body;

    let user = await Model.otpcheck(email);

    if (userotp === otp) {
      res.status(200).json({ msg: "logged in" });
    } else {
      res.status(500).json({ msg: "not logged in" });
    }
  } catch (e) {
    res.status(501).json(e.message);
  }
};

module.exports = { signup, login, verify };
