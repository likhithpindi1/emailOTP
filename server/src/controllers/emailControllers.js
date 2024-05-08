let Model = require("../models/email");
const nodemailer = require("nodemailer");

let code = 75566;
let signup = async function (req, res) {
  //   console.log("h1");   w

  let { email, password } = req.body;
  console.log(email);
  let user = await Model.signup(email, password);
  let get = await Model.create(user);
  res.status(200).json(get);
};

let login = async function (req, res) {
  let { email, password } = req.body;
  let user = await Model.login(email, password);

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
    text: `passCode ${code}`, // Changed `code` to `userCode`
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).json(user);

    // Check if the user code is correct and send the appropriate response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error sending email" });
  }
};
let verify = async function (req, res) {
  let { userCode } = req.body;
  let mainCode = Number(userCode);
  if (code === mainCode) {
    res.status(200).json("ok");
  } else {
    res.status(500).json("Internal Server Erro");
  }
};

// res.status(200).json(user);
module.exports = { signup, login, verify };
