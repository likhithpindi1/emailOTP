let jwt = require("jsonwebtoken");

let genjwt = async function (id) {
  return jwt.sign({ id }, "secret", { expiresIn: "3d" });
};

module.exports = { genjwt };
