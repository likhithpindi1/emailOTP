let jwt = require("jsonwebtoken");
let Model = require("../models/email");

let authuser = async function (req, res, next) {
  let { authorization } = req.headers;
  console.log(authorization);
  console.log(req.headers);
  if (!authorization) {
    return res.status(501).json({ error: "auth error" });
  }

  let token = authorization.split(" ")[1];
  try {
    let { _id } = jwt.verify(token, "secret");
    console.log("midd", _id);
    req.user = await Model.findOne({ _id }).select("_id");
    console.log(req.user);
    next();
  } catch (e) {
    return res.status(501).json({ error: " user auth error" });
  }
};

module.exports = authuser;
